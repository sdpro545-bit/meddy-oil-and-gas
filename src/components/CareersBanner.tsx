"use client";

import React from "react";
import Button from "@/components/motion/Button";

export default function CareersBanner() {
  return (
    <section className="py-20 lg:py-28 bg-[#F69E28] text-[#0B1E36]">
      <div className="site-container relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1E36]/10 rounded-[2px] border border-[#0B1E36]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B1E36]" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0B1E36]/90">
              ENGINEERING &amp; FIELD TALENT
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.98] text-[#0B1E36]">
            Build your career with Meddy
          </h2>
          <p className="font-body text-base font-medium text-[#0B1E36]/85 max-w-xl leading-relaxed">
            We are continuously seeking certified Nigerian engineers, field technicians, and logistics specialists committed to exceptional safety standards.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Button href="/careers" variant="dark" showArrow={true}>
            View Open Roles
          </Button>
        </div>
      </div>
    </section>
  );
}
