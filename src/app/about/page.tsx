import React from "react";
import PictureImage from "@/components/PictureImage";
import { Shield, Target, Users, Award } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import RevealWords from "@/components/motion/RevealWords";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

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
    <div className="bg-[#F6F8FB]">
      {/* Sleek Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="site-container relative z-10">
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-[2px] border border-white/[0.1]">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                  Corporate Overview
                </span>
              </div>
            </FadeUp>
            <RevealLines as="h1" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              About Meddy Oil &amp; Gas
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                Meddy Oil &amp; Gas Limited is a Nigerian oil and gas services company headquartered in Lekki, Lagos. We support operators across upstream exploration, drilling, well completions, and production maintenance.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <div className="site-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <RevealLines as="h2" className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36]">
              Built on Discipline, Reliability, and Safety
            </RevealLines>
            <RevealWords as="p" className="font-body text-base text-[#2B4260] leading-relaxed">
              Founded to provide disciplined oilfield support services, Meddy Oil &amp; Gas operates from Lekki Phase 1 in Lagos, coordinating timely equipment mobilisation and technical personnel across the Niger Delta and offshore fields.
            </RevealWords>
            <p className="font-body text-base text-[#2B4260] leading-relaxed">
              We collaborate closely with operating companies to ensure well programmes run safely, efficiently, and in strict adherence to environmental regulations and quality control standards.
            </p>
            <div className="pt-2">
              <div className="text-xs font-mono text-[#5B6E86] uppercase tracking-wider">
                Registered Head Office
              </div>
              <div className="text-sm font-semibold text-[#0B1E36] mt-1">
                {COMPANY_FACTS.address}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-xl border border-black/[0.06]">
            <PictureImage
              stem="about-engineer"
              widths={[800, 1200]}
              placeholderKey="about-engineer"
              alt="Field engineer in an orange hard hat reviewing a tablet beside process pipework"
              width={1200}
              height={1500}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="site-container pb-20 lg:pb-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold text-[#F69E28] uppercase tracking-wider">
            FOUNDATIONAL VALUES
          </span>
          <RevealLines as="h2" className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36] mt-2">
            The Principles That Guide Our Operations
          </RevealLines>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-8 apple-card space-y-3"
              >
                <div className="w-10 h-10 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1E36] pt-2">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-[#5B6E86] leading-relaxed">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Band */}
      <div className="site-container pb-20 lg:pb-28">
        <div className="p-8 sm:p-12 apple-card-dark text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-display text-3xl font-bold uppercase text-white">
              Ready to Discuss Operational Requirements?
            </h3>
            <p className="font-body text-sm text-white/70 max-w-xl leading-relaxed">
              Contact our engineering management team to review scopes, well specifications, and mobilisation timetables.
            </p>
          </div>
          <Button href="/contact" variant="primary">
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
