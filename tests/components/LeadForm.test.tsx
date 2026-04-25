import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { submitMock } = vi.hoisted(() => ({ submitMock: vi.fn() }));

vi.mock("@/lib/lead-client", () => ({
  submitLead: submitMock,
}));

import { LeadForm } from "@/components/leads/LeadForm";

beforeEach(() => {
  submitMock.mockReset();
  submitMock.mockResolvedValue({ ok: true });
});

describe("LeadForm", () => {
  it("renders required fields and submit button", () => {
    render(<LeadForm source="contacts" />);
    expect(screen.getByLabelText(/Имя/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Записаться/ })).toBeInTheDocument();
  });

  it("shows validation error for short name", async () => {
    const user = userEvent.setup();
    render(<LeadForm source="contacts" />);
    await user.type(screen.getByLabelText(/Имя/), "И");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));
    expect(await screen.findByText(/Введите имя/)).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("submits valid data and shows success message", async () => {
    const user = userEvent.setup();
    render(<LeadForm source="plot" plotId={42} />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(submitMock).toHaveBeenCalledWith({
      name: "Иван Петров",
      phone: "+7 861 000 00 00",
      source: "plot",
      plotId: 42,
    });
    expect(await screen.findByText(/Заявка отправлена/)).toBeInTheDocument();
  });

  it("shows error message when submitLead throws", async () => {
    submitMock.mockRejectedValueOnce(new Error("network down"));
    const user = userEvent.setup();
    render(<LeadForm source="contacts" />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));
    expect(await screen.findByText(/Не удалось отправить/)).toBeInTheDocument();
  });
});
