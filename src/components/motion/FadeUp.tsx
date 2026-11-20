"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion/tokens";

interface FadeUpProps {
  children: React.ReactNode;
  as?: any;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export default function FadeUp({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  y = 20,
  duration = DUR.slow,
}: FadeUpProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.from(elRef.current, {
      opacity: 0,
      y,
      duration,
      delay,
      ease: EASE.out,
      scrollTrigger: {
        trigger: elRef.current,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay, y, duration]);

  return (
    <Component ref={elRef} className={className}>
      {children}
    </Component>
  );
}
