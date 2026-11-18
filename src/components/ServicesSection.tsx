"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export default function ServicesSection() {
  const [activeHover, setActiveHover] = useState<string>(SERVICES_DATA[0].id);

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeHover) || SERVICES_DATA[0];

  return (
    <section className="relative py-24 lg:py-36 bg-[#0B1E36] text-white overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
                Core Operations
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              What We Do
            </h2>
          </div>
          <p className="font-body text-base text-white/70 max-w-md leading-relaxed">
            Pick a service to review operational scope, rig-site applications, and deployment procedures.
          </p>
        </div>

        {/* 2-Column Split: Interactive Numbered List + Hover Preview Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Numbered Service Rows (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-white/10">
            {SERVICES_DATA.map((srv) => {
              const isSelected = activeHover === srv.id;
              return (
                <div
                  key={srv.id}
                  onMouseEnter={() => setActiveHover(srv.id)}
                  className={`group py-6 transition-all duration-300 ${
                    isSelected ? "translate-x-2" : "hover:translate-x-1"
                  }`}
                >
                  <Link
                    href={`/services/${srv.slug}`}
                    className="flex items-start justify-between gap-6"
                  >
                    <div className="flex items-start gap-6">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-[#F69E28] font-mono leading-none pt-1">
                        {srv.number}
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white group-hover:text-[#F69E28] transition-colors leading-tight">
                          {srv.title}
                        </h3>
                        <p className="font-body text-sm text-white/70 max-w-lg leading-relaxed line-clamp-2">
                          {srv.shortSummary}
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F69E28] group-hover:border-[#F69E28] group-hover:text-[#0B1E36] transition-all text-white/80">
                      <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </Link>

                  {/* Mobile Preview Image (shown inline on mobile only) */}
                  <div className="lg:hidden mt-4 relative aspect-[16/9] w-full rounded-[4px] overflow-hidden border border-white/10">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Sticky Image Preview Frame (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative aspect-[4/3] w-full rounded-[4px] overflow-hidden border border-white/15 shadow-2xl bg-[#102A47]">
              <Image
                key={activeService.image}
                src={activeService.image}
                alt={activeService.title}
                fill
                sizes="40vw"
                className="object-cover transition-all duration-500 animate-in fade-in zoom-in-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-xs font-mono text-[#F69E28] tracking-widest uppercase">
                  Service {activeService.number} Specification
                </span>
                <div className="font-display text-2xl font-bold uppercase text-white">
                  {activeService.title}
                </div>
                <div className="text-xs text-white/75 line-clamp-2">
                  {activeService.fullOverview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
