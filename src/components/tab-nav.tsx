"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "DESTINATION",
    // house
    path: "M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
  },
  {
    href: "/projects",
    label: "DEPARTURE",
    // paper plane
    path: "M21 3 3 10.5l6 2.5m12-10-4.5 18L12 13m9-10L9 13",
  },
  {
    href: "/experience",
    label: "TRANSIT",
    // compass needle
    path: "M12 2v3m0 14v3M2 12h3m14 0h3m-5.5-4.5-2 6-6 2 2-6 6-2Z",
  },
  {
    href: "/dispatches",
    label: "CUSTOMS",
    // envelope
    path: "M3 6h18v12H3V6Zm0 1 9 7 9-7",
  },
];

/** Mobile-only bottom navigation. */
export function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-surface border-rule fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex">
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 border-t-2 font-mono text-[9px] tracking-widest transition-colors active:translate-y-0.5 ${
                active
                  ? "border-accent text-accent"
                  : "text-ink-faded border-transparent"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={tab.path} />
              </svg>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
