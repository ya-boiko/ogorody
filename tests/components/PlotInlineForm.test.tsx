import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { submitMock } = vi.hoisted(() => ({ submitMock: vi.fn() }));

vi.mock("@/lib/lead-client", () => ({
  submitLead: submitMock,
}));

import { PlotInlineForm } from "@/components/catalog/PlotInlineForm";

beforeEach(() => {
  submitMock.mockReset();
  submitMock.mockResolvedValue({ ok: true });
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
    const user = userEvent.setup();
    render(<PlotInlineForm plotId={42} />);
    await user.type(screen.getByLabelText(/Имя/), "Иван Петров");
    await user.type(screen.getByLabelText(/Телефон/), "+7 861 000 00 00");
    await user.selectOptions(screen.getByLabelText(/Формат ухода/), "managed");
    await user.click(screen.getByRole("button", { name: /Записаться/ }));

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Иван Петров",
        phone: "+7 861 000 00 00",
        source: "plot",
        plotId: 42,
        careFormat: "managed",
      }),
    );
    expect(await screen.findByText(/Заявка отправлена/)).toBeInTheDocument();
  });
});
