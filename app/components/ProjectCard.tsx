"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  liveLink?: string;
  codeLink?: string;
  demoLink?: string;
  height?: string;
  className?: string;
  isExpanded?: boolean;
  onClick?: () => void;
  layoutId: string;
  showInlineExpansion?: boolean;
}

export default function ProjectCard({
  colSpan = 3,
  title = "Project xyz",
  description = "Project description goes here...",
  image,
  tags = [],
  liveLink,
  codeLink,
  demoLink,
  className = "",
  isExpanded = false,
  onClick,
  layoutId,
  showInlineExpansion = false,
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
    if (onClick) {
      onClick();
    }
  };

  // Simplified: Use different rendering for mobile vs desktop
  if (showInlineExpansion) {
    // Mobile: List-style accordion matching the design
    return (
      <div
        onClick={handleCardClick}
        className={`border-b border-background-base/20 ${colSpanClass} ${className} cursor-pointer hover:bg-white/5 transition-all duration-300 ease-in-out ${
          isExpanded ? "bg-white/5" : ""
        }`}
      >
        {/* Collapsed view: Title and tags in a row */}
        <div className="p-4 flex items-center justify-between gap-4">
          <h2 className="text-base font-normal text-text-base">{title}</h2>
          <div className="text-xs text-text-base whitespace-nowrap">
            {tags.join(", ")}
          </div>
        </div>
        
        {/* Expandable content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              <div className="flex gap-4">
                {/* Project image/thumbnail */}
                {image && (
                  <div className="w-1/3 flex-shrink-0">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-auto rounded-lg object-cover bg-gray-800"
                    />
                  </div>
                )}
                
                {/* Project description */}
                <div className="flex-1">
                  <p className="text-text-base text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  
                  {/* Action links */}
                  <div className="flex gap-4 text-sm">
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-text-base hover:text-white transition-colors"
                      >
                        <span>↗</span> live
                      </a>
                    )}
                    {codeLink && (
                      <a
                        href={codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-text-base hover:text-white transition-colors"
                      >
                        <span>↗</span> code
                      </a>
                    )}
                    {demoLink && (
                      <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-text-base hover:text-white transition-colors"
                      >
                        <span>↗</span> demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tablet/Desktop: Use framer-motion for modal transition
  return (
    <motion.div
      layoutId={layoutId}
      onClick={handleCardClick}
      className={`border-2 border-background-base/20 bg-white/5 rounded-2xl p-4 h-60 ${colSpanClass} ${className} ${
        isExpanded ? "opacity-0 pointer-events-none" : "cursor-pointer hover:bg-white/10"
      } transition-opacity`}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.h1 
        className="text-2xl font-bold text-text-base"
        layout="position"
      >
        {title}
      </motion.h1>
    </motion.div>
  );
}

