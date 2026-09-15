"use client";

import { useEffect, useState } from "react";

/** Live matchMedia. False on the server and on first paint. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** True below the md breakpoint, where side-by-side layouts stack. */
export const useStacked = () => useMedia("(width < 48rem)");
