"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

/**
 * Small rounded-rectangle clock: Ankit's local time (IST), ticking.
 * Client-only so server/client markup can't disagree on the minute.
 */
export function TimeBadge({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`border-ink text-ink inline-flex flex-col items-start rounded-2xl border-2 px-4 py-2.5 ${className}`}
    >
      <span className="text-ink-faded font-mono text-[9px] tracking-[0.2em] uppercase">
        New Delhi · IST
      </span>
      <span
        className="font-mono text-2xl font-bold tabular-nums md:text-3xl"
        suppressHydrationWarning
      >
        {time ?? " "}
      </span>
    </div>
  );
}
