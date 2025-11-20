'use client';
import { useEffect, useRef, useState } from "react";
import DelicateAsciiDots from "@/app/components/ui/delicate-ascii-dots";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  return (
    <div className="relative w-full h-screen font-sans overflow-hidden">
      <DelicateAsciiDots />
      <div className="relative z-10 flex items-center justify-center h-full font-san">
        <h1 className="text-4xl font-bold">Hi !!</h1>
      </div>
    </div>
  );
}
