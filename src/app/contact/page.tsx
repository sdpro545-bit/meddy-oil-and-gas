import React from "react";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact Us | Meddy Oil & Gas Limited",
  description:
    "Get in touch with Meddy Oil & Gas Limited. Our registered office is located at 8B Ayigoro Street, Springbay Estate, Ikate Elegushi, Lekki Phase 1, Lagos, Nigeria.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 lg:pt-32 bg-[#0B1E36]">
      <ContactSection />
    </div>
  );
}
