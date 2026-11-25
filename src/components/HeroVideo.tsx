"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_VIDEO_ENABLED } from "@/lib/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoProps {
  active: boolean;
  poster: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export default function HeroVideo({ active, poster, triggerRef }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!HERO_VIDEO_ENABLED || !active || typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;
    const conn = navigator.connection;
    const saveData = Boolean(conn?.saveData);
    const effType = conn?.effectiveType;
    const goodNetwork = !effType || effType === "4g";

    if (reduce || !isDesktop || saveData || !goodNetwork) return;

    const el = videoRef.current;
    if (!el) return;

    const win = window;
    let idleId: number | null = null;
    const startLoad = () => {
      el.load();
      el.play().catch(() => {});
    };

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(startLoad, { timeout: 2000 });
    } else {
      idleId = globalThis.setTimeout(startLoad, 200) as unknown as number;
    }

    const onPlaying = () => {
      setReady(true);
      gsap.to(el, { opacity: 1, duration: 1.2, ease: "power2.out" });
    };
    el.addEventListener("playing", onPlaying);

    const onVisChange = () => {
      if (document.hidden) el.pause();
      else el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisChange);

    let st: ScrollTrigger | null = null;
    if (triggerRef.current) {
      st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (s) => {
          if (s.isActive && !document.hidden) el.play().catch(() => {});
          else el.pause();
        },
      });
    }

    return () => {
      if (idleId !== null) {
        if (typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(idleId);
        else globalThis.clearTimeout(idleId);
      }
      el.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVisChange);
      st?.kill();
    };
  }, [active, triggerRef]);

  if (!HERO_VIDEO_ENABLED) return null;

  return (
    <video
      ref={videoRef}
      data-hero-video=""
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0 }}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    >
      <source src="/videos/hero-loop.webm" type="video/webm" />
      <source src="/videos/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
