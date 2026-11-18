import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

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
    <div className="pt-24 lg:pt-32 pb-24 bg-[#F6F8FB]">
      {/* Breadcrumb Header */}
      <div className="site-container py-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#5B6E86] hover:text-[#F69E28] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Capabilities</span>
        </Link>

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#F69E28] uppercase">
              SPECIFICATION // 0{srvIndex + 1}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
            {srv.title}
          </h1>
          <p className="font-body text-lg text-[#2B4260] leading-relaxed max-w-2xl pt-2">
            {srv.shortSummary}
          </p>
        </div>
      </div>

      {/* Hero Media Block */}
      <div className="site-container py-6">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-[4px] overflow-hidden shadow-xl border border-[#EAEFF5] bg-[#102A47]">
          <Image
            src={srv.image}
            alt={srv.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs font-mono text-white/90 bg-[#0B1E36]/80 px-3 py-1.5 rounded-[2px]">
            FIELD PROTOCOL SPECIFIED FOR NIGERIAN WELLHEADS
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="site-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Copy (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold uppercase text-[#0B1E36]">
                Operational Framework &amp; Scope
              </h2>
              <p className="font-body text-base text-[#2B4260] leading-relaxed">
                {srv.fullOverview}
              </p>
            </div>

            {/* Checklist */}
            <div className="p-8 bg-white rounded-[4px] border border-[#EAEFF5] space-y-6">
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                What This Service Covers
              </h3>
              <ul className="space-y-3">
                {srv.coverage.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#F69E28] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm sm:text-base text-[#2B4260]">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Guarantee */}
            <div className="flex items-start gap-4 p-6 bg-[#0B1E36] text-white rounded-[4px]">
              <ShieldCheck className="w-8 h-8 text-[#F69E28] flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-display text-lg font-bold uppercase text-white">
                  Strict Stop Work Authority
                </div>
                <p className="font-body text-xs text-white/80 leading-relaxed">
                  All equipment deployed under this service undergoes pre-job testing and certification. Every field crew member holds the explicit authority and obligation to halt operations upon observing unsafe parameters.
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-6 bg-white border border-[#EAEFF5] rounded-[4px] shadow-sm space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F69E28]">
                CONTRACT INQUIRY
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                Mobilise for Your Well
              </h3>
              <p className="font-body text-xs text-[#5B6E86] leading-relaxed">
                Send your field coordinates and programme requirements to our Lekki operations team.
              </p>
              <Link
                href={`/contact?service=${encodeURIComponent(srv.title)}`}
                className="w-full h-12 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-bold text-sm flex items-center justify-center rounded-[2px] transition-all"
              >
                Request Quotation &rarr;
              </Link>
            </div>

            {/* Next Service Link */}
            <div className="p-6 bg-[#102A47] text-white rounded-[4px] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#F69E28]">
                NEXT CAPABILITY
              </span>
              <div className="font-display text-xl font-bold uppercase text-white">
                {nextSrv.title}
              </div>
              <Link
                href={`/services/${nextSrv.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white pt-2 font-medium"
              >
                <span>View Next Specification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
