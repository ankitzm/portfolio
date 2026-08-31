import Image from "next/image";
import CursorEffects from "./effects";

const projects = [
  {
    name: "Clarity",
    year: "'25",
    href: "https://github.com/ankitzm/clarity",
    image: "/projects/webp/clarity.webp",
    category: "AI tool · Mind maps",
    stack: "React / OpenRouter / React Flow",
    description:
      "Turns messy ChatGPT conversations into structured insights and interactive mind maps, with real-time streaming and multi-analysis.",
  },
  {
    name: "Jerico",
    year: "'25",
    href: "https://github.com/ankitzm/jerico",
    image: "/projects/webp/jerico.webp",
    category: "Web3 · Payments",
    stack: "Ethereum / PYUSD / React",
    description:
      "Blockchain-native invoicing for freelancers and businesses. Send an invoice, get paid wallet-to-wallet in PYUSD instantly or by QR code.",
  },
  {
    name: "SolLens",
    year: "'25",
    href: "https://github.com/ankitzm/sollens",
    image: "/projects/webp/sol-lens.webp",
    category: "Chrome extension · Solana",
    stack: "TypeScript / Local storage",
    description:
      "Name, tag and color Solana addresses right on Solscan, so wallets you track stay recognizable. Privacy-first, everything stored locally.",
  },
  {
    name: "Safe Deploy",
    year: "'24",
    href: "https://www.npmjs.com/package/safe-deploy",
    image: "/projects/webp/safe-deploy.webp",
    category: "npm · Dev tooling",
    stack: "Hardhat / Solidity",
    description:
      "An npm package for deploying smart contracts straight from the browser. No private keys ever leave your wallet, no config files to leak.",
  },
  {
    name: "Terms-Simplified",
    year: "'24",
    href: "https://github.com/ankitzm/terms-simplified",
    image: "/projects/webp/terms-simplified.webp",
    category: "Extension · AI",
    stack: "Perplexity API / TypeScript",
    description:
      "Paste any terms and conditions and get the plain-language version, flagging what you're actually agreeing to.",
  },
];

const experience = [
  {
    title: "Freelancing",
    role: "",
    date: "OCT '25 - PRESENT",
    description:
      "Websites and full-stack apps for clients with Next.js, Vue.js and NestJS. Learning Rust on the side.",
  },
  {
    title: "Stealth company, web3 game",
    role: "full stack",
    date: "MAY '24 - OCT '25",
    description:
      "Built a Solana-integrated game from scratch with React, Node, Privy wallet and a quick-bet animation system.",
  },
  {
    title: "Router Protocol",
    role: "full stack",
    date: "APR '24 - MAR '25",
    description:
      "Router Nitro v2 cross-chain swaps, a CEX withdrawal flow across 30+ chains, and co-built the Tangled SDK.",
  },
  {
    title: "ThirdFi",
    role: "dev advocate",
    date: "APR '23 - AUG '23",
    description:
      "Product and API docs, getting-started guides, and web3 workshops across Discord communities.",
  },
  {
    title: "BlockTrain",
    role: "content creator",
    date: "MAY '22 - NOV '22",
    description:
      "Daily blockchain blogs on Medium and Hashnode, YouTube videos, and college meetups.",
  },
];

