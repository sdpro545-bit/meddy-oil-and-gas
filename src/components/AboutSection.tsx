"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import { SITE_STATS } from "@/lib/data";

export default function AboutSection() {
  const checklist = [
    "Safety is at the core of everything we do",
    "Our team of skilled engineers and technical specialists",
    "We adhere to rigorous quality control",
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-[#F6F8FB] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.04] rounded-full border border-black/[0.06] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-[#0B1E36] uppercase">
              About Us
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1E36] uppercase tracking-tight leading-[0.98]">
            Projects Completed &amp; Field Professionals
          </h2>
        </div>

        {/* 3-Zone Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Zone 1: Left Image (Storage Tank, 4:3 aspect, lower offset) */}
          <div className="lg:col-span-3 order-2 lg:order-1 relative lg:mt-16">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-black/[0.06] bg-[#EAEFF5] group">
              <Image
                src="/images/about-tank.jpg"
                alt="Industrial energy storage facility"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-wider text-white/90 bg-[#0B1E36]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                LAGOS LOGISTICS BASE
              </div>
            </div>
          </div>

          {/* Zone 2: Center Text Column (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <p className="font-body text-base lg:text-lg text-[#2B4260] leading-relaxed">
              Meddy Oil &amp; Gas Limited is an oil and gas services company based in Lekki, Lagos. We support exploration, drilling, well construction, and asset maintenance for operators across Nigeria who require disciplined, dependable delivery.
            </p>

            {/* Subheading with Orange Rule */}
            <div className="pt-2">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-[#0B1E36] uppercase tracking-wide">
                Dedicated to Excellence in Oil and Gas Service
              </h3>
              <div className="w-16 h-[3px] bg-[#F69E28] mt-2.5 rounded-full" />
            </div>

            {/* Checklist */}
            <ul className="space-y-3.5 pt-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-body text-sm sm:text-base text-[#2B4260] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats Row */}
            <div className="pt-6 border-t border-[#EAEFF5] flex flex-wrap items-center gap-8">
              {/* Personnel Badge */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#102A47] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    M1
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F69E28] border-2 border-white flex items-center justify-center text-[10px] text-[#0B1E36] font-bold">
                    M2
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#164882] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                    M3
                  </div>
                </div>
                <div>
                  <div className="flex text-[#F69E28] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-[#0B1E36] mt-0.5">
                    {SITE_STATS.employees ?? (
                      <span className="text-xs font-mono text-[#5B6E86]">
                        Field Engineering Crew
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Fields */}
              <div className="flex items-baseline gap-2">
                <div className="font-display text-4xl font-bold text-[#0B1E36]">
                  {SITE_STATS.activeFields ?? "06"}
                </div>
                <div className="text-xs font-semibold uppercase text-[#5B6E86]">
                  {SITE_STATS.activeFields ? "Active Fields" : "Core Capabilities"}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 h-[46px] px-7 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] text-[#0B1E36] font-body text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-[0_4px_16px_rgba(246,158,40,0.25)] hover:shadow-[0_6px_20px_rgba(246,158,40,0.4)] group"
              >
                <span>Explore Our Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Zone 3: Right Image (Engineer Portrait, 4:5 aspect, higher offset) */}
          <div className="lg:col-span-3 order-3 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/[0.06] bg-[#EAEFF5] group">
              <Image
                src="/images/about-nigerian-engineer.png"
                alt="Nigerian oilfield specialist reviewing technical plans"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold tracking-wider text-white/90 bg-[#0B1E36]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                FIELD SUPERVISOR ON SITE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
