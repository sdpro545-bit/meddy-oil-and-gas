"use client";

import React, { useEffect, createContext, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MotionContextType {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
}

const MotionContext = createContext<MotionContextType>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
});

export function useLenis() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set class on html for motion styling
    document.documentElement.classList.add("js-motion");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: !reduce,
    });
    (window as any).__lenis = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  const stopScroll = () => {
    if (lenisInstance) {
      lenisInstance.stop();
    }
  };

  const startScroll = () => {
    if (lenisInstance) {
      lenisInstance.start();
    }
  };

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, stopScroll, startScroll }}>
      {children}
    </MotionContext.Provider>
  );
}
