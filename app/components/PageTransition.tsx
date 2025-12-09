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

  // Effect 1: Trigger the start of the transition
  useEffect(() => {
    if (isTransitioning && curtainState === 'hidden') {
      setShouldAnimate(true);
      // Small delay to ensure CSS transition can catch the state change
      requestAnimationFrame(() => {
        setCurtainState('dropping');
      });
    }
  }, [isTransitioning, curtainState]);

  // Effect 2: Handle automatic state progressions (Timers)
  useEffect(() => {
    if (curtainState === 'dropping') {
      const timer = setTimeout(() => {
        setCurtainState('covered');
      }, 600);
      return () => clearTimeout(timer);
    }

    if (curtainState === 'lifting') {
      const timer = setTimeout(() => {
        setShouldAnimate(false);
        setCurtainState('hidden');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [curtainState]);

  // Effect 3: Handle the "Hold" state (Waiting for navigation to finish)
  useEffect(() => {
    if (curtainState === 'covered' && !isTransitioning) {
      // Update content underneath
      setDisplayChildren(children);

      // Brief pause before lifting to ensure render is ready
      const timer = setTimeout(() => {
        setCurtainState('lifting');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [curtainState, isTransitioning, children]);

  // Effect 4: Ensure children are kept in sync when not transitioning
  useEffect(() => {
    if (curtainState === 'hidden' && !isTransitioning) {
      setDisplayChildren(children);
    }
  }, [children, curtainState, isTransitioning]);

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
        className={`absolute inset-0 z-50 pointer-events-none ${
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
