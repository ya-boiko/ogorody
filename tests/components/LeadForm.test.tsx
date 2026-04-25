import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadForm } from "@/components/leads/LeadForm";

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
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
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits valid data and shows success message", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    const user = userEvent.setup();
    render(<LeadForm source="plot" plotId={42} />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/leads",
        expect.objectContaining({ method: "POST" }),
      );
    });
    const body = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(body).toEqual({
      name: "Иван Петров",
      phone: "+7 861 000 00 00",
      source: "plot",
      plotId: 42,
    });
    expect(await screen.findByText(/Заявка отправлена/)).toBeInTheDocument();
  });

  it("shows error message when API returns non-200", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: "bad" }),
    });
    const user = userEvent.setup();
    render(<LeadForm source="contacts" />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));
    expect(await screen.findByText(/Не удалось отправить/)).toBeInTheDocument();
  });
});
