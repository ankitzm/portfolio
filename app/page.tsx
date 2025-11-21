'use client';
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
        <Terminal className="max-h-[500px]">
          <AnimatedSpan delay={0}>$ whoami</AnimatedSpan>
          <TypingAnimation delay={800} duration={50}>
            Full Stack Developer & Creative Technologist
          </TypingAnimation>
          <AnimatedSpan delay={2500}>$ cat about.txt</AnimatedSpan>
          <TypingAnimation delay={3300} duration={40}>
            Building innovative web experiences with modern technologies.
          </TypingAnimation>
          <TypingAnimation delay={6000} duration={40}>
            Passionate about clean code, great UX, and solving complex problems.
          </TypingAnimation>
          <AnimatedSpan delay={9000}>$ ls skills/</AnimatedSpan>
          <TypingAnimation delay={9800} duration={30}>
            React • Next.js • TypeScript • Node.js • Solidity
          </TypingAnimation>
          <AnimatedSpan delay={12500}>$ echo $STATUS</AnimatedSpan>
          <TypingAnimation delay={13300} duration={50}>
            ✓ Available for opportunities
          </TypingAnimation>
          <AnimatedSpan delay={15500} className="text-green-500">
            $ _
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}
