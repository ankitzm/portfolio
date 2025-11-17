"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ExpandedProjectCard from "../components/ExpandedProjectCard";
import ProjectsGrid from "../components/ProjectsGrid";

export default function ProjectsPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCard(index);
  };

  const handleCardClose = () => {
    setExpandedCard(null);
  };

  // Disable scroll when a card is expanded
  useEffect(() => {
    if (expandedCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedCard]);

  const cardSpans = [6, 4, 3, 4, 3, 4, 6, 3, 4, 3];

  return (
    <main className={`h-full w-full ${expandedCard !== null ? "overflow-hidden" : "overflow-y-auto"}`}>
      <ProjectsGrid>
        {cardSpans.map((span, index) => (
          <ProjectCard
            key={index}
            layoutId={`project-card-${index}`}
            colSpan={span as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
            isExpanded={expandedCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </ProjectsGrid>

      <AnimatePresence>
        {expandedCard !== null && (
          <ExpandedProjectCard
            layoutId={`project-card-${expandedCard}`}
            title={`Project xyz`}
            onClose={handleCardClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}


