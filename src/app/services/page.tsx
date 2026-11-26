import React from "react";
import PictureImage from "@/components/PictureImage";
import AppLink from "@/components/motion/AppLink";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

export const metadata = {
  title: "Capabilities & Services | Meddy Oil & Gas Limited",
  description:
    "Explore Meddy Oil & Gas capabilities across Well Construction Services, Oil Field Services, Integrated Services, FPSO & Vessel Services, and Power.",
};

export default function ServicesHubPage() {
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
                  Capabilities Index
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h1"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]"
            >
              Operational Capabilities
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                Five core service lines structured around well construction, oil field execution, integrated coordination, offshore vessel support, and power delivery across Nigeria.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <div className="site-container py-16 lg:py-24 space-y-10">
        {SERVICES_DATA.map((srv) => (
          <div
            key={srv.id}
            id={srv.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 lg:p-12 apple-card"
          >
            {/* Image (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-[2px] overflow-hidden bg-[#102A47] shadow-md">
              <PictureImage
                stem={`${srv.imageStem}-thumb`}
                placeholderKey={srv.imageStem}
                alt={srv.imageAlt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-[#0B1E36] bg-[#F69E28] px-3 py-1 rounded-[2px] shadow-sm">
                SERVICE {srv.number}
              </div>
            </div>

            {/* Info (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36]">
                  {srv.title}
                </h2>
                <p className="font-body text-base text-[#2B4260] leading-relaxed">
                  {srv.fullOverview}
                </p>

                {/* What we do */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6E86]">
                    What we do
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {srv.whatWeDo.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B4260]">
                        <Check className="w-4 h-4 text-[#F69E28] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {srv.sections && srv.sections.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {srv.sections.map((sec) => (
                      <AppLink
                        key={sec.anchor}
                        href={`/services/${srv.slug}#${sec.anchor}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-[2px] bg-[#F6F8FB] border border-[#EAEFF5] text-[#0B1E36] hover:border-[#F69E28] transition-colors"
                      >
                        {sec.title}
                      </AppLink>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[#EAEFF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <AppLink
                  href={`/services/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F69E28] hover:text-[#E08518] transition-colors"
                >
                  <span>Detailed Specification</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </AppLink>
                <Button
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  variant="dark"
                  showArrow={false}
                  className="!h-10 !px-6 !text-xs"
                >
                  Request a Service
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
