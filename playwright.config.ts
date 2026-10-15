import { defineConfig, devices } from "@playwright/test";

/**
 * Layout guards only, against an already-running dev server (`npm run dev`).
 * Not a unit-test suite: these assert that the hero still fits the first
 * screen at desktop sizes, which is a regression Tailwind's compiler cannot
 * catch on its own.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
