const { test, expect } = require("@playwright/test");

async function openInvitation(page) {
  await page.goto("/sora-aoi?tamu=keluarga-pratama");
  await expect(page.getByTestId("yuugure-open-button")).toBeVisible();
  await page.getByTestId("yuugure-open-button").click();
  await page.waitForTimeout(2000);

  // If the RSVP has already been submitted in a previous test run, click "Ubah" to show the form
  const changeButton = page.getByRole("button", { name: "Ubah" }).first();
  if (await changeButton.isVisible()) {
    await changeButton.click();
    await page.waitForTimeout(1000);
  }

  const rsvpName = page.getByTestId("yuugure-rsvp-name");
  await rsvpName.scrollIntoViewIfNeeded();
  await expect(rsvpName).toBeVisible();
}

test.describe("Yuugure invitation flow", () => {
  test("renders invitation cover and core sections", async ({ page }) => {
    await page.goto("/sora-aoi?tamu=keluarga-pratama");

    await expect(page.getByText("Sora")).toBeVisible();
    await expect(page.getByText("Aoi")).toBeVisible();
    await expect(page.getByTestId("yuugure-open-button")).toBeVisible();

    await page.getByTestId("yuugure-open-button").click();

    // Scroll to each section to trigger animation and verify visibility
    const sections = [
      "Sora Tachibana",
      "Akad Nikah",
      "Hari yang dinanti",
      "Sunset Hills Beach Club",
      "Kisah Kami",
      "R S V P",
      "Ucapan dan Doa",
      "Kirim Hadiah"
    ];

    for (const text of sections) {
      const locator = page.getByText(text).first();
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
    }
  });

  test("supports RSVP and wish submit for group guest", async ({ page }) => {
    await openInvitation(page);

    await expect(page.getByTestId("yuugure-rsvp-name")).toHaveValue(/Keluarga Pratama|Raka Pratama/);
    await page.getByTestId("yuugure-rsvp-name").fill("Raka Pratama");
    
    // Select "Hadir" and "Berdua" using text labels
    await page.getByText("Hadir", { exact: true }).click();
    await page.getByText("Berdua", { exact: true }).click();
    
    await page.getByTestId("yuugure-rsvp-submit").click();

    // Verification of submission
    await expect(page.getByText("telah mengisi kehadiran pada form ini")).toBeVisible();

    const wishMessage = `Selamat berbahagia untuk Sora dan Aoi. ${Date.now()}`;
    const wishName = page.getByTestId("yuugure-wish-name");
    await wishName.scrollIntoViewIfNeeded();
    await expect(wishName).toBeVisible();
    await wishName.fill("Raka Pratama");
    
    await page.getByTestId("yuugure-wish-message").fill(wishMessage);
    await page.getByTestId("yuugure-wish-submit").click();

    await expect(
      page.locator(".yuugure-theme .wish").filter({
        hasText: wishMessage,
      })
    ).toBeVisible();
  });

  test("single guest keeps RSVP name readonly and mobile menu is visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/sora-aoi?tamu=dina");
    await page.getByTestId("yuugure-open-button").click();

    await page.waitForTimeout(2000);
    const rsvpName = page.getByTestId("yuugure-rsvp-name");
    await rsvpName.scrollIntoViewIfNeeded();
    await expect(rsvpName).toHaveValue("Dina Larasati");
    await expect(rsvpName).toHaveAttribute("readonly");
    await expect(page.locator("[name=yuugure-floating-menu]")).toBeVisible();
  });
});
