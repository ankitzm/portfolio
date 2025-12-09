'use client';

import { useEffect, useState, useRef } from 'react';
import DelicateAsciiDots from './ui/delicate-ascii-dots';
import { useTransition } from './TransitionContext';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning } = useTransition();
  const [curtainState, setCurtainState] = useState<'hidden' | 'dropping' | 'covered' | 'lifting'>('hidden');
  const [displayChildren, setDisplayChildren] = useState(children);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Track if we are currently handling a navigation sequence to prevent interruptions
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    // 1. START: Navigation triggered from context
    // We only start if we are effectively hidden or ready to start
    if (isTransitioning && curtainState === 'hidden' && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setShouldAnimate(true);
      
      // Use a small tick to ensure the 'transition-transform' class is applied before changing state
      requestAnimationFrame(() => {
        setCurtainState('dropping');
      });

      // Wait for drop animation to finish
      const timer = setTimeout(() => {
        setCurtainState('covered');
      }, 600); // Match CSS duration
      return () => clearTimeout(timer);
    }

    // 2. WAITING -> SWAP: Curtain is fully down
    if (curtainState === 'covered') {
      // If navigation is complete (isTransitioning is false), we can swap and lift
      // If navigation is still pending (isTransitioning is true), we wait here
      if (!isTransitioning) {
        // Swap the content while hidden
        setDisplayChildren(children);

        // Start lifting after a brief delay to ensure content is rendered
        const timer = setTimeout(() => {
          setCurtainState('lifting');
        }, 100);
        return () => clearTimeout(timer);
      }
    }

    // 3. FINISH: Curtain has lifted off screen
    if (curtainState === 'lifting') {
      const timer = setTimeout(() => {
        // Animation complete. Reset seamlessly.
        setShouldAnimate(false);
        setCurtainState('hidden');
        isAnimatingRef.current = false;
      }, 600); // Match CSS duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, curtainState, children]);

  // Determine transform based on state
  const getTransform = () => {
    switch (curtainState) {
      case 'hidden':
        return '-translate-y-full'; // Hidden above viewport
      case 'dropping':
        return 'translate-y-0'; // Moving down to cover
      case 'covered':
        return 'translate-y-0'; // Fully covering
      case 'lifting':
        return 'translate-y-full'; // Moving down off screen
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
        className={`fixed inset-0 z-[100] pointer-events-none ${
          shouldAnimate 
            ? 'transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]' 
            : ''
        } ${getTransform()}`}
      >
        <div className="relative w-full h-full bg-background-base">
          <DelicateAsciiDots
            backgroundColor="#e2e8cb"
            textColor="#0c3829"
            gridSize={60}
            removeWaveLine={true}
            animationSpeed={1}
            opacity={1}
          />
        </div>
      </div>
    </>
  );
}
