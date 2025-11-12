'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'simple' | 'integrated' | 'featured';
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

  // Create a large virtual grid by repeating projects
  // Generate enough tiles to create the infinite scroll effect
  const repeatCount = 6; // Repeat the projects 6 times to create a scrollable grid
  const virtualProjects = Array.from({ length: projects.length * repeatCount }, (_, i) => {
    const projectIndex = i % projects.length;
    return { ...projects[projectIndex], virtualId: i };
  });

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black -z-10" />
      
      {/* Scrollable Container */}
      <div className="w-full h-screen overflow-auto scroll-smooth">
        <div className="min-w-max p-4 md:p-8">
          {/* Grid Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4 md:gap-6
              auto-rows-[200px] md:auto-rows-[280px]
              w-fit
            "
          >
            {virtualProjects.map((project, index) => (
              <BentoCard
                key={project.virtualId}
                title={project.title}
                description={project.description}
                image={project.image}
                type={project.type}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
          <span className="hidden md:block">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

