"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [animState, setAnimState] = useState<"initial" | "revealing" | "lifting" | "done">("initial");

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("meddy_intro_seen");
      if (seen) {
        setVisible(false);
        setAnimState("done");
        return;
      }
    }

    // Step 1: Wipe reveals icon
    const t1 = setTimeout(() => {
      setAnimState("revealing");
    }, 200);

    // Step 2: Lift panel
    const t2 = setTimeout(() => {
      setAnimState("lifting");
    }, 1400);

    // Step 3: Finished
    const t3 = setTimeout(() => {
      setAnimState("done");
      setVisible(false);
      sessionStorage.setItem("meddy_intro_seen", "true");
    }, 2100);

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
      className={`fixed inset-0 z-[100] bg-[#0B1E36] flex flex-col items-center justify-center transition-transform duration-700 ease-in-out cursor-pointer ${
        animState === "lifting" || animState === "done" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Droplet Logo */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 relative transition-all duration-800 ease-out ${
            animState === "initial"
              ? "opacity-0 scale-90"
              : "opacity-100 scale-100"
          }`}
        >
          <Image
            src="/favicon-512x512.png"
            alt="Meddy Oil & Gas Mark"
            fill
            priority
            sizes="120px"
            className="object-contain"
          />
        </div>

        {/* Live Wordmark with Masked Rise */}
        <div className="overflow-hidden text-center">
          <div
            className={`transition-transform duration-700 delay-200 ease-out ${
              animState === "initial" ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <div className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              MEDDY
            </div>
            <div className="font-body text-xs font-semibold tracking-[0.2em] text-[#F69E28] uppercase">
              OIL &amp; GAS LIMITED
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-xs font-mono text-white/40">
        CLICK TO SKIP
      </div>
    </div>
  );
}
