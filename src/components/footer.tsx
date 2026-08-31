const socials = [
  { href: "https://github.com/ankitzm", label: "GITHUB/ANKITZM" },
  { href: "https://x.com/ankitzm", label: "X @ANKITZM" },
  { href: "https://medium.com/@0xblocktrain", label: "MEDIUM/@0XBLOCKTRAIN" },
];

/**
 * Sticky curtain: `<main>` scrolls up and uncovers this. The eyes track the
 * cursor via `data-pupil`, driven by `<CursorEffects />`.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-ink text-ground sticky bottom-0 z-0 px-5 pt-20 pb-10 md:px-14 md:pt-28 md:pb-14"
    >
      <div className="mb-8 flex gap-2" aria-hidden="true">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="border-ground flex size-12 items-center justify-center rounded-full border-2 md:size-15"
          >
            <div
              data-pupil
              className="eye-pupil bg-ground size-4 rounded-full md:size-5"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          </div>
        ))}
      </div>
      <p className="text-faint mb-5 font-mono text-[11px]">
        ( AVAILABLE FOR NEW PROJECTS )
      </p>
      <a
        href="mailto:hello@ankitsingh.xyz"
        className="wipe-link inline-block pb-3 text-[13vw] leading-none font-black tracking-[-0.04em] uppercase md:text-[clamp(56px,7.5vw,108px)] md:tracking-tighter"
      >
        Let&rsquo;s talk ↗
      </a>
      <div className="border-ground/20 text-faint mt-12 flex flex-col gap-3 border-t pt-6 font-mono text-[11px] md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:gap-7">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ground transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
        <span className="mt-3 md:mt-0">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
