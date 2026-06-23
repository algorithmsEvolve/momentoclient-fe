const { test, expect } = require("@playwright/test");

async function openInvitation(page) {
  await page.goto("/ayu-bagas?tamu=Anita-Rizki");
  await expect(page.getByTestId("aozora-open-button")).toBeVisible();
  await page.getByTestId("aozora-open-button").click();
  await page.waitForTimeout(2000);

  // If the RSVP has already been submitted in a previous test run, click "Ubah" to show the form
  const changeButton = page.getByRole("button", { name: "Ubah" }).first();
  if (await changeButton.isVisible()) {
    await changeButton.click();
    await page.waitForTimeout(1000);
  }
}

test.describe("Aozora invitation flow", () => {
  test("renders invitation cover and core sections", async ({ page }) => {
    await page.goto("/ayu-bagas?tamu=Anita-Rizki");

    await expect(page.getByText("Ayu").first()).toBeVisible();
    await expect(page.getByText("Bagas").first()).toBeVisible();
    await expect(page.getByTestId("aozora-open-button")).toBeVisible();

    await page.getByTestId("aozora-open-button").click();

    // Scroll to each section to trigger animation and verify visibility
    const sections = [
      "Ayu Anggraini, S.Ak.",
      "Bagas Makarim Suryoputro, S.T",
      "Akad Nikah",
      "Resepsi",
      "Resto Piring Cantik Parigi",
      "Kisah Kami",
      "R S V P",
      "Ucapan",
      "Kirim Hadiah"
    ];

    for (const text of sections) {
      const locator = page.getByText(text).first();
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
    }
  });

  test("supports RSVP and wish submit for guest", async ({ page }) => {
    await openInvitation(page);

    // Select "Hadir" and "Berdua" using text labels
    await page.getByText("Hadir", { exact: true }).click();
    await page.getByText("Berdua", { exact: true }).click();
    
    await page.getByTestId("aozora-rsvp-submit").click();

    // Verification of submission
    await expect(page.getByText("telah mengisi kehadiran pada form ini")).toBeVisible();

    const wishMessage = `Selamat berbahagia untuk Ayu dan Bagas. E2E Test ${Date.now()}`;
    const wishName = page.getByTestId("aozora-wish-name");
    await wishName.scrollIntoViewIfNeeded();
    await expect(wishName).toBeVisible();
    await wishName.fill("Anita Rizki");
    
    await page.getByTestId("aozora-wish-message").fill(wishMessage);
    await page.getByTestId("aozora-wish-submit").click();

    await expect(
      page.locator(".aozora-theme .wish").filter({
        hasText: wishMessage,
      })
    ).toBeVisible();
  });

  test("mobile menu is visible on smaller viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ayu-bagas?tamu=Anita-Rizki");
    await page.getByTestId("aozora-open-button").click();

    await page.waitForTimeout(2000);
    await expect(page.locator("[name=aozora-floating-menu]")).toBeVisible();
  });
});
