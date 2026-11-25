"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion/tokens";
import { revealGate } from "@/lib/motion/revealGate";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FadeUpProps {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "p" | "span";
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  trigger?: "scroll" | "gate";
}

export default function FadeUp({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  y = 20,
  duration = DUR.slow,
  trigger = "scroll",
}: FadeUpProps) {
  const elRef = useRef<HTMLDivElement>(null);

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
      let tween: gsap.core.Tween | null = null;

      (async () => {
        await revealGate.ready();
        if (cancelled || !elRef.current) return;

        const quick = revealGate.isQuick && trigger === "gate";
        const d = quick ? duration / 3 : duration;
        const del = quick ? delay / 3 : delay;

        tween = gsap.from(el, {
          opacity: 0,
          y,
          duration: d,
          delay: del,
          ease: EASE.out,
          ...(trigger === "scroll"
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }
            : {}),
        });

        el.style.visibility = "visible";
      })();

      return () => {
        cancelled = true;
        tween?.kill();
      };
    },
    { scope: elRef, dependencies: [delay, y, duration, trigger] }
  );

  return (
    <Component ref={elRef as React.Ref<never>} data-reveal="" className={className}>
      {children}
    </Component>
  );
}
