import React from "react";
import PictureImage from "@/components/PictureImage";
import AppLink from "@/components/motion/AppLink";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, CircleCheck, Compass } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import FadeUp from "@/components/motion/FadeUp";
import Button from "@/components/motion/Button";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((srv) => ({
    slug: srv.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const srv = SERVICES_DATA.find((s) => s.slug === slug);
  if (!srv) return { title: "Service Not Found" };

  return {
    title: `${srv.title} | Meddy Oil & Gas Limited`,
    description: srv.shortSummary,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const srvIndex = SERVICES_DATA.findIndex((s) => s.slug === slug);
  if (srvIndex === -1) notFound();

  const srv = SERVICES_DATA[srvIndex];
  const nextSrv = SERVICES_DATA[(srvIndex + 1) % SERVICES_DATA.length];

  return (
    <div className="bg-[#F6F8FB]">
      {/* DRAFT COPY */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-mono uppercase text-white/60 mb-6">
            <AppLink href="/" className="hover:text-[#F69E28] transition-colors">
              Home
            </AppLink>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <AppLink href="/services" className="hover:text-[#F69E28] transition-colors">
              Capabilities
            </AppLink>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#F69E28]">{srv.title}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-[2px] border border-white/[0.1]">
                  <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-white uppercase">
                    CAPABILITY // {srv.number}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-[#F69E28]/15 border border-[#F69E28]/35 rounded-[2px] font-mono text-[10px] font-bold tracking-widest text-[#F69E28] uppercase">
                  DRAFT COPY
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h1"
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]"
            >
              {srv.title}
            </RevealLines>
            <FadeUp delay={0.25}>
              <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
                {srv.shortSummary}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Hero Media Block */}
      <div className="site-container py-12">
        <div className="relative aspect-[16/9] w-full rounded-[2px] overflow-hidden shadow-2xl border border-black/[0.06] bg-[#102A47]">
          <PictureImage
            stem={`${srv.imageStem}-hero`}
            placeholderKey={srv.imageStem}
            alt={srv.imageAlt}
            width={1600}
            height={900}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/70 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content Details */}
      <div className="site-container pb-24 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Copy (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <RevealLines as="h2" className="font-display text-3xl font-bold uppercase text-[#0B1E36]">
                Overview
              </RevealLines>
              <p className="font-body text-base text-[#2B4260] leading-relaxed">
                {srv.fullOverview}
              </p>
            </div>

            {/* What we do */}
            <div className="p-8 apple-card space-y-6">
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                What we do
              </h3>
              <ul className="space-y-3.5">
                {srv.whatWeDo.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CircleCheck className="w-5 h-5 text-[#F69E28] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm sm:text-base text-[#2B4260]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where it applies */}
            <div className="p-8 apple-card space-y-6">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#F69E28]" />
                <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                  Where it applies
                </h3>
              </div>
              <ul className="space-y-3">
                {srv.whereItApplies.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F69E28] mt-2 flex-shrink-0" />
                    <span className="font-body text-sm sm:text-base text-[#2B4260]">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Action Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="p-8 apple-card space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F69E28]">
                PROJECT ENQUIRY
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                Discuss Your Scope
              </h3>
              <p className="font-body text-xs text-[#5B6E86] leading-relaxed">
                Send your field location, timeline, and technical requirements to our Lagos coordination desk.
              </p>
              <Button
                href={`/contact?service=${encodeURIComponent(srv.title)}`}
                variant="primary"
                className="w-full"
              >
                Send Enquiry
              </Button>
            </div>

            {/* Next Service Link */}
            <div className="p-6 apple-card-dark text-white space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#F69E28] tracking-widest">
                NEXT CAPABILITY
              </span>
              <div className="font-display text-xl font-bold uppercase text-white">
                {nextSrv.title}
              </div>
              <AppLink
                href={`/services/${nextSrv.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white pt-2 font-medium"
              >
                <span>View Next Service</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F69E28]" />
              </AppLink>
            </div>
          </div>
        </div>

        {/* Oil Field Services: Three Anchored Sections */}
        {srv.sections && srv.sections.length > 0 && (
          <div className="space-y-12 pt-8 border-t border-[#EAEFF5]">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F69E28]">
                DISCIPLINE BREAKDOWN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#0B1E36]">
                Oil Field Service Disciplines
              </h2>
            </div>

            <div className="space-y-10">
              {srv.sections.map((sec, idx) => (
                <section
                  key={sec.anchor}
                  id={sec.anchor}
                  className="scroll-mt-28 p-8 lg:p-10 apple-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-5 relative aspect-[16/9] rounded-[2px] overflow-hidden bg-[#102A47]">
                    <PictureImage
                      stem={`${sec.imageStem}-hero`}
                      placeholderKey={sec.imageStem}
                      alt={sec.imageAlt}
                      width={1600}
                      height={900}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-[#F69E28] uppercase tracking-wider">
                        0{idx + 1} {"// OIL FIELD SERVICES"}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#0B1E36]">
                        {sec.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[#2B4260] leading-relaxed">
                        {sec.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#EAEFF5]">
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6E86]">
                          What we do
                        </div>
                        <ul className="space-y-2">
                          {sec.whatWeDo.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B4260]">
                              <CircleCheck className="w-4 h-4 text-[#F69E28] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6E86]">
                          Where it applies
                        </div>
                        <ul className="space-y-2">
                          {sec.whereItApplies.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B4260]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F69E28] mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
