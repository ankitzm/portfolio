/**
 * The franking desk: postcard headline, OPEN FOR WORK imprint, and on
 * desktop a polaroid postmark pinned to the postcard's corner. The
 * polaroid holds a paper placeholder until a real portrait lands in
 * public/ (docs/DESIGN.md open item).
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-350 px-5 pt-10 pb-20 md:px-14 md:pt-16 md:pb-28">
      <div className="relative">
        {/* Postcard */}
        <div className="soft-shadow-paper hover-lift bg-green-100 border-rule relative -rotate-1 border p-7 md:p-12">
          <p className="load-fade text-ink-faded mb-6 font-mono text-xs tracking-widest uppercase [animation-delay:.1s]">
            ( Software developer, est. 2021 )
          </p>
          <h1 className="font-display text-ink text-[13vw] leading-[0.95] font-extrabold tracking-tight uppercase font-stretch-75% md:text-9xl">
            <span className="block overflow-hidden">
              <span className="load-mask block [animation-delay:.2s]">
                Ships
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="load-mask block [animation-delay:.35s]">
                Software,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="load-mask block [animation-delay:.5s]">
                End to End
              </span>
            </span>
          </h1>
          <p className="load-fade text-ink-faded mt-6 max-w-md font-mono text-xs lowercase [animation-delay:.9s]">
            web3 products, SDKs &amp; interfaces · from Router Protocol to
            freelance
          </p>

          <div className="border-rule mt-8 border-t-2 border-dotted pt-4">
            <p className="load-fade text-ink-faded font-mono text-[10px] tracking-wider uppercase [animation-delay:1.1s]">
              (01) Postcard&ensp;(02) Postmark&ensp;(03) Stamp&ensp;(04) Route
            </p>
          </div>
        </div>

        {/* Polaroid postmark — desktop only; mobile hero carries no photo */}
        <div className="soft-shadow-paper bg-surface absolute -top-6 right-0 z-10 hidden w-56 rotate-6 p-2 mix-blend-multiply lg:block">
          <div className="deckle bg-ink/10">
            <div className="bg-paper relative aspect-square">
              <span className="text-ink-faded absolute inset-0 grid place-items-center font-mono text-[10px] tracking-widest uppercase">
                Portrait in transit
              </span>
            </div>
          </div>
          <p className="text-ink-faded px-1 pt-2 pb-1 text-right font-mono text-[10px] uppercase">
            Reg. №01
          </p>
        </div>

        {/* OPEN FOR WORK — decorative imprint, deliberately not a control */}
        <div className="load-slam mt-8 [animation-delay:1.3s] md:absolute md:-right-4 md:-bottom-10 md:mt-0">
          <span className="rubber-stamp text-sm">Open for work</span>
        </div>
      </div>
    </section>
  );
}
