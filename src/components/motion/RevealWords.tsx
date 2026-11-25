"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { revealGate } from "@/lib/motion/revealGate";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

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

  useGSAP(
    () => {
      const el = elRef.current;
      if (!el) return;

      const isMobile = window.innerWidth < 768;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isMobile || reduce) {
        el.style.visibility = "visible";
        return;
      }

      let cancelled = false;
      let split: SplitText | null = null;
      let tween: gsap.core.Tween | null = null;

      (async () => {
        try {
          await document.fonts.ready;
          await revealGate.ready();
          if (cancelled || !elRef.current) return;

          split = SplitText.create(el, {
            type: "words",
            aria: "none",
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
                trigger: el,
                start: "top 80%",
                end: "bottom 45%",
                scrub: 0.6,
              },
            }
          );

          el.style.visibility = "visible";
        } catch (err) {
          if (elRef.current) elRef.current.style.visibility = "visible";
          console.warn("RevealWords notice:", err);
        }
      })();

      return () => {
        cancelled = true;
        tween?.kill();
        if (split && typeof split.revert === "function") {
          split.revert();
        }
      };
    },
    { scope: elRef }
  );

  return (
    <Component ref={elRef as React.Ref<never>} data-reveal="" className={className}>
      {children}
    </Component>
  );
}
