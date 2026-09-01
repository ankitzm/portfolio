const socials = [
  { href: "https://github.com/ankitzm", label: "GITHUB/ANKITZM" },
  { href: "https://x.com/ankitzm", label: "X @ANKITZM" },
  { href: "https://medium.com/@0xblocktrain", label: "MEDIUM/@0XBLOCKTRAIN" },
];

export function Footer() {
  return (
    <footer className="border-ink bg-surface border-t-2 pb-24 md:pb-0">
      <div className="text-ink-faded mx-auto flex max-w-350 flex-col gap-4 px-5 py-10 font-mono text-[11px] tracking-wider md:flex-row md:items-baseline md:justify-between md:px-14">
        <div className="flex flex-col gap-3 md:flex-row md:gap-8">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
        <span>© {new Date().getFullYear()} · EVERYTHING SHIPS</span>
      </div>
    </footer>
  );
}
