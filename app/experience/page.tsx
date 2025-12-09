"use client";

import { motion } from "framer-motion";
import { parseMarkdownLinks } from "@/lib/parseMarkdownLinks";
import experienceData from "@/public/data/experience.json";
import type { TimelineEntry } from "@/types/experience";

const timelineData: TimelineEntry[] = experienceData;

export default function ExperiencePage() {
  return (
    <main className="p-2 py-6 sm:p-16 min-h-[60vh]">
      <div className="relative w-full max-w-4xl mx-auto space-y-4 pb-10">
        {timelineData.map((entry, index) => (
          <motion.div
            key={entry.company + entry.role}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            className="border-2 border-background-base/20 bg-background rounded-2xl p-4 md:p-6 transition-all duration-300"
          >
            {/* Header: Date and Title */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-text-base leading-tight">
                  {entry.role}
                </h3>
                <p className="text-sm text-text-base/70 mt-1.5">
                  {entry.company}
                </p>
              </div>
              <span className="text-sm text-text-base/60 font-mono whitespace-nowrap self-start">
                {entry.date}
              </span>
            </div>

            {/* Description - render as list with proper bullet alignment */}
            <ul className="text-text-base/80 text-sm sm:text-base mb-5 space-y-3 list-disc pl-5 marker:text-text-base/60">
              {entry.description.map((item, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: order doesn't change
                <li key={idx} className="leading-relaxed pl-1.5">
                  {parseMarkdownLinks(item)}
                </li>
              ))}
            </ul>

            {/* Skills/Tags */}
            {entry.skills && entry.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {entry.skills.map((skill) => (
                  <span
                    key={skill}
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
    </main>
  );
}
