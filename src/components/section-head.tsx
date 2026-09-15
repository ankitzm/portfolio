import type { ReactNode } from "react";

/**
 * The heading row every section and subpage shares: display title on the
 * left, mono meta on the right, baseline-aligned and wrapping on narrow
 * screens. `as` switches h1/h2 so subpages keep one h1 per document.
 */
export function SectionHead({
  title,
  meta,
  as: Tag = "h2",
  className = "",
}: {
  title: string;
  /** Right-hand annotation: a count, a link, a stamp line. */
  meta?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const size = Tag === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl";
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 ${className}`}
    >
      <Tag
        className={`font-display font-bold tracking-tight uppercase font-stretch-75% ${size}`}
      >
        {title}
      </Tag>
      {meta && (
        <p className="font-mono text-[11px] tracking-widest uppercase opacity-65">
          {meta}
        </p>
      )}
    </div>
  );
}
