'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextType {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
  triggerTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isNavigatingRef = useRef(false);

  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const navigateTo = useCallback((href: string) => {
    // Prevent multiple transitions at once
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // Start curtain drop immediately
    setIsTransitioning(true);
    
    // After 500ms (when curtain has dropped), actually navigate
    setTimeout(() => {
      router.push(href);
    }, 500);

    // After full animation (drop + lift), end transition
    setTimeout(() => {
      setIsTransitioning(false);
      isNavigatingRef.current = false;
    }, 1050);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning, triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
}
