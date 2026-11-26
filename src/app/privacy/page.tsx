import React from "react";
import AppLink from "@/components/motion/AppLink";
import { ArrowLeft } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";

export const metadata = {
  title: "Privacy & Data Governance | Meddy Oil & Gas Limited",
  description: "Data protection and privacy policy for Meddy Oil & Gas Limited.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F6F8FB]">
      {/* Sleek Hero Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0B1E36] text-white overflow-hidden border-b border-white/[0.08]">
        <div className="site-container relative z-10 max-w-4xl space-y-4">
          <AppLink
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-white/60 hover:text-[#F69E28] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </AppLink>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white tracking-tight leading-[0.98]">
            Privacy Policy &amp; Data Governance
          </h1>
        </div>
      </section>

      <div className="site-container max-w-4xl py-16 lg:py-24">
        <div className="p-8 sm:p-12 apple-card space-y-6 text-sm text-[#2B4260] leading-relaxed">
          <p>
            Meddy Oil &amp; Gas Limited is committed to protecting the privacy, technical data, and personal information of our clients, suppliers, and prospective employees in accordance with the Nigeria Data Protection Act (NDPA).
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Collection of Operational Information
          </h2>
          <p>
            We collect information submitted through our official contact forms, speculative career applications, and service requests. This data includes full names, corporate affiliations, professional email addresses, phone contacts, and well programme parameters.
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Use of Information
          </h2>
          <p>
            Information collected is utilised strictly for evaluating service feasibility, conducting safety risk appraisals, responding to commercial enquiries, and fulfilling statutory regulatory requirements under Nigerian petroleum laws.
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Confidentiality &amp; Non-Disclosure
          </h2>
          <p>
            We treat all client well parameters, geological indicators, and contract specifications as strictly confidential. No technical or commercial details are disclosed to third parties without prior written authorisation.
          </p>

          <div className="pt-6 border-t border-[#EAEFF5] text-xs text-[#5B6E86]">
            Registered Office: {COMPANY_FACTS.address}
          </div>
        </div>
      </div>
    </div>
  );
}
