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
import { useRef, useState } from "react";

import { TimeBadge } from "@/components/time-badge";

type Imprint = { id: number; x: number; y: number; rot: number; t: string };
const MAX_IMPRINTS = 20;

/**
 * The franking desk: one full-width postcard carrying the headline, with a
 * portrait stamp affixed to its top-right corner, a small IST time badge in
 * the bottom-right, and the OPEN FOR WORK imprint. Scroll parallax only (no
 * pin). Clicking the postcard paper imprints a small postmark at the cursor.
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
  const cardY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : "-8%"]);
  const cardR = useTransform(p, [0, 1], [-1, reduced ? -1 : -2]);
  const stampY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : "-22%"]);
  const fade = useTransform(p, [0, 0.75], [1, reduced ? 1 : 0.25]);

  const [imprints, setImprints] = useState<Imprint[]>([]);
  const stampPaper = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    const r = e.currentTarget.getBoundingClientRect();
    const t = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    setImprints((list) =>
      [
        ...list,
        {
          id: Date.now(),
          x: e.clientX - r.left,
          y: e.clientY - r.top,
          rot: Math.random() * 30 - 15,
          t,
        },
      ].slice(-MAX_IMPRINTS),
    );
  };

  return (
    <section
      ref={ref}
      className="mx-auto max-w-350 px-5 pt-8 pb-20 md:px-14 md:pt-14 md:pb-28"
    >
      {/* Full-width postcard */}
      <motion.div
        style={{ y: cardY, rotate: cardR, opacity: fade }}
        onClick={stampPaper}
        className="soft-shadow-paper paper-grain bg-surface border-rule relative cursor-crosshair border p-7 pt-9 md:p-14 md:pt-16"
      >
        {imprints.map((m) => (
          <motion.svg
            key={m.id}
            viewBox="0 0 80 80"
            aria-hidden="true"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            style={{ left: m.x, top: m.y, rotate: m.rot }}
            className="text-ink pointer-events-none absolute z-10 size-20 -translate-1/2 mix-blend-multiply"
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
              ANKIT
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
              {m.t}
            </text>
          </motion.svg>
        ))}

        <span className="load-fade border-accent text-accent absolute top-8 right-52 hidden border px-2 py-1 font-mono text-[10px] tracking-widest uppercase [animation-delay:.6s] lg:block">
          Airmail / Express
        </span>
        <p className="load-fade text-ink-faded mb-6 pr-28 font-mono text-xs tracking-widest uppercase [animation-delay:.1s] md:pr-0">
          ( Software developer, est. 2021 )
        </p>
        <h1 className="font-display text-ink text-[clamp(3.25rem,14vw,6rem)] leading-[0.92] font-extrabold tracking-tight uppercase font-stretch-75% md:text-[clamp(6rem,13vw,11rem)]">
          {["Ships", "Software,", "End to End"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className={`load-mask block ${i === 1 ? "text-accent" : ""}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className="load-fade text-ink-faded border-rule max-w-md border-l-2 pl-3 font-mono text-xs lowercase [animation-delay:.9s] md:text-sm">
            web3 products, SDKs &amp; interfaces · from Router Protocol to
            freelance
          </p>
          <div className="load-slam flex items-center gap-5 [animation-delay:1.3s]">
            <p
              aria-hidden="true"
              className="font-annotation text-accent/70 hidden -rotate-6 text-3xl md:block"
            >
              par avion
            </p>
            <Link href="/#booking" className="rubber-stamp stamp-cta">
              <span>Open for work</span>
              <span aria-hidden="true">Book a session</span>
            </Link>
          </div>
        </div>

        <div className="border-rule mt-8 border-t-2 border-dotted pt-4">
          <p className="load-fade text-ink-faded flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-[10px] tracking-wider uppercase [animation-delay:1.1s]">
            <span>(01) Postcard</span>
            <span>(02) Portrait</span>
            <span>(03) Postmark</span>
            <span>(04) Time</span>
          </p>
        </div>

        {/* Portrait stamp affixed to the top-right corner */}
        <motion.div
          style={{ y: stampY }}
          className="load-fade drop-shadow-paper absolute -top-6 -right-3 w-32 rotate-6 [animation-delay:.7s] md:-top-12 md:-right-8 md:w-56"
        >
          <div className="stamp-scallop">
            <div className="bg-paper relative aspect-[4/5] overflow-hidden">
              {hasPortrait ? (
                <Image
                  src="/portrait.jpg"
                  alt="Ankit Singh"
                  fill
                  priority
                  sizes="(max-width: 768px) 128px, 224px"
                  className="object-cover object-top grayscale"
                />
              ) : (
                <span className="text-ink-faded absolute inset-0 grid place-items-center text-center font-mono text-[9px] tracking-widest uppercase">
                  Portrait
                  <br />
                  in transit
                </span>
              )}
            </div>
            <div className="text-ink flex items-baseline justify-between px-1 pt-2 pb-0.5 font-mono text-[10px] tracking-wider uppercase">
              <span>India</span>
              <span className="font-bold">Est. 2021</span>
            </div>
          </div>
        </motion.div>

        {/* IST time badge, bottom-right corner */}
        <TimeBadge className="load-fade bg-surface absolute right-6 -bottom-5 rotate-2 [animation-delay:1s] md:right-10 md:-bottom-7" />
      </motion.div>
    </section>
  );
}
