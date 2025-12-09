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
    duration: 35,
    className: "text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> i am Ankit Singh, a Full Stack Developer & Creative Technologist",
    delay: 465,
    duration: 22,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ cat about.txt",
    delay: 1671,
    duration: 35,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> Building innovative web experiences with modern technologies.",
    delay: 2281,
    duration: 22,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "output",
    text: "> Passionate about clean code, great UX, and solving complex problems.",
    delay: 3743,
    duration: 22,
    className: "ml-2 text-text-base/90",
  },
  {
    type: "command",
    text: "$ ls skills/",
    delay: 5355,
    duration: 35,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> React • Next.js • TypeScript • Node.js • Solidity(evm) • NestJS",
    delay: 5860,
    duration: 20,
    className: "ml-2 text-tigers-eye font-medium",
  },
  {
    type: "command",
    text: "$ echo $STATUS",
    delay: 6960,
    duration: 35,
    className: "mt-2 text-background-base font-semibold",
  },
  {
    type: "output",
    text: "> ✓ Available for opportunities.",
    delay: 7535,
    duration: 28,
    className: "ml-2 text-background-base/80 font-medium",
  },
  {
    type: "command",
    text: "$ _",
    delay: 8531,
    duration: 35,
    className: "text-background-base mt-2 font-semibold",
  },
];
