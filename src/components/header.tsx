"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CustomsMenu } from "@/components/customs-menu";
import { nav } from "@/lib/site";

/**
 * Sticky bar that takes the color of whichever section sits under it.
 * Sections declare data-ground; on scroll the last one whose top has
 * passed the header wins and is written to <html data-ground>.
 */
export function Header() {
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  // Re-runs on navigation: each route renders its own [data-ground] sections,
  // so the list has to be re-read after the new page mounts or the bar keeps
  // the previous route's colour.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Scope to the current page: during a route transition the outgoing
      // <main> can still be in the DOM, and its ground would win the seed.
      const main = document.querySelector<HTMLElement>("main");
      const sections = (main ?? document).querySelectorAll<HTMLElement>(
        "[data-ground]",
      );
      // The bar's own bottom edge, not a guess: --frame changes at md, so a
      // hardcoded line leaves a section that starts just under the header
      // still reading as the section above it.
      const line =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 80;
      // Seed from the page's own <main> so a subpage with a single section
      // (which starts level with the header, not above it) still counts.
      let ground =
        main?.dataset.ground ?? sections[0]?.dataset.ground ?? "paper";
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
    };
    // Leaves data-ground in place on unmount: the next route's effect
    // overwrites it, and clearing it here flashes the default mid-navigation.
  }, [path]);

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
          <nav className="font-display hidden items-center gap-1 text-sm font-bold tracking-wide md:flex">
            {nav.map((link) => {
              // "/#booking" is an in-page anchor, never a route match.
              const active =
                link.href.startsWith("/#") === false &&
                (path === link.href || path.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="nav-link"
                >
                  {link.label.toUpperCase()}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="font-display -mr-2 flex min-h-11 items-center gap-2 px-2 text-sm font-bold tracking-wide md:hidden"
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
