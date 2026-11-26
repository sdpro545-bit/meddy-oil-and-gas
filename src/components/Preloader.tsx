"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { EASE } from "@/lib/motion/tokens";
import { revealGate } from "@/lib/motion/revealGate";
import { useLenis } from "@/components/motion/MotionProvider";
import { frameStore } from "@/lib/frameLoader";

export default function Preloader() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === "/");
  const [percent, setPercent] = useState(0);
  const { stopScroll, startScroll } = useLenis();

  const containerRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  const unlockAndHide = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    revealGate.open(false);
    startScroll();
    setActive(false);
  }, [startScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname !== "/") {
      unlockAndHide();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipQuery = window.location.search.includes("skip_intro");

    if (reduce || skipQuery) {
      revealGate.open(true);
      unlockAndHide();
      return;
    }

    finishedRef.current = false;
    setActive(true);
    revealGate.close();
    stopScroll();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const isMobile = window.innerWidth < 768;
    let cancelled = false;

    const fadeOut = () => {
      if (cancelled || finishedRef.current) return;
      // Ensure scroll starts at top before revealing the scroll-driven intro
      window.scrollTo(0, 0);
      if (!containerRef.current) {
        unlockAndHide();
        return;
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: EASE.out,
        onComplete: unlockAndHide,
      });
    };

    const failsafe = window.setTimeout(() => {
      setPercent(100);
      fadeOut();
    }, 6000);

    frameStore
      .start(isMobile, (pct) => {
        if (!cancelled) setPercent(pct);
      })
      .then(() => {
        if (cancelled) return;
        window.clearTimeout(failsafe);
        setPercent(100);
        // Brief beat at 100% so user sees completion before fade
        window.setTimeout(fadeOut, 140);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      startScroll();
    };
  }, [pathname, stopScroll, startScroll, unlockAndHide]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Meddy Oil & Gas experience"
      className="fixed inset-0 z-[100] bg-[#0B1E36] flex flex-col items-center justify-center select-none"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F0EDDE] p-3 flex items-center justify-center shadow-2xl animate-pulse">
          <img
            src="/meddy-mark.png"
            alt="Meddy Oil & Gas Mark"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center">
          <div className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
            MEDDY
          </div>
          <div className="font-body text-[10px] font-bold tracking-[0.22em] text-[#F69E28] uppercase mt-1">
            OIL &amp; GAS
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-1 w-40">
          <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F69E28] transition-all duration-150 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-xs tracking-widest text-white/75 tabular-nums">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
