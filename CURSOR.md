# Portfolio Website - Technical Documentation

## Overview

This is a **Next.js 15.5.3** portfolio website built with the **App Router** architecture, featuring modern animations, a custom design system, and a minimalist UI. The project is in active development (version 0.1.0) on branch `v3.5`.

### Tech Stack

- **Framework**: Next.js 15.5.3 (with Turbopack enabled)
- **React**: 19.1.0
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS 4.x with custom theme
- **Animations**: Framer Motion 12.23.24
- **Fonts**: Geist Sans & Geist Mono (Google Fonts via next/font)
- **Linting/Formatting**: Biome 2.2.0 (replacing ESLint/Prettier)
- **Package Manager**: pnpm

### Build Configuration

- **Dev Server**: `pnpm dev` - Uses Turbopack for faster dev builds
- **Production Build**: `pnpm build` - Uses Turbopack
- **Linting**: `pnpm lint` - Runs Biome checks
- **Formatting**: `pnpm format` - Auto-formats with Biome

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router directory
│   ├── components/
│   │   ├── NavBar.tsx           # Animated navigation component
│   │   └── ui/                  # UI components (empty, ready for expansion)
│   ├── experience/
│   │   └── page.tsx             # Experience/timeline page (placeholder)
│   ├── projects/
│   │   └── page.tsx             # Projects showcase page (placeholder)
│   ├── randoms/
│   │   └── page.tsx             # Random content page (not in nav)
│   ├── layout.tsx               # Root layout with NavBar
│   ├── page.tsx                 # Home page (minimal content)
│   ├── globals.css              # Global styles & CSS variables
│   └── favicon.ico              # Site favicon
├── public/
│   ├── data/
│   │   └── projects.json        # Project data (12 items)
│   └── *.svg                    # Static assets
├── temp/                        # Legacy files from previous version
├── biome.json                   # Biome configuration
├── next.config.ts               # Next.js config (minimal)
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS config for Tailwind
└── package.json                 # Dependencies and scripts
```

## Architecture & Design Patterns

### Routing Structure

Uses Next.js App Router with the following routes:

- `/` - Home page (currently minimal, shows "difhue")
- `/projects` - Projects showcase (placeholder)
- `/experience` - Work experience/timeline (placeholder)
- `/randoms` - Random content (not linked in navbar)

### Layout Hierarchy

**Root Layout** (`app/layout.tsx`):
```
<html> (overflow-hidden)
  <body> (with Geist fonts, background-base color)
    <div> (screen height with padding)
      <div> (rounded container with scroll)
        {children} (page content)
      </div>
    </div>
    <NavBar /> (fixed bottom navigation)
  </body>
</html>
```

**Key Layout Features**:
- Full-screen height with controlled overflow
- Nested containers for visual depth
- Rounded corners (2xl) on main content area
- Fixed bottom navigation overlay
- Font variables injected via CSS custom properties

### Visual Design System (CRITICAL - Maintain Across All Pages)

**⚠️ This layout structure MUST be maintained on all pages for design consistency.**

#### Framing & Depth Architecture

The UI uses a **three-layer depth system** to create visual hierarchy:

**Layer 1: Outer Frame** (Dark Navy Background)
- Color: `#181937` (`background-base`)
- Purpose: Creates border/frame effect around entire app
- Implementation: `<body>` element with `bg-background-base`

**Layer 2: Padding/Spacing Layer**
- Desktop: `p-10` (40px padding)
- Mobile: `p-4` (16px padding)
- Bottom padding: `pb-6` on mobile for nav clearance
- Purpose: Creates the "frame" gap between outer and inner containers

**Layer 3: Content Container** (Muted Green Background)
- Color: `#c2d18f` (`background`)
- Border radius: `rounded-2xl` (16px)
- Overflow: `overflow-y-auto` (scrollable)
- Height: `h-full` (fills parent)
- Purpose: Main content area for all page content

#### Visual Layout Rules

