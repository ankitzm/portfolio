"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/dispatches", label: "DISPATCHES" },
  { href: "/#booking", label: "LET'S TALK" },
];

/**
 * Navy ink over the hero; melts back to cream once the work sections start.
 * Watches #projects rather than scroll position because the page scrolls
 * inside .airmail-frame, not the window.
 */
export function Header() {
  const [cream, setCream] = useState(false);

  useEffect(() => {
    const target = document.getElementById("projects");
    if (!target) return; // subpages: stay navy
    // Observation band = top fifth of the viewport, so the flip happens when
    // the section actually reaches the header, not when it peeks in from the
    // bottom. top<0 keeps it cream once scrolled past.
    const obs = new IntersectionObserver(
      ([e]) => setCream(e.isIntersecting || e.boundingClientRect.top < 0),
      { rootMargin: "-64px 0px -80% 0px" },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`paper-grain sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-500 ${
        cream
          ? "bg-surface/90 border-rule"
          : "bg-ground-navy border-black/25"
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between px-5 py-4 md:px-14">
        <Link
          href="/"
          className={`font-display text-2xl font-extrabold tracking-tight uppercase transition-colors duration-500 ${
            cream ? "text-accent" : "text-surface"
          }`}
        >
          Ankit Singh
        </Link>
        <nav className="hidden items-center gap-8 font-mono text-xs tracking-widest md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 border-transparent pb-1 transition-colors duration-500 ${
                cream
                  ? "text-ink-faded hover:text-ink"
                  : "text-paper/70 hover:text-paper"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
