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

  // Update displayChildren when children change AND curtain is covering
  useEffect(() => {
    // Only update if we're in the middle of a transition (curtain is covering)
    if (curtainState === 'dropping' || curtainState === 'covering') {
      setDisplayChildren(children);
    } else if (!isTransitioning) {
      // When not transitioning, always show current children
      setDisplayChildren(children);
    }
  }, [children, curtainState, isTransitioning]);

  // Handle curtain animation when transition starts
  useEffect(() => {
    if (isTransitioning && !transitionStartedRef.current) {
      transitionStartedRef.current = true;
      
      // Step 1: Drop the curtain down from top (old content still showing)
      setShouldAnimate(true);
      setCurtainState('dropping');

      // Step 2: After curtain covers, mark as covering (content swap happens via children effect)
      const coverTimeout = setTimeout(() => {
        setCurtainState('covering');
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
      }, 1050);

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(liftTimeout);
        clearTimeout(hideTimeout);
      };
    } else if (!isTransitioning) {
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
