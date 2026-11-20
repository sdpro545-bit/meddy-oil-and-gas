"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { EASE, DUR, STAGGER } from "@/lib/motion/tokens";

interface RevealLinesProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "p";
  className?: string;
  triggerOnScroll?: boolean;
}

export default function RevealLines({
  children,
  as: Component = "h2",
  className = "",
  triggerOnScroll = true,
}: RevealLinesProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let split: any = null;
    let tween: any = null;

    try {
      split = new SplitText(elRef.current, {
        type: "lines",
        linesClass: "overflow-hidden inline-block w-full",
      });

      // Wrap lines in overflow-hidden mask
      const lines = split.lines;

      if (triggerOnScroll) {
        tween = gsap.from(lines, {
          yPercent: 110,
          duration: DUR.line,
          ease: EASE.out,
          stagger: STAGGER.line,
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 85%",
            once: true,
          },
        });
      } else {
        // Triggered manually or by parent
        tween = gsap.from(lines, {
          yPercent: 110,
          duration: DUR.line,
          ease: EASE.out,
          stagger: STAGGER.line,
        });
      }
    } catch (e) {
      console.warn("SplitText initialization notice:", e);
    }

    return () => {
      if (tween) tween.kill();
      if (split && typeof split.revert === "function") {
        split.revert();
      }
    };
  }, [triggerOnScroll]);

  return (
    <Component
      ref={elRef as any}
      className={`[text-wrap:balance] ${className}`}
    >
      {children}
    </Component>
  );
}
