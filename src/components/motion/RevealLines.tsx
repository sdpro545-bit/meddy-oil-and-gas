"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { EASE, DUR, STAGGER } from "@/lib/motion/tokens";
import { revealGate } from "@/lib/motion/revealGate";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface RevealLinesProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "p";
  className?: string;
  trigger?: "scroll" | "gate";
  triggerOnScroll?: boolean;
}

export default function RevealLines({
  children,
  as: Component = "h2",
  className = "",
  trigger,
  triggerOnScroll = true,
}: RevealLinesProps) {
  const elRef = useRef<HTMLElement>(null);
  const mode: "scroll" | "gate" = trigger ?? (triggerOnScroll ? "scroll" : "gate");

  useGSAP(
    () => {
      const el = elRef.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        el.style.visibility = "visible";
        return;
      }

      let cancelled = false;
      let split: SplitText | null = null;

      (async () => {
        try {
          await document.fonts.ready;
          await revealGate.ready();
          if (cancelled || !elRef.current) return;

          const quick = revealGate.isQuick && mode === "gate";
          const duration = quick ? DUR.line / 3 : DUR.line;
          const stagger = quick ? STAGGER.line / 3 : STAGGER.line;

          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            aria: "none",
            linesClass: "split-line",
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 115,
                skewY: 3,
                duration,
                ease: EASE.out,
                stagger,
                ...(mode === "scroll"
                  ? {
                      scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        once: true,
                      },
                    }
                  : {}),
              });
            },
          });

          el.style.visibility = "visible";
        } catch (err) {
          if (elRef.current) elRef.current.style.visibility = "visible";
          console.warn("RevealLines notice:", err);
        }
      })();

      return () => {
        cancelled = true;
        if (split && typeof split.revert === "function") {
          split.revert();
        }
      };
    },
    { scope: elRef, dependencies: [mode] }
  );

  return (
    <Component
      ref={elRef as React.Ref<never>}
      data-reveal=""
      className={`[text-wrap:balance] ${className}`}
    >
      {children}
    </Component>
  );
}
