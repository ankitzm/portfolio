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
  const transitionCallbacks = useRef<(() => void)[]>([]);

  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const navigateTo = useCallback((href: string) => {
    // Start curtain drop immediately
    setIsTransitioning(true);
    
    // After 500ms (when curtain has dropped), actually navigate
    setTimeout(() => {
      router.push(href);
      
      // After another 550ms (when curtain lifts), end transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 500);
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
