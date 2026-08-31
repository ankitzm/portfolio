import type { ReactNode } from "react";

import { getExperience } from "@/lib/data";
import type { Experience as ExperienceEntry } from "@/types";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders the `[label](href)` links used in experience bullets. Not a markdown
 * parser — the data only ever uses inline links.
 */
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
        className="decoration-faint hover:decoration-ink underline underline-offset-2 transition-colors"
      >
        {label}
      </a>,
    );
    last = match.index + full.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

export async function Experience() {
  const entries = await getExperience();
  const stack = [...new Set(entries.flatMap((entry) => entry.skills))];

  return (
    <section
      id="experience"
      className="scroll-mt-16 px-5 pt-24 pb-16 md:px-14 md:pt-32"
    >
      <div className="overflow-hidden">
        <h2 className="reveal-mask text-[clamp(32px,4.5vw,56px)] leading-none font-black tracking-tight uppercase">
          Experience
        </h2>
      </div>

      <div className="relative mt-10 pl-7 md:mt-14 md:ml-60">
        <div className="reveal-grow bg-ink absolute top-1.5 bottom-1.5 left-0 w-px" />
        {entries.map((entry) => (
          <ExperienceItem
            key={`${entry.company}-${entry.role}`}
            entry={entry}
          />
        ))}
      </div>

      <div className="reveal text-mute mt-20 grid gap-8 font-mono text-xs leading-relaxed md:mt-28 md:grid-cols-[240px_1fr]">
        <span className="text-[11px] uppercase">Stack</span>
        <span>{stack.join(", ")}</span>
      </div>
    </section>
  );
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  // The freelance entry has no company and carries its name in `role`.
  const heading = entry.company || entry.role;
  const subtitle = entry.company ? entry.role : "";

  return (
    <div className="reveal-slide mb-9 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg font-bold tracking-tight">
          {heading}
          {subtitle && (
            <span className="text-mute ml-2 font-medium italic">
              {subtitle}
            </span>
          )}
        </h3>
        <span className="text-faint font-mono text-[11px] uppercase">
          {entry.date}
        </span>
      </div>
      <ul className="text-mute mt-2 max-w-xl space-y-1.5 text-sm leading-relaxed">
        {entry.description.map((line, i) => (
          <li
            key={`${heading}-${i}`}
            className="before:text-faint before:mr-2 before:content-['—']"
          >
            {withLinks(line)}
          </li>
        ))}
      </ul>
      <p className="text-faint mt-3 max-w-xl font-mono text-[11px] uppercase">
        {entry.skills.join(" · ")}
      </p>
    </div>
  );
}
