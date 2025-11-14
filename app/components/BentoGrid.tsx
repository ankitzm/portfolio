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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Vertical Scrollable Container */}
      <div 
        className="w-full h-full overflow-y-auto scroll-smooth"
        style={{
          // Hardware acceleration for smooth scrolling
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Content Container */}
        <div className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Vertical Grid - Stack sections vertically */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {/* Single section - no repetition */}
            <BentoSection
              projects={projects}
              startIndex={0}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 right-8 pointer-events-none z-20"
      >
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span className="hidden md:block">Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2 backdrop-blur-sm shadow-sm"
          >
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

