const links = [
  { href: "#projects", label: "WORK" },
  { href: "#experience", label: "EXPERIENCE" },
];

export function Header() {
  return (
    <header className="bg-ground/90 sticky top-0 z-10 flex items-center justify-between px-5 py-4 font-mono text-[11px] backdrop-blur-sm md:px-14 md:py-5">
      <a href="#" className="font-medium">
        ankit singh
      </a>
      <nav className="flex items-center gap-7">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-mute hover:border-ink hover:text-ink hidden border-b border-transparent transition-colors md:inline"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="border-ink hover:bg-ink hover:text-ground border px-5 py-2.5 transition-colors duration-200 active:scale-[0.97]"
        >
          LET&rsquo;S TALK
        </a>
      </nav>
      <div
        aria-hidden="true"
        className="scroll-progress bg-ink absolute bottom-0 left-0 h-px w-full"
      />
    </header>
  );
}
