"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? <Booking /> : <div className="h-156.5 md:h-134.5" />}
    </div>
  );
}
