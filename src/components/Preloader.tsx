"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { EASE } from "@/lib/motion/tokens";

export default function Preloader() {
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if intro has already played in this session or skip query is present
    const hasSeen = sessionStorage.getItem("meddy_intro");
    const skipQuery = window.location.search.includes("skip_intro");

    if (hasSeen || skipQuery) {
      setActive(false);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sessionStorage.setItem("meddy_intro", "1");
      setActive(false);
      return;
    }

    // Real loading promise: fonts ready, assets decoded, minimum hold 1200ms
    const readyPromise = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]);

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      onComplete: () => {
        setActive(false);
      },
    });
    timelineRef.current = tl;

    // 0.15s: Logo fills from bottom with clip-path
    tl.fromTo(
      logoRef.current,
      { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
      0.15
    )
      // 0.95s: "MEDDY" and "OIL & GAS LIMITED" rise from masks
      .fromTo(
        word1Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7 },
        0.95
      )
      .fromTo(
        word2Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7 },
        1.01
      );

    readyPromise.then(() => {
      // 1.55s: fade out icon and text
      tl.to([logoRef.current, word1Ref.current, word2Ref.current], {
        opacity: 0,
        duration: 0.16,
        ease: EASE.out,
      }, 1.55)
        // 1.65s: Panel lifts yPercent: 0 to -100
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.7,
          ease: EASE.inOut,
          onStart: () => {
            sessionStorage.setItem("meddy_intro", "1");
            window.dispatchEvent(new CustomEvent("meddy_intro_lift"));
          },
        }, 1.65);
    });

    // Skip handler on keypress
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      tl.kill();
    };
  }, []);

  const skipIntro = () => {
    if (!timelineRef.current || !containerRef.current) return;
    sessionStorage.setItem("meddy_intro", "1");
    window.dispatchEvent(new CustomEvent("meddy_intro_lift"));
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.3,
      ease: EASE.out,
      onComplete: () => setActive(false),
    });
  };

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      onClick={skipIntro}
      role="dialog"
      aria-label="Welcome to Meddy Oil & Gas"
      className="fixed inset-0 z-[100] bg-[#0B1E36] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Droplet Logo (96px desktop, 80px mobile) */}
        <div
          ref={logoRef}
          className="w-20 h-20 sm:w-24 sm:h-24 relative overflow-hidden"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <Image
            src="/icon-512.png"
            alt="Meddy Oil & Gas Mark"
            fill
            priority
            sizes="96px"
            className="object-contain"
          />
        </div>

        {/* Wordmark with Masked Rise */}
        <div className="text-center overflow-hidden">
          <div className="overflow-hidden">
            <div
              ref={word1Ref}
              className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-none"
            >
              MEDDY
            </div>
          </div>
          <div className="overflow-hidden mt-1">
            <div
              ref={word2Ref}
              className="font-body text-xs font-bold tracking-[0.22em] text-[#F69E28] uppercase leading-tight"
            >
              OIL &amp; GAS LIMITED
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[11px] font-mono tracking-widest uppercase text-white/40">
        CLICK OR PRESS ESC TO SKIP
      </div>
    </div>
  );
}
