import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export const metadata = {
  title: "Services & Capabilities | Meddy Oil & Gas Limited",
  description:
    "Explore our complete range of upstream oilfield support services: drilling support, well construction, wireline intervention, and engineering.",
};

export default function ServicesPage() {
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
                Operational Scope
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.98]">
              Our Capabilities
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl pt-2">
              Integrated oilfield services engineered for safety, compliance, and reliable operational performance across Nigerian offshore and onshore basins.
            </p>
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
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#102A47] shadow-md">
              <Image
                src={srv.image}
                alt={srv.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-[#0B1E36] bg-[#F69E28] px-3 py-1 rounded-full shadow-sm">
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

                {/* Scope Coverage */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6E86]">
                    Scope of Coverage
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {srv.coverage.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B4260]">
                        <Check className="w-4 h-4 text-[#F69E28] flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAEFF5] flex items-center justify-between">
                <Link
                  href={`/services/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F69E28] hover:text-[#E08518] transition-colors"
                >
                  <span>Detailed Specification</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  className="h-10 px-6 bg-[#0B1E36] hover:bg-[#102A47] text-white text-xs font-bold rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  Request Mobilisation
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
