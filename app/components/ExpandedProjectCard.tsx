"use client";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ExpandedProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  liveLink?: string;
  codeLink?: string;
  layoutId: string;
  onClose: () => void;
}

export default function ExpandedProjectCard({
  title,
  description,
  image,
  tags = [],
  liveLink,
  codeLink,
  layoutId,
  onClose,
}: ExpandedProjectCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close when clicking the backdrop (outside the content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent backdrop click
    e.stopPropagation();
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-6 md:p-12 z-20"
      onClick={handleBackdropClick}
    >
      <motion.div
        layoutId={layoutId}
        className="max-w-[900px] w-full h-fit max-h-full border-2 border-background-base/20 bg-background rounded-2xl p-8 overflow-y-auto relative"
        onClick={handleContentClick}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <button
          type="button"
          onClick={handleCloseClick}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <motion.h1
          className="text-4xl font-bold mb-4 text-text-base"
          layout="position"
        >
          {title}
        </motion.h1>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs bg-black/5 rounded-full text-text-base"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Project Image */}
          {image && (
            <div className="mb-6 rounded-lg overflow-hidden max-w-[540px] border-2 border-background-base/20">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover bg-gray-800"
              />
            </div>
          )}

          {/* Action Links */}
          {(liveLink || codeLink) && (
            <div className="flex flex-col gap-4">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 hover:bg-black/5 border border-black/20 rounded-lg transition-colors flex items-center gap-2 text-text-base"
                >
                  <span>↗</span> Visit Website
                </a>
              )}
              {codeLink && (
                <a
                  href={codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3  hover:bg-black/5 border border-black/20 rounded-lg transition-colors flex items-center gap-2 text-text-base"
                >
                  <span>↗</span> View Code
                </a>
              )}
            </div>
          )}

        </div>
        {/* Description */}
        <div className="mt-6">
          <p className="text-text-base text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

