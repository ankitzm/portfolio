# Stitch Generation Flow — "Everything Ships"

How to use: in Stitch, paste `docs/stitch/DESIGN.md` first (or attach it as
the project design system), then run these prompts one screen at a time, in
order. Each prompt is self-contained. Generate the MOBILE version of each
screen first (Stitch produces higher quality on mobile), then the web
version, then reconcile.

Screen graph:

```
                    ┌──────────────┐
                    │ 01 HOME      │  hero + recent shipments + contact
                    │  (long page) │
                    └──┬───┬───┬───┘
        nav: PROJECTS  │   │   │  nav: DISPATCHES
      ┌────────────────┘   │   └───────────────┐
      ▼                    ▼                   ▼
┌────────────┐      ┌────────────┐      ┌────────────┐
│ 02 STAMP   │      │ 04 PASSPORT│      │ 05 DISPATCH│
│    SHEET   │      │ (experience│      │    LIST    │
└─────┬──────┘      └────────────┘      └────────────┘
      │ tap a stamp
      ▼
┌────────────┐   any bad URL → ┌────────────┐   mobile ☰ → ┌────────────┐
│ 03 LETTER  │                 │ 06 RETURN  │              │ 07 CUSTOMS │
│  (overlay) │                 │ TO SENDER  │              │  MENU      │
└────────────┘                 └────────────┘              └────────────┘
```

Real content sources (use these values, never lorem):
- Projects: 12 items from `public/data/projects.json` (names: Clarity,
  Jerico, SolLens, Terms-Simplified, Share-on-Network, Safe Deploy, Open
  Funds, Type It All, Name It, Solana Wedding, NFT Emporium, NASA App).
- Experience: 7 entries from `public/data/experience.json` (Freelancing,
  Stealth Company web3 game, Router Protocol, ThirdFi, BlockTrain, API
  Hacks Hackathon, PrepBytes).
- Socials: github.com/ankitzm · x.com/ankitzm · medium.com/@0xblocktrain.
- Booking: calendly.com/ankitzm/meet.

---

## Screen 01 — Home ("the franking desk")

**Prompt (web):**

