"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] lg:min-h-[820px] lg:max-h-[940px] w-full flex items-center justify-center overflow-hidden bg-[#0B1E36]">
      {/* Background Photography with object positioning */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-nigerian-engineer.png"
          alt="Nigerian oil and gas professional on offshore platform"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_25%] lg:object-[82%_25%]"
        />
        {/* Directional Legibility Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E36]/90 via-[#0B1E36]/65 to-transparent lg:w-[68%]" />
        {/* Subtle bottom gradient to merge into capabilities strip */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1E36] to-transparent lg:hidden" />
      </div>

      <div className="site-container relative z-10 w-full pt-32 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column (7 cols desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-full border border-white/[0.1] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F69E28] animate-pulse" />
              <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                {COMPANY_FACTS.eyebrow}
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[88px] font-bold text-white uppercase leading-[0.94] tracking-tight">
              Engineering the
              <br />
              <span className="text-white">Energy Future</span>
            </h1>

            {/* Sub-lead */}
            <p className="font-body text-base sm:text-lg text-white/80 max-w-xl leading-relaxed pt-1">
              Meddy Oil &amp; Gas Limited supports exploration, drilling, well construction, and asset maintenance for operators across Nigeria who require disciplined, dependable delivery.
            </p>

            {/* Apple-style CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 h-[50px] px-8 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.97] text-[#0B1E36] font-body text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-[0_4px_24px_rgba(246,158,40,0.35)] hover:shadow-[0_6px_28px_rgba(246,158,40,0.5)] group"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-[50px] px-8 border border-white/20 hover:border-white/40 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md text-white font-body text-sm font-semibold rounded-full active:scale-[0.97] transition-all"
              >
                <span>View Capabilities</span>
              </Link>
            </div>
          </div>

          {/* Right Bottom Cluster (5 cols desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end relative">
            <div className="relative text-left lg:text-right p-8 rounded-2xl border border-white/[0.12] bg-[#0B1E36]/60 backdrop-blur-2xl shadow-2xl max-w-sm lg:ml-auto">
              {/* Massive Ghost Lettering behind */}
              <div
                aria-hidden="true"
                className="absolute right-2 -bottom-4 font-display text-[96px] sm:text-[130px] font-bold text-white/[0.08] select-none pointer-events-none leading-none tracking-tighter"
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
