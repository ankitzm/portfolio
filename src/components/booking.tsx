"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const CALENDLY = "https://calendly.com/ankitzm/meet";

const spring = { type: "spring", stiffness: 90, damping: 15 } as const;

/**
 * Boarding-pass booking ticket. Tearing the stub is the interaction:
 * the stub tumbles away, the sheet recoils from the rip, and the
 * reserve link surfaces through a blur. Press is deliberate, release
 * is physics.
 */
export function Booking() {
  const [torn, setTorn] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="flex">
        <motion.div
          animate={
            torn
              ? { x: -10, rotate: -1.2, opacity: 0.25, filter: "blur(1px)" }
              : { x: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }
          }
          transition={spring}
          className="tear-main soft-shadow-paper bg-paper text-ink min-w-0 flex-1 p-5 md:p-7"
        >
          <p className="text-ink-faded font-mono text-[10px] tracking-widest uppercase">
            Boarding pass · class: 1st / advisory
          </p>
          <p className="font-display mt-2 text-2xl font-bold tracking-tight uppercase font-stretch-75% md:text-3xl">
            Book a session
          </p>
          <div className="text-ink-faded mt-3 flex items-center gap-3 font-mono text-xs uppercase">
            <span className="font-bold">AS</span>
            <span className="border-ink-faded/60 h-px flex-1 border-t border-dashed" />
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 3 3 10.5l6 2.5m12-10-4.5 18L12 13m9-10L9 13" />
            </svg>
            <span className="border-ink-faded/60 h-px flex-1 border-t border-dashed" />
            <span className="font-bold">You</span>
          </div>
          <p className="text-ink-faded mt-3 font-mono text-[10px] uppercase">
            30 min · calendly · departure: next available
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setTorn(true)}
          disabled={torn}
          animate={
            torn
              ? {
                  x: reduced ? 0 : 140,
                  y: reduced ? 0 : 90,
                  rotate: reduced ? 0 : 24,
                  opacity: 0,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 70, damping: 12 }}
          whileTap={{ scale: 0.97 }}
          className="tear-stub bg-accent text-paper w-28 cursor-pointer p-4 text-left font-mono text-[10px] font-bold tracking-widest uppercase md:w-32"
        >
          <span className="barcode mb-3 block h-8 w-full opacity-40" />
          Tear here to book ✂
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={
          torn
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 18, scale: 0.94, filter: "blur(6px)" }
        }
        transition={{ ...spring, delay: torn ? 0.18 : 0 }}
        className={`absolute inset-0 grid place-items-center ${torn ? "" : "pointer-events-none"}`}
      >
        <a
          href={CALENDLY}
          target="_blank"
          rel="noreferrer"
          tabIndex={torn ? 0 : -1}
          className="hover-lift bg-accent text-paper soft-shadow-paper inline-block -rotate-1 px-8 py-4 font-mono text-sm font-bold tracking-widest uppercase"
        >
          Reserve slot →
        </a>
      </motion.div>
    </div>
  );
}
