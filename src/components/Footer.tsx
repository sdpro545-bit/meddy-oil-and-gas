"use client";

import React, { useRef } from "react";
import AppLink from "@/components/motion/AppLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY_FACTS, SERVICES_DATA } from "@/lib/data";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Footer rises 24px
      gsap.from(footerRef.current, {
        y: 24,
        opacity: 0.9,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          once: true,
        },
      });

      // Large MEDDY ghost word slides up from a mask once
      if (ghostRef.current) {
        gsap.from(ghostRef.current, {
          yPercent: 100,
          opacity: 0,
          duration: 1.1,
          ease: EASE.out,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#102A47] text-white border-t border-white/10 pt-16 pb-12 overflow-hidden"
    >
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <AppLink href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-[2px] bg-white p-1 flex items-center justify-center">
                <img
                  src="/meddy-mark.png"
                  alt="Meddy Oil & Gas Mark"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl font-bold leading-none tracking-tight text-white group-hover:text-[#F69E28] transition-colors">
                  MEDDY
                </span>
                <span className="font-body text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                  OIL &amp; GAS
                </span>
              </div>
            </AppLink>

            <p className="font-body text-sm text-white/70 max-w-sm leading-relaxed pt-2">
              Well construction, oil field services, integrated coordination, FPSO and vessel support, and power delivery in Nigeria.
            </p>

            <div className="pt-2 text-xs font-mono text-white/50">
              RC NO: [CLIENT_TO_CONFIRM]
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Company
            </div>
            <ul className="space-y-2 text-sm text-white/70 font-body">
              <li>
                <AppLink href="/" className="hover:text-[#F69E28] transition-colors">
                  Home
                </AppLink>
              </li>
              <li>
                <AppLink href="/about" className="hover:text-[#F69E28] transition-colors">
                  About Us
                </AppLink>
              </li>
              <li>
                <AppLink href="/qhse" className="hover:text-[#F69E28] transition-colors">
                  QHSE Policy
                </AppLink>
              </li>
              <li>
                <AppLink href="/projects" className="hover:text-[#F69E28] transition-colors">
                  Projects
                </AppLink>
              </li>
              <li>
                <AppLink href="/careers" className="hover:text-[#F69E28] transition-colors">
                  Careers
                </AppLink>
              </li>
              <li>
                <AppLink href="/contact" className="hover:text-[#F69E28] transition-colors">
                  Contact
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Capabilities
            </div>
            <ul className="space-y-2 text-sm text-white/70 font-body">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.slug}>
                  <AppLink
                    href={`/services/${srv.slug}`}
                    className="hover:text-[#F69E28] transition-colors block line-clamp-1"
                  >
                    {srv.title}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Registered Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Office Location
            </div>
            <div className="text-sm text-white/70 leading-relaxed font-body">
              {COMPANY_FACTS.address}
            </div>
            {COMPANY_FACTS.email && (
              <div className="pt-2 text-sm text-[#F69E28]">
                <a href={`mailto:${COMPANY_FACTS.email}`} className="hover:underline">
                  {COMPANY_FACTS.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            &copy; {currentYear} {COMPANY_FACTS.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <AppLink href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </AppLink>
            <AppLink href="/privacy" className="hover:text-white transition-colors">
              Terms of Engagement
            </AppLink>
          </div>
        </div>
      </div>

      {/* Large MEDDY Ghost Word sliding up from a mask */}
      <div className="w-full overflow-hidden pointer-events-none select-none mt-8 -mb-4">
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="font-display text-[14vw] font-bold text-white/[0.04] leading-none tracking-tight text-center uppercase whitespace-nowrap"
        >
          MEDDY
        </div>
      </div>
    </footer>
  );
}
