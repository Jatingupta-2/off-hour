import { expect, test } from "@playwright/test";

test("the shell navigates without pretending checkout is implemented", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Wear your own time." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore the shop" }).click();
  await expect(
    page.getByRole("heading", { name: "The collection." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Account", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
});

test("liveness does not depend on integration credentials", async ({
  request,
}) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({ status: "ok" });
});
