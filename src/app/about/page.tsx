import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Target, Users, Award, ArrowRight } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";

export const metadata = {
  title: "About Us | Meddy Oil & Gas Limited",
  description:
    "Learn about Meddy Oil & Gas Limited: our Lekki Lagos base, operating principles, and commitment to safe energy delivery.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Safety Above All",
      text: "Zero compromise on field personnel safety, environmental protection, and equipment integrity on every assignment.",
    },
    {
      icon: Target,
      title: "Technical Precision",
      text: "Thorough planning, detailed well control analysis, and disciplined execution to specification.",
    },
    {
      icon: Award,
      title: "Quality Control",
      text: "Rigorous inspection of tubulars, valves, and consumables before field deployment.",
    },
    {
      icon: Users,
      title: "Local Capability",
      text: "Proudly developing Nigerian engineering capacity and supporting operators with fast response logistics.",
    },
  ];

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-[#F6F8FB]">
      {/* Page Header */}
      <div className="site-container py-12 lg:py-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-[#F69E28] uppercase">
              Corporate Overview
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
            About Meddy Oil &amp; Gas
          </h1>
          <p className="font-body text-lg text-[#2B4260] leading-relaxed max-w-2xl pt-2">
            Meddy Oil &amp; Gas Limited is a Nigerian oil and gas services company headquartered in Lekki, Lagos. We support operators across upstream exploration, drilling, well completions, and production maintenance.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="site-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36]">
              Built on Discipline, Reliability, and Safety
            </h2>
            <p className="font-body text-base text-[#2B4260] leading-relaxed">
              Founded to provide disciplined oilfield support services, Meddy Oil &amp; Gas operates from Lekki Phase 1 in Lagos, coordinating rapid equipment mobilization and technical personnel across the Niger Delta and offshore fields.
            </p>
            <p className="font-body text-base text-[#2B4260] leading-relaxed">
              We collaborate closely with operating companies to ensure well programmes run safely, efficiently, and in strict adherence to environmental regulations and quality control standards.
            </p>
            <div className="pt-2">
              <div className="text-xs font-mono text-[#5B6E86] uppercase">
                Registered Head Office
              </div>
              <div className="text-sm font-semibold text-[#0B1E36] mt-1">
                {COMPANY_FACTS.address}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-[4px] overflow-hidden shadow-xl border border-[#EAEFF5]">
            <Image
              src="/images/about-nigerian-engineer.png"
              alt="Meddy Oil & Gas field engineer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="site-container py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono text-[#F69E28] uppercase tracking-wider">
            FOUNDATIONAL VALUES
          </span>
          <h2 className="font-display text-4xl font-bold uppercase text-[#0B1E36] mt-2">
            The Principles Guiding Our Crew
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 bg-white rounded-[4px] border border-[#EAEFF5] space-y-3 shadow-sm hover:border-[#F69E28] transition-all"
              >
                <div className="w-10 h-10 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1E36]">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Shell (Safe Placeholder) */}
      <div className="site-container py-12">
        <div className="p-8 sm:p-12 bg-[#0B1E36] text-white rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-[#F69E28] uppercase">
              EXECUTIVE LEADERSHIP
            </span>
            <h3 className="font-display text-3xl font-bold uppercase text-white">
              Management &amp; Governance
            </h3>
            <p className="font-body text-sm text-white/70">
              Executive profiles and board credentials will be published upon regulatory filing completion. Direct executive inquiries can be routed through corporate administration.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-6 bg-[#F69E28] text-[#0B1E36] font-semibold text-sm rounded-[2px] hover:bg-[#E08518] transition-all flex-shrink-0"
          >
            <span>Contact Management Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
