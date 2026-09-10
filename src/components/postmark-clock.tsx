"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IST = "Asia/Kolkata";
const IST_OFFSET_MIN = 330;

const hhmm = (d: Date, timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

const dateLabel = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(d)
    .toUpperCase();

/** "+4H 30M AHEAD OF YOU" from the visitor's point of view. */
function offsetLabel(d: Date) {
  const diff = IST_OFFSET_MIN + d.getTimezoneOffset();
  if (diff === 0) return "SAME TIME AS YOU";
  const h = Math.floor(Math.abs(diff) / 60);
  const m = Math.abs(diff) % 60;
  const span = `${h ? `${h}H` : ""}${m ? ` ${m}M` : ""}`.trim();
  return `${span} ${diff > 0 ? "AHEAD OF" : "BEHIND"} YOU`;
}

function zoneAbbr(d: Date) {
  return (
    new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
      .formatToParts(d)
      .find((p) => p.type === "timeZoneName")?.value ?? ""
  );
}

/** One eye: pupil follows the pointer, spring-damped. */
function Eye({ cx, cy }: { cx: number; cy: number }) {
  const ref = useRef<SVGGElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.min(3, Math.hypot(dx, dy) / 60);
      const a = Math.atan2(dy, dx);
      x.set(Math.cos(a) * dist);
      y.set(Math.sin(a) * dist);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <g ref={ref}>
      <circle
        cx={cx}
        cy={cy}
        r="7"
        fill="var(--color-surface)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="3"
        fill="currentColor"
        style={{ x, y }}
      />
    </g>
  );
}

/**
 * Circular postmark that tells Ankit's time (IST), the visitor's own time,
 * and the gap between them. Time is client-only to avoid hydration drift.
 */
export function PostmarkClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ring = "NEW DELHI · INDIA · IST · ";

  return (
    <div className={`text-ink relative ${className}`}>
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
        <defs>
          <path
            id="pm-ring"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <text
          fontFamily="var(--font-courier)"
          fontSize="11.5"
          letterSpacing="2.2"
          fill="currentColor"
          opacity="0.85"
        >
          <textPath href="#pm-ring">{ring.repeat(2)}</textPath>
        </text>
        <Eye cx={88} cy={66} />
        <Eye cx={112} cy={66} />
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontFamily="var(--font-courier)"
          fontWeight="700"
          fontSize="30"
          fill="currentColor"
        >
          {now ? hhmm(now, IST) : "--:--"}
        </text>
        <text
          x="100"
          y="132"
          textAnchor="middle"
          fontFamily="var(--font-courier)"
          fontSize="10"
          letterSpacing="1.5"
          fill="currentColor"
          opacity="0.7"
        >
          {now ? dateLabel(now) : ""}
        </text>
      </svg>
      <p className="text-ink-faded sr-only">
        Ankit&apos;s local time in New Delhi
      </p>
      <p className="text-ink-faded mt-3 font-mono text-[10px] leading-relaxed tracking-widest uppercase">
        {now ? (
          <>
            You · {hhmm(now)} {zoneAbbr(now)}
            <br />
            <span className="text-accent">{offsetLabel(now)}</span>
          </>
        ) : (
          <>
            &nbsp;
            <br />
            &nbsp;
          </>
        )}
      </p>
    </div>
  );
}