```
┌─────────────────────────────────────────┐
│ Dark Outer Frame (#181937)              │
│  ┌───────────────────────────────────┐  │
│  │ Padding Layer (p-4 or p-10)      │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │ Green Content Area          │ │  │
│  │  │ (#c2d18f, rounded-2xl)      │ │  │
│  │  │                             │ │  │
│  │  │  [Page Content Here]        │ │  │
│  │  │                             │ │  │
│  │  │                             │ │  │
│  │  └─────────────────────────────┘ │  │
│  │                                   │  │
│  │  [Bottom Nav - Fixed Overlay]    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### Navigation Badge (Top-Left)
- Element: Circular badge with "N" initial
- Position: Absolute, top-left corner of content area
- Style: Dark background, light text
- Purpose: Logo/branding element

#### Bottom Navigation Specifications

**Position & Layout**:
- Fixed at bottom: `fixed bottom-0 left-0 right-0`
- Z-index: `z-10` (above content)
- Padding: `pb-2 pt-2 sm:pb-3` (bottom padding for mobile spacing)

**Visual Style**:
- Background: `bg-background` (same green as content area)
- Border: `border-8 border-background-base` (thick dark border for depth)
- Border radius: `rounded-xl sm:rounded-2xl`
- Typography: Uppercase, mono font, wide tracking
- States: HOME, PROJECTS, EXPERIENCE tabs

**Animation Behavior**:
- Initial: Translate down (hidden)
- Stage 1 (0ms): Drop animation - slides up into view
- Stage 2 (1200ms): Expand animation - scales horizontally
- Hover: Squiggle animation on nav items

#### Page Content Guidelines

When designing any page (`/`, `/projects`, `/experience`, etc.):

1. **DO NOT modify the outer frame or container structure**
2. **All page content goes INSIDE the green content container**
3. **Account for bottom navigation overlap** - add bottom padding/margin
4. **Use the established color palette** - don't introduce new background colors
5. **Maintain scrollability** - content container handles overflow
6. **Respect the framing** - don't break out of rounded container

#### Responsive Behavior

**Desktop (>= 768px)**:
- Outer padding: `p-10` (40px all sides)
- Nav spacing: Wider gaps between items
- Nav text: `text-sm` with `tracking-wider`

**Mobile (< 768px)**:
- Outer padding: `p-4 pb-6` (16px top/sides, 24px bottom)
- Nav spacing: Tighter gaps
- Nav text: `text-xs` with `tracking-wide`

#### Color Usage in Pages

**Backgrounds**:
- Outer frame: ALWAYS `background-base` (#181937)
- Content area: ALWAYS `background` (#c2d18f)
- Page content: Can use `transparent` or subtle overlays

**Text Colors**:
- Primary text: `rich-black` (#08202A)
- Secondary text: `rich-black/60` or `rich-black/80`
- Accents: `icterine` (#FEF987), `tigers-eye` (#A8612C)

**Interactive Elements**:
- Hover states: `white/15` overlay
- Active states: `white/20` overlay
- Focus states: Follow hover pattern

#### Implementation Code Reference

Root layout structure (DO NOT MODIFY):

```tsx
<body className="bg-background-base h-screen overflow-hidden">
  <div className="h-screen p-4 pb-6 md:p-10 m-0">
    <div className="bg-background h-full rounded-2xl overflow-y-auto">
      {children} {/* Your page content here */}
    </div>
  </div>
  <NavBar />
