'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

interface BentoCardProps {
  title: string;
  description: string;
  image: string;
  pattern: 'pattern1' | 'pattern2a' | 'pattern2b' | 'pattern3a' | 'pattern3b';
  aspect: string;
  index: number;
}

function BentoCard({ title, description, image, pattern, aspect, index }: BentoCardProps) {
  // Convert aspect ratio string to CSS aspect-ratio value
  const getAspectRatio = (aspectStr: string) => {
    const [width, height] = aspectStr.split(':').map(Number);
    return `${width} / ${height}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.02, 1) }}
      // whileHover={{ 
      //   scale: 1.02,
      //   transition: { duration: 0.2 }
      // }}
      className="
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-gray-900 to-gray-800
        border border-gray-700/50
        hover:border-gray-600
        transition-all duration-300
        cursor-pointer
        w-full
      "
      style={{
        aspectRatio: getAspectRatio(aspect),
        // Performance optimization
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
          sizes="(max-width: 768px) 280px, 340px"
          loading="lazy"
          quality={75}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 line-clamp-2 md:line-clamp-3 group-hover:text-gray-200 transition-colors">
            {description}
          </p>
        </motion.div>

        {/* Pattern Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
            {aspect}
          </span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      </div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders during scrolling
export default memo(BentoCard);

