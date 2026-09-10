"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const items = [
  { href: "/projects", label: "Projects", note: "12 items to declare" },
  { href: "/experience", label: "Experience", note: "passport on file" },
  { href: "/#booking", label: "Let's talk", note: "postage paid" },
];

const socials = [
  ["GitHub", "https://github.com/ankitzm"],
  ["X", "https://x.com/ankitzm"],
  ["Medium", "https://medium.com/@0xblocktrain"],
] as const;

/**
 * Mobile menu as a customs declaration form. Native <dialog>: focus trap,
 * Esc and inert background come free. Tapping a line ticks its box, then
 * the route changes and the form closes.
 */
export function CustomsMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [ticked, setTicked] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const declare = (href: string) => {
    setTicked(href);
    setTimeout(() => {
      router.push(href);
      onClose();
      setTicked(null);
    }, 260);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      data-lenis-prevent
      aria-label="Menu"
      className="customs paper-grain"
    >
      <div className="flex min-h-full flex-col px-5 pt-4 pb-8">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-extrabold tracking-tight uppercase">
            AS
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-faded min-h-11 font-mono text-xs tracking-widest uppercase"
          >
            Close ×
          </button>
        </div>

        <h2 className="font-display mt-10 text-4xl font-extrabold tracking-tight uppercase font-stretch-75%">
          Customs declaration
        </h2>
        <p className="text-ink-faded mt-1 font-mono text-[11px] tracking-widest uppercase">
          Form 22 · items to declare
        </p>

        <ol className="border-rule mt-8 border-t">
          {items.map((item, i) => {
            const on = ticked === item.href;
            return (
              <li key={item.href} className="border-rule border-b">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    declare(item.href);
                  }}
                  className="flex min-h-16 items-center gap-4 py-4"
                >
                  <span className="text-ink-faded font-mono text-xs">
                    {i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`border-ink grid size-5 place-items-center border-2 font-mono text-sm leading-none transition-colors ${
                      on ? "bg-ink text-paper" : ""
                    }`}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span className="font-display text-2xl font-bold tracking-tight uppercase">
                    {item.label}
                  </span>
                  <span className="border-rule mx-1 flex-1 border-b border-dotted" />
                  <span className="text-ink-faded font-mono text-[11px] lowercase">
                    {item.note}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex items-end justify-between pt-10">
          <div className="flex flex-col gap-2 font-mono text-[11px] tracking-widest uppercase">
            {socials.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rubber-stamp min-h-11 text-[11px]"
          >
            Stamp &amp; close
          </button>
        </div>
      </div>
    </dialog>
  );
}
