"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ExpandedProjectCard from "../components/ExpandedProjectCard";
import ProjectsGrid from "../components/ProjectsGrid";
import projectsData from "@/public/data/projects.json";

// Hook to detect screen size
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export default function ProjectsPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const screenSize = useScreenSize();

  const handleCardClick = (index: number) => {
    // On mobile, toggle the same card to collapse it
    if (screenSize === "mobile" && expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const handleCardClose = () => {
    setExpandedCard(null);
  };

  // Disable scroll when a card is expanded (only for tablet/desktop modal)
  useEffect(() => {
    if (expandedCard !== null && screenSize !== "mobile") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedCard, screenSize]);

  // Responsive card spans for different screen sizes
  const cardSpansConfig = {
    mobile: [10, 10, 10, 10, 10, 10, 10],    // 1 card per row
    tablet: [6, 4, 5, 5, 4, 6, 5],           // 2 cards per row
    desktop: [6, 4, 3, 4, 3, 4, 6],          // Variable layout
  };

  const cardSpans = cardSpansConfig[screenSize];

  const isMobile = screenSize === "mobile";

  return (
    <LayoutGroup>
      <main className={`h-full w-full ${expandedCard !== null && !isMobile ? "overflow-hidden" : "overflow-y-auto"}`}>
        {isMobile ? (
          // Mobile: List view
          <div className="m-4">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                layoutId={`project-card-${index}`}
                title={project.name}
                description={project.description}
                image={`/projects/webp/${project.image}.webp`}
                tags={project.tags}
                liveLink={project.links.website}
                codeLink={project.links.github}
                colSpan={10}
                isExpanded={expandedCard === index}
                onClick={() => handleCardClick(index)}
                showInlineExpansion={true}
              />
            ))}
          </div>
        ) : (
          // Tablet/Desktop: Grid view
          <ProjectsGrid>
            {projectsData.slice(0, cardSpans.length).map((project, index) => (
              <ProjectCard
                key={index}
                layoutId={`project-card-${index}`}
                title={project.name}
                description={project.description}
                image={`/projects/webp/${project.image}.webp`}
                tags={project.tags}
                liveLink={project.links.website}
                codeLink={project.links.github}
                colSpan={cardSpans[index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
                isExpanded={expandedCard === index}
                onClick={() => handleCardClick(index)}
                showInlineExpansion={false}
              />
            ))}
          </ProjectsGrid>
        )}

        {/* Only show modal expansion for tablet and desktop */}
        <AnimatePresence>
          {expandedCard !== null && !isMobile && (
            <ExpandedProjectCard
              layoutId={`project-card-${expandedCard}`}
              title={projectsData[expandedCard]?.name || "Project"}
              onClose={handleCardClose}
            />
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}


