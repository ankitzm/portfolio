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
    className: "text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Full Stack Developer & Creative Technologist",
    delay: 400,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ cat about.txt",
    delay: 1800,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Building innovative web experiences with modern technologies.",
    delay: 2400,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "output",
    text: "> Passionate about clean code, great UX, and solving complex problems.",
    delay: 4300,
    duration: 30,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ ls skills/",
    delay: 6400,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> React • Next.js • TypeScript • Node.js • Solidity",
    delay: 7000,
    duration: 25,
    className: "ml-2 text-tigers-eye font-medium",
  },
  {
    type: "command",
    text: "$ echo $STATUS",
    delay: 8600,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> ✓ Available for opportunities",
    delay: 9200,
    duration: 40,
    className: "ml-2 text-background-base/80 font-medium",
  },
  {
    type: "command",
    text: "$ _",
    delay: 10500,
    className: "text-background-base mt-2 font-semibold",
  },
];

