import { chromium } from "@playwright/test";

const out = "/Users/zm/Projects/portfolio/.shots";
const browser = await chromium.launch();
for (const [w, h] of [
  [1280, 720],
  [1440, 900],
  [1600, 944],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  await page.screenshot({ path: `${out}/green-${w}x${h}.png` });
  await page.close();
}
await browser.close();
