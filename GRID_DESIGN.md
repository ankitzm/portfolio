# Bento Grid Design Guide

## Current Layout Structure

The Bento Grid uses a **vertical scrolling layout** with a modular 3-column pattern.

### One Section = 3 Columns:

```
┌────────────┬────────────┬────────────┐
│  Column 1  │  Column 2  │  Column 3  │
│            │            │            │
│  Pattern1  │  Pattern2a │  Pattern3a │
│   (1:3)    │   (1:2)    │   (1:1)    │
│            ├────────────┼────────────┤
│            │  Pattern2b │  Pattern3b │
│            │   (1:1)    │   (1:2)    │
└────────────┴────────────┴────────────┘
```

**Layout Behavior:**
- ✅ **Vertical scrolling only** - no horizontal scroll
- ✅ **All projects displayed once** - no repetition
- ✅ **Responsive & centered** - max-width container with auto margins
- ✅ **Grouped by pattern** - projects automatically organized into sections

---

## File Structure

```
app/
├── components/
│   ├── BentoGrid.tsx       # Main container, handles data loading & layout
│   ├── BentoSection.tsx    # Groups projects by pattern into sections
│   └── BentoCard.tsx       # Individual card component
├── projects/
│   └── page.tsx            # Projects page that imports BentoGrid
public/
└── data/
    └── projects.json       # Project data with patterns and aspect ratios
```

**How It Works:**
1. `BentoGrid.tsx` loads all projects from `projects.json`
2. `BentoSection.tsx` groups projects by their pattern type
3. Creates vertical sections automatically based on available projects
4. Each section displays up to 5 cards in the 3-column layout
5. Layout is centered with max-width and responsive padding

---

## How to Modify the Grid

### 1. Change Card Sizes

**File:** `app/components/BentoSection.tsx`

Modify the width classes in each column:

```tsx
<div className="w-[280px] md:w-[340px]">
  {/* Change these values ↑ */}
</div>
```

### 2. Adjust Spacing

**Gaps between columns:**
```tsx
<div className="flex gap-8 md:gap-12">
  {/* Change these gaps ↑ */}
</div>
```

**Gaps between stacked cards:**
```tsx
<div className="flex flex-col gap-4 md:gap-6">
  {/* Change these gaps ↑ */}
</div>
```

### 3. Change Aspect Ratios

**File:** `public/data/projects.json`

Update the `aspect` field:
```json
{
  "aspect": "1:4"  // Change to any ratio like "2:3" or "16:9"
}
```

### 4. Add/Remove Columns

**File:** `app/components/BentoSection.tsx`

**To add a 4th column:**
1. Add new pattern types to TypeScript interfaces
2. Add the column div:

```tsx
{/* Column 4: New pattern */}
<div className="w-[280px] md:w-[340px]">
  <BentoCard
    title={pattern4.title}
    // ... props
  />
</div>
```

3. Update `projects.json` with new pattern types

### 5. Modify Individual Card Styling

**File:** `app/components/BentoCard.tsx`

Update classes in the motion.div or content sections.

---

## Adding New Projects

1. Open `public/data/projects.json`
2. Add a new project object:

```json
{
  "id": 13,
  "title": "Your Project",
  "description": "Project description here",
  "image": "/projects/webp/your-image.webp",
  "pattern": "pattern1",
  "aspect": "1:3"
}
```

3. Make sure the image exists in `/public/projects/webp/`
4. The project will automatically appear in the grid grouped by its pattern
5. **Pattern types available:**
   - `pattern1`: Tall single card (aspect 1:3) - appears in Column 1
   - `pattern2a`: Medium card (aspect 1:2) - top of Column 2
   - `pattern2b`: Square card (aspect 1:1) - bottom of Column 2
   - `pattern3a`: Square card (aspect 1:1) - top of Column 3
   - `pattern3b`: Medium card (aspect 1:2) - bottom of Column 3

---

## Design Principles

- **Modular**: Each section is self-contained with clear pattern structure
- **Simple**: Easy to understand column-based structure  
- **Flexible**: Add/remove columns without breaking layout
- **Responsive**: Mobile-first with md: breakpoints, centered layout
- **Performant**: Optimized for smooth vertical scrolling
- **Automatic**: Projects automatically grouped by pattern type

## Performance Optimizations

✅ **React.memo()** - Components memoized to prevent unnecessary re-renders  
✅ **Lazy Loading** - Images load on-demand with `loading="lazy"`  
✅ **Hardware Acceleration** - CSS transforms use GPU acceleration  
✅ **Optimized Animation** - Staggered animations for smooth loading  
✅ **Quality Control** - Images at 75% quality for faster loading  
✅ **Touch Scrolling** - WebKit optimization for mobile devices
✅ **No Repetition** - Each project rendered only once for better performance

---

## Quick Reference

| File | Purpose |
|------|---------|
| `BentoGrid.tsx` | Data loading, main container, vertical scrolling |
| `BentoSection.tsx` | Groups projects by pattern, creates sections automatically |
| `BentoCard.tsx` | Individual card styling, hover effects, aspect ratios |
| `projects.json` | Project data, patterns, aspect ratios |

**Key Changes from Previous Version:**
- ❌ Removed horizontal scrolling
- ❌ Removed project repetition
- ✅ Vertical scrolling only
- ✅ Centered layout with max-width
- ✅ Automatic pattern-based grouping

---

**Need Help?** Check the inline comments in `BentoSection.tsx` for detailed configuration options.

