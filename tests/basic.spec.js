import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Smooth Timer/);

  // Expect to find the timer
  await expect(page.getByTestId("timer")).toBeVisible();
});

test("waits one second and displays 0:01", async ({ page }, testInfo) => {
  testInfo.setTimeout(2000);
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(1000);
  await expect(page.getByTestId("timer")).toHaveText("0:01");
});
