"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTransition } from "./TransitionContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  // { href: "/randoms", label: "Randoms" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { navigateTo } = useTransition();
  const [dropped, setDropped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const dropTimer = window.setTimeout(() => setDropped(true), 0);
    const expandTimer = window.setTimeout(() => setExpanded(true), 1200);
    return () => {
      clearTimeout(dropTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  return (
    <nav
      className={`fixed bottom-2 left-0 right-0 z-50 flex flex-col items-center pb-2 pt-2 md:pb-3 font-mono px-2 sm:px-0 will-change-transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        dropped ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div
        className={`relative flex bg-background rounded-xl sm:rounded-2xl font-semibold tracking-wide sm:tracking-wider uppercase text-xs sm:text-sm origin-center transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-8 border-background-base ${
          expanded 
            ? "scale-x-100 gap-2 sm:gap-6 p-1.5 sm:p-2" 
            : "scale-x-[0.94] gap-0 p-1.5 sm:p-2"
        }`}
      >
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const isVisible = expanded || isActive;
          return (
            <button
              key={item.href}
              onClick={() => {
                if (!isActive) {
                  navigateTo(item.href);
                }
              }}
              className={`relative inline-flex items-center rounded-lg sm:rounded-xl transition-all duration-[800ms] ease-out group overflow-hidden ${
                isActive ? "text-text-base" : "text-text-base/80"
              } ${expanded ? "hover:animate-squiggle" : ""} ${
                isVisible 
                  ? "py-2 px-3 sm:py-2.5 sm:px-4 opacity-100 max-w-[260px] scale-100 pointer-events-auto" 
                  : "p-0 opacity-0 max-w-0 scale-95 pointer-events-none"
              }`}
            >
              {/* Active background */}
              {isActive && (
                <div 
                  className="absolute inset-0 bg-black/5 rounded-lg transition-all duration-300 ease-out"
                />
              )}
              {/* Hover background */}
              <div 
                className="absolute inset-0 bg-black/2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
              />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}


