"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { EASE } from "@/lib/motion/tokens";
import { revealGate } from "@/lib/motion/revealGate";
import { useLenis } from "@/components/motion/MotionProvider";

function decodeWithTimeout(src: string, timeoutMs = 2500): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    const img = new window.Image();
    img.src = src;
    const done = () => {
      clearTimeout(timer);
      resolve();
    };
    if (typeof img.decode === "function") {
      img.decode().then(done).catch(done);
    } else {
      img.onload = done;
      img.onerror = done;
    }
  });
}

export default function Preloader() {
  const [active, setActive] = useState(true);
  const { stopScroll, startScroll } = useLenis();

  const containerRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const finishedRef = useRef(false);
  const liftingRef = useRef(false);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    sessionStorage.setItem("meddy_intro_v2", "1");
    revealGate.open(false);
    document.body.style.overflow = "";
    startScroll();
    setActive(false);
    requestAnimationFrame(() => {
      prevFocusRef.current?.focus?.();
    });
  }, [startScroll]);

  const skipIntro = useCallback(() => {
    if (finishedRef.current || liftingRef.current) return;
    liftingRef.current = true;
    sessionStorage.setItem("meddy_intro_v2", "1");
    revealGate.open(false);
    masterTlRef.current?.kill();

    if (!containerRef.current) {
      finish();
      return;
    }

    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.3,
      ease: EASE.out,
      onComplete: finish,
    });
  }, [finish]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeen = sessionStorage.getItem("meddy_intro_v2");
    const skipQuery = window.location.search.includes("skip_intro");
    const replayQuery =
      window.location.search.includes("replay") ||
      window.location.search.includes("intro");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if ((hasSeen && !replayQuery) || skipQuery || reduce) {
      if (reduce) sessionStorage.setItem("meddy_intro_v2", "1");
      revealGate.open(true);
      setActive(false);
      return;
    }

    prevFocusRef.current = document.activeElement as HTMLElement | null;
    revealGate.close();
    stopScroll();
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      skipBtnRef.current?.focus();
    });

    const isMobile = window.innerWidth < 768;
    const heroSrc = isMobile
      ? "/images/hero-mobile-1170.webp"
      : "/images/hero-desktop-1920.webp";

    const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });
    masterTlRef.current = tl;

    tl.addLabel("fill", 0.15)
      .fromTo(
        logoRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.2 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.8 },
        "fill"
      )
      .addLabel("words", 0.95)
      .from(
        [word1Ref.current, word2Ref.current],
        { yPercent: 110, duration: 0.8, stagger: 0.06 },
        "words"
      )
      .addLabel("hold", 1.25);

    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      decodeWithTimeout("/meddy-mark.png", 2500),
      decodeWithTimeout(heroSrc, 2500),
      new Promise<void>((r) => setTimeout(r, 1200)),
    ]);

    tl.play();

    // Cap whole intro at 4 seconds max
    const capTimer = setTimeout(() => {
      if (!liftingRef.current && !finishedRef.current) {
        liftPanel();
      }
    }, 4000);

    function liftPanel() {
      if (liftingRef.current || finishedRef.current) return;
      liftingRef.current = true;
      clearTimeout(capTimer);

      if (!containerRef.current) {
        finish();
        return;
      }

      const out = gsap.timeline({ onComplete: finish });
      out
        .to([badgeRef.current, word1Ref.current, word2Ref.current], {
          opacity: 0,
          duration: 0.12,
        })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.7,
            ease: EASE.inOut,
            onStart: () => {
              sessionStorage.setItem("meddy_intro_v2", "1");
              revealGate.open(false);
            },
          },
          ">0.05"
        );
    }

    let cancelled = false;
    Promise.all([ready, tl.then()]).then(() => {
      if (!cancelled) liftPanel();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        skipIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelled = true;
      clearTimeout(capTimer);
      window.removeEventListener("keydown", handleKeyDown);
      tl.kill();
      document.body.style.overflow = "";
      startScroll();
    };
  }, [stopScroll, startScroll, finish, skipIntro]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      onClick={skipIntro}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Meddy Oil & Gas"
      className="fixed inset-0 z-[100] bg-[#0B1E36] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Droplet Logo in crisp white rounded card (96px desktop, 80px mobile) */}
        <div
          ref={badgeRef}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-[4px] bg-white p-2.5 flex items-center justify-center shadow-2xl relative overflow-hidden"
        >
          <div ref={logoRef} className="w-full h-full relative">
            <img
              src="/meddy-mark.png"
              alt="Meddy Oil & Gas Mark"
              className="w-full h-full object-contain"
            />
          </div>
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

      <button
        ref={skipBtnRef}
        type="button"
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          skipIntro();
        }}
        className="absolute bottom-8 px-4 py-2 text-[11px] font-mono tracking-widest uppercase text-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F69E28] rounded-[2px] cursor-pointer"
      >
        CLICK OR PRESS ESC TO SKIP
      </button>
    </div>
  );
}
