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
    <nav className="sticky top-0 z-10 flex flex-col items-center pt-3 pb-2">
      <div className="flex gap-6 bg-eerie-black-bg/50 text-[#e7e7e7] rounded-2xl p-2 shadow-2xl backdrop-blur-[60px] font-semibold tracking-wider uppercase">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative inline-flex items-center gap-2.5 py-[10px] px-4 rounded-xl transition-transform duration-200 ${
                isActive ? "bg-white/5 text-tigers-eye" : "hover:-translate-y-px"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


