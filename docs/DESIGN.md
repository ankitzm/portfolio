# Portfolio v4 — Design Spec: "EVERYTHING SHIPS"

Design only. No code in this pass.

---

## 1. Concept

**Ankit ships software. The portfolio is the postal system it moves through.**

Every reference you picked lives in postal/travel ephemera: postcards, stamp
perforations, boarding passes, passports, rubber stamps, airmail stripes.
For a developer this is not a costume — "shipping" is the job. Deploys,
npm packages (Safe Deploy literally is one), releases, dispatches. The
metaphor encodes what you do, so every section maps to a real postal object:

| Section | Postal object | Why it fits |
|---|---|---|
| Hero | Postal counter / franking desk | Where things get stamped and sent |
| Projects | Sheet of postage stamps | 12 shipped things, collected |
| Experience | Passport with visa stamps | Where you've worked = where you've been |
| Contact / book | Postcard + appointment ticket | You write to him, he stamps a slot |
| Blog | Dispatches (aerogrammes) | Letters sent out into the world |

**Signature element (the one memorable thing):** the **airmail route** — a
dashed line with a small paper plane that travels the full page as you
scroll. Each section is a "country": when the plane crosses a section
boundary, the background color switches (the eyeballs.co mechanic, but now
it *means* something — a border crossing) and a rubber border-stamp thuds in
at the crossing point. One device unifies: scroll animation, color
switching, stamps, travel narrative.

**The stated risk:** committing the entire site to one metaphor. Kept from
becoming a theme park by strict discipline everywhere else — one paper/ink
palette, mono typography for all document text, generous whitespace, flat
surfaces. The objects are themed; the typesetting is Swiss.

---

## 2. What was extracted from the references (browsed live, 31 Aug 2026)

| Site | Stolen (adapted) | Left behind |
|---|---|---|
| eyeballs.co | Section bg color-switch on scroll; inset rounded page panel; condensed heavy display type; cursor-tracking eye pupils (already built in v4) | Figtree; agency tone |
| yashf.in | Postcard hero object; boarding-pass project rows (perforation notch, route line "YF——SK", barcode); envelope testimonial; torn-notepad "why me"; rotating photo-in-postcard | Cream-only palette; his mobile version drops the ticket metaphor — we keep perforations on mobile |
| Kena Tatamiya (readymag) | True stamp perforation die-cut on images; giant grotesk + single electric-blue accent; Swiss restraint | Single-screen structure |
| riyamahajan (framer) | Desk-scene hero with numbered object legend "(01) IPAD / (02) CAMERA…"; **live date/time** on a device; mascot-scale charm | Pastel kawaii palette; generic 2-col work cards |
| ryanwalter.work | Interactive prop jokes (checklist "curious ✓ / learning ✓ / hired ☐", PULL drawer ribbon, CAUTION RARE TALENT sign); projects as paper sheets with washi tape; sound toggle | Maximal clutter; grid-paper bg |
| nishtharikhi (framer) | Pinned scenic scroll where copy swaps in chapters; atmosphere as hero | Illustrated Ghibli sky (wrong register for a dev) |
| Himani Bindal | **Passport hero**: ID form fields, CERTIFIED round stamp, personality told as a stamp collection; mustard ground + orange passport edge | Whole-site-inside-one-object rigidity |

Reference screenshots: `.playwright-cli/page-2026-08-31T10-*.png`

---

## 3. Tokens

### Color — "paper & ink"

Grounds (one per country/section; switched by the route, crossfade ~600ms):

| Token | Hex | Used for |
|---|---|---|
| `paper` | `#F1ECDF` | Hero — counter paper |
| `airmail-sky` | `#A9D6EC` | Projects — the stamp sheet sits on sky |
| `passport-navy` | `#1E2A4A` | Experience — Indian passport navy (dark section, light ink) |
| `kraft` | `#D9B98A` | Contact — kraft envelope |
| `newsprint` | `#EDEAE3` | Blog — slightly cooler than `paper` |

Inks & accents:

| Token | Hex | Used for |
|---|---|---|
| `ink` | `#1C1B17` | Text on light grounds |
| `ink-light` | `#F1ECDF` | Text on navy |
| `airmail-red` | `#D94A2B` | Accent A — airmail stripe, stamps, active states |
| `airmail-blue` | `#2B4ACB` | Accent B — airmail stripe, links, rubber stamps |
| `stamp-ink` | `#B03A2E` at 85%, multiply | Rubber-stamp imprints, slightly rotated, textured |

