"use client";

import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { preconnect } from "react-dom";

// Cal.com embed is ~400K; keep it out of the initial bundle. Load it only
// once the booking section nears the viewport.
const Booking = dynamic(
  () => import("@/components/booking").then((m) => m.Booking),
  {
    ssr: false,
    loading: () => <div className="h-156.5 md:h-134.5" aria-busy="true" />,
  },
);

export function BookingLazy() {
  // SSR-hoisted into <head> (this wrapper renders on the server; Booking does
  // not), so the cal.com connection is warm before the embed mounts.
  preconnect("https://app.cal.com");

  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true, margin: "600px" });

  return (
    <div ref={ref}>
      {show ? <Booking /> : <div className="h-156.5 md:h-134.5" />}
    </div>
  );
}
