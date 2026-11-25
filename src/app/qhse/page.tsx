import React from "react";
import PictureImage from "@/components/PictureImage";
import { ShieldCheck, Award, Leaf, Users, ArrowRight } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import RevealWords from "@/components/motion/RevealWords";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

export const metadata = {
  title: "Safety & Quality (QHSE) | Meddy Oil & Gas Limited",
  description:
    "Safety, Quality, Environment, and Community operating principles for Meddy Oil & Gas Limited.",
};

export default function QHSEPage() {
  const sections = [
    {
      id: "safety",
      icon: ShieldCheck,
      title: "Safety",
      subtitle: "Zero Compromise on Field Operations",
      summary:
        "Every work programme begins with a documented job safety analysis and pre-shift toolbox briefing. Personnel hold clear authority to pause any task if site conditions, equipment status, or weather present an unmitigated hazard.",
      points: [
        "Pre-task risk assessments and permit-to-work checks before mobilisation",
        "Mandatory personal protective equipment across land, swamp, and offshore bases",
        "Open hazard reporting and post-shift safety reviews with client representatives",
      ],
    },
    {
      id: "quality",
      icon: Award,
      title: "Quality",
      subtitle: "Verified Tools & Controlled Execution",
      summary:
        "We work with operators to maintain clear inspection records and pre-job equipment checks before tools leave our staging yard, reducing avoidable downtime at the wellhead or plant.",
      points: [
        "Pre-mobilisation dimensional and pressure-test verification records",
        "Traceable job execution logs and daily shift handover notes",
        "Structured post-job technical reviews to carry lessons into the next scope",
      ],
    },
    {
      id: "environment",
      icon: Leaf,
      title: "Environment",
      subtitle: "Spill Prevention & Responsible Site Practice",
      summary:
        "Operations across coastal Nigeria and the Niger Delta require practical spill containment, proper waste segregation, and strict protection of surrounding waterways and vegetation.",
      points: [
        "Secondary containment trays and drip management beneath pumping and transfer lines",
        "Segregated handling and authorised disposal of field consumables and fluids",
        "Site housekeeping checks before handback at completion of field campaigns",
      ],
    },
    {
      id: "community",
      icon: Users,
      title: "Community",
      subtitle: "Respectful Local Engagement",
      summary:
        "We coordinate closely with host operators and community liaison channels so field movements, logistics scheduling, and local hiring remain transparent and respectful.",
      points: [
        "Alignment with client community-relations protocols prior to field entry",
        "Support for Nigerian engineering and technical workforce participation",
        "Clear, respectful conduct across every staging yard and transit route",
      ],
    },
  ];

  return (
    <div className="bg-[#F6F8FB]">
      {/* DRAFT COPY */}
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
            <RevealLines
              as="h1"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]"
            >
              Safety, Quality, Environment &amp; Community
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                Safety is not a checklist item at Meddy Oil &amp; Gas. It is the baseline condition under which all field engineering and logistics work proceeds.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured Photo Band */}
      <div className="site-container py-12">
        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-[2px] overflow-hidden shadow-2xl border border-black/[0.06] bg-[#0B1E36]">
          <PictureImage
            stem="qhse-banner"
            widths={[1600, 2560]}
            mobileStem="qhse-banner-mobile"
            mobileWidths={[720, 1080]}
            placeholderKey="qhse-banner"
            alt="Technicians holding a safety briefing at a tank farm at sunset"
            width={2560}
            height={1097}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/35 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-white">
              <div className="text-xs font-mono text-[#F69E28] uppercase tracking-wider">
                DAILY PROTOCOL
              </div>
              <div className="font-display text-2xl font-bold uppercase">
                Toolbox Safety Briefing Before Every Shift
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs font-mono text-white/90 bg-[#0B1E36]/90 hover:border-[#F69E28] px-3 py-1.5 rounded-[2px] border border-white/20 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Anchored Policy Sections */}
      <div className="site-container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 p-8 sm:p-10 apple-card space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[2px] bg-[#0B1E36] text-[#F69E28] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-[#5B6E86] uppercase tracking-wider">
                    0{idx + 1} {"// POLICY"}
                  </span>
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-3xl font-bold uppercase text-[#0B1E36]">
                    {sec.title}
                  </h2>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F69E28]">
                    {sec.subtitle}
                  </div>
                </div>
                <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                  {sec.summary}
                </p>
                <ul className="space-y-2 pt-2 border-t border-[#EAEFF5]">
                  {sec.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B4260]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F69E28] mt-1.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* Commitment Statement */}
        <div className="mt-12 p-8 sm:p-12 apple-card border-l-4 border-l-[#F69E28] space-y-4">
          <RevealWords as="h2" className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36] leading-snug">
            Every task stops immediately when conditions fall outside safe working limits.
          </RevealWords>
          <p className="font-body text-sm sm:text-base text-[#5B6E86] leading-relaxed max-w-3xl">
            Our management team in Lagos backs every field supervisor and crew member who pauses work to resolve a hazard before continuing.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="dark" showArrow={false}>
              <span>Request Safety Policy Summary</span>
              <ArrowRight className="w-4 h-4 text-[#F69E28]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
