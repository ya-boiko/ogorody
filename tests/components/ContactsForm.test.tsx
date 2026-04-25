import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { submitMock } = vi.hoisted(() => ({ submitMock: vi.fn() }));

vi.mock("@/lib/lead-client", () => ({
  submitLead: submitMock,
}));

import { ContactsForm } from "@/components/leads/ContactsForm";

beforeEach(() => {
  submitMock.mockReset();
  submitMock.mockResolvedValue({ ok: true });
});

describe("ContactsForm", () => {
  it("renders Имя, Телефон, Email, Сообщение, submit, privacy notice", () => {
    render(<ContactsForm />);
    expect(screen.getByLabelText(/Имя/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Сообщение/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Отправить заявку/ })).toBeInTheDocument();
    expect(screen.getByText(/политикой обработки/)).toBeInTheDocument();
  });

  it("submits with email when provided", async () => {
    const user = userEvent.setup();
    render(<ContactsForm />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.type(screen.getByLabelText(/Email/), "ivan@example.com");
    await user.click(screen.getByRole("button", { name: /Отправить заявку/ }));

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Иван Петров",
        phone: "+7 861 000 00 00",
        email: "ivan@example.com",
        source: "contacts",
      }),
    );
  });

  it("rejects malformed email", async () => {
    const user = userEvent.setup();
    render(<ContactsForm />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.type(screen.getByLabelText(/Email/), "not-an-email");
    await user.click(screen.getByRole("button", { name: /Отправить заявку/ }));
    expect(await screen.findByText(/Введите корректный email/)).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });
});
