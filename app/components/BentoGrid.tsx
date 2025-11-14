'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BentoSection from './BentoSection';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  pattern: 'pattern1' | 'pattern2a' | 'pattern2b' | 'pattern3a' | 'pattern3b';
  aspect: string;
}

export default function BentoGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from JSON
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">Loading projects...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">No projects found.</div>
      </div>
    );
  }

  // Optimized repeat counts for "infinite" scrolling
  // Horizontal: 20 sections = ~21,000px of scrollable width
  // Vertical: 15 rows = substantial vertical content
  const horizontalRepeatCount = 20;
  const verticalRepeatCount = 15;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Bidirectional Scrollable Container - Edge to Edge */}
      <div 
        className="w-full h-full overflow-auto scroll-smooth"
        style={{
          // Hardware acceleration for smooth scrolling
          willChange: 'scroll-position',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Content with vertical margin only */}
        <div className="py-24 md:py-32">
          {/* Vertical Container - Multiple Rows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {Array.from({ length: verticalRepeatCount }).map((_, rowIndex) => (
              <div 
                key={rowIndex}
                className="flex gap-8 md:gap-12 px-4 md:px-8"
              >
                {/* Horizontal Sections in Each Row */}
                {Array.from({ length: horizontalRepeatCount }).map((_, sectionIndex) => (
                  <BentoSection
                    key={`${rowIndex}-${sectionIndex}`}
                    projects={projects}
                    startIndex={(rowIndex * horizontalRepeatCount + sectionIndex) * 5}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Top Fade Overlay */}
      {/* <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-gray-100 via-gray-100/60 to-transparent pointer-events-none z-10" /> */}
      
      {/* Bottom Fade Overlay */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-gray-100 via-gray-100/60 to-transparent pointer-events-none z-10" /> */}

      {/* Bidirectional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 right-8 pointer-events-none z-20"
      >
        <div className="flex flex-col items-end gap-3">
          {/* Horizontal indicator */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="hidden md:block">Scroll freely</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-10 h-6 border-2 border-gray-400 rounded-full flex items-center justify-start p-2  backdrop-blur-sm shadow-sm"
            >
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            </motion.div>
          </div>
          {/* Vertical indicator */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2 backdrop-blur-sm shadow-sm"
            >
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

