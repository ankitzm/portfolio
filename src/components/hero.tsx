"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PORTRAIT } from "@/lib/site";
import { useMedia } from "@/lib/use-media";

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

/** Arrow centre (x, y from the CTA's edges) and the heading it points along. */
const ARROWS: [string, string, number][] = [
  ["-18%", "-14px", 55],
  ["24%", "-30px", 78],
  ["76%", "-30px", 102],
  ["118%", "-14px", 125],
  ["-18%", "calc(100% + 14px)", -55],
  ["24%", "calc(100% + 30px)", -78],
  ["76%", "calc(100% + 30px)", -102],
  ["118%", "calc(100% + 14px)", -125],
];

/**
 * Hand-drawn arrows fanned above and below the CTA: one wobbly path, drawn in after the
 * stamp lands, then nudging toward it. Every other one is mirrored so the
 * fan doesn't read as copies. Static under reduced motion.
 */
function CtaArrows({ reduced }: { reduced: boolean }) {
  return ARROWS.map(([left, top, deg], i) => (
    <span
      key={deg}
      aria-hidden="true"
      style={{
        left,
        top,
        transform: `translate(-50%,-50%) rotate(${deg}deg) scale(${0.85 + (i % 3) * 0.1}, ${i % 2 ? -1 : 1})`,
      }}
      className="text-stamp/45 pointer-events-none absolute"
    >
      <motion.svg
        viewBox="0 0 40 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block h-6 w-10"
        animate={reduced ? undefined : { x: [0, 5, 0] }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2 + i * 0.07,
        }}
      >
        <motion.path
          d="M2 13c5-4 9 2 14-1s9-3 20-1M29 5l7 6-8 6"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.5 + i * 0.07 }}
        />
      </motion.svg>
    </span>
  ));
}

const BAR = " q7.5 -5 15 0" + " t15 0".repeat(9);

/**
 * Cancellation struck across the portrait stamp: a ring postmark with five
 * wavy killer bars trailing off onto the card. Ink, so no shadow of its own.
 */
function Cancellation() {
  return (
    <svg
      viewBox="0 0 240 90"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      className="text-stamp load-fade absolute right-[80%] bottom-[14%] w-24 -rotate-6 opacity-60 [animation-delay:1.1s] min-[375px]:w-28 sm:w-44 md:right-[68%] md:-bottom-[6%] md:w-60"
    >
      {[17, 31, 45, 59, 73].map((y) => (
        <path key={y} d={`M0 ${y}${BAR}`} strokeWidth="2.4" />
      ))}
      <circle cx="195" cy="45" r="40" strokeWidth="2" />
      <circle cx="195" cy="45" r="25" strokeWidth="1" />
      <path id="pm-ring" d="M195 13a32 32 0 1 1 0 64a32 32 0 1 1 0-64" />
      <text
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-courier)"
        fontWeight="700"
        fontSize="8.4"
        letterSpacing="1.2"
      >
        <textPath href="#pm-ring">READY TO SHIP · ANY TIMEZONE ·</textPath>
      </text>
      <text
        x="195"
        y="49"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-courier)"
        fontWeight="700"
        fontSize="12"
      >
        IST
      </text>
    </svg>
  );
}

/** Yellow perforated portrait stamp; its denomination row is the live IST clock. */
function PortraitStamp() {
  const clock = useIstClock();
  return (
    <div className="stamp-scallop is-postage">
      <div className="bg-paper/40 relative aspect-4/5 overflow-hidden">
        <Image
          src={PORTRAIT}
          alt="Portrait of Ankit Singh"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
          className="object-cover object-top grayscale"
        />
      </div>
      <div className="text-ink flex items-end justify-between gap-1 px-1 pt-2 pb-0.5 font-mono uppercase">
        <span className="text-[9px] leading-tight tracking-wider">
          India
          <br />
          (Remote)
        </span>
        <span className="min-w-[8ch] text-right text-xs font-bold tabular-nums md:text-sm">
          {clock ?? "——"}
        </span>
      </div>
    </div>
  );
}

/** Where the portrait stamp is affixed; shared by the stamp and its ink. */
const STAMP_SPOT =
  "pointer-events-none absolute -top-14 left-1/2 z-20 w-40 -translate-x-1/2 rotate-3 sm:-top-16 sm:w-48 md:-top-10 md:right-6 md:left-auto md:w-56 md:translate-x-0";

