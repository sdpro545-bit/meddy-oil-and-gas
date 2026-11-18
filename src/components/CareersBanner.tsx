"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareersBanner() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-[#F69E28] via-[#FCB424] to-[#F9DD6F] text-[#0B1E36]">
      {/* Subtle radial ambient reflection */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none" />

      <div className="site-container relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1E36]/10 backdrop-blur-md border border-[#0B1E36]/15">
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
          <Link
            href="/careers"
            className="inline-flex items-center gap-3 h-13 px-8 bg-[#0B1E36] hover:bg-[#102A47] text-white font-body text-sm font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>View Open Roles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-[#F69E28]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
