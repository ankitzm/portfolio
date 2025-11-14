# Bento Grid Design Guide

## Current Layout Structure

The Bento Grid uses a **modular, repeating section pattern** that scrolls horizontally.

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

This section repeats:
- **20 times horizontally** (~21,000px scrollable width)
- **15 rows vertically** (substantial vertical scrolling)

Total: **300 sections = 1,500 cards** rendered for "infinite" feel.

---

## File Structure

```
app/
├── components/
│   ├── BentoGrid.tsx       # Main container, handles data loading & repetition
│   ├── BentoSection.tsx    # One repeating section (3 columns)
│   └── BentoCard.tsx       # Individual card component
├── projects/
│   └── page.tsx            # Projects page that imports BentoGrid
public/
└── data/
    └── projects.json       # Project data with patterns and aspect ratios
```

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

### 5. Change Number of Repeating Sections

**File:** `app/components/BentoGrid.tsx`

```tsx
const horizontalRepeatCount = 20; // Horizontal sections
const verticalRepeatCount = 15;   // Vertical rows
```

**Note:** Total rendered cards = `horizontalRepeatCount × verticalRepeatCount × 5`  
Current: 20 × 15 × 5 = **1,500 cards**

⚠️ **Performance Impact:** Higher counts may impact initial load time but provide more scrollable area.

### 6. Modify Individual Card Styling

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
  "aspect": "1:4"
}
```

3. Make sure the image exists in `/public/projects/webp/`

---

## Design Principles

- **Modular**: Each section is self-contained and repeatable
- **Simple**: Easy to understand column-based structure  
- **Flexible**: Add/remove columns without breaking layout
- **Responsive**: Mobile-first with md: breakpoints
- **Performant**: Optimized for smooth bidirectional scrolling

## Performance Optimizations

✅ **React.memo()** - Components memoized to prevent unnecessary re-renders  
✅ **Lazy Loading** - Images load on-demand with `loading="lazy"`  
✅ **Hardware Acceleration** - CSS transforms use GPU acceleration  
✅ **Optimized Animation** - Reduced animation delays for large grids  
✅ **Quality Control** - Images at 75% quality for faster loading  
✅ **Touch Scrolling** - WebKit optimization for mobile devices

---

## Quick Reference

| File | Purpose |
|------|---------|
| `BentoGrid.tsx` | Data loading, horizontal scrolling, repetition count |
| `BentoSection.tsx` | Column layout, pattern assignment, spacing |
| `BentoCard.tsx` | Individual card styling, hover effects, aspect ratios |
| `projects.json` | Project data, patterns, aspect ratios |

---

**Need Help?** Check the inline comments in `BentoSection.tsx` for detailed configuration options.

