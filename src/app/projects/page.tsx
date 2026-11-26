import React from "react";
import PictureImage from "@/components/PictureImage";
import AppLink from "@/components/motion/AppLink";
import { ArrowRight, FolderKanban } from "lucide-react";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

export const metadata = {
  title: "Projects & Track Record | Meddy Oil & Gas Limited",
  description:
    "Review representative operational project frameworks for Meddy Oil & Gas Limited.",
};

export default function ProjectsPage() {
  const projectShells = [
    {
      id: "proj-1",
      title: "Well Construction & Wellhead Support",
      basin: "Niger Delta Basin",
      scope: "Tubular running coordination and high-pressure wellhead assembly support.",
      imageStem: "service-well-construction",
      imageAlt: "Technicians checking flange bolts on a wellhead",
      status: "DEV SHELL // DRAFT COPY",
    },
    {
      id: "proj-2",
      title: "Cased-Hole Wireline & Well Testing",
      basin: "Onshore & Swamp Assets",
      scope: "Slickline mechanical intervention, wireline logging, and surface flow testing support.",
      imageStem: "service-wireline-testing",
      imageAlt: "Wireline equipment rigged up at a wellhead",
      status: "DEV SHELL // DRAFT COPY",
    },
    {
      id: "proj-3",
      title: "Integrated Multi-Discipline Coordination",
      basin: "Lagos & Niger Delta Corridor",
      scope: "Unified scheduling across drilling engineering, pumping spreads, and crew mobilisation.",
      imageStem: "service-integrated",
      imageAlt: "Engineers coordinating a project in an operations room",
      status: "DEV SHELL // DRAFT COPY",
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
                  Field Track Record
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h1"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]"
            >
              Representative Projects
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                Structured project frameworks outlining how Meddy Oil &amp; Gas coordinates technical execution and field safety across Nigerian operations.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="site-container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectShells.map((proj) => (
            <div
              key={proj.id}
              className="apple-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#102A47]">
                  <PictureImage
                    stem={`${proj.imageStem}-thumb`}
                    placeholderKey={proj.imageStem}
                    alt={proj.imageAlt}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-[#0B1E36] bg-[#F69E28] px-2.5 py-1 rounded-[2px]">
                    {proj.status}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#5B6E86]">
                    {proj.basin}
                  </div>
                  <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                    {proj.title}
                  </h2>
                  <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                    {proj.scope}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EAEFF5] mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-[#5B6E86] pt-4">
                  PROJECT FRAMEWORK
                </span>
                <AppLink
                  href={`/contact?service=${encodeURIComponent(proj.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F69E28] hover:text-[#E08518] transition-colors pt-4"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </AppLink>
              </div>
            </div>
          ))}
        </div>

        {/* Notice of Confidentiality */}
        <div className="mt-12 p-6 apple-card flex items-center gap-4 text-xs text-[#5B6E86]">
          <FolderKanban className="w-5 h-5 text-[#F69E28] flex-shrink-0" />
          <p>
            Project briefs and client references are subject to operator confidentiality agreements and pending client sign-off prior to publication.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Button href="/contact" variant="primary" showArrow={true}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
