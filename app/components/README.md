# Terminal Components Documentation

## Overview

The terminal components have been refactored into a modular, reusable structure that separates concerns and makes customization easy.

## Structure

```
app/
├── components/
│   ├── TerminalIntro.tsx       # Main terminal component wrapper
│   └── ui/
│       └── terminal.tsx         # Base terminal UI components
├── data/
│   └── terminalContent.ts       # Terminal content configuration
└── page.tsx                     # Home page (uses TerminalIntro)
```

## Components

### 1. `TerminalIntro` Component

The main wrapper component that handles the terminal display with optional wave GIF.

**Props:**
- `lines?: TerminalLine[]` - Array of terminal lines to display (defaults to `homeTerminalLines`)
- `showWave?: boolean` - Show/hide wave GIF (default: `true`)
- `className?: string` - Additional CSS classes for the terminal

**Example:**
```tsx
import TerminalIntro from "@/app/components/TerminalIntro";

// Use default content
<TerminalIntro />

// Custom content without wave
<TerminalIntro 
  lines={customLines} 
  showWave={false}
  className="max-h-[600px]"
/>
```

### 2. Terminal UI Components

Located in `app/components/ui/terminal.tsx`:

- `Terminal` - Main terminal container with macOS-style window
- `AnimatedSpan` - For instant text with fade-in animation
- `TypingAnimation` - For typewriter effect text

## Content Configuration

### Data Structure

Content is defined in `app/data/terminalContent.ts`:

```typescript
interface TerminalLine {
  type: "command" | "output";
  text: string;
  delay: number;           // Delay before animation starts (ms)
  duration?: number;       // Typing speed for output (ms per char)
  className?: string;      // Tailwind classes
}
```

### Customizing Content

Edit `app/data/terminalContent.ts` to change the terminal content:

```typescript
export const homeTerminalLines: TerminalLine[] = [
  {
    type: "command",
    text: "$ whoami",
    delay: 0,
    className: "text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Your custom text here",
    delay: 800,
    duration: 50,  // Lower = faster typing
    className: "ml-2 text-text-base/90",
  },
  // Add more lines...
];
```

### Timing Configuration

- **delay**: Time in milliseconds before the line appears
- **duration**: Milliseconds per character for typing animation (only for output type)
  - Lower values = faster typing (e.g., 30ms = very fast)
  - Higher values = slower typing (e.g., 100ms = slow)

### Styling

Use Tailwind classes in `className` to customize appearance:
- Commands: `text-background-base font-semibold`
- Output: `ml-2 text-text-base/90`
- Skills: `ml-2 text-tigers-eye font-medium`
- Status: `ml-2 text-background-base/80 font-medium`

## Creating New Terminal Views

To create a new terminal view:

1. **Add new content** in `terminalContent.ts`:
```typescript
export const myCustomLines: TerminalLine[] = [
  // Your lines here
];
```

2. **Use in any page**:
```tsx
import TerminalIntro from "@/app/components/TerminalIntro";
import { myCustomLines } from "@/app/data/terminalContent";

export default function MyPage() {
  return <TerminalIntro lines={myCustomLines} />;
}
```

## Benefits

✅ **Modular**: Separated UI, logic, and content
✅ **Reusable**: Use TerminalIntro anywhere in your app
✅ **Configurable**: Easy to adjust delays, durations, and styling
✅ **Type-safe**: Full TypeScript support
✅ **Maintainable**: Change content without touching component code

