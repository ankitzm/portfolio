"use client";

import TerminalIntro from "@/app/components/TerminalIntro";
import DelicateAsciiDots from "@/app/components/ui/delicate-ascii-dots";

export default function Home() {
  return (
    <div className="relative w-full h-full font-sans overflow-hidden">
      <DelicateAsciiDots opacity={0.1} textColor="#0c3829" />
      <div className="relative z-10 flex items-center justify-center h-full font-san">
        <TerminalIntro />
      </div>
    </div>
  );
}
