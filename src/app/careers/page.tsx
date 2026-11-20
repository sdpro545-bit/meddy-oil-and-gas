import React from "react";
import Link from "next/link";
import { Briefcase, Mail, CheckCircle2 } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

export const metadata = {
  title: "Careers | Meddy Oil & Gas Limited",
  description:
    "Join Meddy Oil & Gas Limited. Explore engineering, field operations, and technical career opportunities in Lagos, Nigeria.",
};

export default function CareersPage() {
  const requirements = [
    "Certified technical qualifications (HND, B.Sc, B.Eng in Petroleum, Mechanical, or Electrical disciplines)",
    "Documented safety certifications (BOSIET, HUET, OSP where offshore deployment applies)",
    "Demonstrated adherence to HSE protocols and Stop Work Authority",
    "Commitment to high technical discipline and teamwork",
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
                  Talent &amp; Crew
                </span>
              </div>
            </FadeUp>
            <RevealLines as="h1" className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              Careers at Meddy
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                We are building a community of Nigerian engineers and technical specialists dedicated to excellence, safety discipline, and professional development.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="site-container py-16 lg:py-24 space-y-12">
        {/* Empty State Banner (Clean & Explicit) */}
        <div className="p-10 sm:p-14 apple-card text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-[2px] bg-[#F69E28]/15 text-[#F69E28] flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 stroke-[1.75]" />
          </div>
          <div className="space-y-2">
            <RevealLines as="h2" className="font-display text-3xl font-bold uppercase text-[#0B1E36]">
              No Active Openings Right Now
            </RevealLines>
            <p className="font-body text-base text-[#5B6E86] max-w-lg mx-auto leading-relaxed">
              We do not have active public vacancies at this moment. However, we continuously review credentials for upcoming drilling programmes, well interventions, and engineering assignments.
            </p>
          </div>

          <div className="pt-6 border-t border-[#EAEFF5] max-w-md mx-auto">
            <div className="text-xs font-mono uppercase text-[#5B6E86] mb-3">
              Submit Speculative Applications
            </div>
            <Button
              href={`mailto:${COMPANY_FACTS.email}?subject=Speculative%20Application%20-%20Technical%20Role`}
              variant="dark"
              showArrow={false}
              className="w-full"
            >
              <Mail className="w-4 h-4 text-[#F69E28]" />
              <span>Send Your CV to {COMPANY_FACTS.email}</span>
            </Button>
          </div>
        </div>

        {/* Candidate Expectations */}
        <div className="max-w-3xl mx-auto p-8 sm:p-10 apple-card-dark text-white space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#F69E28] uppercase tracking-wider">
              PREREQUISITES
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              What We Look For in Technical Applicants
            </h3>
          </div>

          <ul className="space-y-3.5">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F69E28] flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/85 leading-relaxed">
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
