"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface RevealWordsProps {
  children: React.ReactNode;
  as?: "p" | "div" | "h2" | "h3";
  className?: string;
}

export default function RevealWords({
  children,
  as: Component = "p",
  className = "",
}: RevealWordsProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elRef.current) return;

    // Below 768px or reduced motion: keep fully visible
    const isMobile = window.innerWidth < 768;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reduce) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let split: any = null;
    let tween: any = null;

    try {
      split = new SplitText(elRef.current, {
        type: "words",
        wordsClass: "inline-block",
      });

      tween = gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    } catch (e) {
      console.warn("RevealWords notice:", e);
    }

    return () => {
      if (tween) tween.kill();
      if (split && typeof split.revert === "function") {
        split.revert();
      }
    };
  }, []);

  return (
    <Component ref={elRef as any} className={className}>
      {children}
    </Component>
  );
}
