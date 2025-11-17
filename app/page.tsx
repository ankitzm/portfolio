'use client';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  return (
    <div className="font-sans border-2  border-e-indigo-100">
      Hi i am ankit singh
    </div>
  );
}
