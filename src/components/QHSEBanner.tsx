"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, HardHat, CheckCircle2, AlertTriangle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Button from "@/components/motion/Button";
import { EASE } from "@/lib/motion/tokens";

export default function QHSEBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const mm = gsap.matchMedia();

    // Desktop: Pinned choreography
    mm.add("(min-width: 768px)", () => {
      let split: any = null;

      try {
        if (headlineRef.current) {
          split = new SplitText(headlineRef.current, {
            type: "words",
            wordsClass: "inline-block",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        });

        // 1. Background image scales from 1.15 to 1
        if (bgImgRef.current) {
          tl.fromTo(
            bgImgRef.current,
            { scale: 1.15 },
            { scale: 1, ease: "none", duration: 1 },
            0
          );
        }

        // 2. Scrim opacity moves from 0.55 to 0.4
        if (scrimRef.current) {
          tl.fromTo(
            scrimRef.current,
            { opacity: 0.55 },
            { opacity: 0.4, ease: "none", duration: 1 },
            0
          );
        }

        // 3. Statement fills word by word
        if (split && split.words.length > 0) {
          tl.fromTo(
            split.words,
            { opacity: 0.18 },
            { opacity: 1, ease: "none", stagger: 0.05, duration: 0.8 },
            0.1
          );
        }

        // 4. Three commitments rise in towards the end of the pin
        if (commitmentsRef.current) {
          const cards = commitmentsRef.current.children;
          tl.fromTo(
            cards,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, ease: EASE.out, stagger: 0.08, duration: 0.4 },
            0.6
          );
        }
      } catch (err) {
        console.warn("QHSEBanner motion setup:", err);
      }

      return () => {
        if (split && typeof split.revert === "function") {
          split.revert();
        }
      };
    });

    // Mobile: standard unpinned reveal
    mm.add("(max-width: 767px)", () => {
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 bg-[#0B1E36] overflow-hidden flex items-center"
    >
      {/* Background Photography with Parallax Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgImgRef} className="relative w-full h-full scale-[1.15] origin-center">
          <Image
            src="/images/qhse-toolbox-talk.png"
            alt="Nigerian crew in QHSE toolbox talk at oil and gas operations base"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Scrim Overlay */}
        <div
          ref={scrimRef}
          className="absolute inset-0 bg-[#0B1E36]"
          style={{ opacity: 0.55 }}
        />
        {/* Subtle gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36] via-[#0B1E36]/40 to-[#0B1E36]/70" />
      </div>

      <div className="site-container relative z-10 w-full">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-[2px] border border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
              Quality, Health, Safety &amp; Environment
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]"
          >
            Nobody starts work until the job is safe to start.
          </h2>

          <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            Hazard identification, pre-task briefings, and regulatory compliance are non-negotiable prerequisites on every offshore and onshore work programme.
          </p>

          {/* Three Commitments */}
          <div
            ref={commitmentsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10"
          >
            <div className="p-4 bg-[#102A47]/70 border border-white/10 rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 text-[#F69E28]">
                <HardHat className="w-4 h-4" />
                <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Stop Work Authority
                </span>
              </div>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                Unconditional authority for any worker to halt unsafe operations immediately.
              </p>
            </div>

            <div className="p-4 bg-[#102A47]/70 border border-white/10 rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 text-[#F69E28]">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Daily Toolbox Talks
                </span>
              </div>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                Mandatory hazard review and task analysis before every shift commences.
              </p>
            </div>

            <div className="p-4 bg-[#102A47]/70 border border-white/10 rounded-[2px] space-y-1">
              <div className="flex items-center gap-2 text-[#F69E28]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  Regulatory Rigour
                </span>
              </div>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                Disciplined adherence to Nigerian Upstream Petroleum Regulatory Commission standards.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button href="/qhse" variant="primary">
              Read Our QHSE Policy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
