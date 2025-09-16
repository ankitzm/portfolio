"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/randoms", label: "Randoms" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="notch-nav">
      <div className="notch-rail">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`notch-link ${isActive ? "active" : ""}`}>
              <span className="dot" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="notch-squiggle" aria-hidden />
    </nav>
  );
}


