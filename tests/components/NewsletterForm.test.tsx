import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { subscribeMock } = vi.hoisted(() => ({ subscribeMock: vi.fn() }));

vi.mock("@/lib/newsletter-client", () => ({
  subscribeToNewsletter: subscribeMock,
}));

import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

beforeEach(() => {
  subscribeMock.mockReset();
  subscribeMock.mockResolvedValue({ ok: true });
});

describe("NewsletterForm", () => {
  it("renders email input and submit", () => {
    render(<NewsletterForm source="blog" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Подписаться/ })).toBeInTheDocument();
  });

  it("submits with provided source", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm source="news" />);
    await user.type(screen.getByLabelText(/email/i), "ivan@example.com");
    await user.click(screen.getByRole("button", { name: /Подписаться/ }));

    await waitFor(() => expect(subscribeMock).toHaveBeenCalledTimes(1));
    expect(subscribeMock).toHaveBeenCalledWith({
      email: "ivan@example.com",
      source: "news",
    });
    expect(await screen.findByText(/Спасибо/)).toBeInTheDocument();
  });
});
