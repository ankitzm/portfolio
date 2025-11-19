"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title?: string;
  height?: string;
  className?: string;
  isExpanded?: boolean;
  onClick?: () => void;
  layoutId: string;
}

export default function ProjectCard({
  colSpan = 3,
  title = "Project xyz",
  className = "",
  isExpanded = false,
  onClick,
  layoutId,
}: ProjectCardProps) {
  // Map colSpan to actual Tailwind classes (required for JIT compilation)
  const colSpanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
  };

  const colSpanClass = colSpanClasses[colSpan];

  const handleCardClick = () => {
    if (!isExpanded && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      layoutId={layoutId}
      onClick={handleCardClick}
      className={`border-2 border-background-base/20 bg-white/5 rounded-2xl p-4 h-60 ${colSpanClass} ${className} ${
        isExpanded ? "opacity-0 pointer-events-none" : "cursor-pointer hover:bg-white/10"
      } transition-opacity relative`}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.h1 
        className="text-2xl font-bold"
        layout="position"
      >
        {title}
      </motion.h1>
    </motion.div>
  );
}

