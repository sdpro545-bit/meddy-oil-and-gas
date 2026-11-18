"use client";

import React from "react";
import { WHY_MEDDY_POINTS } from "@/lib/data";

export default function WhyMeddy() {
  return (
    <section className="py-24 lg:py-36 bg-white border-b border-[#EAEFF5]">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
                Operating Principles
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
              Why Choose
              <br />
              <span className="text-[#F69E28]">Meddy Oil &amp; Gas</span>
            </h2>
            <p className="font-body text-base text-[#5B6E86] leading-relaxed max-w-sm pt-2">
              We align engineering precision with uncompromised field discipline across every contract in Nigeria.
            </p>
          </div>

          {/* Right Column: 4 Clean Statements with Hairlines (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-[#EAEFF5]">
            {WHY_MEDDY_POINTS.map((pt, idx) => (
              <div key={pt.title} className="py-8 first:pt-0 last:pb-0 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#F69E28] tracking-widest uppercase">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-[1px] bg-[#EAEFF5]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#0B1E36] tracking-wide">
                  {pt.title}
                </h3>
                <p className="font-body text-base text-[#2B4260] leading-relaxed max-w-xl">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
