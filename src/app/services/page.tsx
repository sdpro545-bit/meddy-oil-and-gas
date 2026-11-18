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
    <div className="pt-24 lg:pt-32 pb-24 bg-[#F6F8FB]">
      {/* Header */}
      <div className="site-container py-12 lg:py-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
            <span className="font-body text-xs font-semibold tracking-wider text-[#F69E28] uppercase">
              Operational Scope
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-[#0B1E36] tracking-tight leading-[0.98]">
            Our Capabilities
          </h1>
          <p className="font-body text-lg text-[#2B4260] leading-relaxed max-w-2xl pt-2">
            Integrated oilfield services engineered for safety, compliance, and reliable operational performance across Nigerian offshore and onshore basins.
          </p>
        </div>
      </div>

      {/* Services Detailed Grid */}
      <div className="site-container py-8 space-y-12">
        {SERVICES_DATA.map((srv, idx) => (
          <div
            key={srv.id}
            id={srv.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 lg:p-12 bg-white rounded-[4px] border border-[#EAEFF5] shadow-sm hover:border-[#F69E28] transition-all"
          >
            {/* Image (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-[4px] overflow-hidden bg-[#102A47]">
              <Image
                src={srv.image}
                alt={srv.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-[#0B1E36] bg-[#F69E28] px-3 py-1 rounded-[2px]">
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {srv.coverage.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B4260]">
                        <Check className="w-4 h-4 text-[#F69E28] flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEFF5] flex items-center justify-between">
                <Link
                  href={`/services/${srv.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#F69E28] hover:text-[#E08518] transition-colors"
                >
                  <span>Detailed Specification</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  className="h-10 px-5 bg-[#0B1E36] hover:bg-[#102A47] text-white text-xs font-semibold rounded-[2px] flex items-center justify-center transition-colors"
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
