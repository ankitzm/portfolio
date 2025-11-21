export interface TerminalLine {
  type: "command" | "output";
  text: string;
  delay: number;
  duration?: number;
  className?: string;
}

export const homeTerminalLines: TerminalLine[] = [
  {
    type: "command",
    text: "$ whoami",
    delay: 0,
    duration: 50,
    className: "text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Full Stack Developer & Creative Technologist",
    delay: 650,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ cat about.txt",
    delay: 2390,
    duration: 50,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Building innovative web experiences with modern technologies.",
    delay: 3290,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "output",
    text: "> Passionate about clean code, great UX, and solving complex problems.",
    delay: 5480,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ ls skills/",
    delay: 7910,
    duration: 50,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> React • Next.js • TypeScript • Node.js • Solidity",
    delay: 8660,
    duration: 25,
    className: "ml-2 text-tigers-eye font-medium",
  },
  {
    type: "command",
    text: "$ echo $STATUS",
    delay: 10260,
    duration: 50,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> ✓ Available for opportunities",
    delay: 11210,
    duration: 40,
    className: "ml-2 text-background-base/80 font-medium",
  },
  {
    type: "command",
    text: "$ _",
    delay: 12790,
    duration: 50,
    className: "text-background-base mt-2 font-semibold",
  },
];

