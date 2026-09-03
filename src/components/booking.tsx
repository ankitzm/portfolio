"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { useEffect, useState } from "react";
import { preconnect } from "react-dom";

const CAL_NAMESPACE = "15min";
const CAL_LINK = "ankitzm/15min";

const spring = { type: "spring", stiffness: 90, damping: 15 } as const;

/*
 * Two-phase tear: keyframe 1 is the fibers giving way — a small, decelerating
 * shift — then the halves accelerate apart on a hard ease-in. `times` holds
 * the break at the first third so the pause reads before the whoosh.
 */
const tearTransition: Transition = {
  duration: 0.9,
  times: [0, 0.35, 1],
  ease: ["easeOut", [0.6, 0, 0.9, 0.3]],
};

/** Break + fly-apart keyframes along one axis. */
const tear = (axis: "x" | "y", dir: 1 | -1) => ({
  [axis]: [0, 14 * dir, (axis === "x" ? 560 : 440) * dir],
  rotate: [0, 0.6 * dir, 2.5 * dir],
  opacity: [1, 1, 0],
});

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
  // SSR-hoisted into <head>: the browser opens the cal.com connection while
  // the JS bundle is still parsing, so the embed (which mounts eagerly under
  // the pass) has its data before anyone can reach the tear button.
  preconnect("https://app.cal.com");

  const [torn, setTorn] = useState(false);
  // Overlay unmounts after the tear finishes — a transformed, invisible pass
  // would otherwise keep stretching the scrollable area. Timer, not
  // onAnimationComplete: that callback also fires for the whileTap release,
  // which lands right after the click and would unmount the pass mid-tear.
  const [gone, setGone] = useState(false);
  const tearAway = () => {
    setTorn(true);
    setTimeout(() => setGone(true), 1000);
  };
  const reduced = useReducedMotion();
  // Stacked ticket (below md) tears along a horizontal seam, so the halves
  // part vertically; side-by-side parts horizontally.
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(width < 48rem)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

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
        inert={!torn}
        className="h-156.5 overflow-y-auto md:h-134.5"
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
                  : tear(stacked ? "y" : "x", -1)
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
            }
            transition={torn ? tearTransition : spring}
            className="tear-main paper-grain bg-paper text-ink relative -mb-3 flex min-w-0 flex-1 flex-col p-7 pb-10 md:-mr-3 md:mb-0 md:p-12 md:pr-14"
          >
            <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase md:text-xs">
              Boarding pass · Class: 1st / Discovery Call
            </p>
            <p className="font-display mt-3 text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
              Let&apos;s build something cool ! <br />
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

          <motion.button
            type="button"
            onClick={tearAway}
            disabled={torn}
            animate={
              torn
                ? reduced
                  ? { opacity: 0 }
                  : tear(stacked ? "y" : "x", 1)
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
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
