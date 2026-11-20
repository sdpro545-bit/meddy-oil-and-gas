import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HardHat, HeartPulse, Leaf, ArrowRight } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import RevealWords from "@/components/motion/RevealWords";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

export const metadata = {
  title: "QHSE Policy | Meddy Oil & Gas Limited",
  description:
    "Quality, Health, Safety and Environment governance at Meddy Oil & Gas Limited. Our non-negotiable commitments to safety in Nigerian oilfield operations.",
};

export default function QHSEPage() {
  const pillars = [
    {
      icon: HardHat,
      title: "Personnel Safety & Stop Work",
      description:
        "Every engineer and technician holds unconditional Stop Work Authority. When conditions fall outside verified tolerances, work stops immediately until risks are mitigated.",
    },
    {
      icon: HeartPulse,
      title: "Occupational Health",
      description:
        "Continuous monitoring of physical well-being, hearing protection enforcement, noise mitigation, fatigue management, and emergency medical response protocols.",
    },
    {
      icon: Leaf,
      title: "Environmental Protection",
      description:
        "Rigorous containment procedures for drilling fluids, zero unauthorized discharge, spill prevention kits on standby, and responsible waste management.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description:
        "Systematic verification of tools, tubulars, and materials against approved manufacturer and API standards prior to rig mobilization.",
    },
  ];

  return (
    <div className="bg-[#F6F8FB]">
      {/* Sleek Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="site-container relative z-10">
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-[2px] border border-white/[0.1]">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                  Operational Standards
                </span>
              </div>
            </FadeUp>
            <RevealLines as="h1" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              Quality, Health, Safety &amp; Environment
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                Safety is not a checklist item at Meddy Oil &amp; Gas. It is the fundamental condition under which all engineering activity takes place.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured Photo Band */}
      <div className="site-container py-12">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-[2px] overflow-hidden shadow-2xl border border-black/[0.06] bg-[#0B1E36]">
          <Image
            src="/images/qhse-toolbox-talk.png"
            alt="Safety briefing and toolbox talk at oil and gas operations base"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-white">
              <div className="text-xs font-mono text-[#F69E28] uppercase tracking-wider">
                DAILY PROTOCOL
              </div>
              <div className="font-display text-2xl font-bold uppercase">
                Toolbox Safety Briefing Before Every Shift
              </div>
            </div>
            <div className="text-xs font-mono text-white/90 bg-[#0B1E36]/90 px-4 py-2 rounded-[2px] border border-white/20">
              ZERO TOLERANCE FOR COMPROMISE
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="site-container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 apple-card space-y-4"
              >
                <div className="w-12 h-12 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy Commitment Statement */}
      <div className="site-container pb-24">
        <div className="p-8 sm:p-12 apple-card space-y-6">
          <span className="text-xs font-mono font-bold text-[#F69E28] uppercase tracking-wider">
            POLICY COMMITMENT
          </span>
          <RevealWords as="h2" className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36] leading-snug">
            We pledge to conduct all drilling, wireline, and engineering activities with zero fatal incidents, zero lost time injuries, and zero uncontained releases to the Nigerian maritime and terrestrial environment.
          </RevealWords>
          <p className="font-body text-sm sm:text-base text-[#5B6E86] leading-relaxed max-w-3xl">
            This commitment is supported by regular safety drills, equipment inspection routines, and executive safety reviews for every operational project.
          </p>
          <div className="pt-4 border-t border-[#EAEFF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#5B6E86]">
              POLICY REF: MOG-QHSE-2025-V1
            </div>
            <Button href="/contact" variant="primary">
              Request QHSE Manual Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
