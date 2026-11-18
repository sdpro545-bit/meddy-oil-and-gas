import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HardHat, HeartPulse, Leaf, ArrowRight } from "lucide-react";

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
        "Every engineer and technician is empowered with unconditional Stop Work Authority. When conditions fall outside verified tolerances, work stops immediately until risks are mitigated.",
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
    <div className="pt-24 lg:pt-32 pb-24 bg-[#F6F8FB]">
      {/* Header */}
      <div className="site-container py-12 lg:py-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-[#F69E28] uppercase">
              Operational Standards
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
            Quality, Health, Safety &amp; Environment
          </h1>
          <p className="font-body text-lg text-[#2B4260] leading-relaxed max-w-2xl pt-2">
            Safety is not a checklist item at Meddy Oil &amp; Gas. It is the fundamental condition under which all engineering activity takes place.
          </p>
        </div>
      </div>

      {/* Featured Photo Band */}
      <div className="site-container py-6">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-[4px] overflow-hidden shadow-xl border border-[#EAEFF5] bg-[#0B1E36]">
          <Image
            src="/images/qhse-toolbox-talk.png"
            alt="Safety briefing and toolbox talk at oil and gas operations base"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/80 via-[#0B1E36]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-white">
              <div className="text-xs font-mono text-[#F69E28] uppercase tracking-wider">
                DAILY PROTOCOL
              </div>
              <div className="font-display text-2xl font-bold uppercase">
                Toolbox Safety Briefing Before Every Shift
              </div>
            </div>
            <div className="text-xs font-mono text-white/80 bg-white/10 px-3 py-1.5 rounded-[2px] border border-white/20">
              ZERO TOLERANCE FOR COMPROMISE
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 bg-white border border-[#EAEFF5] rounded-[4px] shadow-sm space-y-4 hover:border-[#F69E28] transition-all"
              >
                <div className="w-12 h-12 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                  {p.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#2B4260] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy Commitments */}
      <div className="site-container py-8">
        <div className="p-8 sm:p-12 bg-white border border-[#EAEFF5] rounded-[4px] space-y-6">
          <h2 className="font-display text-3xl font-bold uppercase text-[#0B1E36]">
            Our Core Policy Commitments
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#2B4260] leading-relaxed">
            <p>
              1. **Continuous Risk Assessment:** Identification of operational, chemical, mechanical, and environmental hazards before any tool is run in hole or equipment mobilized.
            </p>
            <p>
              2. **Regulatory Compliance:** Adherence to the Petroleum Industry Act (PIA), Nigerian Upstream Petroleum Regulatory Commission (NUPRC) directives, and federal environmental guidelines.
            </p>
            <p>
              3. **Competency Training:** Mandatory ongoing safety training, PPE compliance checks, and emergency simulated drills for all technical staff.
            </p>
            <p>
              4. **Incident Reporting:** Transparent investigation and root-cause analysis of any near-miss or anomaly to prevent recurrence across future contracts.
            </p>
          </div>

          <div className="pt-6 border-t border-[#EAEFF5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-[#5B6E86] font-mono">
              QHSE POLICY REF: MOG-QHSE-2026 // APPROVED FOR OPERATIONS
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F69E28] hover:underline"
            >
              <span>Request QHSE Documentation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
