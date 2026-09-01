import type { Metadata } from "next";

import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dispatches — Ankit Singh",
  description: "Letters sent outward: articles and notes.",
};

export default async function DispatchesPage() {
  const posts = await getPosts();

  return (
    <main className="bg-ground-news">
      <div className="text-ink mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
            Dispatches
          </h1>
          <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase">
            Letters sent outward
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border-rule grid place-items-center gap-4 border-2 border-dashed px-6 py-20 text-center">
            <svg
              viewBox="0 0 48 32"
              className="text-ink-faded h-12 w-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M2 8h44v22H2V8Zm0 0 22 14L46 8M14 8 24 2l10 6" />
            </svg>
            <p className="text-ink-faded max-w-xs font-mono text-xs leading-relaxed tracking-wider uppercase">
              Nothing in the outbox yet — the first dispatch is being typed.
            </p>
          </div>
        ) : (
          <ul className="divide-rule border-rule divide-y border-y">
            {posts.map((post) => (
              <li key={post.url}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline gap-4 py-6"
                >
                  <span className="text-ink-faded shrink-0 font-mono text-[11px] uppercase">
                    {post.date}
                  </span>
                  <span className="group-hover:text-accent min-w-0 flex-1 truncate font-medium transition-colors">
                    {post.title}
                  </span>
                  <span className="text-ink-faded shrink-0 font-mono text-[11px] uppercase">
                    {post.minutes} min
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