Rules: red and blue always appear as a *pair* (the airmail edge is the only
place both touch); one accent per element otherwise. The diagonal
red/blue airmail stripe border is the recurring brand mark — used on the
page frame edge, envelope edges, and section dividers. Never gradients.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (condensed width, 700–800) | Heads, hero. Tight tracking, uppercase for section titles. Condensed = eyeballs energy without copying Figtree |
| Body | **Hanken Grotesk** (400/500) | Paragraphs, descriptions. Warm, not yet an AI default |
| Document | **Courier Prime** (400/700) | ALL postal-document text: labels, dates, addresses, form fields, stamp captions, nav. The typewriter is the postal voice |
| Annotation | **Caveat** | Hand-written margin notes ONLY — max ~3 per page |

Scale (desktop / mobile): display 96/44 · h2 56/32 · h3 24/20 · body 16/15 ·
mono-label 11–12 both. Line-height: display 0.95, body 1.6.

### Surfaces

- Page frame: thin inset panel like eyeballs (8–12px margin), edged with the
  airmail stripe at 50% opacity — the whole site is one envelope.
- Paper texture: very subtle noise (≤3% opacity) on light grounds only.
- Shadows: single soft drop for "physical" objects (stamps, postcards,
  tickets) `0 12px 32px rgb(28 27 23 / 0.14)`; nothing else casts.
- Radius: 2px on paper objects (cut paper, not apps); perforated edges via
  `mask-image: radial-gradient` repeat — the perforation IS the border
  treatment, at every breakpoint (Yash's mobile lost it; ours won't).

---

## 4. Pages

### 4.1 Home — hero: "the franking desk"

Web (top of a long scroll; sections below are countries):

```
┌──────────────────────────────────────────────────────────────┐
│ ANKIT SINGH ·· mono nav: PROJECTS EXPERIENCE DISPATCHES  ────│  courier, thin rule
│                                                              │
│      ┌────────────────────────────────┐    ⊚ postmark        │
│      │  POSTCARD (slight rotation)    │   (live date+time,   │
│      │                                │    eyes track cursor)│
│  ┌───┤  SHIPS                         │                      │
│  │photo  SOFTWARE,                    │   [OPEN FOR WORK]    │  ← rubber stamp,
│  │stamp  END TO END.                  │    thuds on load     │    slams down 0.4s
│  └───┤                                │                      │
│      │  mono: web3 products, SDKs &   │   ✎ caveat note:     │
│      │  interfaces · est. 2021        │   "since 2021,       │
│      └───────────────╥────────────────┘    still stamping"   │
│                      ║ dashed route starts here ✈            │
│   (01) POSTCARD (02) POSTMARK (03) STAMP (04) ROUTE  ────────│  courier legend
└──────────────────────────────────────────────────────────────┘
```

