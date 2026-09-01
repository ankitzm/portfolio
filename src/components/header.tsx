import Link from "next/link";

const links = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/dispatches", label: "DISPATCHES" },
  { href: "/#booking", label: "LET'S TALK" },
];

export function Header() {
  return (
    <header className="bg-surface/90 border-rule sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-350 items-center justify-between px-5 py-4 md:px-14">
        <Link
          href="/"
          className="font-display text-accent text-2xl font-extrabold tracking-tight uppercase"
        >
          Ankit Singh
        </Link>
        <nav className="hidden items-center gap-8 font-mono text-xs tracking-widest md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-faded hover:text-ink border-b-2 border-transparent pb-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
