"use client";

import React, { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion/tokens";
import { useLenis } from "./MotionProvider";
import { revealGate } from "@/lib/motion/revealGate";

interface TransitionContextType {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function useTransitionRouter() {
  return useContext(TransitionContext);
}

export function TransitionOverlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { lenis, stopScroll, startScroll } = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const busyRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coverTlRef = useRef<gsap.core.Timeline | null>(null);
  const liftTlRef = useRef<gsap.core.Timeline | null>(null);

  const liftCurtain = useCallback(() => {
    if (failsafeRef.current) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    document.body.style.overflow = "";
    startScroll();

    // Refresh ScrollTrigger once after fonts ready and one animation frame
    if (typeof window !== "undefined") {
      const ready = document.fonts ? document.fonts.ready : Promise.resolve();
      ready.then(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }

    if (!overlayRef.current || !logoRef.current) {
      busyRef.current = false;
      pendingHrefRef.current = null;
      revealGate.open(true);
      return;
    }

    liftTlRef.current?.kill();
    const tl = gsap.timeline({
      defaults: { ease: EASE.inOut },
      onComplete: () => {
        if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
        busyRef.current = false;
        pendingHrefRef.current = null;
        revealGate.open(true);
      },
    });
    liftTlRef.current = tl;

    const openTimer = setTimeout(() => {
      revealGate.open(true);
    }, 200);

    tl.to(logoRef.current, { opacity: 0, duration: 0.18, ease: EASE.out }, 0)
      .to(overlayRef.current, { yPercent: -100, duration: 0.52 }, 0.08)
      .eventCallback("onInterrupt", () => {
        clearTimeout(openTimer);
        revealGate.open(true);
      });
  }, [lenis, startScroll]);

  // Handle browser back/forward: no curtain, open gate at once in quick mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPopState = () => {
      if (failsafeRef.current) {
        clearTimeout(failsafeRef.current);
        failsafeRef.current = null;
      }
      coverTlRef.current?.kill();
      liftTlRef.current?.kill();
      if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
      busyRef.current = false;
      pendingHrefRef.current = null;
      document.body.style.overflow = "";
      startScroll();
      revealGate.open(true);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [startScroll]);

  const navigate = useCallback(
    (href: string) => {
      if (busyRef.current) return;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        revealGate.open(true);
        router.push(href);
        return;
      }

      busyRef.current = true;
      pendingHrefRef.current = href;
      revealGate.setQuick(true);
      revealGate.close();
      stopScroll();

      if (!overlayRef.current || !logoRef.current) {
        router.push(href);
        busyRef.current = false;
        revealGate.open(true);
        startScroll();
        return;
      }

      coverTlRef.current?.kill();
      liftTlRef.current?.kill();

      const tl = gsap.timeline({
        defaults: { ease: EASE.inOut },
        onComplete: () => {
          router.push(href);
          // Failsafe: if pathname has not changed 3s after cover finished, lift curtain anyway and retry push
          if (failsafeRef.current) clearTimeout(failsafeRef.current);
          failsafeRef.current = setTimeout(() => {
            if (busyRef.current) {
              router.push(href);
              liftCurtain();
            }
          }, 3000);
        },
      });
      coverTlRef.current = tl;

      tl.set(overlayRef.current, { display: "flex", yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.48 }, 0)
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.32, ease: EASE.out },
          0.12
        );
    },
    [router, stopScroll, startScroll, liftCurtain]
  );

  // When pathname updates after router.push, lift the panel
  useEffect(() => {
    if (!busyRef.current) return;
    liftCurtain();
  }, [pathname, liftCurtain]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {/* Brand Curtain Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[90] bg-[#0B1E36] hidden items-center justify-center pointer-events-none"
      >
        <div
          ref={logoRef}
          className="w-16 h-16 rounded-[4px] bg-white p-2 flex items-center justify-center shadow-xl"
        >
          <img
            src="/meddy-mark.png"
            alt="Meddy Oil & Gas"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
