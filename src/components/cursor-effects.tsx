"use client";

import { useEffect } from "react";

/**
 * Desktop-only pointer effects, ported from the design handoff:
 * 1. Floating project screenshot while hovering a work row ([data-preview]).
 * 2. Footer eye pupils ([data-pupil]) track the cursor.
 * Direct DOM writes on mousemove; no React state, no re-renders.
 */
export function CursorEffects() {
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const float = document.createElement("img");
    float.alt = "";
    float.setAttribute("aria-hidden", "true");
    float.style.cssText =
      "position:fixed;left:0;top:0;width:300px;height:194px;object-fit:cover;object-position:top;pointer-events:none;z-index:40;opacity:0;transform:translate(-50%,-112%);transition:opacity .22s,transform .3s cubic-bezier(.19,1,.22,1);box-shadow:0 24px 60px rgba(20,20,18,.25)";
    document.body.appendChild(float);

    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const row = target?.closest<HTMLElement>("[data-preview]");
      if (row) {
        const src = row.dataset.preview!;
        if (!float.src.endsWith(src)) float.src = src;
        float.style.opacity = "1";
        float.style.left = `${e.clientX}px`;
        float.style.top = `${e.clientY - 10}px`;
        float.style.transform = `translate(-50%,-112%) rotate(${((e.clientX % 7) - 3) * 0.5}deg)`;
      } else {
        float.style.opacity = "0";
      }

      document.querySelectorAll<HTMLElement>("[data-pupil]").forEach((p) => {
        const eye = p.parentElement!.getBoundingClientRect();
        const dx = e.clientX - (eye.left + eye.width / 2);
        const dy = e.clientY - (eye.top + eye.height / 2);
        const a = Math.atan2(dy, dx);
        const m = Math.min(eye.width * 0.2, Math.hypot(dx, dy) * 0.1);
        p.style.translate = `${Math.cos(a) * m}px ${Math.sin(a) * m}px`;
      });
    };

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      float.remove();
    };
  }, []);

  return null;
}
