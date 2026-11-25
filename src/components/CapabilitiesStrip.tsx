"use client";

import React, { useRef } from "react";
import AppLink from "@/components/motion/AppLink";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_DATA } from "@/lib/data";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CapabilitiesStrip() {
  const stripItems = SERVICES_DATA.slice(0, 5);
  const containerRef = useRef<HTMLElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Hairline dividers draw down (scaleY: 0 to 1) & cells rise 24px with 70ms stagger
      if (cellsRef.current) {
        const cells = cellsRef.current.querySelectorAll(".capability-cell");
        const dividers = cellsRef.current.querySelectorAll(".hairline-divider");

        gsap.fromTo(
          dividers,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 0.7,
            ease: EASE.out,
            stagger: 0.07,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          cells,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE.out,
            stagger: 0.07,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white border-y border-[#EAEFF5] shadow-sm z-20"
    >
      <div className="site-container">
        {/* Desktop 5 Equal Columns */}
        <div ref={cellsRef} className="hidden md:grid md:grid-cols-5 relative">
          {stripItems.map((item, index) => (
            <div key={item.id} className="relative flex">
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="hairline-divider absolute left-0 top-0 bottom-0 w-[1px] bg-[#EAEFF5] origin-top"
                />
              )}
              <AppLink
                href={`/services/${item.slug}`}
                className="capability-cell group py-6 px-4 flex flex-col justify-between hover:bg-[#F6F8FB] transition-colors min-h-[96px] w-full"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#5B6E86] group-hover:text-[#F69E28] transition-colors mb-2">
                  <span>0{index + 1}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#F69E28]" />
                </div>
                <div className="font-display text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#2B4260] group-hover:text-[#0B1E36] transition-colors line-clamp-2">
                  {item.stripLabel}
                </div>
              </AppLink>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Snap Scroller */}
        <div className="md:hidden flex overflow-x-auto no-scrollbar py-4 divide-x divide-[#EAEFF5] -mx-4 px-4 snap-x snap-mandatory">
          {stripItems.map((item, index) => (
            <AppLink
              key={item.id}
              href={`/services/${item.slug}`}
              className="flex-shrink-0 w-64 px-4 py-2 snap-start group"
            >
              <div className="text-xs font-mono text-[#F69E28] mb-1">
                0{index + 1} CAPABILITY
              </div>
              <div className="font-display text-lg font-bold uppercase text-[#0B1E36]">
                {item.stripLabel}
              </div>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
