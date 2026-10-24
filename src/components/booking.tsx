"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useStacked } from "@/lib/use-media";

const CAL_NAMESPACE = "15min";
const CAL_LINK = "ankitzm/15min";

const spring = { type: "spring", stiffness: 90, damping: 15 } as const;

/*
 * The tear, from the physics rather than hand-set keyframes. First the
 * fibers stretch and the halves ease 6px apart. Then they let go: the stub
 * is lifted a touch toward you and dropped, falling under gravity with a
 * slow spin while air drag bleeds off its sideways speed; the sheet
 * recoils the other way and slides off, slowed by friction. Each path is
 * sampled into keyframes, so the motion follows the equations.
 */
const TEAR_S = 1;
const STRETCH_S = 0.12;
const FRAMES = 32;
const G = 2400; // px/s²

const times = Array.from({ length: FRAMES }, (_, i) => i / (FRAMES - 1));

/** Sample f(t, free) over the tear; `free` is time since the fibers gave. */
function simulate(f: (t: number, free: number) => Record<string, number>) {
  const out: Record<string, number[]> = {};
  for (const u of times) {
    const t = u * TEAR_S;
    const k = Math.min(1, t / STRETCH_S);
    const frame = f(t, Math.max(0, t - STRETCH_S));
    frame.gap = 6 * k * k * (3 - 2 * k);
    for (const [key, v] of Object.entries(frame)) (out[key] ??= []).push(v);
  }
  return out;
}

/** Distance covered from speed v under linear drag k. */
const drag = (v: number, k: number, t: number) =>
  (v / k) * (1 - Math.exp(-k * t));

/** 1 → 0 between two shares of the tear. */
const fade = (t: number, from: number, to: number) =>
  1 - Math.min(1, Math.max(0, (t / TEAR_S - from) / (to - from)));

function stubFall(stacked: boolean) {
  const f = simulate((t, s) => ({
    along: drag(stacked ? 60 : 420, 1.5, s),
    down: (stacked ? 60 : -120) * s + 0.5 * G * s * s,
    rotate: (stacked ? -1 : 1) * 24 * (1 - Math.exp(-2 * s)),
    // Picked up, then dropped: nearer the eye for a moment.
    scale: 1 + 0.04 * Math.sin(Math.min(1, s / 0.35) * Math.PI),
    opacity: fade(t, 0.55, 1),
  }));
  const pull = (a: number[]) => a.map((v, i) => v + f.gap[i]);
  return stacked
    ? {
        x: f.along,
        y: pull(f.down),
        rotate: f.rotate,
        scale: f.scale,
        opacity: f.opacity,
      }
    : {
        x: pull(f.along),
        y: f.down,
        rotate: f.rotate,
        scale: f.scale,
        opacity: f.opacity,
      };
}

function sheetSlide(stacked: boolean) {
  const f = simulate((t, s) => ({
    slide: drag(stacked ? 800 : 1100, 3, s),
    rotate: -1.5 * (1 - Math.exp(-3 * s)),
    opacity: fade(t, 0.3, 0.85),
  }));
  const away = f.slide.map((v, i) => -(v + f.gap[i]));
  return stacked
    ? { y: away, rotate: f.rotate, opacity: f.opacity }
    : { x: away, rotate: f.rotate, opacity: f.opacity };
}

const tearTransition: Transition = { duration: TEAR_S, times, ease: "linear" };

const details = [
  ["Duration", "15 min"],
  ["Desk", "cal.com"],
  ["Departure", "Next available"],
] as const;

/**
 * Boarding-pass booking ticket sitting face-down over the Cal.com scheduler.
 * Tearing the stub is the interaction: the stub tumbles away, the sheet
 * recoils from the rip, and the calendar underneath is uncovered. Press is
 * deliberate, release is physics.
 */
