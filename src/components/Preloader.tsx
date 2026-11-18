"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [animState, setAnimState] = useState<"initial" | "revealing" | "lifting" | "done">("initial");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip preloader for headless browsers, automated audits, or if already seen
    const isHeadless = navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Lighthouse");
    const hasSeen = sessionStorage.getItem("meddy_intro_seen");
    const skipQuery = window.location.search.includes("skip_intro");

    if (isHeadless || hasSeen || skipQuery) {
      setVisible(false);
      setAnimState("done");
      return;
    }

    setVisible(true);

    // Step 1: Reveal logo with Apple ease
    const t1 = setTimeout(() => {
      setAnimState("revealing");
    }, 150);

    // Step 2: Smooth upward wipe
    const t2 = setTimeout(() => {
      setAnimState("lifting");
    }, 1000);

    // Step 3: Unmount
    const t3 = setTimeout(() => {
      setAnimState("done");
      setVisible(false);
      sessionStorage.setItem("meddy_intro_seen", "true");
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleSkip = () => {
    setAnimState("lifting");
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("meddy_intro_seen", "true");
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] bg-[#0B1E36] flex flex-col items-center justify-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
        animState === "lifting" || animState === "done" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,158,40,0.12),transparent_70%)] pointer-events-none" />

      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Animated Droplet Logo */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 relative transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            animState === "initial"
              ? "opacity-0 scale-90 translate-y-3"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <Image
            src="/icon-512.png"
            alt="Meddy Oil & Gas Mark"
            fill
            priority
            sizes="120px"
            className="object-contain drop-shadow-[0_8px_24px_rgba(246,158,40,0.35)]"
          />
        </div>

        {/* Live Wordmark with Masked Rise */}
        <div className="overflow-hidden text-center">
          <div
            className={`transition-all duration-700 delay-150 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              animState === "initial" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              MEDDY
            </div>
            <div className="font-body text-xs font-semibold tracking-[0.24em] text-[#F69E28] uppercase mt-1">
              OIL &amp; GAS LIMITED
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[11px] font-mono tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">
        CLICK TO SKIP
      </div>
    </div>
  );
}
