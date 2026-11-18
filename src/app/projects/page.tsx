import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";

export const metadata = {
  title: "Projects & Track Record | Meddy Oil & Gas Limited",
  description:
    "Review representative case studies and operational project frameworks for Meddy Oil & Gas Limited.",
};

export default function ProjectsPage() {
  const projectShells = [
    {
      id: "proj-1",
      title: "Offshore Well Construction Support",
      basin: "Niger Delta Basin",
      scope: "Casing running coordination and high-pressure wellhead installation support.",
      image: "/images/service-marine.webp",
      status: "FIELD OPERATION RECORD",
    },
    {
      id: "proj-2",
      title: "Cased Hole Wireline Diagnostic Campaign",
      basin: "Shallow Offshore Asset",
      scope: "Electric wireline logging, pressure testing, and mechanical zone isolation.",
      image: "/images/service-wireline.webp",
      status: "INTERVENTION RECORD",
    },
    {
      id: "proj-3",
      title: "Pipeline Infrastructure & Facilities Integrity",
      basin: "Western Onshore Hub",
      scope: "Non-destructive testing, corrosion monitoring, and station valve maintenance.",
      image: "/images/service-pipeline.webp",
      status: "INTEGRITY AUDIT RECORD",
    },
  ];

  return (
    <div className="bg-[#F6F8FB]">
      {/* Sleek Apple-style Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(246,158,40,0.18),transparent)]" />
        <div className="site-container relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-full border border-white/[0.1] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                Field Track Record
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              Representative Projects
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
              Detailed case studies and project records demonstrating disciplined technical execution and safety compliance across Nigerian fields.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="site-container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectShells.map((p) => (
            <div
              key={p.id}
              className="apple-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-[#102A47]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase bg-[#0B1E36]/90 backdrop-blur-md text-[#F69E28] px-3 py-1 rounded-full border border-white/10">
                    {p.status}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-mono text-[#5B6E86] uppercase tracking-wider">
                    {p.basin}
                  </div>
                  <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                    {p.title}
                  </h2>
                  <p className="font-body text-sm text-[#2B4260] leading-relaxed">
                    {p.scope}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EAEFF5] mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-[#5B6E86]">
                  LOGGED SPECIFICATION
                </span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#F69E28] hover:text-[#E08518] flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Disclosure Notice */}
      <div className="site-container pb-24">
        <div className="p-6 apple-card flex items-center gap-4 text-xs text-[#5B6E86]">
          <FolderKanban className="w-5 h-5 text-[#F69E28] flex-shrink-0" />
          <div>
            Specific operator identities and proprietary well designations are withheld in strict compliance with non-disclosure covenants and operator data protection agreements.
          </div>
        </div>
      </div>
    </div>
  );
}
