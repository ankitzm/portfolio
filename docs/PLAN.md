# Portfolio v4 — Build Plan (decisions locked 10 Sep 2026)

Supersedes conflicting items in `docs/DESIGN.md`. Spec sections not mentioned here still apply.

## Decisions

| Area            | Decision                                                                                                                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Concept         | "Everything Ships" kept, executed fully. Copy and palette unchanged for now.                                                                                                                                                                             |
| Structure       | Home teaser + subpages. Nav: PROJECTS · EXPERIENCE · LET'S TALK. `/dispatches` route stays, hidden from nav until posts exist.                                                                                                                           |
| Motion          | `motion` (Framer Motion, already installed) is the only animation lib. Lenis for scroll smoothing. No GSAP.                                                                                                                                              |
| Route plane     | **Dropped.** No plane, no scroll-drawn route line.                                                                                                                                                                                                       |
| Hero            | Parallax only, no pin. Portrait die-cut stamp (`public/portrait.jpg`, user supplies). Postmark clock: India time + visitor time + offset, pupils track cursor. Click-anywhere postmark imprints. Load choreography only, no preloader, first paint fast. |
| Home projects   | Boarding-pass rows. 2 columns ≥ lg, 1 column below. First 4 from `projects.json`. Screenshot as small perforated stamp on the pass. Full description visible, no click needed. Stub links: site / source. Ticket link to `/projects`.                    |
| `/projects`     | Same passes, all 12.                                                                                                                                                                                                                                     |
| Home experience | Passport spread, **pinned**; scroll flips through 3 latest visas. Desktop: passport horizontal, pages turn left→right. Mobile: passport vertical, pages turn bottom→top. ID page carries skills strip. Link to `/experience`.                            |
| `/experience`   | Same passport, all 7 visas, ID page first.                                                                                                                                                                                                               |
| Booking         | Tear pass → Cal.com (current), polished. No contact form.                                                                                                                                                                                                |
| Dividers        | Torn edges kept + ground color crossfade between sections.                                                                                                                                                                                               |
| Header          | Always sticky; ink/ground adapt to all 4 section grounds.                                                                                                                                                                                                |
| Mobile nav      | Customs-declaration full-screen menu. Bottom tab bar removed.                                                                                                                                                                                            |
| Surprises       | Postmark clock + eyes · click-anywhere postmark · 404 "RETURN TO SENDER" · console ASCII stamp. No border-crossing stamp thuds.                                                                                                                          |
| Perf            | Strict: Lighthouse mobile ≥ 90, LCP < 2 s, CLS 0, fonts preloaded, below-fold motion code-split, no jank on mid phones.                                                                                                                                  |
| Workflow        | Stitch full set first → build section by section → screenshot desktop + mobile → approval → one commit per section on `v4`.                                                                                                                              |

## Build order

0. **Foundation** — window becomes the scroller (airmail frame = fixed overlay), Lenis, ground crossfade, header adapt, customs menu, tab bar removed, dispatches hidden from nav.
1. **Hero** — postcard parallax, portrait stamp, postmark clock + eyes, click postmark.
2. **Projects** — boarding-pass component, home 2-col, `/projects` all 12.
3. **Passport** — pinned page-flip, home (3) and `/experience` (7), skills strip.
4. **Booking + footer** — tear polish, footer.
5. **Finish** — 404, console egg, perf pass, Lighthouse.

## Motion spec per section (Motion + Lenis)

| Section        | Scroll mechanic                                                                                                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero           | `useScroll` progress 0→1 over hero height: postcard `y` −8%, `rotate` −1°→−3°, portrait stamp `y` −14%, headline lines `y` at 3 depths, clock stays. All `transform` only.                                           |
| Section entry  | Ground crossfade: `useScroll` on each section, `useTransform` → CSS var on `<body>`; torn edge rides with section.                                                                                                   |
| Passes         | Staggered rise + settle (spring 100/20), 60 ms; stub perforation "tears" 2 px on hover.                                                                                                                              |
| Passport       | Sticky container, height = pages × 100vh. Progress → page index; each page `rotateY` (desktop) / `rotateX` (mobile) 0→−180° with `useSpring`; visa stamp on each page scales 1.3→1 with 4° settle as the page lands. |
| Booking        | Existing tear; add pass reveal (slide from ground with spring).                                                                                                                                                      |
| Reduced motion | Everything pre-settled; passport becomes a plain list; clock still ticks.                                                                                                                                            |
