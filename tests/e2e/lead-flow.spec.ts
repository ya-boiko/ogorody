import { test, expect } from "@playwright/test";

test("user browses landing → catalog → plot → submits lead", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Свой урожай");

  // Go to catalog via the nav "Участки" link
  await page.locator(".nav-links a", { hasText: "Участки" }).click();
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.locator(".plot-card").first()).toBeVisible();

  // Open first plot
  const firstCard = page.locator("a.plot-card").first();
  await firstCard.waitFor({ state: "visible" });
  await firstCard.click();
  await page.waitForURL(/\/catalog\/\d+$/, { timeout: 10_000 });
  await expect(page.locator(".lead-form")).toBeVisible();

  // Fill form and submit
  await page.getByLabel("Имя").fill("Иван Петров");
  await page.getByLabel("Телефон").fill("+7 861 000-00-00");
  await page.getByRole("button", { name: /Записаться/ }).click();

  await expect(page.getByText("Заявка отправлена")).toBeVisible({ timeout: 10_000 });
});
