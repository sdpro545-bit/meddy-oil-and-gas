"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion/tokens";

export default function ServicesSection() {
  const [activeHover, setActiveHover] = useState<string>(SERVICES_DATA[0].id);
  const rowsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeHover) || SERVICES_DATA[0];

  useEffect(() => {
    if (typeof window === "undefined" || !rowsRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    // Section 6.4: Each row rises 32px with 90ms stagger
    const rows = rowsRef.current.children;
    gsap.from(rows, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: EASE.out,
      scrollTrigger: {
        trigger: rowsRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 bg-[#0B1E36] text-white overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <FadeUp delay={0.1} y={16}>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
                  Core Operations
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h2"
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none"
            >
              What We Do
            </RevealLines>
          </div>
          <FadeUp delay={0.2} y={16}>
            <p className="font-body text-base text-white/70 max-w-md leading-relaxed">
              Pick a service to review operational scope, rig-site applications, and deployment procedures.
            </p>
          </FadeUp>
        </div>

        {/* 2-Column Split: Interactive Numbered List + Desktop Sticky Preview Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Numbered Service Rows (7 cols) */}
          <div ref={rowsRef} className="lg:col-span-7 divide-y divide-white/10">
            {SERVICES_DATA.map((srv) => {
              const isSelected = activeHover === srv.id;
              return (
                <div
                  key={srv.id}
                  onMouseEnter={() => setActiveHover(srv.id)}
                  className="group py-6 transition-all duration-200 cursor-pointer"
                >
                  <Link
                    href={`/services/${srv.slug}`}
                    className="flex items-start justify-between gap-6"
                  >
                    <div className="flex items-start gap-6">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-[#F69E28] font-mono leading-none pt-1">
                        {srv.number}
                      </span>
                      <div className="space-y-1.5 transition-transform duration-200 group-hover:translate-x-2">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white group-hover:text-[#F69E28] transition-colors leading-tight">
                          {srv.title}
                        </h3>
                        <p className="font-body text-sm text-white/70 max-w-lg leading-relaxed line-clamp-2">
                          {srv.shortSummary}
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-[2px] border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F69E28] group-hover:border-[#F69E28] group-hover:text-[#0B1E36] transition-all text-white/80">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:rotate-45" />
                    </div>
                  </Link>

                  {/* Mobile Preview Image (shown inline on mobile only) */}
                  <div className="lg:hidden mt-4 relative aspect-[16/9] w-full rounded-[2px] overflow-hidden border border-white/10">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Sticky Image Preview Frame (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative aspect-[4/3] w-full rounded-[2px] overflow-hidden border border-white/[0.12] bg-[#102A47]">
              <Image
                key={activeService.image}
                src={activeService.image}
                alt={activeService.title}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#F69E28] tracking-widest uppercase bg-[#0B1E36] px-2.5 py-1 rounded-[2px] border border-white/10">
                  {activeService.number} &bull; FIELD CAPABILITY
                </span>
                <h4 className="font-display text-2xl font-bold uppercase text-white leading-tight">
                  {activeService.title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
