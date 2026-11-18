"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function QHSEBanner() {
  return (
    <section className="relative py-28 lg:py-36 bg-[#0B1E36] overflow-hidden">
      {/* Full Bleed Background Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/qhse-toolbox-talk.png"
          alt="Nigerian crew in QHSE toolbox talk at oil and gas operations base"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-[#0B1E36]/80 backdrop-blur-[1px]" />
      </div>

      <div className="site-container relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-[2px] border border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
              Quality, Health, Safety &amp; Environment
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight leading-[0.98]">
            Nobody starts work until the job is safe to start.
          </h2>

          <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            Our QHSE governance guarantees that hazard identification, daily pre-task briefings, and regulatory compliance are non-negotiable prerequisites on every offshore and onshore work programme.
          </p>

          <div className="pt-4">
            <Link
              href="/qhse"
              className="inline-flex items-center gap-3 h-13 px-8 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] text-[#0B1E36] font-body text-sm font-semibold rounded-[2px] transition-all shadow-md group"
            >
              <span>Read Our QHSE Policy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