export default function Home() {
  return (
    <>
      <CursorEffects />

      <header className="bg-ground/90 sticky top-0 z-10 flex items-center justify-between px-5 py-4 font-mono text-[11px] backdrop-blur-sm md:px-14 md:py-5">
        <a href="#" className="font-medium">
          ankit singh
        </a>
        <nav className="flex items-center gap-7">
          <a
            href="#work"
            className="text-mute hover:border-ink hover:text-ink hidden border-b border-transparent transition-colors md:inline"
          >
            WORK
          </a>
          <a
            href="#experience"
            className="text-mute hover:border-ink hover:text-ink hidden border-b border-transparent transition-colors md:inline"
          >
            EXPERIENCE
          </a>
          <a
            href="#contact"
            className="border-ink hover:bg-ink hover:text-ground border px-5 py-2.5 transition-colors duration-200 active:scale-[0.97]"
          >
            LET&rsquo;S TALK
          </a>
        </nav>
      </header>

      <main>
        <section className="px-5 pt-16 pb-20 md:px-14 md:pt-24 md:pb-28">
          <p className="load-fade text-mute mb-7 font-mono text-xs [animation-delay:.1s] md:mb-9">
            ( SOFTWARE DEVELOPER, EST. 2021 )
          </p>
          <h1 className="text-[13vw] leading-none font-black tracking-[-0.04em] uppercase md:text-[clamp(64px,8.6vw,124px)] md:tracking-[-0.05em]">
            <span className="block overflow-hidden">
              <span className="load-mask block [animation-delay:.2s]">
                Builds digital
              </span>
            </span>
            <span className="block overflow-hidden normal-case">
              <span className="load-mask block pb-1 leading-[1.1] font-medium italic [animation-delay:.35s]">
                products people feel,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="load-mask block leading-[1.05] [animation-delay:.5s]">
                end to end.
              </span>
            </span>
          </h1>
          <p className="load-fade text-mute mt-10 max-w-md text-[15px] leading-relaxed [animation-delay:1s] md:mt-16">
            Web3 products, SDKs and interfaces with character. Four years of
            shipping, from Router Protocol to freelance.
          </p>
        </section>

        <section id="work" className="scroll-mt-16 px-5 md:px-14">
          <div className="reveal flex items-baseline justify-between pb-3">
            <h2 className="text-xl font-bold tracking-tight">Selected work</h2>
            <a
              href="https://github.com/ankitzm"
              className="text-mute hover:border-ink hover:text-ink border-b border-transparent font-mono text-[11px] transition-colors"
            >
              MORE ON GITHUB ↗
            </a>
          </div>
          <ul>
            {projects.map((p) => (
              <li key={p.name} className="reveal border-ink/15 border-t">
                <a
                  href={p.href}
                  data-preview={p.image}
                  className="group block py-7 transition-[padding-left] duration-300 ease-(--ease-expo) md:grid md:grid-cols-[1fr_320px_56px] md:gap-6 md:py-8 md:hover:pl-6"
                >
                  <div>
                    <span className="flex items-baseline justify-between md:block">
                      <span className="text-3xl font-extrabold tracking-tight md:text-[44px]">
                        {p.name}
                      </span>
                      <span className="text-faint font-mono text-xs md:hidden">
                        {p.year}
                      </span>
                    </span>
                    <span className="relative mt-4 block h-48 md:hidden">
                      <Image
                        src={p.image}
                        alt={`${p.name} screenshot`}
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="text-mute mt-3 block max-w-md text-sm leading-relaxed">
                      {p.description}
                    </span>
                  </div>
                  <span className="text-mute mt-3 block pt-2 font-mono text-[11px] leading-relaxed uppercase md:mt-0">
                    {p.category}
                    <br />
                    {p.stack}
                  </span>
                  <span className="text-faint hidden pt-2 text-right font-mono text-xs md:block">
                    {p.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-ink/15 border-t" />
        </section>

        <section
          id="experience"
          className="grid scroll-mt-16 gap-8 px-5 pt-20 pb-14 md:grid-cols-[240px_1fr] md:px-14 md:pt-28"
        >
          <h2 className="reveal text-xl font-bold tracking-tight">
            Experience
          </h2>
          <div className="relative pl-7">
            <div className="reveal-grow bg-ink absolute top-1.5 bottom-1.5 left-0 w-px" />
            {experience.map((job) => (
              <div key={job.title} className="reveal-slide mb-8 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-bold tracking-tight">
                    {job.title}
                    {job.role && (
                      <span className="text-mute ml-2 font-medium italic">
                        {job.role}
                      </span>
                    )}
                  </h3>
                  <span className="text-faint font-mono text-[11px]">
                    {job.date}
                  </span>
                </div>
                <p className="text-mute mt-1.5 max-w-xl text-sm leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="reveal text-mute grid gap-8 px-5 pb-24 font-mono text-xs leading-relaxed md:grid-cols-[240px_1fr] md:px-14">
          <span className="text-[11px] uppercase">Stack</span>
          <span>
            React, Next.js, TypeScript, Node, NestJS, Solidity (EVM), Vue,
            Postgres, Rust (learning)
          </span>
        </div>
      </main>

      <footer
        id="contact"
        className="bg-ink text-ground px-5 pt-20 pb-10 md:px-14 md:pt-28 md:pb-14"
      >
        <div className="reveal mb-8 flex gap-2" aria-hidden="true">
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
        <p className="reveal text-faint mb-5 font-mono text-[11px]">
          ( AVAILABLE FOR NEW PROJECTS )
        </p>
        <div className="overflow-hidden">
          <a
            href="mailto:hello@ankitsingh.xyz"
            className="reveal wipe-link inline-block pb-3 text-[13vw] leading-none font-black tracking-[-0.04em] uppercase md:text-[clamp(56px,7.5vw,108px)] md:tracking-[-0.05em]"
          >
            Let&rsquo;s talk ↗
          </a>
        </div>
        <div className="border-ground/20 text-faint mt-12 flex flex-col gap-3 border-t pt-6 font-mono text-[11px] md:flex-row md:items-baseline md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:gap-7">
            <a
              href="https://github.com/ankitzm"
              className="hover:text-ground transition-colors"
            >
              GITHUB/ANKITZM
            </a>
            <a
              href="https://x.com/ankitzm"
              className="hover:text-ground transition-colors"
            >
              X @ANKITZM
            </a>
            <a
              href="https://medium.com/@0xblocktrain"
              className="hover:text-ground transition-colors"
            >
              MEDIUM/@0XBLOCKTRAIN
            </a>
          </div>
          <span className="mt-3 md:mt-0">© 2026</span>
        </div>
      </footer>
    </>
  );
}
