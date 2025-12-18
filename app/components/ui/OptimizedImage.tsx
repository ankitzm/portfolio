"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string; // e.g., "4/3", "16/9" - if not provided, image uses natural dimensions
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  priority = false,
  aspectRatio,
  sizes = "100vw",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached (loaded from browser cache)
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current?.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  }, []);

  // When aspectRatio is provided, use fill mode with fixed container
  // Otherwise, let the image determine its own dimensions
  if (aspectRatio) {
    return (
      <div
        className={`relative overflow-hidden ${containerClassName}`}
        style={{ aspectRatio }}
      >
        {/* Skeleton placeholder */}
        <div
          className={`absolute inset-0 bg-gray-800/50 transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer" />
        </div>

        {/* Actual image */}
        {!hasError ? (
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30 text-text-base/50 text-sm">
            Failed to load image
          </div>
        )}
      </div>
    );
  }

  // No aspectRatio: use natural image dimensions
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Actual image with natural dimensions */}
      {!hasError ? (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          priority={priority}
          className={`w-full h-auto object-cover transition-opacity duration-300 bg-gray-800/50 ${
            isLoaded ? "opacity-100" : "opacity-70"
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full aspect-video flex items-center justify-center bg-gray-800/30 text-text-base/50 text-sm rounded-lg">
          Failed to load image
        </div>
      )}
    </div>
  );
}
