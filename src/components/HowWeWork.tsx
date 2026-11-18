"use client";

import React from "react";
import { HOW_WE_WORK_STEPS } from "@/lib/data";

export default function HowWeWork() {
  return (
    <section className="py-24 lg:py-36 bg-[#F6F8FB] border-b border-[#EAEFF5]">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
              Operational Delivery
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
            How We Work
          </h2>
          <p className="font-body text-base text-[#5B6E86] leading-relaxed pt-3">
            A structured execution protocol applied systematically across all field contracts.
          </p>
        </div>

        {/* 4-Step Timeline: Desktop Horizontal / Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 bg-white border border-[#EAEFF5] rounded-[4px] shadow-sm space-y-4 hover:border-[#F69E28] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-[#F69E28] font-mono">
                  {step.step}
                </span>
                <span className="text-xs font-mono text-[#5B6E86] uppercase tracking-wider">
                  STAGE 0{idx + 1}
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