/**
 * The franking desk: a full-width perforated postcard carrying the headline and
 * a red "Open for work" CTA, with the portrait stamp affixed over its top-right
 * corner. Scroll parallax only (no pin). Clicking the paper leaves a postmark.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Hydration-safe (false on server + first paint), unlike useReducedMotion.
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

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
  // The stamp parallaxes faster than the card, so it reads nearer the eye:
  // its shadow on the card lengthens and fades to match that height.
  const liftX = useTransform(p, [0, 1], [0, reduced ? 0 : 10]);
  const liftY = useTransform(p, [0, 1], [0, reduced ? 0 : 22]);
  const liftShade = useTransform(p, [0, 1], [0, reduced ? 0 : 0.2]);

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

  // Mobile min-height subtracts the sticky header (4.0625rem) so the card
  // ends on screen; on mobile everything sits on the stamp's centre line.
  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-[calc(100svh-var(--frame)-4.0625rem)] max-w-7xl items-stretch px-4 pt-20 pb-6 sm:px-6 sm:pt-28 sm:pb-8 md:min-h-[calc(100svh-3rem)] md:items-center md:px-10 md:pt-[clamp(4.5rem,8svh,5.5rem)] md:pb-[clamp(0.75rem,3svh,1.5rem)]"
    >
      {/* Unmasked wrapper so the stamp can overhang the card's die-cut edge:
          .perf-edge is a CSS mask, and a mask clips its own descendants. */}
      <div className="relative flex w-full md:block">
        <motion.div
          style={{ y: cardY, rotate: cardR, opacity: fade }}
          onClick={stampPaper}
          className="perf-edge drop-shadow-paper paper-grain paper-crumple bg-frame-white relative flex w-full cursor-crosshair flex-col"
        >
          {/* Inner gutter: .perf-edge's own 10px padding is the die-cut ring the
              mask draws its teeth into, so content spacing lives on this child. */}
          <div className="flex flex-1 flex-col gap-6 px-5 pt-48 pb-6 sm:gap-10 sm:px-12 sm:pt-60 md:gap-[clamp(1rem,2.5svh,2rem)] md:px-16 md:pt-[clamp(1.5rem,4svh,3rem)] md:pb-0 lg:px-20">
            {/* Airmail etiquette, stuck on by hand in the empty top band. */}
            <span
              aria-hidden="true"
              className="airmail-edge load-fade text-ink absolute top-[9%] left-[46%] hidden rotate-[-4deg] px-3 py-1 text-center font-mono leading-tight uppercase [animation-delay:1s] lg:block"
            >
              <b className="block text-sm tracking-[0.2em]">Par avion</b>
              <span className="block text-[9px] tracking-widest">
                By air mail
              </span>
            </span>

            {imprints.map(({ id, ...m }) => (
              <Postmark key={id} {...m} />
            ))}

            {/* Eyebrow: md and up only. On mobile the overhanging stamp leads
                and the headline follows it directly (see mock). */}
            <p className="load-fade text-ink-faded hidden font-mono text-[12px] tracking-widest uppercase [animation-delay:.1s] md:block">
              ( Software developer / DevRel )
            </p>

            {/* Height-aware: 11vw alone makes the headline a fixed ~124px on any
                laptop, which pushes the card past the fold on short viewports. */}
            <h1 className="font-display text-ink mx-auto max-w-[14ch] text-center text-[clamp(2.75rem,min(11vw,11.6svh),7.75rem)] leading-[0.9] font-extrabold tracking-tight uppercase font-stretch-75% md:mx-0 md:text-left">
              {["I turn", "specs into", "shipped products"].map((line, i) => (
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

            {/* Mobile: the card fills the viewport and the CTA sits centred in the
                space below the tagline. md+: one row, CTA flush right. */}
            <div className="flex flex-1 flex-col gap-6 md:flex-none md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-8">
              <p className="load-fade text-ink md:text-ink-faded border-rule mx-auto max-w-md text-center font-mono text-base leading-relaxed text-balance lowercase [animation-delay:.9s] md:mx-0 md:border-l-2 md:pl-3 md:text-left md:text-sm">
                4+ years building web3 products, SDKs and interfaces people
                actually enjoy using.
              </p>
              {/* Padding reserves the rows the arrows sit in; desktop shrinks it
                  with the viewport so the fan cannot push the card past the fold. */}
              <div className="my-auto self-center py-11 md:my-0 md:self-auto md:py-[clamp(2.75rem,7svh,3rem)]">
                <div className="relative">
                  <Link
                    href="/#booking"
                    className="load-slam border-stamp bg-stamp text-surface hover:text-stamp inline-flex min-h-11 items-center rounded border-[2.5px] px-5 font-mono text-xs font-bold tracking-widest uppercase transition-colors [animation-delay:1.3s] hover:bg-transparent"
                  >
                    Open for work
                  </Link>
                  <CtaArrows reduced={reduced} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Affixed over the card's top edge, parallaxing. Mobile: centred,
            leading the headline. md+: tucked into the corner. */}
        <motion.div
          style={{ y: stampY }}
          className={`drop-shadow-paper ${STAMP_SPOT}`}
        >
          <motion.div
            aria-hidden="true"
            style={{ x: liftX, y: liftY, opacity: liftShade }}
            className="bg-ink absolute inset-3 blur-xl"
          />
          <div className="load-place relative [animation-delay:.7s]">
            <PortraitStamp />
          </div>
        </motion.div>
        {/* Same spot, outside the drop-shadow: ink lies flat on the paper. */}
        <motion.div style={{ y: stampY }} className={STAMP_SPOT}>
          <div className="aspect-4/5" />
          <Cancellation />
        </motion.div>
      </div>
    </section>
  );
}
