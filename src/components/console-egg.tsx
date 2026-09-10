"use client";

import { useEffect } from "react";

const STAMP = String.raw`
  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
  │  EVERYTHING SHIPS       │
  │  ankit singh · est 2021 │
  │  hand-cancelled ✓       │
  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
  source: github.com/ankitzm
`;

/** Prints the stamp once per session. */
export function ConsoleEgg() {
  useEffect(() => {
    if (sessionStorage.getItem("stamped")) return;
    sessionStorage.setItem("stamped", "1");
    console.log(
      "%c" + STAMP,
      "color:#d94a2b;font-family:Courier,monospace;font-weight:700;line-height:1.3",
    );
  }, []);
  return null;
}
