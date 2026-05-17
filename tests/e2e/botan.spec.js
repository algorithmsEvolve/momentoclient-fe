const { test, expect } = require("@playwright/test");

async function openInvitation(page) {
  await page.goto("/aira-bima?tamu=keluarga-pratama");
  await expect(page.getByTestId("botan-open-button")).toBeVisible();
  await page.getByTestId("botan-open-button").click();
  await expect(page.getByRole("heading", { name: "Konfirmasi Kehadiran" })).toBeVisible();
}

test.describe("Botan invitation flow", () => {
  test("renders invitation cover and core sections", async ({ page }) => {
    await page.goto("/aira-bima?tamu=keluarga-pratama");

    await expect(page.getByText("Aira & Bima")).toBeVisible();
    await expect(page.getByTestId("botan-open-button")).toBeVisible();

    await page.getByTestId("botan-open-button").click();

    await expect(page.getByText("The Couple")).toBeVisible();
    await expect(page.getByText("Akad dan Resepsi")).toBeVisible();
    await expect(page.getByText("Hari yang dinanti")).toBeVisible();
    await expect(page.getByText("Tempat Acara")).toBeVisible();
    await expect(page.getByText("Momen Kami")).toBeVisible();
    await expect(page.getByText("Konfirmasi Kehadiran")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ucapan" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hadiah" })).toBeVisible();
  });

  test("supports RSVP and wish submit for group guest", async ({ page }) => {
    await openInvitation(page);

    await expect(page.getByTestId("botan-rsvp-name")).toHaveValue("Keluarga Pratama");
    await page.getByTestId("botan-rsvp-name").fill("Raka Pratama");
    await page.getByTestId("botan-rsvp-attendee-count").fill("2");
    await page.getByTestId("botan-rsvp-submit").click();

    await expect(page.getByText("Konfirmasi kehadiranmu sudah tersimpan.")).toBeVisible();

    const wishMessage = `Selamat berbahagia untuk Aira dan Bima. ${Date.now()}`;
    await page.getByTestId("botan-wish-name").fill("Raka Pratama");
    await page.getByTestId("botan-wish-message").fill(wishMessage);
    await page.getByTestId("botan-wish-submit").click();

    await expect(
      page.locator(".botan-theme article").filter({
        hasText: wishMessage,
      })
    ).toBeVisible();
  });

  test("single guest keeps RSVP name readonly and mobile menu is visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/aira-bima?tamu=dina");
    await page.getByTestId("botan-open-button").click();

    await expect(page.getByTestId("botan-rsvp-name")).toHaveValue("Dina Larasati");
    await expect(page.getByTestId("botan-rsvp-name")).toHaveAttribute("readonly");
    await expect(page.locator(".botan-floating-menu")).toBeVisible();
  });
});
