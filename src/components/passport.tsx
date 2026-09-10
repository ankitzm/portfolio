"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

import type { Experience } from "@/types";

/* ------------------------------------------------------------------ data */

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders the [label](href) links used in experience bullets. */
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [full, label, href] = m;
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a
        key={`${href}-${m.index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="decoration-accent/60 hover:decoration-accent underline underline-offset-2"
      >
        {label}
      </a>,
    );
    last = m.index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Data color field → ink class for the visa's title, border and stamp. */
const ink: Record<string, string> = {
  black: "text-ink",
  red: "text-ink-red",
  purple: "text-ink-purple",
  orange: "text-ink-orange",
};

/** "October '25 - Present" → "OCT 25" for the entry stamp. */
const entryDate = (date: string) => {
  const [from] = date.split(/\s[-–]\s/);
  const [month, year] = from.split(" ");
  return `${month.slice(0, 3)} ${year?.replace("'", "") ?? ""}`.toUpperCase();
};

/** Most-used skills across the record, for the ID page. */
function topSkills(entries: Experience[], n = 8) {
  const count = new Map<string, number>();
  for (const e of entries)
    for (const s of e.skills) count.set(s, (count.get(s) ?? 0) + 1);
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([s]) => s);
}

/* ----------------------------------------------------------------- pages */

function Chips({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-1 ${className}`}>
      {items.map((s) => (
        <li
          key={s}
          className="border-rule border px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Round rubber imprint; scales down onto the page when `landed`. */
function RoundStamp({
  lines,
  landed,
  className = "",
}: {
  lines: [string, string, string?];
  landed: boolean;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={
        landed ? { scale: 1, opacity: 0.85 } : { scale: 1.35, opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`pointer-events-none absolute grid size-24 place-content-center rounded-full border-[2.5px] border-current text-center font-mono uppercase mix-blend-multiply md:size-28 ${className}`}
    >
      <span className="absolute inset-1.5 rounded-full border border-dashed border-current" />
      <span className="text-[8px] tracking-[0.2em]">{lines[0]}</span>
      <span className="text-sm leading-tight font-bold md:text-base">
        {lines[1]}
      </span>
      {lines[2] && (
        <span className="text-[8px] tracking-[0.2em]">{lines[2]}</span>
      )}
    </motion.div>
  );
}

function IdPage({
  entries,
  hasPortrait,
  landed,
}: {
  entries: Experience[];
  hasPortrait: boolean;
  landed: boolean;
}) {
  const fields = [
    ["1. Forename", "Ankit"],
    ["2. Surname", "Singh"],
    ["3. Trade", "Software developer"],
    ["4. Issued", "2021 · valid indefinitely"],
  ];
  return (
    <div className="pp-face">
      <p className="text-ink-faded font-mono text-[9px] tracking-[0.2em] uppercase">
        Republic of shipped software · passport
      </p>
      <div className="mt-4 flex gap-4">
        <div className="bg-paper border-rule relative size-20 shrink-0 overflow-hidden border md:size-24">
          {hasPortrait ? (
            <Image
              src="/portrait.jpg"
              alt=""
              fill
              sizes="96px"
              className="object-cover grayscale"
            />
          ) : (
            <span className="text-ink-faded absolute inset-0 grid place-items-center font-mono text-[8px] tracking-widest uppercase">
              Photo
            </span>
          )}
        </div>
        <dl className="min-w-0 flex-1 font-mono text-[10px] tracking-wider uppercase md:text-[11px]">
          {fields.map(([k, v]) => (
            <div
              key={k}
              className="border-rule flex justify-between gap-3 border-b border-dotted py-1.5"
            >
              <dt className="text-ink-faded shrink-0">{k}</dt>
              <dd className="truncate text-right font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="text-ink-faded mt-5 font-mono text-[9px] tracking-[0.2em] uppercase">
        Declared skills
      </p>
      <Chips items={topSkills(entries)} className="mt-2" />
      <RoundStamp
        lines={["Certified", "Full-stack", "since 2021"]}
        landed={landed}
        className="text-accent right-3 bottom-3 rotate-[-8deg]"
      />
    </div>
  );
}

function VisaPage({
  entry,
  n,
  landed,
}: {
  entry: Experience;
  n: number;
  landed: boolean;
}) {
  const heading = entry.company || entry.role;
  const role = entry.company ? entry.role : "independent";
  const color = ink[entry.color] ?? ink.black;
  return (
    <div className={`pp-face ${color}`}>
      <div className="text-ink-faded flex justify-between gap-3 font-mono text-[9px] tracking-[0.2em] uppercase">
        <span>Visa №{String(n).padStart(2, "0")}</span>
        <span>{entry.date}</span>
      </div>
      <h3 className="font-display mt-3 text-2xl leading-none font-bold tracking-tight uppercase font-stretch-75% md:mt-4 md:text-4xl">
        {heading}
      </h3>
      <p className="font-annotation text-ink-faded mt-1.5 text-lg leading-none md:text-2xl">
        {role}
      </p>
      <ul className="text-ink mt-4 space-y-1.5 text-[12px] leading-snug md:mt-6 md:space-y-2.5 md:text-sm md:leading-relaxed">
        {entry.description.slice(0, 4).map((line, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="text-ink-faded">
              —
            </span>
            <span className="line-clamp-2 md:line-clamp-none">
              {withLinks(line)}
            </span>
          </li>
        ))}
      </ul>
      <Chips
        items={entry.skills.slice(0, 6)}
        className="text-ink mt-auto pt-3 pr-28"
      />
      <RoundStamp
        lines={["Entry", entryDate(entry.date), "shipped"]}
        landed={landed}
        className="right-2 bottom-2 rotate-[7deg]"
      />
    </div>
  );
}

function NotePage({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta?: ReactNode;
}) {
  return (
    <div className="pp-face items-center justify-center text-center">
      <p className="text-ink-faded font-mono text-[9px] tracking-[0.2em] uppercase">
        {title}
      </p>
      <p className="font-display mt-3 max-w-[14ch] text-2xl leading-none font-bold tracking-tight uppercase font-stretch-75%">
        {body}
      </p>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ book */

type Face = ReactNode;

function Leaf({
  k,
  total,
  progress,
  stacked,
  front,
  back,
}: {
  k: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
  front: Face;
  back: Face;
}) {
  const t = useTransform(progress, (v) => Math.min(1, Math.max(0, v - k)));
  const transform = useTransform(t, (v) =>
    stacked ? `rotateX(${v * 180}deg)` : `rotateY(${v * -180}deg)`,
  );
  const zIndex = useTransform(t, (v) =>
    v <= 0 ? total - k : v >= 1 ? k + 1 : total + 2,
  );
  const shade = useTransform(t, [0, 0.5, 1], [0, 0.35, 0]);
  return (
    <motion.div style={{ transform, zIndex }} className="pp-leaf">
      <div className="pp-side pp-front">{front}</div>
      <div className="pp-side pp-back">{back}</div>
      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pp-shade"
      />
    </motion.div>
  );
}

/**
 * Pinned passport. Scrolling turns the pages: horizontally (spine vertical)
 * from md up, vertically (spine horizontal, pages lift bottom→top) below.
 * Page 0 is the ID page on the base; visas ride on leaves, two per leaf.
 * Reduced motion: pages laid out as a plain stack.
 */
export function Passport({
  entries,
  hasPortrait,
  home = false,
}: {
  entries: Experience[];
  hasPortrait: boolean;
  /** Home teaser ends on a "continued" page linking to the full record. */
  home?: boolean;
}) {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const mq = matchMedia("(width < 48rem)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Faces in reading order: ID, visas…, and on the home teaser a closing
  // note. Leaves pair faces up (front, back). With an odd face count the
  // last back is real and every leaf flips onto blank end paper; with an
  // even count the last leaf stays put and its front is the final page.
  const faces: Face[] = [
    <IdPage
      key="id"
      entries={entries}
      hasPortrait={hasPortrait}
      landed={current === 0}
    />,
    ...entries.map((e, i) => (
      <VisaPage
        key={e.company + e.role}
        entry={e}
        n={i + 1}
        landed={Math.abs(current * 2 - (i + 1)) <= 1}
      />
    )),
  ];
  if (home)
    faces.push(
      <NotePage
        key="more"
        title="Continued"
        body="More stamps on file"
        cta={
          <Link
            href="/experience"
            className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-11 items-center border-2 px-4 font-mono text-[11px] font-bold tracking-widest uppercase transition-colors"
          >
            Full passport →
          </Link>
        }
      />,
    );
  const leaves: [Face, Face][] = [];
  for (let i = 1; i < faces.length; i += 2)
    leaves.push([faces[i], faces[i + 1] ?? <div className="pp-face" />]);
  const allFlip = faces.length % 2 === 1;
  const flips = allFlip ? leaves.length : leaves.length - 1;
  const moving = allFlip ? leaves : leaves.slice(0, -1);
  const baseB = allFlip ? (
    <div className="pp-face items-center justify-center">
      <span className="text-ink-faded font-mono text-[9px] tracking-[0.3em] uppercase">
        Pages reserved for future entries
      </span>
    </div>
  ) : (
    leaves[leaves.length - 1][0]
  );

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });
  const progress = useTransform(eased, [0.04, 0.96], [0, flips], {
    clamp: true,
  });
  useMotionValueEvent(progress, "change", (v) => setCurrent(Math.round(v)));

  if (reduced) {
    return (
      <div className="pp-flat mx-auto grid max-w-3xl gap-6">
        {faces.map((f, i) => (
          <div key={i} className="pp-page">
            {f}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrap} style={{ height: `calc(100lvh + ${flips} * 85lvh)` }}>
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-4 pt-20">
        <div className={`pp-book ${stacked ? "pp-stacked" : ""}`}>
          <div className="pp-cover" />
          <div className="pp-page pp-base-a">{faces[0]}</div>
          <div className="pp-page pp-base-b">{baseB}</div>
          {moving.map(([front, back], k) => (
            <Leaf
              key={k}
              k={k}
              total={flips}
              progress={progress}
              stacked={stacked}
              front={front}
              back={back}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest opacity-70">
          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(flips + 1).padStart(2, "0")}
          </span>
          <span className="flex gap-1.5">
            {Array.from({ length: flips + 1 }, (_, i) => (
              <i
                key={i}
                className={`block size-1.5 rounded-full ${i === current ? "bg-current" : "bg-current/30"}`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
