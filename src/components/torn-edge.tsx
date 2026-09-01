/**
 * Torn-paper divider on the top edge of a colored section. The rip is a
 * tiling CSS mask (see .torn-edge), so the fibers keep their pixel scale
 * at every viewport width instead of stretching into a wave.
 * Fill comes from the section via currentColor.
 *
 * It overhangs upward via absolute positioning, so the section must be
 * `relative` — otherwise the rip anchors to the page and vanishes.
 */
export function TornEdge({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`torn-edge bg-current ${className}`} />;
}