> A portfolio home page for a software developer, styled as a postal
> franking desk on a warm cream paper ground (#F1ECDF). The whole page sits
> in an inset panel with a thin red-and-blue diagonal airmail-stripe edge.
> Top bar: "ANKIT SINGH" left and nav labels "PROJECTS · EXPERIENCE ·
> DISPATCHES · LET'S TALK" right, all in Courier Prime uppercase 12px,
> separated from the page by a 1px hairline.
> Hero, asymmetric: left 60% is a large cream postcard tilted −1°, carrying
> the headline "SHIPS SOFTWARE, END TO END." in very heavy condensed
> Bricolage Grotesque uppercase across three stacked lines (96px), with a
> Courier Prime subline "web3 products, SDKs & interfaces · est. 2021". A
> small portrait photo die-cut as a postage stamp with perforated edges
> sits on the postcard's top-left corner. Right 40% column: a circular
> postmark showing today's real date and a ticking time readout with two
> small eyes inside it, and below it a red rubber stamp reading "OPEN FOR
> WORK", rotated 5°, inky and slightly uneven. One handwritten Caveat note
> near the postmark: "since 2021, still stamping". Along the postcard's
> bottom edge a Courier Prime legend indexes the hero's own objects:
> "(01) POSTCARD (02) POSTMARK (03) STAMP (04) ROUTE".
> A dashed route line starts under the postcard and runs down off-screen
> with a small paper-plane marker on it.
> Below the hero: section "RECENT SHIPMENTS" — four postage stamps in a
> row, each a perforated stamp containing a real project screenshot, the
> project name in condensed caps (CLARITY, JERICO, SOLLENS, SAFE DEPLOY),
> two Courier Prime tags, and corner denominations №01–№04, each stamp at
> a slight alternating rotation. A ticket-stub link "SEE ALL 12 → THE
> STAMP SHEET" closes the section.
> The page ends with the contact section from screen 05.

**Prompt (mobile, 390px):** same world, single column: top bar with "AS"
monogram and a hamburger; postmark clock small at top right; postcard
full-width with 44px headline; OPEN FOR WORK stamp below the postcard, not
overlapping; route line continues as a dashed left rail; recent shipments
as a 2-column stamp grid; perforations must remain visible.

## Screen 02 — Projects ("the stamp sheet")

**Prompt (web):**

> A projects page as a philatelic stamp sheet on a sky-blue ground
> (#A9D6EC). Page title "SHIPPED WORK" in heavy condensed uppercase
> (56px), right-aligned metadata "12 STAMPS ON FILE" in Courier Prime.
> Near the title, a round border-crossing rubber stamp in red ink:
> "ENTERING: SHIPPED WORK · 12 ITEMS".
> A 3-column grid of twelve postage stamps, each with fully perforated
> scalloped edges, a 2px white inner margin, a real project screenshot,
> the project name in condensed caps, two technology tags in Courier
> Prime 11px, and a corner denomination №01 through №12. Stamps tilt
> alternately between −1.5° and +1.5° with one soft paper shadow each.
> Names in order: CLARITY, JERICO, SOLLENS, TERMS-SIMPLIFIED,
> SHARE-ON-NETWORK, SAFE DEPLOY, OPEN FUNDS, TYPE IT ALL, NAME IT,
> SOLANA WEDDING, NFT EMPORIUM, NASA APP.
> One stamp (№03) is shown in hover state: lifted, straightened, with
> wavy postmark cancellation lines sweeping across its corner.
> The dashed route line with paper plane passes down the left gutter.

**Prompt (mobile):** 2-column stamp grid, perforations intact, rotations
±0.8°, denomination and name still legible; route line as left rail.

## Screen 03 — Project detail ("the letter opens")

**Prompt (web overlay):**

> A modal overlay: an opened letter on top of the dimmed sky-blue stamp
> sheet. The letter is a cream sheet with a 2px radius, one airmail-stripe
> edge on its left side, and a small version of the project's stamp
> affixed at top right with a postmark cancelling it. Content for the
> project "CLARITY": title in condensed caps, one-line Courier Prime
> subtitle "Turn ChatGPT conversations into structured insights and
> interactive mind maps.", a body paragraph in Hanken Grotesk (65ch), a
> row of technology tags as small bordered mono chips (React, TypeScript,
> AI, OpenRouter, Puppeteer, React Flow, Vite), and two ticket-stub
> actions side by side: "READ SOURCE" (outlined) and "VISIT SITE"
> (Airmail Blue fill) — each stub with a route line "AS ——— YOU" and a
> small barcode. Close affordance: a Courier Prime "RETURN TO SHEET ×"
> label top-left, no icon-only close button.

**Prompt (mobile):** bottom sheet sliding up with a perforated top edge,
same letter content stacked; action stubs full-width.

## Screen 04 — Experience ("the passport")

**Prompt (web):**

> An experience page as a passport interior on deep navy (#1E2A4A), all
> text in warm paper cream (#F1ECDF). Title "PASSPORT" in condensed caps
> with Courier Prime metadata "REPUBLIC OF SHIPPED SOFTWARE".
> First, an ID page block styled as a document form with dotted rules:
> "1. FORENAME — ANKIT / 2. SURNAME — SINGH / 3. TRADE — SOFTWARE
> DEVELOPER / 4. ISSUED — 2021 · VALID INDEFINITELY", plus a round blue
> rubber stamp reading "CERTIFIED · FULL-STACK".
> Below, seven visa blocks in a single column, newest first, connected by
> a thin vertical timeline rule. Each visa: 1.5px border in its ink color,
> company name in condensed caps left, entry–exit dates right in Courier
> Prime (e.g. "APR '24 — MAR '25"), role in italic, three to five bullet
> lines in Hanken Grotesk, and skill chips as tiny bordered mono tags.
> Entries and ink colors: FREELANCING (cream), STEALTH COMPANY · WEB3
> GAME (cream), ROUTER PROTOCOL (soft red #E86A50), THIRDFI (soft purple
> #A78BDB), BLOCKTRAIN (soft orange #E8A050), API HACKS HACKATHON (soft
> purple), PREPBYTES (soft red).
> This page is the calmest in the site: no extra objects beyond the ID
> form, the visas, and the route line exiting at the bottom.

**Prompt (mobile):** ID form collapses to four stacked lines; visa blocks
full-width; dates move under the company name; chips wrap.

## Screen 05 — Contact ("send something back")

**Prompt (web, final section of Home):**

> A contact section on kraft paper (#D9B98A), introduced by a round
> border stamp "FINAL DESTINATION". Main object: a large postcard,
> address side up, split by a vertical rule. Left side: a form written on
> the card — Courier Prime labels above dotted writing lines: "FROM"
> (name input), "MESSAGE" (three dotted lines as a textarea), and the
> printed address "TO: ANKIT SINGH, SOMEWHERE ON THE INTERNET". A
> handwritten Caveat note top-left: "yes, this actually sends". Right
> side: an empty dashed stamp outline labeled "AFFIX STAMP" in mono, a
> small pair of watching eyes below it, and a primary button "POST IT"
> in Airmail Blue that shows a disabled state with mono hint "POSTAGE
> REQUIRED" until the stamp is affixed.
> Below the postcard, separated by a rule labeled "OR SKIP THE MAIL": a
> boarding-pass appointment ticket — route "AS ——— YOU", label "BOOK A
> SESSION · 30 MIN · CALENDLY" in Courier Prime, a barcode block, and a
> perforated tear-off right edge labeled "TEAR HERE".
> Footer rule at the very bottom: "GITHUB / X / MEDIUM · © 2026" in
> Courier Prime 11px.

**Prompt (mobile):** postcard stacks — stamp outline and eyes above the
form; POST IT full-width; ticket full-width below; footer stacks left.

## Screen 06 — 404 ("return to sender")

**Prompt (one screen, both breakpoints):**

> A 404 page on cream (#F1ECDF): a single envelope centered-left at a
> slight tilt, its edges in the airmail stripe, stamped twice in red ink:
> a large "RETURN TO SENDER" and a smaller "ADDRESSEE UNKNOWN · 404".
> One Courier Prime line: "this address doesn't exist on this route." and
> a single outlined ticket-stub link "BACK TO THE DESK". Nothing else.

## Screen 07 — Mobile menu ("customs declaration")

**Prompt (mobile only):**

> A full-screen mobile menu styled as a customs declaration form on cream:
> title "CUSTOMS DECLARATION" in condensed caps, a Courier Prime form
> list where each nav item is a numbered declaration line with a checkbox:
> "1 ☐ PROJECTS — 12 items to declare / 2 ☐ EXPERIENCE — passport on
> file / 3 ☐ DISPATCHES — outbound letters / 4 ☐ LET'S TALK — postage
> paid". Tapping a line checks its box before navigating. Close label
> "STAMP & CLOSE ×" as a red rubber stamp at the bottom.

## Screen 08 — Dispatches ("the blog")

**Prompt (web):**

> A minimal blog index on a cool paper ground (#EDEAE3), title
> "DISPATCHES" in condensed caps with Courier Prime metadata "LETTERS
> SENT OUTWARD". A single-column list where each article row is: a small
> circular postmark carrying the date, the article title in Hanken
> Grotesk 500, a dotted leader line, and reading time as "6 MIN" in
> Courier Prime. Rows separated by hairlines, generous 28px padding.
> Include the empty state below the list area: an outlined open envelope
> and the line "NOTHING IN THE OUTBOX YET — the first dispatch is being
> typed." in Courier Prime.

**Prompt (mobile):** same list, postmark shrinks, title wraps to two
lines max, reading time under the title.

---

## Reconciliation checklist (after generating all screens)

1. Grounds match section tokens exactly; no drifted hexes.
2. Courier Prime is on every label, date, and denomination — no screen
   where Stitch swapped it for a default sans.
3. Perforations present at every breakpoint (the mobile stamp grid is the
   usual casualty).
4. Stamp Red appears only on imprints; every interactive element is blue.
5. Route line present on 01, 02, 04; absent on 03, 06, 07.
6. No emojis, chevrons, "scroll to explore", or invented stats anywhere.
7. Export each approved screen; extraction into code happens against
   `docs/DESIGN.md` §7 (implementation notes), not against Stitch HTML.
