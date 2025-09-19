'use client';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const durationMs = 6000;
    const steps = [0, 1, 2, 6, 16, 38, 60, 88, 97, 99, 100];
    const interval = durationMs / (steps.length - 1);

    // Schedule percentage jumps
    steps.forEach((value, index) => {
      const id = window.setTimeout(() => setProgress(value), Math.round(index * interval));
      timeoutsRef.current.push(id);
    });

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Video background */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 20px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 20px), transparent 100%)'
        }}
        autoPlay
        muted
        playsInline
      >
        <source src="/video-bg.webm" type="video/webm" />
      </video>

      <div className="fixed bottom-4 right-4 text-sm sm:text-base font-mono tracking-wider px-3 py-1 rounded-md bg-black/40 text-icterine backdrop-blur-md">
        {progress}% {progress < 100 ? "loading" : "loaded"}
      </div>
    </div>
  );
}
