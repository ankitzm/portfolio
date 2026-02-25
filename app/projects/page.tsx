"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";
import projectsData from "@/public/data/projects.json";
import ExpandedProjectCard from "../components/ExpandedProjectCard";
import ProjectCard from "../components/ProjectCard";
import ProjectsGrid from "../components/ProjectsGrid";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

const filterTags = [
  { label: "NextJs/React", match: ["NextJS", "React", "ReactJS", "frontend"] },
  { label: "NodeJs/ExpressJs", match: ["NodeJS", "ExpressJS", "backend", "API", "REST", "GraphQL", "Perplexity API"] },
  { label: "Blockchain", match: ["Web3", "Solana", "Ethereum", "NEAR Blockchain", "Chainlink", "NFT"] },
  { label: "AI", match: ["AI", "Perplexity API", "AI API"] },
  { label: "Privacy", match: ["Privacy"] },
  { label: "Browser Extension", match: ["Browser Extension", "Chrome Extension"] },
  { label: "TypeScript", match: ["TypeScript", "nodejs", "expressjs", "reactjs"] },
];

export default function ProjectsPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const screenSize = useScreenSize();

  const activeFilter = filterTags.find((f) => f.label === filter);
  const filteredProjects = activeFilter
    ? projectsData.filter((p) => p.tags.some((t) => activeFilter.match.includes(t)))
    : projectsData;

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
    mobile: [10, 10, 10, 10, 10, 10, 10], // 1 card per row
    tablet: [6, 4, 5, 5, 4, 6, 5, 5, 6, 4, 5], // 2 cards per row
    desktop: [4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 4], // Variable layout
  };

  const cardSpans = cardSpansConfig[screenSize];

  const isMobile = screenSize === "mobile";

  return (
    <LayoutGroup>
      <main
        className={`relative h-full w-full z-10 ${expandedCard !== null && !isMobile ? "overflow-hidden" : "overflow-y-auto"}`}
      >
        {/* Filter Bar */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b-2 border-background-base/20 px-4 py-3">
          <div className="flex gap-2 flex-wrap">
            {filterTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setFilter(filter === tag.label ? null : tag.label)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  filter === tag.label
                    ? "bg-fade-green text-text-base"
                    : "bg-background-base/10 text-text-base/70 hover:bg-fade-green/40"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {isMobile ? (
          // Mobile: List view
          <div className="m-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                layoutId={`project-card-${project.name}`}
                title={project.title}
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
            {filteredProjects.slice(0, cardSpans.length).map((project, index) => (
              <ProjectCard
                key={project.name}
                layoutId={`project-card-${project.name}`}
                name={project.name}
                title={project.title}
                description={project.description}
                image={`/projects/webp/${project.image}.webp`}
                tags={project.tags}
                liveLink={project.links.website}
                codeLink={project.links.github}
                colSpan={
                  cardSpans[index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
                }
                isExpanded={expandedCard === index}
                onClick={() => handleCardClick(index)}
                showInlineExpansion={false}
              />
            ))}
          </ProjectsGrid>
        )}

        {/* Only show modal expansion for tablet and desktop */}
        <AnimatePresence>
          {expandedCard !== null && !isMobile && filteredProjects[expandedCard] && (
            <ExpandedProjectCard
              layoutId={`project-card-${filteredProjects[expandedCard].name}`}
              title={filteredProjects[expandedCard].name}
              description={filteredProjects[expandedCard].description}
              image={`/projects/webp/${filteredProjects[expandedCard].image}.webp`}
              tags={filteredProjects[expandedCard].tags}
              liveLink={filteredProjects[expandedCard].links.website}
              codeLink={filteredProjects[expandedCard].links.github}
              onClose={handleCardClose}
            />
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}
