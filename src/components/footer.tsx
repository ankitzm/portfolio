import { TornEdge } from "@/components/torn-edge";
import { socials } from "@/lib/site";

export function Footer() {
  return (
    <footer
      data-ground="paper"
      className="paper-grain bg-surface text-surface relative"
    >
      {/* Grained like the footer body, or the rip reads brighter than the
          paper it belongs to. */}
      <TornEdge className="paper-grain" />
      <div className="text-ink mx-auto flex max-w-350 flex-col gap-6 px-5 py-12 md:flex-row md:items-baseline md:justify-between md:px-14 md:py-14">
        <div className="font-display flex flex-col gap-1 text-sm font-bold tracking-wide md:flex-row md:gap-1">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              {social.handle}
            </a>
          ))}
        </div>
        <span className="text-ink-faded px-1 font-mono text-[11px] tracking-wider">
          © {new Date().getFullYear()} · EVERYTHING SHIPS
        </span>
      </div>
    </footer>
  );
}
