"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { COMPANY_FACTS, SERVICES_DATA } from "@/lib/data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    consent: false,
    honeypot: "", // Bot prevention
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return; // Silently drop bot submissions
    }

    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      setErrorMessage("Please complete all required fields and confirm the consent checkbox.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate API call or mailto fallback
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[#0B1E36] text-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
                  Direct Inquiries
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[0.98]">
                Tell us what you need
              </h2>
              <p className="font-body text-base text-white/75 leading-relaxed pt-2">
                Send your operational scope, location, and project schedule. Our technical team evaluates requirements and responds promptly.
              </p>
            </div>

            {/* Address & Communication Block */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md flex items-center justify-center flex-shrink-0 text-[#F69E28]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold uppercase text-white">
                    Registered Office
                  </div>
                  <div className="font-body text-sm text-white/70 leading-relaxed max-w-sm mt-1">
                    {COMPANY_FACTS.address}
                  </div>
                  <a
                    href="https://maps.google.com/?q=Ikate+Elegushi+Lekki+Phase+1+Lagos+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#F69E28] hover:underline uppercase tracking-wider"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md flex items-center justify-center flex-shrink-0 text-[#F69E28]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold uppercase text-white">
                    Electronic Mail
                  </div>
                  <a
                    href={`mailto:${COMPANY_FACTS.email}`}
                    className="font-body text-sm text-white/80 hover:text-[#F69E28] transition-colors mt-1 block"
                  >
                    {COMPANY_FACTS.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#102A47]/80 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-8 sm:p-10 shadow-2xl">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#F69E28]/20 text-[#F69E28] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold uppercase text-white">
                  Message Dispatched
                </h3>
                <p className="font-body text-sm text-white/75 max-w-md mx-auto">
                  Thank you for your inquiry. Our engineering coordination desk in Lagos has logged your submission.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-full uppercase tracking-wider transition-all duration-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tunde Adeyemi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#F69E28]/40 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                      Operator / Organisation
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#F69E28]/40 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#F69E28]/40 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Service interest */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                      Service Scope
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-12 bg-[#0B1E36] border border-white/[0.12] rounded-xl px-4 text-white text-sm focus:border-[#F69E28] focus:outline-none transition-colors"
                    >
                      <option value="">Select a capability</option>
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#0B1E36] text-white">
                          {s.title}
                        </option>
                      ))}
                      <option value="General Technical Inquiry" className="bg-[#0B1E36] text-white">
                        General Technical Inquiry
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/75">
                    Scope of Requirement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details on well parameters, work timeline, or logistics requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl p-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#F69E28]/40 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded-md border-white/20 bg-white/[0.05] text-[#F69E28] focus:ring-[#F69E28]"
                  />
                  <label htmlFor="consent" className="text-xs text-white/70 leading-normal">
                    I agree to the processing of submitted technical and business information for quotation and contract evaluation by Meddy Oil &amp; Gas Limited.
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-200 text-xs rounded-xl">
                    {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full h-13 bg-[#F69E28] hover:bg-[#FCB424] active:scale-[0.98] disabled:opacity-50 text-[#0B1E36] font-body text-base font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-[#F69E28]/10 hover:shadow-2xl hover:shadow-[#F69E28]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
