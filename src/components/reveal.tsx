"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

/** Honors prefers-reduced-motion for every motion component below it. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Scroll-in reveal: rises and settles into its resting rotation like a
 * paper object being laid on the desk. Children stay server-rendered.
 */
export function Reveal({
  children,
  index = 0,
  rotate = 0,
  className,
}: {
  children: ReactNode;
  /** Position in a stagger group; delays 60ms per step. */
  index?: number;
  /** Resting rotation in degrees. */
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate + 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.06,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
