import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

describe("NewsletterForm", () => {
  it("renders email input and submit", () => {
    render(<NewsletterForm source="blog" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Подписаться/ })).toBeInTheDocument();
  });

  it("submits with provided source", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    const user = userEvent.setup();
    render(<NewsletterForm source="news" />);
    await user.type(screen.getByLabelText(/email/i), "ivan@example.com");
    await user.click(screen.getByRole("button", { name: /Подписаться/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/newsletter",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(body).toEqual({ email: "ivan@example.com", source: "news" });
    expect(await screen.findByText(/Спасибо/)).toBeInTheDocument();
  });
});
