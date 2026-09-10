"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Inertia scrolling on the window. Skipped under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
