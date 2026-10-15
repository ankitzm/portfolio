import { expect, test } from "@playwright/test";

/**
 * The desktop hero is a fixed-height postcard: headline, portrait stamp and
 * the "Open for work" CTA must all land inside the first screen. Nothing in
 * the type scale is height-aware by default, so a viewport shorter than the
 * card silently pushes the CTA and tagline below the fold. These viewports
 * cover the common laptop heights plus the ultrawide, where the card stops
 * growing and starts centring.
 */
const DESKTOP = [
  { width: 1024, height: 640 },
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
];

for (const vp of DESKTOP) {
  test(`hero fits the first screen at ${vp.width}x${vp.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(vp);
    await page.goto("/");
    // Entry animations translate the card a few px; settle before measuring.
    await page.waitForTimeout(1500);

    const m = await page.evaluate(() => {
      const box = (el: Element | null | undefined) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom };
      };
      const cta = [...document.querySelectorAll("a")].find(
        (a) => a.textContent?.trim().toLowerCase() === "open for work",
      );
      return {
        vh: window.innerHeight,
        header: box(document.querySelector("header")),
        card: box(document.querySelector(".perf-edge")),
        stamp: box(document.querySelector(".stamp-scallop")),
        headline: box(document.querySelector("h1")),
        tagline: box(
          [...document.querySelectorAll("p")].find((p) =>
            p.textContent?.includes("years of web3"),
          ),
        ),
        cta: box(cta),
      };
    });

    // Nothing from the next section may show at the bottom of the first
    // screen: the olive ground itself AND the TornEdge rip, which overhangs
    // 30px above its section. The hero has to out-reach both.
    const next = await page.evaluate(() => {
      const sec = document.querySelector("#projects");
      const rip = sec?.querySelector(".torn-edge");
      const g = (el?: Element | null) =>
        el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      return Math.min(g(sec ?? null), g(rip));
    });
    expect(
      next,
      "next section's ground or torn rip is visible in the first screen",
    ).toBeGreaterThanOrEqual(m.vh);

    expect(m.card, "hero card missing").not.toBeNull();
    expect(m.stamp, "portrait stamp missing").not.toBeNull();
    expect(m.tagline, "tagline missing").not.toBeNull();
    expect(m.cta, "CTA missing").not.toBeNull();

    // Card bottom, tagline and CTA all inside the viewport.
    expect(m.card!.bottom).toBeLessThanOrEqual(m.vh);
    expect(m.tagline!.bottom).toBeLessThanOrEqual(m.vh);
    expect(m.cta!.bottom).toBeLessThanOrEqual(m.vh);

    // Headline top clears the sticky header (header is sticky at --frame).
    expect(m.headline!.top).toBeGreaterThanOrEqual(m.header!.bottom);
    // Stamp overhangs the card's top edge but must not slide under the header.
    expect(m.stamp!.top).toBeGreaterThanOrEqual(m.header!.bottom);
  });
}
