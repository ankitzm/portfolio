export function Hero() {
  return (
    <section className="px-5 md:px-14">
      <div className="hero-exit flex min-h-[calc(100dvh-56px)] flex-col justify-between pt-10 pb-10 md:pt-14 md:pb-14">
        <div>
          <p className="load-fade text-mute mb-7 font-mono text-xs [animation-delay:.1s] md:mb-9">
            ( SOFTWARE DEVELOPER, EST. 2021 )
          </p>
          <h1 className="text-[13vw] leading-none font-black tracking-[-0.04em] uppercase md:text-[clamp(64px,8.6vw,124px)] md:tracking-tighter">
            <span className="block overflow-hidden">
              <span className="load-mask block [animation-delay:.2s]">
                Builds digital
              </span>
            </span>
            <span className="block overflow-hidden normal-case">
              <span className="load-mask block pb-1 leading-[1.1] font-medium italic [animation-delay:.35s] md:pl-[5vw]">
                products people feel,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="load-mask block leading-[1.05] [animation-delay:.5s]">
                end to end.
              </span>
            </span>
          </h1>
        </div>
        <p className="load-fade text-mute max-w-md text-[15px] leading-relaxed [animation-delay:1s]">
          Web3 products, SDKs and interfaces with character. Four years of
          shipping, from Router Protocol to freelance.
        </p>
      </div>
    </section>
  );
}
