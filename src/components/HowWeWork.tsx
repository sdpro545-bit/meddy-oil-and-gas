"use client";

import React, { useRef } from "react";
import { HOW_WE_WORK_STEPS } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Section 6.5: Horizontal line draws with scroll (scrub: 0.5)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              end: "bottom 65%",
              scrub: 0.5,
            },
          }
        );
      }

      // Step cards rise with stagger
      if (stepsRef.current) {
        const cards = stepsRef.current.children;
        gsap.from(cards, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: EASE.out,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-36 bg-[#F6F8FB] border-b border-[#EAEFF5] relative overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.04] rounded-[2px] border border-black/[0.06] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-body text-xs font-semibold tracking-wider text-[#0B1E36] uppercase">
                Operational Delivery
              </span>
            </div>
          </FadeUp>

          <RevealLines
            as="h2"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]"
          >
            How We Work
          </RevealLines>

          <FadeUp delay={0.2} y={16}>
            <p className="font-body text-base text-[#5B6E86] leading-relaxed pt-3">
              A structured execution protocol applied systematically across all field contracts.
            </p>
          </FadeUp>
        </div>

        {/* Scrubbed connecting line across steps */}
        <div className="hidden md:block relative mb-8">
          <div ref={lineRef} className="h-[2px] bg-[#F69E28] w-full origin-left" />
        </div>

        {/* 4-Step Grid with Reference-Accurate 2px border radius */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {HOW_WE_WORK_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 space-y-4 rounded-[2px] border border-black/[0.08] bg-white hover:border-[#F69E28]/40 transition-colors"
            >
              <div>
                <span className="font-display text-4xl font-bold text-[#F69E28] font-mono leading-none">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                {step.title}
              </h3>
              <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
