"use client";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ExpandedProjectCardProps {
  title: string;
  layoutId: string;
  onClose: () => void;
}

export default function ExpandedProjectCard({
  title,
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

  if (!mounted) return null;

  return createPortal(
    <motion.div
      layoutId={layoutId}
      className="fixed inset-0 m-4 md:m-10 z-10 border-2 border-background-base/20 bg-background rounded-2xl p-8 overflow-y-auto"
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
        className="text-4xl font-bold mb-4"
        layout="position"
      >
        {title}
      </motion.h1>
      <div className="mt-8">
        <p className="text-gray-400 text-lg">Expanded content goes here...</p>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </motion.div>,
    document.body
  );
}

