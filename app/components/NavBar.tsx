"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const DROP_DURATION_MS = 1200; // drop-in duration
const EXPAND_DURATION_MS = 800; // expand-to-full duration

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/randoms", label: "Randoms" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [dropped, setDropped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const activeItem = useMemo(() => {
    return navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    ) ?? navItems[0];
  }, [pathname]);

  useEffect(() => {
    const dropTimer = window.setTimeout(() => setDropped(true), 0);
    const expandTimer = window.setTimeout(() => setExpanded(true), DROP_DURATION_MS);
    return () => {
      clearTimeout(dropTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-10 flex flex-col items-center pt-3 pb-2 font-mono"
      style={{
        transform: dropped ? "translateY(0)" : "translateY(-80px)",
        opacity: dropped ? 1 : 0,
        transition: `transform ${DROP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${DROP_DURATION_MS}ms ease-out`,
        willChange: "transform, opacity",
      }}
    >
      <div
        className="flex bg-eerie-black-bg/80 text-[#e7e7e7]/80 rounded-2xl shadow-2xl backdrop-blur-[60px] font-semibold tracking-wider uppercase"
        style={{
          gap: expanded ? 24 : 0,
          padding: expanded ? 8 : 8,
          transform: expanded ? "scaleX(1)" : "scaleX(0.94)",
          transformOrigin: "center",
          transition: `transform ${EXPAND_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), gap ${EXPAND_DURATION_MS}ms ease, padding ${EXPAND_DURATION_MS}ms ease`
        }}
      >
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const isVisible = expanded || isActive;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative inline-flex items-center rounded-xl transition-all ease-out ${
                isActive ? "bg-white/10 text-icterine" : "text-[#e7e7e7]/80"
              } ${expanded ? "hover:-translate-y-px" : ""}`}
              style={{
                padding: isVisible ? "10px 16px" : "0px",
                opacity: isVisible ? 1 : 0,
                maxWidth: isVisible ? 260 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
                overflow: "hidden",
                pointerEvents: isVisible ? "auto" : "none",
                transitionDuration: `${EXPAND_DURATION_MS}ms`
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


