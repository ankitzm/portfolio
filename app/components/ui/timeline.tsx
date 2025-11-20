"use client";

import { motion } from "framer-motion";

type TimelineEntry = {
  date: string;
  title: string;
  company?: string;
  description: string;
  tags?: string[];
};

const timelineData: TimelineEntry[] = [
  {
    date: "2024 - Present",
    title: "Senior Full Stack Developer",
    company: "Tech Company",
    description:
      "Leading development of scalable web applications using React, Next.js, and Node.js. Architecting solutions for high-traffic platforms.",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    date: "2022 - 2024",
    title: "Full Stack Developer",
    company: "Startup Inc",
    description:
      "Built and maintained multiple client projects, focusing on modern web technologies and best practices. Collaborated with cross-functional teams.",
    tags: ["JavaScript", "React", "MongoDB", "Express"],
  },
  {
    date: "2020 - 2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Developed responsive web applications and implemented pixel-perfect designs. Optimized performance and user experience.",
    tags: ["HTML", "CSS", "JavaScript", "Vue.js"],
  },
  {
    date: "2018 - 2020",
    title: "Junior Developer",
    company: "Web Solutions",
    description:
      "Started career in web development, learning modern frameworks and contributing to various client projects.",
    tags: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
];

export default function Timeline() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {timelineData.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="border-2 border-background-base/20 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          {/* Header: Date and Title */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-text-base">
                {entry.title}
              </h3>
              {entry.company && (
                <p className="text-sm text-text-base/70 mt-1">{entry.company}</p>
              )}
            </div>
            <span className="text-sm text-text-base/60 font-mono whitespace-nowrap">
              {entry.date}
            </span>
          </div>

          {/* Description */}
          <p className="text-text-base/80 text-sm sm:text-base leading-relaxed mb-4">
            {entry.description}
          </p>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2.5 py-1 rounded-lg bg-background-base/30 text-text-base/70 border border-background-base/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
