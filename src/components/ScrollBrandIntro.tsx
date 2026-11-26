"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { frameStore } from "@/lib/frameLoader";
import { INTRO_CONFIG } from "@/lib/introConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function setHeroVisibilityState(visible: boolean) {
  if (typeof document === "undefined") return;
  const val = visible ? "true" : "false";
  if (document.documentElement.dataset.heroVisible !== val) {
    document.documentElement.dataset.heroVisible = val;
    window.dispatchEvent(new CustomEvent("meddy:hero-visibility", { detail: { visible } }));
  }
}

export default function ScrollBrandIntro({ children }: { children: React.ReactNode }) {
  const introRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = mq.matches;
    setReducedMotion(isReduced);

    const isMobile = window.innerWidth < 768;
    frameStore.start(isMobile);

    const canvas = canvasRef.current;
    const stickyEl = stickyRef.current;
    const introEl = introRef.current;
    const heroWrap = heroWrapRef.current;
    if (!canvas || !stickyEl || !introEl || !heroWrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let canvasW = 0;
    let canvasH = 0;
    let lastDrawnFrame = -1;

    const sizeCanvas = () => {
      const rect = stickyEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = Math.max(1, Math.round(rect.width * dpr));
      canvasH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== canvasW || canvas.height !== canvasH) {
        canvas.width = canvasW;
        canvas.height = canvasH;
      }
    };

    const drawFrame = (frameIndex: number, force = false) => {
      if (!force && frameIndex === lastDrawnFrame) return;
      const img = frameStore.getFrame(frameIndex);
      if (!img) return;

      const iw = img instanceof ImageBitmap ? img.width : img.naturalWidth;
      const ih = img instanceof ImageBitmap ? img.height : img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.max(canvasW / iw, canvasH / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (canvasW - dw) / 2;
      const dy = (canvasH - dh) / 2;

      ctx.fillStyle =
        frameIndex > INTRO_CONFIG.frameCount * 0.5
          ? INTRO_CONFIG.lastFrameBg
          : INTRO_CONFIG.firstFrameBg;
      ctx.fillRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnFrame = frameIndex;
    };

    sizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      sizeCanvas();
      const targetIdx =
        lastDrawnFrame >= 0 ? lastDrawnFrame : isReduced ? INTRO_CONFIG.frameCount - 1 : 0;
      drawFrame(targetIdx, true);
    });
    resizeObserver.observe(stickyEl);

    // Reduced motion: skip scrub, show final frame and original Hero immediately
    if (isReduced) {
      setHeroVisibilityState(true);
      const finalIdx = INTRO_CONFIG.frameCount - 1;
      drawFrame(finalIdx, true);
      const unsub = frameStore.subscribe(() => {
        drawFrame(finalIdx, true);
      });
      gsap.set(heroWrap, { opacity: 1, y: 0, pointerEvents: "auto" });

      return () => {
        unsub();
        resizeObserver.disconnect();
      };
    }

    // Normal scroll-driven scrub
    setHeroVisibilityState(false);

    const heroTl = gsap.timeline({ paused: true });
    heroTl
      .fromTo(
        stickyEl,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, duration: 0.75, ease: "power2.out" },
        0
      )
      .fromTo(
        heroWrap,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        0.05
      );

    let targetProgress = 0;
    let currentFrame = 0;
    let currentReveal = 0;
    let rafId = 0;
    let lastHeroVisible = false;

    const st = ScrollTrigger.create({
      trigger: introEl,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    drawFrame(0, true);
    const unsub = frameStore.subscribe(() => {
      if (lastDrawnFrame < 0) {
        drawFrame(Math.round(currentFrame), true);
      }
    });

    const tick = () => {
      const { frameCount, lerpFactor, revealPoint } = INTRO_CONFIG;
      const frameRatio = Math.min(1, Math.max(0, targetProgress / revealPoint));
      const targetFrame = frameRatio * (frameCount - 1);

      currentFrame += (targetFrame - currentFrame) * lerpFactor;
      if (Math.abs(targetFrame - currentFrame) < 0.01) {
        currentFrame = targetFrame;
      }

      const rounded = Math.round(currentFrame);
      if (rounded !== lastDrawnFrame) {
        drawFrame(rounded);
      }

      if (scrollCueRef.current) {
        const cueOpacity = Math.max(0, Math.min(1, 1 - targetProgress / 0.05));
        scrollCueRef.current.style.opacity = String(cueOpacity);
        scrollCueRef.current.style.visibility = cueOpacity <= 0.01 ? "hidden" : "visible";
      }

      const targetReveal = Math.min(
        1,
        Math.max(0, (targetProgress - revealPoint) / (1 - revealPoint))
      );
      currentReveal += (targetReveal - currentReveal) * 0.16;
      if (Math.abs(targetReveal - currentReveal) < 0.002) {
        currentReveal = targetReveal;
      }

      heroTl.progress(currentReveal);

      heroWrap.style.pointerEvents = currentReveal > 0.12 ? "auto" : "none";
      stickyEl.style.pointerEvents = currentReveal > 0.5 ? "none" : "auto";

      const navShouldShow = targetProgress >= revealPoint;
      if (navShouldShow !== lastHeroVisible) {
        lastHeroVisible = navShouldShow;
        setHeroVisibilityState(navShouldShow);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      unsub();
      st.kill();
      heroTl.kill();
      resizeObserver.disconnect();
      setHeroVisibilityState(true);
    };
  }, []);

  return (
    <>
      <section
        id="intro"
        ref={introRef}
        style={{
          height: reducedMotion ? "100svh" : `${INTRO_CONFIG.scrollHeightVh}vh`,
        }}
        className="relative w-full z-20 pointer-events-none"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden will-change-transform"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full block"
          />

          {!reducedMotion && (
            <div
              ref={scrollCueRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B1E36]/35 backdrop-blur-sm border border-white/25 font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-white">
                Scroll
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            </div>
          )}
        </div>
      </section>

      <div
        ref={heroWrapRef}
        className={`relative z-10 ${reducedMotion ? "mt-0" : "-mt-[100svh]"}`}
      >
        {children}
      </div>
    </>
  );
}
