"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CustomsMenu } from "@/components/customs-menu";

const links = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/#booking", label: "LET'S TALK" },
];

/**
 * Sticky bar that takes the color of whichever section sits under it.
 * Sections declare data-ground; on scroll the last one whose top has
 * passed the header wins and is written to <html data-ground>.
 */
export function Header() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ground]"),
    );
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 80;
      let ground = sections[0]?.dataset.ground ?? "paper";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) ground = s.dataset.ground!;
      }
      if (root.dataset.ground !== ground) root.dataset.ground = ground;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      delete root.dataset.ground;
    };
  }, []);

  return (
    <>
      <header className="ground-bar sticky top-(--frame) z-50 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-350 items-center justify-between px-5 py-4 md:px-14">
          <Link
            href="/"
            className="ground-brand font-display text-2xl font-extrabold tracking-tight uppercase"
          >
            Ankit Singh
          </Link>
          <nav className="hidden items-center gap-8 font-mono text-xs tracking-widest md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="-mr-2 flex min-h-11 items-center gap-2 px-2 font-mono text-xs tracking-widest md:hidden"
          >
            MENU
            <span aria-hidden="true" className="flex flex-col gap-1">
              <i className="block h-px w-4 bg-current" />
              <i className="block h-px w-4 bg-current" />
              <i className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </header>
      <CustomsMenu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}
