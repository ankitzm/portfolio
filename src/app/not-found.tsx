import Link from "next/link";

/** Return to sender: the envelope that never found its address. */
export default function NotFound() {
  return (
    <main
      data-ground="paper"
      className="mx-auto grid min-h-[70dvh] max-w-350 items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:px-14"
    >
      <div className="airmail-edge soft-shadow-paper paper-grain bg-surface text-ink relative -rotate-3 p-8 md:p-12">
        <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase">
          To:
        </p>
        <p className="border-rule mt-1 border-b border-dotted pb-1 font-mono text-sm uppercase">
          /route-that-does-not-exist
        </p>
        <p className="border-rule mt-3 border-b border-dotted pb-1 font-mono text-sm uppercase">
          Somewhere on the internet
        </p>
        <span className="rubber-stamp absolute top-6 right-6 text-xs md:text-sm">
          Return to sender
        </span>
        <span className="rubber-stamp absolute -bottom-4 left-8 rotate-6 rounded-full px-4 py-3 text-[10px]">
          Addressee unknown · 404
        </span>
      </div>
      <div>
        <p className="font-mono text-sm lowercase">
          this address doesn&apos;t exist on this route.
        </p>
        <Link
          href="/"
          className="hover-lift border-ink bg-surface hover:text-accent mt-6 inline-flex min-h-11 items-center gap-3 border-2 px-5 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
        >
          Back to the desk
          <span aria-hidden="true" className="barcode h-4 w-10" />
        </Link>
      </div>
    </main>
  );
}
