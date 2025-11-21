"use client";

import * as React from "react";
import { motion } from "framer-motion";
import experienceData from "@/public/data/experience.json";

type TimelineEntry = {
  date: string;
  role: string;
  company: string;
  description: string[];
  skills: string[];
  color: string;
};

const timelineData: TimelineEntry[] = experienceData;

// Helper function to parse markdown-style links to JSX
function parseMarkdownLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Add the link
    parts.push(
      <a
        key={`link-${keyCounter++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-base underline hover:text-white transition-colors"
      >
        {match[1]}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

export default function Timeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-4 pb-10 z-10">
      {timelineData.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
          className="border-2 border-background-base/20 bg-background rounded-2xl p-4 md:p-6 transition-all duration-300"
        >
          {/* Header: Date and Title */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-text-base leading-tight">
                {entry.role}
              </h3>
              <p className="text-sm text-text-base/70 mt-1.5">{entry.company}</p>
            </div>
            <span className="text-sm text-text-base/60 font-mono whitespace-nowrap self-start">
              {entry.date}
            </span>
          </div>

          {/* Description - render as list with proper bullet alignment */}
          <ul className="text-text-base/80 text-sm sm:text-base mb-5 space-y-3 list-disc pl-5 marker:text-text-base/60">
            {entry.description.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-1.5">
                {parseMarkdownLinks(item)}
              </li>
            ))}
          </ul>

          {/* Skills/Tags */}
          {entry.skills && entry.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {entry.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="text-xs px-2.5 py-1 rounded-lg bg-background-base/5 text-text-base/70 border border-background-base/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
