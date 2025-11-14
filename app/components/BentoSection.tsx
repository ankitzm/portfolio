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
 * BentoSection represents one complete repeating unit of the grid.
 * Current layout: 3 columns
 * - Column 1: Pattern 1 (single card, aspect 1:3)
 * - Column 2: Pattern 2a + 2b (two stacked cards, aspects 1:2 and 1:1)
 * - Column 3: Pattern 3a + 3b (two stacked cards, aspects 1:1 and 1:2)
 */
function BentoSection({ projects, startIndex }: BentoSectionProps) {
  // Get projects for this section (5 cards total: 1 + 2 + 2)
  const getProject = (patternType: string) => {
    return projects.find(p => p.pattern === patternType) || projects[0];
  };

  const pattern1 = getProject('pattern1');
  const pattern2a = getProject('pattern2a');
  const pattern2b = getProject('pattern2b');
  const pattern3a = getProject('pattern3a');
  const pattern3b = getProject('pattern3b');

  return (
    <div className="flex gap-4 md:gap-6 shrink-0">
      {/* Column 1: Single tall card */}
      <div className="w-[280px] md:w-[340px]">
        <BentoCard
          title={pattern1.title}
          description={pattern1.description}
          image={pattern1.image}
          pattern={pattern1.pattern}
          aspect={pattern1.aspect}
          index={startIndex}
        />
      </div>

      {/* Column 2: Two stacked cards */}
      <div className="w-[280px] md:w-[340px] flex flex-col gap-4 md:gap-6">
        <BentoCard
          title={pattern2a.title}
          description={pattern2a.description}
          image={pattern2a.image}
          pattern={pattern2a.pattern}
          aspect={pattern2a.aspect}
          index={startIndex + 1}
        />
        <BentoCard
          title={pattern2b.title}
          description={pattern2b.description}
          image={pattern2b.image}
          pattern={pattern2b.pattern}
          aspect={pattern2b.aspect}
          index={startIndex + 2}
        />
      </div>

      {/* Column 3: Two stacked cards */}
      <div className="w-[280px] md:w-[340px] flex flex-col gap-4 md:gap-6">
        <BentoCard
          title={pattern3a.title}
          description={pattern3a.description}
          image={pattern3a.image}
          pattern={pattern3a.pattern}
          aspect={pattern3a.aspect}
          index={startIndex + 3}
        />
        <BentoCard
          title={pattern3b.title}
          description={pattern3b.description}
          image={pattern3b.image}
          pattern={pattern3b.pattern}
          aspect={pattern3b.aspect}
          index={startIndex + 4}
        />
      </div>
    </div>
  );
}

// Memoize to optimize rendering during scroll
export default memo(BentoSection);
