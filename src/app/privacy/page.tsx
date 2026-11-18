import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY_FACTS } from "@/lib/data";

export const metadata = {
  title: "Privacy & Data Governance | Meddy Oil & Gas Limited",
  description: "Data protection and privacy policy for Meddy Oil & Gas Limited.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-[#F6F8FB]">
      <div className="site-container max-w-4xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#5B6E86] hover:text-[#F69E28] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#0B1E36]">
          Privacy Policy &amp; Data Governance
        </h1>

        <div className="p-8 sm:p-12 bg-white rounded-[4px] border border-[#EAEFF5] space-y-6 text-sm text-[#2B4260] leading-relaxed">
          <p>
            Meddy Oil &amp; Gas Limited is committed to protecting the privacy, technical data, and personal information of our clients, suppliers, and prospective employees in accordance with the Nigeria Data Protection Act (NDPA).
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Collection of Operational Information
          </h2>
          <p>
            We collect information submitted through our official contact forms, speculative career applications, and technical quotation requests. This data includes full names, corporate affiliations, professional email addresses, phone contacts, and well programme parameters.
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Use of Information
          </h2>
          <p>
            Information collected is utilized strictly for evaluating service feasibility, conducting safety risk appraisals, responding to commercial inquiries, and fulfilling statutory regulatory requirements under Nigerian petroleum laws.
          </p>

          <h2 className="font-display text-2xl font-bold uppercase text-[#0B1E36] pt-4">
            Confidentiality &amp; Non-Disclosure
          </h2>
          <p>
            We treat all client well parameters, geological indicators, and contract specifications as strictly confidential. No technical or commercial details are disclosed to third parties without prior written authorization.
          </p>

          <div className="pt-6 border-t border-[#EAEFF5] text-xs text-[#5B6E86]">
            Registered Office: {COMPANY_FACTS.address}
          </div>
        </div>
      </div>
    </div>
  );
}
