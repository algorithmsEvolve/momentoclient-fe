# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: botan.spec.js >> Botan invitation flow >> single guest keeps RSVP name readonly and mobile menu is visible
- Location: tests/e2e/botan.spec.js:51:3

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('botan-rsvp-name')
Expected: "Dina Larasati"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByTestId('botan-rsvp-name')

```

```yaml
- main:
  - paragraph: The Wedding Of
  - paragraph: Aira
  - paragraph: "&"
  - paragraph: Bima
  - paragraph: Kepada Yth,
  - paragraph: Dina Larasati
  - button "email Buka Undangan":
    - img "email"
    - paragraph: Buka Undangan
  - paragraph: Sabtu, 12 Desember 2026
  - img "decor-back"
  - img "decor-back-left"
  - img "decor-bottom-left"
  - img "decor-top-right"
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | async function openInvitation(page) {
  4  |   await page.goto("/aira-bima?tamu=keluarga-pratama");
  5  |   await expect(page.getByTestId("botan-open-button")).toBeVisible();
  6  |   await page.getByTestId("botan-open-button").click();
  7  |   await expect(page.getByRole("heading", { name: "Konfirmasi Kehadiran" })).toBeVisible();
  8  | }
  9  | 
  10 | test.describe("Botan invitation flow", () => {
  11 |   test("renders invitation cover and core sections", async ({ page }) => {
  12 |     await page.goto("/aira-bima?tamu=keluarga-pratama");
  13 | 
  14 |     await expect(page.getByText("Aira & Bima")).toBeVisible();
  15 |     await expect(page.getByTestId("botan-open-button")).toBeVisible();
  16 | 
  17 |     await page.getByTestId("botan-open-button").click();
  18 | 
  19 |     await expect(page.getByText("The Couple")).toBeVisible();
  20 |     await expect(page.getByText("Akad dan Resepsi")).toBeVisible();
  21 |     await expect(page.getByText("Hari yang dinanti")).toBeVisible();
  22 |     await expect(page.getByText("Tempat Acara")).toBeVisible();
  23 |     await expect(page.getByText("Momen Kami")).toBeVisible();
  24 |     await expect(page.getByText("Konfirmasi Kehadiran")).toBeVisible();
  25 |     await expect(page.getByRole("heading", { name: "Ucapan" })).toBeVisible();
  26 |     await expect(page.getByRole("heading", { name: "Hadiah" })).toBeVisible();
  27 |   });
  28 | 
  29 |   test("supports RSVP and wish submit for group guest", async ({ page }) => {
  30 |     await openInvitation(page);
  31 | 
  32 |     await expect(page.getByTestId("botan-rsvp-name")).toHaveValue("Keluarga Pratama");
  33 |     await page.getByTestId("botan-rsvp-name").fill("Raka Pratama");
  34 |     await page.getByTestId("botan-rsvp-attendee-count").fill("2");
  35 |     await page.getByTestId("botan-rsvp-submit").click();
  36 | 
  37 |     await expect(page.getByText("Konfirmasi kehadiranmu sudah tersimpan.")).toBeVisible();
  38 | 
  39 |     const wishMessage = `Selamat berbahagia untuk Aira dan Bima. ${Date.now()}`;
  40 |     await page.getByTestId("botan-wish-name").fill("Raka Pratama");
  41 |     await page.getByTestId("botan-wish-message").fill(wishMessage);
  42 |     await page.getByTestId("botan-wish-submit").click();
  43 | 
  44 |     await expect(
  45 |       page.locator(".botan-theme article").filter({
  46 |         hasText: wishMessage,
  47 |       })
  48 |     ).toBeVisible();
  49 |   });
  50 | 
  51 |   test("single guest keeps RSVP name readonly and mobile menu is visible", async ({ page }) => {
  52 |     await page.setViewportSize({ width: 390, height: 844 });
  53 |     await page.goto("/aira-bima?tamu=dina");
  54 |     await page.getByTestId("botan-open-button").click();
  55 | 
> 56 |     await expect(page.getByTestId("botan-rsvp-name")).toHaveValue("Dina Larasati");
     |                                                       ^ Error: expect(locator).toHaveValue(expected) failed
  57 |     await expect(page.getByTestId("botan-rsvp-name")).toHaveAttribute("readonly");
  58 |     await expect(page.locator(".botan-floating-menu")).toBeVisible();
  59 |   });
  60 | });
  61 | 
```