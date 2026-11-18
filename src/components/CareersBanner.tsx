"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareersBanner() {
  return (
    <section className="py-20 lg:py-28 bg-[#F69E28] text-[#0B1E36]">
      <div className="site-container flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0B1E36]/75">
            ENGINEERING &amp; FIELD TALENT
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.98]">
            Build your career with Meddy
          </h2>
          <p className="font-body text-base font-medium text-[#0B1E36]/85 max-w-xl">
            We are continuously seeking certified Nigerian engineers, field technicians, and logistics specialists committed to exceptional safety standards.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/careers"
            className="inline-flex items-center gap-3 h-14 px-8 bg-[#0B1E36] hover:bg-[#102A47] text-white font-body text-sm font-semibold rounded-[2px] transition-all shadow-md group"
          >
            <span>View Open Roles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F69E28]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
