# Design System: Ankit Singh — "Everything Ships" Portfolio

Single source of truth for generating every screen of this portfolio in
Google Stitch. Paste this document before any screen prompt from FLOW.md.

## 1. Visual Theme & Atmosphere

A postal-system world for a developer who ships software: postage stamps,
postcards, passports, rubber stamps, and airmail edges — typeset with Swiss
discipline. The objects are physical and playful; the typography and
spacing around them are strict and quiet. Think: a meticulous franking desk,
not a scrapbook.

- **Density:** Art-gallery airy (3/10). Objects get room; one focal object
  per zone.
- **Variance:** Offset asymmetric (7/10). Postcards and stamps sit at
  slight rotations (−2° to +2°) on an otherwise rigid grid. Never centered
  hero composition.
- **Motion:** Fluid, physical (6/10). Things stamp down, lift, and settle
  like paper — never float like glass.

Every section of the site is a "country" with its own paper ground color.
Crossing into a section switches the background. The recurring brand mark
is the airmail stripe: a repeating diagonal pattern of vermilion and
ultramarine bars on cream, used only as an edge treatment.

## 2. Color Palette & Roles

Grounds (one per section, never mixed within a section):

- **Counter Paper** (#F1ECDF) — Home/hero background. Warm document cream.
- **Airmail Sky** (#A9D6EC) — Projects section background.
- **Passport Navy** (#1E2A4A) — Experience section background (dark
  section; all text switches to Counter Paper color).
- **Kraft Envelope** (#D9B98A) — Contact/booking section background.
- **Newsprint** (#EDEAE3) — Blog ("Dispatches") background.

Ink and accents:

- **Document Ink** (#1C1B17) — All text on light grounds. Never #000000.
- **Paper Ink** (#F1ECDF) — All text on Passport Navy.
- **Airmail Blue** (#2B4ACB) — THE interactive accent: links, active nav,
  focus rings, primary button fill. Saturation kept matte, no glow.
- **Stamp Red** (#D94A2B) — Physical-ink only: rubber-stamp imprints,
  cancellation marks, the red bars of the airmail stripe. NEVER used for
  buttons, links, or UI states. If an element is interactive, it is blue;
  if it is a stamped imprint, it is red.
- **Faded Ink** (#6E6A5E) — Secondary text, metadata on light grounds.
- **Rule Line** (rgba(28,27,23,0.16)) — 1px hairlines, dotted form rules.

The airmail stripe (alternating #D94A2B and #2B4ACB diagonal bars with
cream gaps) is the only place red and blue touch. Used at: outer page
frame edge, envelope edges, section divider strips. Max 6px thick.

## 3. Typography Rules

- **Display: Bricolage Grotesque** (Condensed, weights 700–800) —
  Headlines and section titles, uppercase, tight tracking (−2%), line
  height 0.95. Hierarchy comes from weight and ink color, not size
  screaming. Desktop display 96px / mobile 44px, section heads 56/32.
- **Body: Hanken Grotesk** (400, 500) — Paragraphs and descriptions.
  Relaxed leading (1.6), max 65 characters per line, 16px/15px.
- **Document Mono: Courier Prime** (400, 700) — The postal voice. ALL
  document furniture: nav labels, dates, form fields, stamp captions,
  denominations, addresses, metadata, barcode numbers. 11–12px, uppercase
  for labels. Numbers always in this mono.
- **Annotation: Caveat** — Handwritten margin notes only. Hard cap: three
  per screen, 16–18px, Faded Ink color.
- **Banned:** Inter, Roboto, Arial, system-ui as a visible face, all
  generic serifs. No font outside these four.

## 4. Component Stylings

- **Stamp (project card):** A postage stamp: perforated edge all the way
  around (scalloped die-cut, ~8px pitch), 2px inner white margin, then the
  project screenshot. Below the image inside the stamp: project name in
  Bricolage condensed caps, two tags in Courier Prime, corner denomination
  "№01"–"№12" (real index numbers only, never invented prices). Whole
  stamp sits at a slight rotation; soft single shadow (0 12px 32px
  rgba(28,27,23,0.14)). Hover: lifts 6px, straightens to 0°, wavy
  cancellation lines sweep over the corner. Active: presses down 1px.
- **Rubber stamp (status/label):** Round or boxed imprint in Stamp Red at
  85% opacity, multiply blend, 1.5px irregular border, rotated −4° to +6°,
  slightly uneven ink texture. Text inside in Courier Prime bold caps.
  Used for: OPEN FOR WORK, CERTIFIED, section border-crossings, 404.
- **Postcard (container):** Cream card, 2px radius (cut paper, not an
  app), thin Rule Line border, dotted writing lines where content goes,
  optional stamp corner. Single soft shadow. Rotation −1° to +1°.
- **Ticket (link/CTA row):** Boarding-pass stub: route line "AS ——— YOU"
  in Courier Prime, a barcode block, one perforated tear edge. Hover:
  1° tilt.
- **Buttons:** Flat Airmail Blue fill with Paper Ink text, 2px radius,
  Courier Prime caps label; tactile press (translate down 1px) on active.
  Secondary: 1.5px Document Ink outline, transparent fill. No glows, no
  gradients. Maximum one primary button per zone.
- **Inputs (contact postcard):** Written-on-postcard style: label in
  Courier Prime caps above, value written on a dotted Rule Line, focus
  swaps the dotted rule to solid Airmail Blue. Error: one line below in
  Stamp Red, Courier Prime, stating what to fix.
- **Visa block (experience entry):** Bordered rectangle on Passport Navy,
  1.5px border in the entry's ink color, header row: company name
  (Bricolage caps) left, entry–exit dates (Courier Prime) right, bullets
  in Hanken Grotesk, skill chips as tiny bordered mono tags. Ink colors
  (from the data's color field, tinted to read on navy): black→#F1ECDF,
  red→#E86A50, purple→#A78BDB, orange→#E8A050.
- **Loaders:** Skeleton blocks in ground color darkened 4%, matching exact
  layout. No spinners.
- **Empty state (Dispatches):** A composed empty outbox: one open
  envelope illustration outline + line "NOTHING IN THE OUTBOX YET — the
  first dispatch is being typed." in Courier Prime.

## 5. Layout Principles

- Whole site sits inside an inset panel: 10px margin from viewport edge,
  the margin filled with the ground color, panel edged by a 3px airmail
  stripe at 50% opacity. The site is one envelope.
- CSS-grid composition, max-width 1400px centered, generous gutters
  (desktop 56px side padding, mobile 20px).
- Hero is asymmetric: postcard object occupies the left 60%, postmark/
  stamp column the right 40%. Never a centered stack.
- Stamp sheet: 3 columns desktop, 2 columns mobile (perforations must
  survive mobile), row gap 40px, per-stamp rotation alternating.
- No 3-equal-cards feature rows anywhere. Sections alternate: object-led
  (hero, contact) / grid-led (stamps) / list-led (visas, dispatches).
- No overlapping text on images; objects may overlap each other's shadows
  only.
- Full-height zones use min-h-[100dvh]; single column below 768px; no
  horizontal scroll ever; touch targets ≥44px.

## 6. Motion & Interaction

- Physics: paper, not glass. Spring stiffness 100, damping 20. Nothing
  linear.
- Signature: a dashed airmail route line that draws downward with scroll,
  a small paper-plane marker traveling along it; at each section boundary
  the ground color crossfades (~600ms) and a border-crossing rubber stamp
  thuds in once (scale 1.4→1 with 5° settle, 350ms).
- Load order (hero): postcard headline lines mask up staggered → postmark
  clock fades in → OPEN FOR WORK stamp slams last.
- Reveals: stamps and visa blocks rise 24px with rotation settling,
  60ms stagger cascade — never mounted instantly.
- Perpetual micro-motion (subtle, one per screen max): the postmark clock
  ticks; the plane drifts ±2px while idle.
- All animation via transform/opacity only. Reduced motion: everything
  pre-settled and static, color switches instant, clock still ticks.

## 7. Anti-Patterns (Banned)

- No emojis anywhere in UI. Icons are drawn glyphs (paper plane, barcode,
  perforation), not emoji characters.
- No Inter, no generic serifs, no pure #000000.
- No purple/neon gradients, no outer glows, no glassmorphism.
- No centered hero, no 3-equal-card rows, no dashboard chrome.
- No custom mouse cursors.
- No "Scroll to explore", bouncing chevrons, or scroll arrows — the route
  line is the only scroll affordance.
- No AI copy clichés: elevate, seamless, unleash, next-gen, transformative.
- No fake data: project numbers are real indices (№01–№12), dates come
  from the actual JSON, no invented stats or prices.
- No stock-photo placeholders: project images are the real screenshots
  (public/projects/webp/*.webp); the portrait is a real photo.
- Stamp Red never appears on an interactive element.
- Caveat handwriting: max three notes per screen.
