import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonces: they would force every page to render dynamically. Inline
// scripts/styles come from Next's bootstrap, motion and the Cal embed.
// Booking must never break: today the page itself only pulls embed.js from
// app.cal.com (everything else loads inside Cal's iframe, under Cal's own
// CSP), but every directive allows all of cal.com so a Cal host move or a
// parent-side loader/stylesheet can't block it. tests/booking-cal.spec.ts
// guards this. Vercel Analytics is same-origin under /_vercel/insights.
const CAL = "https://cal.com https://*.cal.com";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${CAL}`,
  `style-src 'self' 'unsafe-inline' ${CAL}`,
  `img-src 'self' blob: data: ${CAL}`,
  `font-src 'self' ${CAL}`,
  `connect-src 'self' ${CAL}`,
  `frame-src ${CAL}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
