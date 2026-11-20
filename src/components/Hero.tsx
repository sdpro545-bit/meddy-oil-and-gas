"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { COMPANY_FACTS } from "@/lib/data";
import Button from "@/components/motion/Button";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion/tokens";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    // Section 6.1 Hero Scroll-out choreography:
    // Hero image yPercent: 0 to 12 (scrub: 0.6)
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    // Hero content: opacity 1 to 0, y: 0 to -40px between 10% and 60% of hero scroll
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "60% top",
          scrub: 0.6,
        },
      });
    }

    // Ghost word MEDDY drifts yPercent: 0 to -10 at a slower rate
    if (ghostRef.current) {
      gsap.to(ghostRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }

    // Hero entrance when preloader lifts
    const handleIntroLift = () => {
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.12 },
          { scale: 1.0, duration: 1.6, ease: EASE.out }
        );
      }
    };

    window.addEventListener("meddy_intro_lift", handleIntroLift);
    return () => window.removeEventListener("meddy_intro_lift", handleIntroLift);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] lg:min-h-[820px] lg:max-h-[940px] w-full flex items-center justify-center overflow-hidden bg-[#0B1E36]"
    >
      {/* Background Photography with Parallax */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 origin-center scale-[1.04]">
        <Image
          src="/images/hero-desktop-1920.webp"
          alt="Offshore engineer in navy coveralls and a white hard hat on a platform deck"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_25%] lg:object-[82%_25%]"
        />
        {/* Directional Legibility Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E36]/92 via-[#0B1E36]/70 to-transparent lg:w-[68%]" />
        {/* Subtle bottom gradient to merge into capabilities strip */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1E36] to-transparent lg:hidden" />
      </div>

      <div
        ref={contentRef}
        className="site-container relative z-10 w-full pt-32 pb-20 lg:pt-36 lg:pb-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column (7 cols desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow: clean static dot, no animate-pulse */}
            <FadeUp delay={0.1} y={16}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-[2px] border border-white/[0.1]">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                  {COMPANY_FACTS.eyebrow}
                </span>
              </div>
            </FadeUp>

            {/* H1 Headline with Masked Rise */}
            <RevealLines
              as="h1"
              triggerOnScroll={false}
              className="font-display text-5xl sm:text-7xl lg:text-[88px] font-bold text-white uppercase leading-[0.94] tracking-tight"
            >
              Engineering the Energy Future
            </RevealLines>

            {/* Sub-lead */}
            <FadeUp delay={0.3} y={24}>
              <p className="font-body text-base sm:text-lg text-white/80 max-w-xl leading-relaxed pt-1">
                Meddy Oil &amp; Gas Limited supports exploration, drilling, well construction, and asset maintenance for operators across Nigeria who require disciplined, dependable delivery.
              </p>
            </FadeUp>

            {/* Reference-accurate 2px radius CTA Buttons */}
            <FadeUp delay={0.4} y={16}>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="#contact" variant="primary" showArrow={true}>
                  Request Consultation
                </Button>
                <Button href="/services" variant="secondary" showArrow={false}>
                  View Capabilities
                </Button>
              </div>
            </FadeUp>
          </div>

          {/* Right Bottom Cluster (5 cols desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end relative">
            <div className="relative text-left lg:text-right p-8 rounded-[2px] border border-white/[0.12] bg-[#0B1E36]/75 max-w-sm lg:ml-auto shadow-2xl">
              {/* Massive Ghost Lettering behind */}
              <div
                ref={ghostRef}
                aria-hidden="true"
                className="absolute right-2 -bottom-4 font-display text-[96px] sm:text-[130px] font-bold text-white/[0.06] select-none pointer-events-none leading-none tracking-tighter"
              >
                MEDDY
              </div>

              {/* Stacked 3 words */}
              <div className="relative z-10 space-y-1">
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-white uppercase">
                  Safety
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#F69E28] uppercase">
                  Reliability
                </div>
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-white uppercase">
                  Performance
                </div>
              </div>

              {/* Verified standard label */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.1] text-xs text-white/60 font-mono flex items-center justify-between">
                <span>HEADQUARTERS</span>
                <span className="text-white/80">LEKKI, LAGOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
