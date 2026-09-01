/**
 * Torn-paper divider sitting on the top edge of a colored section.
 * Inherits its fill from the section via currentColor.
 */
export function TornEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-6 w-full -translate-y-[99%] ${className}`}
      fill="currentColor"
    >
      <path d="M0 24 0 12 40 18 90 8 140 16 200 6 260 14 330 4 400 15 470 7 540 17 610 5 680 13 750 3 820 14 890 8 960 16 1030 6 1100 15 1160 9 1200 14 1200 24Z" />
    </svg>
  );
}
