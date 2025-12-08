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
  const [curtainState, setCurtainState] = useState<'hidden' | 'dropping' | 'covering' | 'lifting'>('hidden');
  const [displayChildren, setDisplayChildren] = useState(children);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const transitionStartedRef = useRef(false);
  const latestChildrenRef = useRef(children);

  // Always keep track of latest children
  latestChildrenRef.current = children;

  // Update displayChildren when children change
  useEffect(() => {
    // During transition, update when curtain is covering
    if (curtainState === 'dropping' || curtainState === 'covering') {
      setDisplayChildren(children);
    } else if (curtainState === 'hidden') {
      // When not transitioning, always show current children
      setDisplayChildren(children);
    }
  }, [children, curtainState]);

  // Handle curtain animation when transition starts
  useEffect(() => {
    if (isTransitioning && !transitionStartedRef.current) {
      transitionStartedRef.current = true;
      
      // Step 1: Drop the curtain down from top (old content still showing)
      setShouldAnimate(true);
      setCurtainState('dropping');

      // Step 2: After curtain covers, mark as covering and ensure content is updated
      const coverTimeout = setTimeout(() => {
        setCurtainState('covering');
        // Force update to latest children in case the effect missed it
        setDisplayChildren(latestChildrenRef.current);
      }, 500);

      // Step 3: Start lifting curtain (moving down to reveal new content)
      const liftTimeout = setTimeout(() => {
        setCurtainState('lifting');
      }, 550);

      // Step 4: After full animation, curtain is fully lifted
      const hideTimeout = setTimeout(() => {
        // Disable animation to instantly jump back to top
        setShouldAnimate(false);
        setCurtainState('hidden');
        transitionStartedRef.current = false;
      }, 1050);

      // Safety fallback - force hide curtain after 2 seconds no matter what
      const safetyTimeout = setTimeout(() => {
        setShouldAnimate(false);
        setCurtainState('hidden');
        transitionStartedRef.current = false;
        setDisplayChildren(latestChildrenRef.current);
      }, 2000);

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(liftTimeout);
        clearTimeout(hideTimeout);
        clearTimeout(safetyTimeout);
      };
    } else if (!isTransitioning && curtainState === 'hidden') {
      transitionStartedRef.current = false;
    }
  }, [isTransitioning]);

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