export function Booking() {
  const [torn, setTorn] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);
  // Overlay unmounts after the tear finishes — a transformed, invisible pass
  // would otherwise keep stretching the scrollable area. Timer, not
  // onAnimationComplete: that callback also fires for the whileTap release,
  // which lands right after the click and would unmount the pass mid-tear.
  const [gone, setGone] = useState(false);
  const tearAway = () => {
    setTorn(true);
    setTimeout(() => setGone(true), TEAR_S * 1000 + 100);
  };
  const reduced = useReducedMotion();
  // Stacked ticket (below md) tears along a horizontal seam, so the halves
  // part vertically; side-by-side parts horizontally.
  const stacked = useStacked();

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  // The stub had focus and is now disabled; hand focus to the calendar it
  // uncovered (runs after `inert` lifts) instead of dropping it to <body>.
  useEffect(() => {
    if (torn) calRef.current?.focus();
  }, [torn]);

  return (
    // The embed is the only in-flow child, so the container is always exactly
    // the calendar's box (Cal's script keeps a px height on its iframe) and
    // the pass — absolute inset-0 — matches it 1:1. Tearing changes nothing
    // about layout. min-h is just the pre-load floor.
    <div className="relative mx-auto max-w-4xl">
      {/*
       * The scheduler stays mounted under the pass so it is warm the moment
       * the stub tears. `inert` keeps it off the tab order until then —
       * otherwise keyboard focus lands on a calendar nobody can see.
       */}
      {/* No frame: the embed's iframe is transparent around the widget, so any
          backing box reads as a random color slab once the pass tears away. */}
      {/* Fixed box = the embed's rendered size (626 mobile / 538 desktop,
          watermark included — Cal reports the same px height at every
          viewport). Pass and calendar share this exact footprint; if Cal ever
          wants more, the iframe scrolls inside rather than moving the page. */}
      <div
        ref={calRef}
        tabIndex={-1}
        inert={!torn}
        className="h-156.5 overflow-y-auto outline-none md:h-134.5"
      >
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
        />
      </div>

      {/* Whole pass is the hit area; the stub button stays the accessible
          control (keyboard, label), this just lets clicks land anywhere. */}
      {!gone && (
        <div
          aria-hidden={torn}
          onClick={tearAway}
          className={`absolute inset-0 flex flex-col md:flex-row ${torn ? "pointer-events-none" : "cursor-pointer"}`}
        >
          {/*
           * Opaque backing. The two ripped edges interlock but do not seal
           * perfectly, and every pinhole would leak calendar through the seam.
           */}
          {/* Fades out during the break phase, while the halves still cover it —
            lingering longer would read as a third sheet left behind. */}
          <motion.div
            animate={{ opacity: torn ? 0 : 1 }}
            transition={torn ? { duration: 0.25, delay: 0.1 } : spring}
            className="bg-paper drop-shadow-paper absolute inset-0"
          />

          <motion.div
            animate={
              torn
                ? reduced
                  ? { opacity: 0 }
                  : sheetSlide(stacked)
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
            }
            transition={torn ? tearTransition : spring}
            className="tear-main paper-grain bg-paper text-ink relative -mb-3 flex min-w-0 flex-1 flex-col p-7 pb-10 md:-mr-3 md:mb-0 md:p-12 md:pr-14"
          >
            <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase md:text-xs">
              Boarding pass · Class: 1st / Discovery Call
            </p>
            <p className="font-display mt-3 text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
              Let&apos;s build something great
            </p>

            <div className="text-ink-faded flex flex-1 items-center gap-4 font-mono text-xs uppercase md:text-sm">
              <span className="font-bold">Ankit</span>
              <span className="border-ink-faded/60 h-px flex-1 border-t border-dashed" />
              <svg
                viewBox="0 0 24 24"
                className="size-5 md:size-6"
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

            <dl className="border-ink-faded/40 grid grid-cols-3 gap-4 border-t border-dashed pt-5">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-ink-faded font-mono text-[10px] tracking-widest uppercase">
                    {label}
                  </dt>
                  <dd className="font-mono text-xs font-bold uppercase md:text-sm">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* No onClick: clicks and Enter/Space bubble to the pass's handler. */}
          <motion.button
            type="button"
            disabled={torn}
            animate={
              torn
                ? reduced
                  ? { opacity: 0 }
                  : stubFall(stacked)
                : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
            }
            transition={torn ? tearTransition : spring}
            whileTap={{ scale: 0.97 }}
            className="tear-stub paper-grain bg-accent text-paper relative flex w-full cursor-pointer flex-row items-center justify-between gap-6 p-5 pt-8 text-left font-mono text-[11px] font-bold tracking-widest uppercase md:w-48 md:flex-col md:items-stretch md:p-7 md:pt-7 md:pl-9"
          >
            <span className="barcode block h-10 w-28 opacity-40 md:h-14 md:w-full" />
            Tear here to book ✂
          </motion.button>
        </div>
      )}
    </div>
  );
}
