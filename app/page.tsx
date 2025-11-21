'use client';
import Image from "next/image";
import DelicateAsciiDots from "@/app/components/ui/delicate-ascii-dots";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/app/components/ui/terminal";

export default function Home() {
  return (
    <div className="relative w-full h-screen font-sans overflow-hidden">
      <DelicateAsciiDots />
      <div className="relative z-10 flex items-center justify-center h-full font-san">
        <div className="relative w-full max-w-lg px-2">
          {/* Wave GIF - only visible on mobile */}
          <div className="absolute -top-16 -right-0 pr-4 z-20">
            <Image
              src="/wave.gif"
              alt="Wave"
              width={60}
              height={60}
              unoptimized
            />
          </div>
          <Terminal className="max-h-[550px] w-full">
          <AnimatedSpan delay={0} className="text-background-base font-semibold">$ whoami</AnimatedSpan>
          <TypingAnimation delay={800} duration={50} className="ml-2 text-text-base/90">
            &gt; Full Stack Developer & Creative Technologist
          </TypingAnimation>
          <AnimatedSpan delay={2500} className="mt-2 text-background-base font-semibold">$ cat about.txt</AnimatedSpan>
          <TypingAnimation delay={3300} duration={40} className="ml-2 text-text-base/90">
            &gt; Building innovative web experiences with modern technologies.
          </TypingAnimation>
          <TypingAnimation delay={6000} duration={40} className="ml-2 text-text-base/90">
            &gt; Passionate about clean code, great UX, and solving complex problems.
          </TypingAnimation>
          <AnimatedSpan delay={9000} className="mt-2 text-background-base font-semibold">$ ls skills/</AnimatedSpan>
          <TypingAnimation delay={9800} duration={30} className="ml-2 text-tigers-eye font-medium">
            &gt; React • Next.js • TypeScript • Node.js • Solidity
          </TypingAnimation>
          <AnimatedSpan delay={12500} className="mt-2 text-background-base font-semibold">$ echo $STATUS</AnimatedSpan>
          <TypingAnimation delay={13300} duration={50} className="ml-2 text-background-base/80 font-medium">
            &gt; ✓ Available for opportunities
          </TypingAnimation>
          <AnimatedSpan delay={15500} className="text-background-base mt-2 font-semibold">
            $ _
          </AnimatedSpan>
        </Terminal>
        </div>
      </div>
    </div>
  );
}
