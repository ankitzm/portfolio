'use client';

import { memo } from 'react';
import BentoCard from './BentoCard';

/**
 * ========================================
 * GRID DESIGN CONFIGURATION
 * ========================================
 * 
 * To modify the grid layout:
 * 
 * 1. CARD WIDTHS: Change the w-[XXXpx] values in each column div
 *    - Mobile: w-[280px]
 *    - Desktop: md:w-[340px]
 * 
 * 2. GAPS: Modify gap-4 md:gap-6 in:
 *    - Main flex container (horizontal gap between columns)
 *    - Column divs (vertical gap between stacked cards)
 * 
 * 3. COLUMN STRUCTURE: Add/remove columns by duplicating column divs
 *    Example: To add a 4th column, copy a column div and update pattern
 * 
 * 4. CARDS PER COLUMN: Add/remove <BentoCard /> components within columns
 * 
 * 5. PATTERNS: Update pattern types in projects.json and TypeScript interfaces
 * 
 * 6. REPEAT COUNT: Change repeatCount in BentoGrid.tsx
 */

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  pattern: 'pattern1' | 'pattern2a' | 'pattern2b' | 'pattern3a' | 'pattern3b';
  aspect: string;
}

interface BentoSectionProps {
  projects: Project[];
  startIndex: number;
}

/**
 * BentoSection displays all projects in a vertical grid layout.
 * Projects are grouped into repeating sections:
 * - Column 1: Pattern 1 (single tall card, aspect 1:3)
 * - Column 2: Pattern 2a + 2b (two stacked cards)
 * - Column 3: Pattern 3a + 3b (two stacked cards)
 */
function BentoSection({ projects }: BentoSectionProps) {
  // Group projects by pattern
  const pattern1Projects = projects.filter(p => p.pattern === 'pattern1');
  const pattern2aProjects = projects.filter(p => p.pattern === 'pattern2a');
  const pattern2bProjects = projects.filter(p => p.pattern === 'pattern2b');
  const pattern3aProjects = projects.filter(p => p.pattern === 'pattern3a');
  const pattern3bProjects = projects.filter(p => p.pattern === 'pattern3b');

  // Calculate how many sections we need (based on the pattern with most projects)
  const maxSections = Math.max(
    pattern1Projects.length,
    Math.max(pattern2aProjects.length, pattern2bProjects.length),
    Math.max(pattern3aProjects.length, pattern3bProjects.length)
  );

  // Create sections
  const sections = [];
  for (let i = 0; i < maxSections; i++) {
    sections.push({
      pattern1: pattern1Projects[i],
      pattern2a: pattern2aProjects[i],
      pattern2b: pattern2bProjects[i],
      pattern3a: pattern3aProjects[i],
      pattern3b: pattern3bProjects[i],
    });
  }

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex gap-4 md:gap-6 shrink-0 justify-center">
          {/* Column 1: Single tall card */}
          {section.pattern1 && (
            <div className="w-[280px] md:w-[340px]">
              <BentoCard
                title={section.pattern1.title}
                description={section.pattern1.description}
                image={section.pattern1.image}
                pattern={section.pattern1.pattern}
                aspect={section.pattern1.aspect}
                index={sectionIndex * 5}
              />
            </div>
          )}

          {/* Column 2: Two stacked cards */}
          {(section.pattern2a || section.pattern2b) && (
            <div className="w-[280px] md:w-[340px] flex flex-col gap-4 md:gap-6">
              {section.pattern2a && (
                <BentoCard
                  title={section.pattern2a.title}
                  description={section.pattern2a.description}
                  image={section.pattern2a.image}
                  pattern={section.pattern2a.pattern}
                  aspect={section.pattern2a.aspect}
                  index={sectionIndex * 5 + 1}
                />
              )}
              {section.pattern2b && (
                <BentoCard
                  title={section.pattern2b.title}
                  description={section.pattern2b.description}
                  image={section.pattern2b.image}
                  pattern={section.pattern2b.pattern}
                  aspect={section.pattern2b.aspect}
                  index={sectionIndex * 5 + 2}
                />
              )}
            </div>
          )}

          {/* Column 3: Two stacked cards */}
          {(section.pattern3a || section.pattern3b) && (
            <div className="w-[280px] md:w-[340px] flex flex-col gap-4 md:gap-6">
              {section.pattern3a && (
                <BentoCard
                  title={section.pattern3a.title}
                  description={section.pattern3a.description}
                  image={section.pattern3a.image}
                  pattern={section.pattern3a.pattern}
                  aspect={section.pattern3a.aspect}
                  index={sectionIndex * 5 + 3}
                />
              )}
              {section.pattern3b && (
                <BentoCard
                  title={section.pattern3b.title}
                  description={section.pattern3b.description}
                  image={section.pattern3b.image}
                  pattern={section.pattern3b.pattern}
                  aspect={section.pattern3b.aspect}
                  index={sectionIndex * 5 + 4}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// Memoize to optimize rendering during scroll
export default memo(BentoSection);
