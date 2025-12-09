"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface TransitionContextType {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
  triggerTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isNavigatingRef = useRef(false);

  // Reset transition state when pathname changes (navigation completes)
  useEffect(() => {
    void pathname;
    setIsTransitioning(false);
    isNavigatingRef.current = false;
  }, [pathname]);

  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      // Prevent multiple transitions at once
      if (isNavigatingRef.current) return;

      // Check if we're navigating to the current page
      if (href === pathname) {
        router.push(href);
        return;
      }

      isNavigatingRef.current = true;

      // Start curtain drop immediately
      setIsTransitioning(true);

      // After 600ms (when curtain has fully dropped), actually navigate
      setTimeout(() => {
        router.push(href);
      }, 600);

      // Safety fallback - ensure state resets after 3 seconds no matter what
      setTimeout(() => {
        setIsTransitioning(false);
        isNavigatingRef.current = false;
      }, 3000);
    },
    [router, pathname],
  );

  return (
    <TransitionContext.Provider
      value={{ navigateTo, isTransitioning, triggerTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}
