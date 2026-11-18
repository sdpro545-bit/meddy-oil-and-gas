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
    <div className="bg-[#F6F8FB]">
      {/* Sleek Apple-style Hero Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(246,158,40,0.18),transparent)]" />
        <div className="site-container relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-white/60 hover:text-[#F69E28] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Capabilities</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] rounded-full border border-white/[0.1] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
              <span className="font-mono text-xs font-semibold tracking-wider text-white uppercase">
                SPECIFICATION // 0{srvIndex + 1}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              {srv.title}
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
              {srv.shortSummary}
            </p>
          </div>
        </div>
      </section>

      {/* Hero Media Block */}
      <div className="site-container py-12">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/[0.06] bg-[#102A47]">
          <Image
            src={srv.image}
            alt={srv.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs font-mono text-white/90 bg-[#0B1E36]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            FIELD PROTOCOL SPECIFIED FOR NIGERIAN WELLHEADS
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="site-container pb-24">
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
            <div className="p-8 apple-card space-y-6">
              <h3 className="font-display text-2xl font-bold uppercase text-[#0B1E36]">
                What This Service Covers
              </h3>
              <ul className="space-y-3.5">
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
            <div className="flex items-start gap-4 p-6 apple-card-dark text-white">
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
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="p-8 apple-card space-y-4">
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
                className="w-full h-12 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-full transition-all shadow-md active:scale-95"
              >
                Request Quotation &rarr;
              </Link>
            </div>

            {/* Next Service Link */}
            <div className="p-6 apple-card-dark text-white space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#F69E28] tracking-widest">
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
                <ArrowRight className="w-3.5 h-3.5 text-[#F69E28]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
