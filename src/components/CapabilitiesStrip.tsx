"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export default function CapabilitiesStrip() {
  const stripItems = SERVICES_DATA.slice(0, 5);

  return (
    <section className="relative w-full bg-white border-y border-[#EAEFF5] shadow-sm z-20">
      <div className="site-container">
        {/* Desktop 5 Equal Columns */}
        <div className="hidden md:grid md:grid-cols-5 divide-x divide-[#EAEFF5]">
          {stripItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/services/${item.slug}`}
              className="group py-6 px-4 flex flex-col justify-between hover:bg-[#F6F8FB] transition-all min-h-[96px]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5B6E86] group-hover:text-[#F69E28] transition-colors mb-2">
                <span>0{index + 1}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#F69E28]" />
              </div>
              <div className="font-display text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#2B4260] group-hover:text-[#0B1E36] transition-colors line-clamp-2">
                {item.title.replace(" Services", "")}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Snap Scroller */}
        <div className="md:hidden flex overflow-x-auto no-scrollbar py-4 divide-x divide-[#EAEFF5] -mx-4 px-4 snap-x snap-mandatory">
          {stripItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/services/${item.slug}`}
              className="flex-shrink-0 w-64 px-4 py-2 snap-start group"
            >
              <div className="text-xs font-mono text-[#F69E28] mb-1">
                0{index + 1} CAPABILITY
              </div>
              <div className="font-display text-lg font-bold uppercase text-[#0B1E36]">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
