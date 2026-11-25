"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Send, CircleCheckBig } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY_FACTS, SERVICES_DATA } from "@/lib/data";
import RevealLines from "@/components/motion/RevealLines";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("Thanks. We have your message and will reply soon.");

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const svc = new URLSearchParams(window.location.search).get("service");
    if (svc) {
      setFormData((prev) => ({ ...prev, service: svc }));
    }
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Left info block fade up
      if (infoRef.current) {
        gsap.from(infoRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.08,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Form fields rise with 60ms stagger as one group
      if (formRef.current) {
        const fieldRows = formRef.current.querySelectorAll(".form-row");
        gsap.from(fieldRows, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: EASE.out,
          stagger: 0.06,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [status] }
  );

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
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(data.message || "Thanks. We have your message and will reply soon.");
        setStatus("success");
      } else {
        setErrorMessage(
          data.error || "Messages cannot be sent from this page yet. Please try again later."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Messages cannot be sent from this page yet. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-36 bg-[#0B1E36] text-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details (5 cols) */}
          <div ref={infoRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-sm font-semibold tracking-wider text-[#F69E28] uppercase">
                  Direct Inquiries
                </span>
              </div>
              <RevealLines as={headingAs} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[0.98]">
                Tell us what you need
              </RevealLines>
              <p className="font-body text-base text-white/75 leading-relaxed pt-2">
                Send your operational scope, location, and project schedule. Our coordination team in Lagos reviews incoming inquiries and responds directly.
              </p>
            </div>

            {/* Address & Communication Block */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-[2px] bg-white/[0.06] border border-white/[0.12] flex items-center justify-center flex-shrink-0 text-[#F69E28]">
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

              {COMPANY_FACTS.email && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[2px] bg-white/[0.06] border border-white/[0.12] flex items-center justify-center flex-shrink-0 text-[#F69E28]">
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
              )}
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#102A47] border border-white/[0.12] rounded-[2px] p-8 sm:p-10 shadow-xl">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-[2px] bg-[#F69E28]/20 text-[#F69E28] flex items-center justify-center mx-auto">
                  <CircleCheckBig className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold uppercase text-white">
                  Message Received
                </h3>
                <p className="font-body text-sm text-white/75 max-w-md mx-auto">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-[2px] uppercase tracking-wider transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="honeypot"
                  aria-label="Leave this field blank"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/75"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Tunde Adeyemi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-[2px] px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/75"
                    >
                      Operator / Organisation
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-[2px] px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/75"
                    >
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 bg-white/[0.04] border border-white/[0.12] rounded-[2px] px-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Service interest */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/75"
                    >
                      Service Scope
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-12 bg-[#0B1E36] border border-white/[0.12] rounded-[2px] px-4 text-white text-sm focus:border-[#F69E28] focus:outline-none transition-colors"
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
                <div className="form-row space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/75"
                  >
                    Scope of Requirement *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={5000}
                    placeholder="Provide details on well parameters, work timeline, or logistics requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.12] rounded-[2px] p-4 text-white text-sm placeholder-white/30 focus:border-[#F69E28] focus:bg-white/[0.07] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="form-row flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded-[2px] border-white/20 bg-white/[0.05] text-[#F69E28] focus:ring-[#F69E28]"
                  />
                  <label htmlFor="consent" className="text-xs text-white/70 leading-normal">
                    I agree to the processing of submitted technical and business information for quotation and contract evaluation by Meddy Oil &amp; Gas Limited.
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="form-row p-3 bg-red-950/50 border border-red-500/40 text-red-200 text-xs rounded-[2px]">
                    {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <div className="form-row pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full h-13 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] disabled:opacity-50 text-[#0B1E36] font-body text-sm font-bold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-3 transition-colors duration-200 overflow-hidden cursor-pointer"
                  >
                    <span className="relative inline-block overflow-hidden h-[1.2em] leading-tight">
                      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                        {status === "submitting" ? "Transmitting Scope..." : "Send Message"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-current"
                      >
                        {status === "submitting" ? "Transmitting Scope..." : "Send Message"}
                      </span>
                    </span>
                    <Send className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