</body>
```

## Components

### NavBar Component (`app/components/NavBar.tsx`)

**Purpose**: Animated bottom navigation bar with sophisticated entrance animation

**Features**:
- **Client-side only** (`"use client"`)
- **Two-stage animation**:
  1. Drop animation (0ms delay) - translates from bottom
  2. Expand animation (1200ms delay) - scales horizontally
- **Active route detection** via `usePathname()`
- **Responsive design** with mobile/desktop breakpoints
- **Hover effects** with squiggle animation
- **Inactive items hidden** when navbar is collapsed

**Navigation Items**:
```typescript
{ href: "/", label: "Home" }
{ href: "/projects", label: "Projects" }
{ href: "/experience", label: "Experience" }
// { href: "/randoms", label: "Randoms" } // Commented out
```

**Animation States**:
- `dropped`: Controls vertical translation (Y-axis)
- `expanded`: Controls horizontal scaling (X-axis) and visibility of inactive items

**Styling Details**:
- Fixed bottom positioning with z-index 10
- Background color matches main content (`--background`)
- Border with `background-base` color for depth
- Uppercase text with tracking
- Cubic bezier easing for smooth animations
- Active items have white/20 background overlay
- Hover items have white/15 background overlay

## Design System

### Color Palette

Defined in `app/globals.css` as CSS variables:

```css
--background: #c2d18f (Hooker's Green - main content bg)
--background-base: #181937 (Dark Blue - body bg)
--rich-black: #08202A (text/foreground)
--icterine: #FEF987 (Yellow accent)
--hookers-green: #c2d18f (Green primary)
--tigers-eye: #A8612C (Brown accent)
--eerie-black: #14171A (Dark accent)
--fade-green: #b2c2805d (Translucent green)
```

**Color Strategy**:
- **Primary**: Muted green palette (Hooker's Green)
- **Contrast**: Deep dark blue for backgrounds
- **Accents**: Yellow (Icterine) and brown (Tiger's Eye)
- **Depth**: Multiple blacks/grays for layering

### Typography

**Font Setup**:
- **Sans**: Geist (Variable font) - `--font-geist-sans`
- **Mono**: Geist Mono (Variable font) - `--font-geist-mono`
- Both loaded via `next/font/google` with latin subset

**Usage**:
- Body: Arial/Helvetica fallback stack
- Components: Access via Tailwind classes (`font-sans`, `font-mono`)

### Animations

**Custom Keyframes** (in `globals.css`):

1. **`squiggle`** - Subtle rotation and translation loop
   - Used for idle state animations
   - Rotates ±6 degrees, translates ±4px

2. **`squiggle-hover`** - Interactive squiggle with scale
   - Triggered on hover
   - Adds slight scale variation (0.98-1.02)
   - Duration: 0.6s infinite

**Usage**:
```css
.animate-squiggle { animation: squiggle-hover 0.6s ease-in-out infinite; }
```

### Responsive Breakpoints

Using Tailwind's default breakpoints:
- `sm:` - 640px+
- `md:` - 768px+
- Mobile-first approach

## Data Contracts

### Projects Data (`public/data/projects.json`)

**Structure**: Array of 12 project objects

**Schema**:
```typescript
interface Project {
  id: number;                    // Unique identifier
  title: string;                 // Project title
  description: string;           // Short description
  image: string;                 // Path to image (webp format)
  pattern: string;               // Layout pattern identifier
  aspect: string;                // Aspect ratio (e.g., "1:3", "1:2", "1:1")
}
```

**Pattern Types**:
- `pattern1`, `pattern2a`, `pattern2b`, `pattern3a`, `pattern3b`
- Used for grid layout variation

**Aspect Ratios**:
- `1:3` - Tall narrow
- `1:2` - Tall standard  
- `1:1` - Square

**Images**:
- Located at `/projects/webp/*.webp`
- Also available in PNG format in temp directory
- Project images include: name-it, nasa, nft-emporium, open-funds, safe-deploy, solana-wedding, type-it-all

**Sample Projects** (mix of placeholder and actual):
- Vector databases
- Deployment tools
- Web applications
- Typing tests
- NFT platforms
- NASA projects

## Configuration Files

### TypeScript (`tsconfig.json`)

**Key Settings**:
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Next.js plugin enabled
- Incremental compilation

### Biome (`biome.json`)

**Configuration**:
- VCS: Git integration enabled
- Ignores: node_modules, .next, dist, build
- Formatter: 2-space indentation
- Linter: Recommended rules
- Domains: Next.js and React recommendations enabled
- Auto-organize imports

**Notable Rule Overrides**:
- `noUnknownAtRules`: disabled (for CSS compatibility)

### Next.js (`next.config.ts`)

Currently minimal with no custom configuration.

### PostCSS (`postcss.config.mjs`)

Simple config with Tailwind plugin:
```javascript
plugins: ["@tailwindcss/postcss"]
```

### Tailwind

Configured via `@theme inline` in `globals.css` rather than separate config file.

**Custom Theme Colors**:
- `background`, `background-base`, `fade-green`
- `foreground`, `rich-black`, `icterine`
- `hookers-green`, `tigers-eye`, `eerie-black`
- `eerie-black-bg`

## Current Implementation Status

### ✅ Completed
- Next.js 15 setup with App Router
- TypeScript configuration
- Tailwind CSS 4 integration
- Biome linting/formatting
- Root layout with fonts
- Animated NavBar component
- Color system and design tokens
- Custom animations (squiggle effects)
- Projects data structure
- Routing structure

### 🚧 In Progress / Placeholders
- **Home page**: Minimal content ("difhue")
- **Projects page**: Placeholder ("hello ProjectsPage")
- **Experience page**: Placeholder with basic layout
- **Randoms page**: Placeholder (not in navbar)

### 📋 Not Yet Implemented
- Project showcase with masonry grid
- Experience timeline
- Project detail pages
- Image optimization for project thumbnails
- Responsive image handling (WebP/PNG fallbacks)
- SEO metadata per page
- Analytics integration
- Contact/CTA sections

## Development Guidelines

### Adding New Pages

1. Create folder in `app/` directory
2. Add `page.tsx` with default export
3. Update NavBar items if needed
4. Consider SEO metadata

### Adding New Components

1. Place in `app/components/` or `app/components/ui/`
2. Use `"use client"` if using hooks or browser APIs
3. Follow TypeScript strict mode
4. Use Tailwind for styling

### Styling Best Practices

1. **Use CSS Variables** for colors (defined in `:root`)
2. **Tailwind First** - Use utility classes
3. **Custom Animations** - Define in `globals.css`
4. **Responsive** - Mobile-first with `sm:`, `md:` prefixes
5. **Theme Colors** - Access via Tailwind (`bg-background`, etc.)

### Animation Principles

1. **Easing**: Use cubic-bezier for smooth, organic motion
2. **Duration**: 800-1200ms for major transitions
3. **Layering**: Stagger animations for depth
4. **Performance**: Use `will-change-transform` sparingly

## Migration Notes (from v2 to v3.5)

The `temp/` directory contains artifacts from a previous Vite + React Router implementation:

**Previous Stack** (in temp/):
- Vite build tool
- React Router DOM
- Lenis smooth scrolling
- Different animation approach
- Calendly integration

**Current Direction** (v3.5):
- Next.js App Router (no client-side router needed)
- Simplified animation approach
- Focus on performance with Turbopack
- Modern React 19 features

## Performance Considerations

### Optimizations in Place

1. **Turbopack**: Enabled for dev and build (faster than Webpack)
2. **Font Optimization**: Using `next/font` for automatic optimization
3. **Layout Control**: Overflow management prevents layout shift
4. **CSS Variables**: Runtime theme switching capability
5. **Biome**: Faster than ESLint/Prettier combination

### Future Optimizations

- Image optimization with `next/image`
- Route-based code splitting (automatic with App Router)
- Metadata per page for better SEO
- Lazy loading for project images
- WebP with PNG fallbacks

## Deployment

**Recommended Platform**: Vercel (optimal for Next.js)

**Build Command**: `pnpm build`
**Start Command**: `pnpm start`
**Node Version**: 20.x or later

**Environment Variables**: None currently configured

## Troubleshooting

### Common Issues

1. **Fonts not loading**: Check `layout.tsx` font variable application
2. **Navbar not animating**: Verify `"use client"` directive present
3. **Styles not applying**: Run `pnpm format` to fix Biome issues
4. **Build errors**: Clear `.next` directory and rebuild

### Development Tips

1. Use `pnpm dev` for hot reload
2. Run `pnpm lint` before committing
3. Check browser console for hydration errors
4. Test responsive design with DevTools

## Future Roadmap

Based on placeholders and structure:

1. **Projects Page**: Implement masonry grid with project cards
2. **Experience Page**: Add timeline with scroll animations
3. **Home Page**: Add hero section, about, and CTAs
4. **Metadata**: Add SEO tags per route
5. **Analytics**: Integrate Vercel Analytics
6. **Dark Mode**: Leverage CSS variables for theme switching
7. **Project Details**: Individual project pages with routing
8. **Content Management**: Consider CMS integration for projects/experience

## Dependency Management

**Using pnpm** - Fast, disk-efficient package manager

**Update Strategy**:
```bash
pnpm update --latest          # Update all to latest
pnpm update --interactive     # Select updates
pnpm outdated                 # Check for updates
```

**Lock File**: `pnpm-lock.yaml` (commit this)

## Git Workflow

**Current Branch**: `v3.5`
**Main Branch**: Likely `main` or `master`

**Recommended Workflow**:
1. Feature branches from `v3.5`
2. Keep commits atomic
3. Use conventional commits
4. Merge via PR with reviews

## Additional Notes

- **Path Aliases**: `@/*` resolves to project root
- **No ESLint**: Using Biome exclusively
- **No Prettier**: Biome handles formatting
- **React 19**: Using latest React features
- **Turbopack**: Experimental but enabled by default
- **App Router**: Server Components by default (use `"use client"` when needed)

---

**Last Updated**: v3.5 branch (November 2025)
**Documentation Version**: 1.0.0
**Project Status**: Active Development