- Headline on the postcard in condensed display caps, 3 staggered mask-up
  lines (keep v4's load choreography).
- **Postmark clock**: circular postmark, real current date + ticking time
  (Riya's live clock), the existing eye pupils sit inside it tracking the
  cursor — the footer eyes move here.
- **Photo stamp**: Ankit photo die-cut as a stamp, denomination "EST. 2021".
  Photo swaps on hover (Yash's rotating postcard photo).
- Numbered legend along the bottom names the hero's own objects — Riya's
  device, and it earns its numbering (it indexes real objects on screen).
- **Surprise: click anywhere on the paper → a small postmark imprints at
  the cursor** (ink spread ~200ms, stays for the session, max ~20). Cheap,
  silent, delightful.
- Below hero: "RECENT SHIPMENTS" — 4 featured stamps (from projects.json,
  first 4) + link to the full sheet. Then the contact section (4.4) closes
  the home page. Experience and Blog are their own pages.

Mobile (390):

```
┌───────────────────┐
│ AS ··········· ☰ │  menu = "customs declaration" full-screen sheet
│  ⊚ postmark clock │
│ ┌───────────────┐ │
│ │ POSTCARD      │ │  postcard fills width, rotation 0°
│ │ SHIPS         │ │  headline 44px
│ │ SOFTWARE,     │ │
│ │ END TO END.   │ │
│ │ mono subline  │ │
│ └───────╥───────┘ │
│ [OPEN FOR WORK]   │  stamp below card, not overlapped
│         ║ route ✈ │  route continues as left rail
└───────────────────┘
```

### 4.2 Projects — "the stamp sheet" (`/projects`)

Ground: `airmail-sky`. The route plane flies in, a border stamp thuds:
`◉ ENTERING: SHIPPED WORK · 12 ITEMS`.

```
┌──────────────────────────────────────────────────────────────┐
│ SHIPPED WORK ······················ mono: 12 STAMPS ON FILE  │
│                                                              │
│  ╔◦◦◦◦◦◦◦◦◦◦╗  ╔◦◦◦◦◦◦◦◦◦◦╗  ╔◦◦◦◦◦◦◦◦◦◦╗   perforated     │
│  ◦ screenshot ◦  ◦ screenshot ◦  ◦ screenshot ◦   edges all   │
│  ◦            ◦  ◦            ◦  ◦            ◦   around      │
│  ◦ CLARITY    ◦  ◦ JERICO     ◦  ◦ SOLLENS    ◦               │
│  ◦ mono tags  ◦  ◦ mono tags  ◦  ◦ mono tags  ◦               │
│  ╚◦◦ №01 ◦◦◦◦◦╝  ╚◦◦ №02 ◦◦◦◦╝  ╚◦◦ №03 ◦◦◦◦◦╝  ← denominations│
│         (3-col, slight per-stamp rotation −1.5°…+1.5°)        │
└──────────────────────────────────────────────────────────────┘
```

- Each stamp: webp screenshot, name in condensed caps, first 2 tags in
  courier, corner denomination `№01`–`№12` (real index — no fake prices).
- Hover: stamp lifts 6px, straightens to 0°, wavy cancellation lines sweep
  across (the postmark cancel), cursor shows a tiny ink pad.
- Click → **the envelope opens**: expanded view styled as a letter —
  full description (projects.json `description`), tag list, links as two
  ticket stubs `[VISIT SITE ✈]` `[READ SOURCE ⌘]` (falls back to GitHub
  when `website` is empty, as the data layer already does).
- Scroll-in: stamps rise with stagger, rotation settling — CSS
  `animation-timeline: view()` like current v4 reveals.
- Filter: none. 12 items don't need one (v3.5's filter bar stays dead).

Mobile: 2-col grid, perforations intact, rotation ±0.8°, tap opens a
bottom-sheet letter with a perforated top edge.

### 4.3 Experience — "the passport" (`/experience`)

Ground: `passport-navy`, light ink. Border stamp: `◉ ENTERING: WORK HISTORY`.

```
┌──────────────────────────────────────────────────────────────┐
│ PASSPORT ················ mono: REPUBLIC OF SHIPPED SOFTWARE │
│                                                              │
│ ┌─ ID PAGE (first spread) ───────────────────────────────┐   │
│ │ 1. FORENAME  ANKIT        ⊚ CERTIFIED: FULL-STACK      │   │  courier form,
│ │ 2. SURNAME   SINGH           (round rubber stamp)      │   │  dotted rules
│ │ 3. TRADE     SOFTWARE DEVELOPER                        │   │
│ │ 4. ISSUED    2021 · valid indefinitely                 │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ ┌─ VISA №7 ── ROUTER PROTOCOL ──────────── APR'24—MAR'25 ┐   │  ← visa block,
│ │ FULL STACK DEVELOPER          (ink color: red)          │   │    ink color from
│ │ — bullets in body face, links underlined               │   │    data `color`
│ │ mono chips: NESTJS · POSTGRES · WALLETS · WEB3 UX      │   │    field
│ └────────────────────────────────────────────────────────┘   │
│   …7 visa blocks, newest first, timeline rule linking them   │
└──────────────────────────────────────────────────────────────┘
```

- **The unused `color` field in experience.json finally works**: it becomes
  each visa's stamp-ink color (black/red/purple/orange → four ink tokens
  tinted for navy ground). Data already supports the design.
- Entry/exit dates set in courier, right-aligned like passport stamps.
- Markdown links in bullets stay real anchors (v4 parser).
- Clean = this page gets the least decoration: ID page + visa blocks +
  thin timeline rule. Everything from the JSON, nothing else.
- Mobile: single column, visa blocks full-width, ID page collapses to a
  4-line form.

### 4.4 Contact / book — "send something back" (home page, last section)

Ground: `kraft`. Border stamp: `◉ FINAL DESTINATION`.

```
┌──────────────────────────────────────────────────────────────┐
│  ┌ POSTCARD (address side) ────────────┬─────────────┐       │
│  │ ✎ caveat: "yes, this actually sends"│  ┌────────┐ │       │
│  │                                     │  │ STAMP  │ │  ← click to affix:
│  │  FROM: ____________ (input, dotted) │  │ affix  │ │    stamp rotates on,
│  │  ─────────────────────────────      │  └────────┘ │    postmark cancels it,
│  │  MESSAGE: ________________________  │   ⊚ eyes    │    THEN send enables
│  │  ________________________ (textarea)│   watching  │
│  │                                     │             │
│  │  TO: ANKIT SINGH,                   │ [POST IT →] │  → mailto with body
│  │      SOMEWHERE ON THE INTERNET      │             │
│  └─────────────────────────────────────┴─────────────┘       │
│                                                              │
│  ── or skip the mail ──────────────────────────────────────  │
│  ┌ APPOINTMENT TICKET ─────────────────────────────────┐     │
│  │ AS ───────────────────────────── YOU   ▐barcode▌    │     │  boarding-pass
│  │ BOOK A SESSION · 30 MIN · CALENDLY     [TEAR HERE ✂]│     │  stub (Yash),
│  └─────────────────────────────────────────────────────┘     │  perforated right
│  footer rule: GITHUB / X / MEDIUM · © 2026 · mono            │  edge tears off
└──────────────────────────────────────────────────────────────┘
```

- **Affixing the stamp is the fun gate**: send button stays disabled with
  mono hint `POSTAGE REQUIRED` until the stamp is clicked on. One-click,
  playful, not annoying.
- "POST IT" = `mailto:` with the message prefilled — no backend this pass.
- Ticket = Calendly link (calendly.com/ankitzm/meet). Hover: stub tilts and
  perforation "tears" 2px.
- The cursor-tracking eyes live here too — "watching the mail".
- Mobile: postcard stacks (stamp above form), ticket full-width.

### 4.5 Blog — "dispatches" (`/dispatches`)

Ground: `newsprint`. Little page, list only:

```
┌──────────────────────────────────────────────┐
│ DISPATCHES ····· mono: LETTERS SENT OUTWARD  │
│                                              │
│ ⊚ 12 MAR '26 ─ WHY I STOPPED USING X ─ 6 MIN │  ← each row: date as
│ ⊚ 04 JAN '26 ─ SHIPPING SOLO ──────── 4 MIN │    postmark, reading
│ ⊚ 18 NOV '25 ─ ROUTER LESSONS ─────── 9 MIN │    time as "postage"
│                                              │
│ empty state: "NOTHING IN THE OUTBOX YET —    │
│  first dispatch is being typed."             │
└──────────────────────────────────────────────┘
```

- Data: new `public/data/posts.json` — `{ title, date, url, minutes }` —
  same pattern as projects/experience; external `url` (Medium etc.) or
  internal slug later. Row hover: postmark ink spreads slightly.
- Mobile: same list, smaller.

---

## 5. Motion spec

| Moment | Behavior | Mechanism |
|---|---|---|
| Page load | Postcard lines mask-up (keep v4 choreography); then OPEN FOR WORK stamp slams: scale 1.4→1, 5° settle, 350ms, ink-bleed radial | CSS keyframes |
| Route / signature | Dashed line draws with scroll, plane translates + rotates along it | `animation-timeline: scroll()`, offset-path; falls back to static dashed line |
| Border crossing | Ground color crossfades ~600ms; border stamp thuds in once per section entry | View-timeline threshold + one-shot class |
| Stamp reveals | Rise 24px + rotation settle, 60ms stagger | `animation-timeline: view()` (already the v4 pattern) |
| Stamp hover | Lift, straighten, cancellation lines sweep | transform + masked pseudo-element |
| Postmark clock | Time ticks each second; pupils track cursor | existing CursorEffects, extended |
| Click-postmark | Imprint at cursor, 200ms ink spread, persists for session | tiny client component |
| Reduced motion | Route static, stamps pre-settled, no thuds, color switch instant, clock still ticks | `prefers-reduced-motion` gates everything |

Sound: none. (Ryan has a sound toggle; a thud sample is tempting — cut. One
accessory removed.)

## 6. Surprise inventory (small, quiet, findable)

1. Click-anywhere postmarks on hero paper.
2. Live postmark clock with cursor-tracking pupils.
3. Hero photo-stamp swaps photo on hover.
4. Postage-required gate on the contact postcard.
5. Ticket stub "tears" on hover.
6. Console easter egg: ASCII stamp + `mono: this site was hand-cancelled`.
7. 404 page = RETURN TO SENDER, envelope stamped `ADDRESSEE UNKNOWN`.

Hard cap: nothing animates that the user didn't cause, except the route
plane and the one-per-section border stamp.

## 7. Implementation notes (for the next pass — not now)

- Structure survives: current v4 components map 1:1 (header, hero,
  projects, experience, footer→contact, + new dispatches page). Data layer
  untouched; add `posts.json` reader + `color`→ink-token map.
- Fonts via `next/font/google`: Bricolage Grotesque, Hanken Grotesk,
  Courier Prime, Caveat.
- Perforation = CSS mask, one utility class; airmail stripe = one
  `repeating-linear-gradient` utility.
- Route plane is the only new "hard" piece: `offset-path` + scroll
  timeline, with graceful static fallback — build it last.
- Images: keep webp screenshots; photo-stamp needs one square portrait
  added to `public/`.

## 8. Open questions

1. Blog source — Medium links only for now, or internal MDX later?
   (Spec assumes external links in `posts.json`.)
2. Contact email — v4 uses `hello@ankitsingh.xyz`; confirm it's real
   before wiring `mailto:`.
3. Portrait photo for the hero photo-stamp — need one from you.
4. "REPUBLIC OF SHIPPED SOFTWARE" / "SOMEWHERE ON THE INTERNET" — copy
   direction OK, or dial the whimsy down a notch?
