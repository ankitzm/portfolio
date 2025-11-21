"use client";

import Image from "next/image";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/app/components/ui/terminal";
import { homeTerminalLines, type TerminalLine } from "@/app/data/terminalContent";

interface TerminalIntroProps {
  lines?: TerminalLine[];
  showWave?: boolean;
  className?: string;
}

export default function TerminalIntro({
  lines = homeTerminalLines,
  showWave = true,
  className = "",
}: TerminalIntroProps) {
  return (
    <div className="relative w-full max-w-lg px-2">
      {/* Wave GIF - only visible on mobile */}
      {showWave && (
        <div className="absolute -top-16 -right-0 pr-4 z-20">
          <Image
            src="/wave.gif"
            alt="Wave"
            width={60}
            height={60}
            unoptimized
          />
        </div>
      )}
      
      <Terminal className={`max-h-[550px] w-full ${className}`}>
        {lines.map((line, index) =>
          (
            <TypingAnimation
              key={index}
              delay={line.delay}
              duration={line.duration || 50}
              className={line.className}
            >
              {line.text}
            </TypingAnimation>
          )
        )}
      </Terminal>
    </div>
  );
}

