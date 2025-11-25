'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import DelicateAsciiDots from './ui/delicate-ascii-dots';
import { useTransition } from './TransitionContext';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isTransitioning } = useTransition();
  const [curtainState, setCurtainState] = useState<'hidden' | 'dropping' | 'covering' | 'lifting'>('hidden');
  const [displayChildren, setDisplayChildren] = useState(children);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Handle curtain animation when transition starts
  useEffect(() => {
    if (isTransitioning) {
      // Step 1: Drop the curtain down from top (old content still showing)
      setShouldAnimate(true);
      setCurtainState('dropping');

      // Step 2: After 500ms when curtain fully covers, update content
      const updateContentTimeout = setTimeout(() => {
        setDisplayChildren(children);
      }, 500);

      // Step 3: After content updates, start lifting curtain (moving down)
      const liftTimeout = setTimeout(() => {
        setCurtainState('lifting');
      }, 550); // Small delay to ensure content is rendered

      // Step 4: After 1000ms total, curtain is fully lifted
      const hideTimeout = setTimeout(() => {
        // Disable animation to instantly jump back to top
        setShouldAnimate(false);
        setCurtainState('hidden');
      }, 1050);

      return () => {
        clearTimeout(updateContentTimeout);
        clearTimeout(liftTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [isTransitioning, children]);

  // Determine transform based on state
  const getTransform = () => {
    switch (curtainState) {
      case 'hidden':
        return '-translate-y-full'; // Hidden above viewport
      case 'dropping':
        return 'translate-y-0'; // Dropping down to cover
      case 'covering':
        return 'translate-y-0'; // Fully covering
      case 'lifting':
        return 'translate-y-full'; // Moving down off screen, revealing from top
      default:
        return '-translate-y-full';
    }
  };

  return (
    <>
      {/* Page content */}
      <div className="w-full h-full overflow-y-auto">{displayChildren}</div>

      {/* Curtain transition overlay */}
      <div
        className={`absolute inset-0 z-50 pointer-events-none ${shouldAnimate ? 'transition-transform duration-500 ease-in-out' : ''} ${getTransform()}`}
      >
        <div className="relative w-full h-full bg-background-base">
          <DelicateAsciiDots
            backgroundColor="rgb(12, 56, 41)"
            textColor="253, 254, 245"
            gridSize={60}
            removeWaveLine={true}
            animationSpeed={1.5}
            opacity={1}
          />
        </div>
      </div>
    </>
  );
}
