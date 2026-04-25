import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlotInlineForm } from "@/components/catalog/PlotInlineForm";

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe("PlotInlineForm", () => {
  it("renders Имя, Телефон, Формат ухода select, submit button", () => {
    render(<PlotInlineForm plotId={1} />);
    expect(screen.getByLabelText(/Имя/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Формат ухода/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Записаться на просмотр/ }),
    ).toBeInTheDocument();
  });

  it("submits with careFormat when selected", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    const user = userEvent.setup();
    render(<PlotInlineForm plotId={42} />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.selectOptions(screen.getByLabelText(/Формат ухода/), "managed");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(body).toMatchObject({
      name: "Иван Петров",
      phone: "+7 861 000 00 00",
      source: "plot",
      plotId: 42,
      careFormat: "managed",
    });
    expect(await screen.findByText(/Заявка отправлена/)).toBeInTheDocument();
  });
});
