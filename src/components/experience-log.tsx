"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { type ReactNode, useRef } from "react";

import type { Experience } from "@/types";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders the [label](href) links used in experience bullets. */
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="decoration-accent/60 hover:decoration-accent underline underline-offset-2"
      >
        {label}
      </a>,
    );
    last = match.index + full.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Data color field → visa ink token class. */
const inkClass: Record<string, string> = {
  black: "border-visa-paper text-visa-paper",
  red: "border-visa-red text-visa-red",
  purple: "border-visa-purple text-visa-purple",
  orange: "border-visa-orange text-visa-orange",
};

/**
 * Visa blocks on the passport-navy ground with a scroll-driven timeline
 * fill down the left rail. Data arrives as props; this stays the only
 * client boundary of the section.
 */
export function ExperienceLog({ entries }: { entries: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className="relative pl-7 md:pl-12">
      <div className="bg-visa-paper/20 absolute top-1 bottom-1 left-1.5 w-0.5" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="bg-accent absolute top-1 bottom-1 left-1.5 w-0.5 origin-top"
      />
      <div className="space-y-10">
        {entries.map((entry) => {
          const heading = entry.company || entry.role;
          const subtitle = entry.company ? entry.role : "";
          return (
            <motion.article
              key={`${entry.company}-${entry.role}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`border-2 p-5 md:p-6 ${inkClass[entry.color] ?? inkClass.black}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-bold tracking-tight uppercase">
                  {heading}
                </h3>
                <span className="font-mono text-[11px] tracking-wider uppercase opacity-80">
                  {entry.date}
                </span>
              </div>
              {subtitle && (
                <p className="font-annotation text-paper/80 mt-0.5 text-xl">
                  {subtitle}
                </p>
              )}
              <ul className="text-paper/85 mt-3 max-w-2xl space-y-1.5 text-sm leading-relaxed">
                {entry.description.map((line, i) => (
                  <li
                    key={`${heading}-${i}`}
                    className="before:mr-2 before:opacity-60 before:content-['—']"
                  >
                    {withLinks(line)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] tracking-wider uppercase opacity-70">
                {entry.skills.join(" · ")}
              </p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
