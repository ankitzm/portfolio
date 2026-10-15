import { expect, test } from "@playwright/test";

/**
 * Booking is the site's one conversion path: tearing the pass must always
 * uncover a live Cal.com scheduler. Guards the CSP in next.config.ts (run
 * against `next start` to get prod headers), the lazy mount and the tear.
 * Needs network access to cal.com.
 */
for (const vp of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`cal scheduler loads after the tear at ${vp.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(vp);
    const violations: string[] = [];
    await page.exposeFunction("cspViolation", (v: string) =>
      violations.push(v),
    );
    await page.addInitScript(() =>
      document.addEventListener("securitypolicyviolation", (e) =>
        (
          window as unknown as { cspViolation: (v: string) => void }
        ).cspViolation(`${e.violatedDirective} ${e.blockedURI}`),
      ),
    );

    await page.goto("/");
    await page.locator("#booking").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /tear here/i }).click();

    // A day grid only renders once Cal's app booted and fetched availability.
    const cal = page.frameLocator('iframe[src*="cal.com"]');
    await expect(cal.locator('[data-testid="day"]').first()).toBeVisible({
      timeout: 30_000,
    });
    expect(violations, "CSP blocked something on the booking path").toEqual([]);
  });
}
