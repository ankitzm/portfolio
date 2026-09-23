"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PORTRAIT } from "@/lib/site";

type Imprint = { id: number; x: number; y: number; rot: number; t: string };

const MAX_IMPRINTS = 20;

const istTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const imprintTime = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Ankit's live local time (IST), ticking. Null on the server. */
function useIstClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(istTime.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** A circular postmark, slammed down where the visitor clicked the paper. */
function Postmark({ x, y, rot, t }: Omit<Imprint, "id">) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      initial={{ scale: 1.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ left: x, top: y, rotate: rot }}
      className="text-ink pointer-events-none absolute z-10 size-20 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
    >
      <circle
        cx="40"
        cy="40"
        r="37"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="40"
        cy="40"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text
        x="40"
        y="37"
        textAnchor="middle"
        fontFamily="var(--font-courier)"
        fontSize="8"
        letterSpacing="1"
        fill="currentColor"
      >
        valid
      </text>
      <text
        x="40"
        y="49"
        textAnchor="middle"
        fontFamily="var(--font-courier)"
        fontWeight="700"
        fontSize="10"
        fill="currentColor"
      >
        {t}
      </text>
    </motion.svg>
  );
}

/** Yellow perforated portrait stamp; its denomination row is the live IST clock. */
function PortraitStamp({ hasPortrait }: { hasPortrait: boolean }) {
  const clock = useIstClock();
  return (
    <div className="stamp-scallop is-postage">
      <div className="bg-paper/40 relative aspect-4/5 overflow-hidden">
        {hasPortrait ? (
          <Image
            src={PORTRAIT}
            alt="Ankit Singh"
            fill
            priority
            sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
            className="object-cover object-top grayscale"
          />
        ) : (
          <span className="text-ink/50 absolute inset-0 grid place-items-center text-center font-mono text-[9px] tracking-widest uppercase">
            Portrait
            <br />
            in transit
          </span>
        )}
      </div>
      <div className="text-ink flex items-end justify-between gap-1 px-1 pt-2 pb-0.5 font-mono uppercase">
        <span className="text-[9px] leading-tight tracking-wider">
          India
          <br />
          (Remote)
        </span>
        <span className="text-xs font-bold tabular-nums md:text-sm">
          {clock ?? "——"}
        </span>
      </div>
    </div>
  );
}

/**
 * The franking desk: a full-width perforated postcard carrying the headline and
 * a red "Open for work" CTA, with the portrait stamp affixed over its top-right
 * corner. Scroll parallax only (no pin). Clicking the paper leaves a postmark.
 */
export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });
  const cardY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : "-6%"]);
  const cardR = useTransform(p, [0, 1], [-1, reduced ? -1 : -2]);
  const stampY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : "-18%"]);
  const fade = useTransform(p, [0, 0.8], [1, reduced ? 1 : 0.3]);

  const [imprints, setImprints] = useState<Imprint[]>([]);
  const stampPaper = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    const r = e.currentTarget.getBoundingClientRect();
    setImprints((list) =>
      [
        ...list,
        {
          id: Date.now(),
          x: e.clientX - r.left,
          y: e.clientY - r.top,
          rot: Math.random() * 30 - 15,
          t: imprintTime.format(new Date()),
        },
      ].slice(-MAX_IMPRINTS),
    );
  };

  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-[calc(100svh-var(--frame))] max-w-7xl items-start px-4 pt-24 pb-6 sm:px-6 sm:pt-28 sm:pb-8 md:items-center md:px-10 md:py-14"
    >
      {/* Unmasked wrapper so the stamp can overhang the card's die-cut edge:
          .perf-edge is a CSS mask, and a mask clips its own descendants. */}
      <div className="relative w-full">
        <motion.div
          style={{ y: cardY, rotate: cardR, opacity: fade }}
          onClick={stampPaper}
          className="perf-edge drop-shadow-paper paper-grain bg-surface relative w-full cursor-crosshair"
        >
          {/* Inner gutter: .perf-edge's own 10px padding is the die-cut ring the
              mask draws its teeth into, so content spacing lives on this child. */}
          <div className="flex flex-col gap-6 px-5 pt-44 pb-7 sm:gap-10 sm:px-12 sm:pt-52 md:gap-12 md:px-16 md:pt-14 md:pb-0 lg:px-20">
            {imprints.map(({ id, ...m }) => (
              <Postmark key={id} {...m} />
            ))}

            {/* Eyebrow: md and up only. On mobile the overhanging stamp leads
                and the headline follows it directly (see mock). */}
            <p className="load-fade text-ink-faded hidden font-mono text-[11px] tracking-widest uppercase [animation-delay:.1s] md:block">
              ( Software developer, est. 2021 )
            </p>

            <h1 className="font-display text-ink max-w-[14ch] text-[clamp(2.75rem,11vw,7.75rem)] leading-[0.9] font-extrabold tracking-tight uppercase font-stretch-75%">
              {["I turn", "specs", "into shipped"].map((line, i) => (
                <span key={line} className="block overflow-hidden py-[0.06em]">
                  <span
                    className={`load-mask block ${i === 1 ? "text-accent" : ""}`}
                    style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
              <p className="load-fade text-ink-faded border-rule max-w-md border-l-2 pl-3 font-mono text-xs leading-relaxed lowercase [animation-delay:.9s] md:text-sm">
                5 years of web3 products, SDKs &amp; interfaces · from Router
                Protocol to freelance
              </p>
              <Link
                href="/#booking"
                className="load-slam border-stamp text-stamp hover:bg-stamp hover:text-surface inline-flex min-h-11 items-center rounded border-[2.5px] px-5 font-mono text-xs font-bold tracking-widest uppercase transition-colors [animation-delay:1.3s]"
              >
                Open for work
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Affixed over the card's top edge, parallaxing. Mobile: larger and
            leading the headline (see mock). md+: tucked into the corner. */}
        <motion.div
          style={{ y: stampY }}
          className="load-fade drop-shadow-paper pointer-events-none absolute -top-14 left-1/2 z-20 w-44 -translate-x-1/2 rotate-3 [animation-delay:.7s] sm:-top-16 sm:w-52 md:left-auto md:-top-10 md:right-6 md:w-56 md:translate-x-0"
        >
          <PortraitStamp hasPortrait={hasPortrait} />
        </motion.div>
      </div>
    </section>
  );
}
