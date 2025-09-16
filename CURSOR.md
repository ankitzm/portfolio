# CURSOR.md

This document summarizes the functional behavior of the codebase and the data contracts used across the app. It purposely avoids component structures and implementation details so the logic can be re-implemented in a new application.

## Overview
- **Build tooling**: Vite + React (SWC) with TypeScript.
- **Routing**: `react-router-dom` with routes for home, projects, experience, and contact.
- **Animations**: `framer-motion` for page transitions and on-scroll effects.
- **Analytics/Insights**: `@vercel/analytics` (injected in `App`) and `@vercel/speed-insights/react` (rendered in `main`).
- **Scheduling**: `react-calendly` InlineWidget for contact scheduling.
- **Styling**: TailwindCSS classes, custom patterns, and local CSS (`src/styles/timelineScroll.css`).

## Runtime Behaviors
- App mounts inside a `BrowserRouter` and renders page content inside an animated container.
- A global navigation bar is rendered above routed content.
- On route change, the app waits briefly then scrolls to top to reset context for the new page.
- Page transitions use two full-screen `motion.div` overlays to create a cover-reveal animation during navigation.
- Home page implements scroll-driven text/image transforms and reveals sections progressively.
- Projects page renders a two-column masonry-like list sourced from `@data/projects.json`, with a small odd-count UI fallback card on wide screens.
- Experience page renders a vertically scrollable timeline sourced from `@data/experience.json`, with card scaling based on scroll progress and index to create depth.
- Contact page embeds a Calendly scheduling widget full-screen.

## Data Contracts (from @data)
All data is currently stored as JSON arrays and imported directly. Below are the shapes that downstream logic expects. Re-implementations should adhere to these contracts or provide adapters.

### projects.json
Array of `Project` objects.

Required shape per item:
```ts
interface Project {
  name: string;                   // Display title
  description: string;            // Short summary
  image: string;                  // Slug used to resolve media assets
  links: {
    github: string;               // URL to repository
    website: string;              // URL to live site or package page
  };
  tags: string[];                 // Technology and topic labels
}
```

Functional usage expectations:
- The list is displayed in two columns. The array is split in half at runtime using `const total = projects.length` and `slice(0, total/2)` and `slice(total/2, total)` (integer division semantics via JS).
- If the total number of projects is odd and `window.innerWidth > 700`, a concluding placeholder card is rendered in the first column.
- `image` is treated as an asset slug. In the existing repo, preview images exist at:
  - `public/projects/png/<image>.png`
  - `public/projects/webp/<image>.webp`
  Consumers should implement a resolver that maps the slug to a preferred format and fallback.

### experience.json
Array of `ExperienceItem` objects.

Required shape per item:
```ts
interface ExperienceItem {
  color: string;          // Theme or accent identifier (e.g., 'red', 'purple')
  company: string;        // Organization name
  role: string;           // Title/position
  date: string;           // Human-readable date range
  description: string[];  // Bullet points, may include markdown links
  skills: string[];       // Keywords/skills
}
```

Functional usage expectations:
- The list is displayed as a vertical sequence of animated cards.
- For the item at `index` within the array of length `N`, the scroll-driven animation uses:
  - Range: `[index / N, 1]` to determine when the item begins scaling based on global `scrollYProgress`.
  - Target scale: `1 - (N - index) * 0.02` so earlier items scale down progressively to create a depth effect.
- A smooth-scrolling controller (Lenis) is instantiated and its `raf` loop is driven via `requestAnimationFrame` for consistent scrolling.

## Routing Contract
Routes and their associated page functions:
- `/` → Home page (scroll animations, hero, tools section).
- `/projects` → Projects listing sourced from `projects.json`.
- `/experience` → Experience timeline sourced from `experience.json`.
- `/contact` → Calendly booking page.

Navigation is wrapped by an animated transition HOC that renders page content alongside two overlaying motion layers. Consumers should replicate route-level enter/exit transitions or provide an alternative UX.

## Page Transition Behavior
- Two full-viewport overlays animate on route changes:
  - Top overlay (origin-top) scales Y from 1 to 0 on enter to reveal the page.
  - Bottom overlay (origin-bottom) scales Y from 0 to 1 on exit to cover the page.
- Easing uses `easeIn` for exit cover and `easeOut` for enter reveal; duration is 1 second.
- Pages are rendered beneath/after these overlays to avoid layout shifts.

## Scroll Reset Behavior
- On pathname change, a `useEffect` schedules `window.scrollTo(0, 0)` after a 1s timeout to reset the viewport position after transitions.

## External Services and Libraries
- `@vercel/analytics`: Injected on app render for analytics collection.
- `@vercel/speed-insights/react`: Component rendered in `main` to collect performance metrics.
- `react-calendly`: `InlineWidget` used to embed a full-screen scheduling iframe.
- `framer-motion`: Used for both page transitions and scroll-based transforms on Home/Experience.
- `@studio-freight/lenis`: Used on Experience page to enable smooth scrolling via `raf` loop.

## Styling and Assets
- TailwindCSS utility classes are used widely for layout, color, and typography.
- Custom pattern classes (e.g., `pattern-...`) are referenced across pages; these are assumed to be provided via Tailwind plugins or global CSS.
- Fonts: `src/assets/fonts/castlerocks.otf` and general font families referenced via Tailwind.
- Image assets for projects should be placed under `public/projects/{png,webp}/` using the `image` slug from `projects.json`.
- Additional assets: `public/window.svg`, `public/main-blob.svg`, etc., used by visual sections.

## Assumptions for Re-Implementation
- Consumers can import JSON data or replace with a data provider that returns the same shapes.
- The UI is free to change; maintain only the behaviors above and the data contracts.
- If SSR or different routers are used, replicate the route mapping and transition semantics as needed.

## Known Edge Behaviors
- The Projects page uses `window.innerWidth` at render time to decide an odd-count placeholder; consider responsive hooks for SSR or hydration-safe logic if re-implementing.
- Experience page’s Lenis loop starts on mount; ensure it’s cleaned up or properly integrated in new frameworks.
