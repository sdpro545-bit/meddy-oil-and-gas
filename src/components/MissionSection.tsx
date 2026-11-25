"use client";

import React from "react";
import PictureImage from "@/components/PictureImage";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";

export default function MissionSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-white border-b border-[#EAEFF5] overflow-hidden">
      {/* DRAFT COPY */}
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-5">
            <FadeUp delay={0.1} y={16}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.04] rounded-[2px] border border-black/[0.06]">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-xs font-semibold tracking-wider text-[#0B1E36] uppercase">
                  Our Mission
                </span>
              </div>
            </FadeUp>

            <RevealLines
              as="h2"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]"
            >
              Disciplined Field Execution Built Around Safety
            </RevealLines>

            <FadeUp delay={0.2} y={16}>
              <p className="font-body text-base text-[#2B4260] leading-relaxed">
                Our mission is to support energy operators across Nigeria with dependable field crews, verified equipment readiness, and clear accountability on every wellsite, vessel, and facility assignment.
              </p>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full rounded-[2px] overflow-hidden border border-black/[0.06] bg-[#0B1E36]">
              <PictureImage
                stem="mission-team"
                widths={[1280, 1920]}
                placeholderKey="mission-team"
                alt="Four engineers reviewing site drawings on a table"
                width={1920}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
