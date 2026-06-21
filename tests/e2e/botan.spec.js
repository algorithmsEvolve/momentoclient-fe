const { test, expect } = require("@playwright/test");

async function openInvitation(page) {
  await page.goto("/aira-bima?tamu=keluarga-pratama");
  await expect(page.getByTestId("botan-open-button")).toBeVisible();
  await page.getByTestId("botan-open-button").click();
  await page.waitForTimeout(2000);

  // If the RSVP has already been submitted in a previous test run, click "Ubah" to show the form
  const changeButton = page.getByRole("button", { name: "Ubah" }).first();
  if (await changeButton.isVisible()) {
    await changeButton.click();
    await page.waitForTimeout(1000);
  }

  const rsvpName = page.getByTestId("botan-rsvp-name");
  await rsvpName.scrollIntoViewIfNeeded();
  await expect(rsvpName).toBeVisible();
}

test.describe("Botan invitation flow", () => {
  test("renders invitation cover and core sections", async ({ page }) => {
    await page.goto("/aira-bima?tamu=keluarga-pratama");

    await expect(page.getByText("Aira")).toBeVisible();
    await expect(page.getByText("Bima")).toBeVisible();
    await expect(page.getByTestId("botan-open-button")).toBeVisible();

    await page.getByTestId("botan-open-button").click();

    // Scroll to each section to trigger animation and verify visibility
    const sections = [
      "Aira Maheswari",
      "Akad Nikah",
      "Hari yang dinanti",
      "The Botanica Grand Hall",
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

    await expect(page.getByTestId("botan-rsvp-name")).toHaveValue(/Keluarga Pratama|Raka Pratama/);
    await page.getByTestId("botan-rsvp-name").fill("Raka Pratama");
    await page.getByTestId("botan-rsvp-attendee-count").fill("2");
    await page.getByTestId("botan-rsvp-submit").click();

    await expect(page.getByText("telah mengisi kehadiran pada form ini")).toBeVisible();

    const wishMessage = `Selamat berbahagia untuk Aira dan Bima. ${Date.now()}`;
    const wishName = page.getByTestId("botan-wish-name");
    await wishName.scrollIntoViewIfNeeded();
    await expect(wishName).toBeVisible();
    await wishName.fill("Raka Pratama");
    
    await page.getByTestId("botan-wish-message").fill(wishMessage);
    await page.getByTestId("botan-wish-submit").click();

    await expect(
      page.locator(".botan-theme .wish").filter({
        hasText: wishMessage,
      })
    ).toBeVisible();
  });

  test("single guest keeps RSVP name readonly and mobile menu is visible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/aira-bima?tamu=dina");
    await page.getByTestId("botan-open-button").click();

    await page.waitForTimeout(2000);
    const rsvpName = page.getByTestId("botan-rsvp-name");
    await rsvpName.scrollIntoViewIfNeeded();
    await expect(rsvpName).toHaveValue("Dina Larasati");
    await expect(rsvpName).toHaveAttribute("readonly");
    await expect(page.locator("[name=botan-floating-menu]")).toBeVisible();
  });
});
