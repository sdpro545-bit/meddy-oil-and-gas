"use client";

import React, { useRef } from "react";
import PictureImage from "@/components/PictureImage";
import { Check, Star } from "lucide-react";
import { SITE_STATS } from "@/lib/data";
import Button from "@/components/motion/Button";
import RevealLines from "@/components/motion/RevealLines";
import RevealWords from "@/components/motion/RevealWords";
import FadeUp from "@/components/motion/FadeUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tankImageRef = useRef<HTMLDivElement>(null);
  const engineerImageRef = useRef<HTMLDivElement>(null);
  const orangeRuleRef = useRef<HTMLDivElement>(null);

  const checklist = [
    "Safety is at the core of everything we do",
    "Our team of skilled engineers and technical specialists",
    "We adhere to rigorous quality control",
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Section 6.3 About block scroll choreography:
      // Subheading orange rule draws from the left (900ms)
      if (orangeRuleRef.current) {
        gsap.fromTo(
          orangeRuleRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: EASE.out,
            scrollTrigger: {
              trigger: orangeRuleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Images unmask: clip-path inset(0 0 100% 0) to inset(0) + scale 1.08 to 1
      if (tankImageRef.current) {
        gsap.fromTo(
          tankImageRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1.0,
            duration: 1.1,
            ease: EASE.out,
            scrollTrigger: {
              trigger: tankImageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // 6% parallax in opposite direction
        gsap.to(tankImageRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      if (engineerImageRef.current) {
        gsap.fromTo(
          engineerImageRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1.0,
            duration: 1.1,
            ease: EASE.out,
            delay: 0.15,
            scrollTrigger: {
              trigger: engineerImageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // 12% parallax in opposite direction
        gsap.to(engineerImageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 bg-[#F6F8FB] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-20">
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.04] rounded-[2px] border border-black/[0.06] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-body text-xs font-semibold tracking-wider text-[#0B1E36] uppercase">
                About Us
              </span>
            </div>
          </FadeUp>

          <RevealLines
            as="h2"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1E36] uppercase tracking-tight leading-[0.98]"
          >
            Projects Completed &amp; Field Professionals
          </RevealLines>
        </div>

        {/* 3-Zone Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Zone 1: Left Image (Storage Tank, 4:3 aspect, lower offset) */}
          <div className="lg:col-span-3 order-2 lg:order-1 relative lg:mt-16">
            <div
              ref={tankImageRef}
              className="relative aspect-[4/3] w-full rounded-[2px] overflow-hidden border border-black/[0.06] bg-[#EAEFF5]"
            >
              <PictureImage
                stem="about-tank"
                widths={[800, 1200]}
                placeholderKey="about-tank"
                alt="Steel storage tank with a yellow access staircase"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-wider text-white/90 bg-[#0B1E36] px-2.5 py-1 rounded-[2px] border border-white/10">
                LAGOS LOGISTICS BASE
              </div>
            </div>
          </div>

          {/* Zone 2: Center Text Column (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            {/* Apple "reading light up" scrubbed word fill */}
            <RevealWords
              as="p"
              className="font-body text-base lg:text-lg text-[#2B4260] leading-relaxed"
            >
              Meddy Oil &amp; Gas Limited is an oil and gas services company based in Lekki, Lagos. We work with operators across Nigeria on well construction, oil field services, integrated coordination, offshore vessel support, and power projects.
            </RevealWords>

            {/* Subheading with Orange Rule */}
            <div className="pt-2">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-[#0B1E36] uppercase tracking-wide">
                Dedicated to Excellence in Oil and Gas Service
              </h3>
              <div ref={orangeRuleRef} className="w-16 h-[3px] bg-[#F69E28] mt-2.5 rounded-[1px]" />
            </div>

            {/* Checklist */}
            <ul className="space-y-3.5 pt-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-body text-sm sm:text-base text-[#2B4260] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats Row */}
            <div className="pt-6 border-t border-[#EAEFF5] flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-[2px] bg-[#102A47] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    M1
                  </div>
                  <div className="w-8 h-8 rounded-[2px] bg-[#F69E28] border-2 border-white flex items-center justify-center text-[10px] text-[#0B1E36] font-bold">
                    M2
                  </div>
                  <div className="w-8 h-8 rounded-[2px] bg-[#164882] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    M3
                  </div>
                </div>
                <div>
                  <div className="flex text-[#F69E28] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-[#0B1E36] mt-0.5">
                    {SITE_STATS.employees ?? (
                      <span className="text-xs font-mono text-[#5B6E86]">
                        Field Engineering Crew
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Fields */}
              <div className="flex items-baseline gap-2">
                <div className="font-display text-4xl font-bold text-[#0B1E36]">
                  {SITE_STATS.activeFields ?? "05"}
                </div>
                <div className="text-xs font-semibold uppercase text-[#5B6E86]">
                  {SITE_STATS.activeFields ? "Active Fields" : "Core Capabilities"}
                </div>
              </div>
            </div>

            {/* Reference-accurate square CTA button */}
            <div className="pt-4">
              <Button href="/services" variant="primary" showArrow={true}>
                Explore Our Capabilities
              </Button>
            </div>
          </div>

          {/* Zone 3: Right Image (Engineer Portrait, 4:5 aspect, higher offset) */}
          <div className="lg:col-span-3 order-3 relative">
            <div
              ref={engineerImageRef}
              className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden border border-black/[0.06] bg-[#EAEFF5]"
            >
              <PictureImage
                stem="about-engineer"
                widths={[800, 1200]}
                placeholderKey="about-engineer"
                alt="Field engineer in an orange hard hat reviewing a tablet beside process pipework"
                width={1200}
                height={1500}
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="w-full h-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-wider text-white/90 bg-[#0B1E36] px-2.5 py-1 rounded-[2px] border border-white/10">
                FIELD SUPERVISOR ON SITE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
