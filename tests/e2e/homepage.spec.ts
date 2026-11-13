import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });

test("selected details stay reachable from the rail by pointer", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("list")
    .getByRole("link", {
      name: /Heavyweight Oversized Tee, Chalk/,
    })
    .hover();
  const details = page.locator('[aria-live="polite"] a');
  await details.hover();
  await expect(details).toHaveAttribute(
    "href",
    "/products/heavyweight-oversized-tee",
  );
  await details.click();
  await expect(page).toHaveURL(/\/products\/heavyweight-oversized-tee$/);
});

test("Tab preserves the selected details and leaving restores the default", async ({
  page,
}) => {
  await page.goto("/");
  const lastGarment = page.getByRole("list").getByRole("link").last();
  const destination = await lastGarment.getAttribute("href");
  await lastGarment.focus();
  await lastGarment.press("Tab");
  const details = page.locator('[aria-live="polite"] a');
  await expect(details).toBeFocused();
  await expect(details).toHaveAttribute("href", destination!);
  await details.press("Shift+Tab");
  await expect(lastGarment).toBeFocused();
  await lastGarment.press("Tab");
  await details.press("Tab");
  await expect(details).toHaveAttribute("href", "/products/everyday-hoodie");
});

test("narrow screens retain shared navigation without overflow", async ({
  page,
}) => {
  for (const width of [320, 700]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/bag");
    await page.evaluate(() => document.fonts.ready);
    const navigation = page.getByRole("navigation", {
      name: "Main navigation",
      exact: true,
    });
    const shop = navigation.getByRole("link", { name: "Shop", exact: true });
    await expect(shop).toBeVisible();
    await expect(
      navigation.getByRole("link", { name: "About", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await shop.click();
    await expect(page).toHaveURL(/\/shop$/);
    await navigation.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
  }
});

test("rail responds to hover, resets, and follows a single product click", async ({
  page,
}) => {
  await page.goto("/");
  const rail = page.getByRole("list", {
    name: "Explore the OFFHOUR collection",
  });
  await expect(rail.getByRole("link")).toHaveCount(13);
  const tee = rail.getByRole("link", {
    name: /Heavyweight Oversized Tee, Chalk/,
  });
  const centre = rail.getByRole("link", { name: /Everyday Hoodie, Graphite/ });
  const centreFront = centre
    .locator('[aria-hidden="true"]')
    .nth(1)
    .locator(":scope > span")
    .nth(1);
  await expect(centreFront).toHaveCSS("opacity", "1");
  await expect(centreFront).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await tee.hover();
  await expect(tee.locator("..")).toHaveAttribute("data-active", "true");
  await expect(centre.locator("..")).toHaveAttribute("data-active", "false");
  await expect(centreFront).toHaveCSS("opacity", "0");
  await expect(centre.locator('[data-garment-view="side"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(rail.locator('li[data-active="true"]')).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: /Heavyweight Oversized Tee/ }).last(),
  ).toContainText("₹1,299");
  await page.getByRole("link", { name: "OFFHOUR home" }).hover();
  await expect(centre.locator("..")).toHaveAttribute("data-active", "true");
  await expect(tee.locator("..")).toHaveAttribute("data-active", "false");
  await expect(centreFront).toHaveCSS("opacity", "1");
  await tee.click();
  await expect(page).toHaveURL(/\/products\/heavyweight-oversized-tee$/);
  await expect(
    page.getByRole("heading", { name: "Product details." }),
  ).toBeVisible();
});

test("keyboard focus reveals a garment and Enter follows its link", async ({
  page,
}) => {
  await page.goto("/");
  const hoodie = page
    .getByRole("list")
    .getByRole("link", { name: /Everyday Hoodie, Navy/ });
  await hoodie.focus();
  await expect(hoodie.locator("..")).toHaveAttribute("data-active", "true");
  await expect(hoodie).toBeFocused();
  await expect(
    page
      .getByRole("list")
      .getByRole("link", { name: /Everyday Hoodie, Graphite/ })
      .locator('[data-garment-view="side"]'),
  ).toHaveCSS("opacity", "1");
  await expect(hoodie.locator('[data-garment-view="front"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await hoodie.press("Enter");
  await expect(page).toHaveURL(/\/products\/everyday-hoodie-navy$/);
});

test("each garment has distinct paired views and turns back after hover", async ({
  page,
}) => {
  await page.goto("/");
  const rail = page.getByRole("list", {
    name: "Explore the OFFHOUR collection",
  });
  await expect(rail.getByRole("link")).toHaveCount(13);
  for (const link of await rail.getByRole("link").all()) {
    const side = link.locator('[data-garment-view="side"]');
    const front = link.locator('[data-garment-view="front"]');
    await expect(side.locator("img")).toHaveAttribute("src", /side-cutout/);
    await expect(front.locator("img")).toHaveAttribute("src", /front-cutout/);
    if ((await link.locator("..").getAttribute("data-featured")) === "true")
      continue;
    await expect(side).toHaveCSS("opacity", "1");
    await expect(front).toHaveCSS("opacity", "0");
    await link.hover();
    await expect(front).toHaveCSS("opacity", "1");
    await expect(front).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
    await expect(side).toHaveCSS("opacity", "0");
    await page.getByRole("link", { name: "OFFHOUR home" }).hover();
    await expect(side).toHaveCSS("opacity", "1");
    await expect(front).toHaveCSS("opacity", "0");
  }
});

test("desktop composition fits a 1280 by 720 viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight <= window.innerHeight + 1,
    ),
  ).toBe(true);
});

test("reduced motion disables rail animation and all garment images load", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const rail = page.getByRole("list");
  const tee = rail.getByRole("link", {
    name: /Heavyweight Oversized Tee, Chalk/,
  });
  await tee.focus();
  const images = rail.locator("img");
  await expect(images).toHaveCount(26);
  for (const image of await images.all()) {
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
  const transition = await tee
    .locator("..")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(transition).toBe("0s");
  const stage = tee.locator('[aria-hidden="true"]').nth(1);
  expect(
    await stage.evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
