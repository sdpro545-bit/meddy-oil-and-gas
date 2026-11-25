"use client";

import React, { useEffect, createContext, useContext, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { revealGate } from "@/lib/motion/revealGate";

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
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: !reduce,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    window.__motionStats = () => ({
      triggers: ScrollTrigger.getAll().length,
      tweens: gsap.globalTimeline.getChildren(false, true, false).length,
    });
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

    // Gate failsafe (5s max)
    const gateTimer = setTimeout(() => {
      revealGate.open();
    }, 5000);

    return () => {
      clearTimeout(gateTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Failsafe (B1): if any [data-reveal] element is still hidden 6 seconds after load or navigation, clearProps and show it
  useEffect(() => {
    if (typeof window === "undefined") return;
    const revealTimer = setTimeout(() => {
      revealGate.open();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const cs = window.getComputedStyle(el);
        if (cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) {
          gsap.set(el, { clearProps: "all" });
          el.style.visibility = "visible";
          el.style.opacity = "1";
        }
      });
    }, 6000);

    return () => clearTimeout(revealTimer);
  }, [pathname]);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, stopScroll, startScroll }}>
      {children}
    </MotionContext.Provider>
  );
}
