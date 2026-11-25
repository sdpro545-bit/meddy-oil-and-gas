"use client";

import React, { useRef, useState } from "react";
import PictureImage from "@/components/PictureImage";
import HeroVideo from "@/components/HeroVideo";
import Button from "@/components/motion/Button";
import { COMPANY_FACTS } from "@/lib/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { EASE, HERO_AMBIENT } from "@/lib/motion/tokens";
import { revealGate } from "@/lib/motion/revealGate";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [entranceDone, setEntranceDone] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const scrollLayer = q("[data-hero-scroll]")[0] as HTMLElement | undefined;
      const pBgLayer = q("[data-p-bg]")[0] as HTMLElement | undefined;
      const driftLayer = q("[data-p-drift]")[0] as HTMLElement | undefined;
      const bgLayer = q("[data-hero-bg]")[0] as HTMLElement | undefined;
      const scrimDarken = q("[data-hero-scrim-darken]")[0] as HTMLElement | undefined;
      const exposeLayer = q("[data-hero-expose]")[0] as HTMLElement | undefined;
      const contentLayer = q("[data-hero-content]")[0] as HTMLElement | undefined;
      const eyebrowBg = q("[data-hero-eyebrow-bg]")[0] as HTMLElement | undefined;
      const eyebrowFg = q("[data-hero-eyebrow-fg]")[0] as HTMLElement | undefined;
      const h1El = q("[data-hero-h1]")[0] as HTMLElement | undefined;
      const leadEl = q("[data-hero-lead]")[0] as HTMLElement | undefined;
      const ctaEls = q("[data-hero-cta]");
      const stackWrap = q("[data-hero-stack]")[0] as HTMLElement | undefined;
      const stackLine = q("[data-hero-stack-line]")[0] as HTMLElement | undefined;
      const stackWords = q("[data-hero-stack-word]");
      const ghostEl = q("[data-hero-ghost]")[0] as HTMLElement | undefined;
      const cueWrap = q("[data-hero-cue]")[0] as HTMLElement | undefined;
      const cueLabel = q("[data-hero-cue-label]")[0] as HTMLElement | undefined;
      const cueLine = q("[data-hero-cue-line]")[0] as HTMLElement | undefined;

      const showContent = () => {
        if (contentLayer) contentLayer.style.visibility = "visible";
        if (h1El) h1El.style.visibility = "visible";
        if (leadEl) leadEl.style.visibility = "visible";
        if (ghostEl) ghostEl.style.visibility = "visible";
        if (cueWrap) cueWrap.style.visibility = "visible";
      };

      const mm = gsap.matchMedia();

      // Reduced motion: immediate resting state, no parallax/scrub/drift
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (exposeLayer) gsap.set(exposeLayer, { opacity: 0 });
        if (bgLayer) gsap.set(bgLayer, { scale: 1.04 });
        if (ghostEl) gsap.set(ghostEl, { opacity: 0.06, xPercent: 0 });
        showContent();
        setEntranceDone(true);
      });

      // Full desktop & mobile choreographed modes
      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop, isMobile, finePointer } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            finePointer: boolean;
          };

          let cancelled = false;
          let h1Split: SplitText | null = null;
          let leadSplit: SplitText | null = null;
          let entranceTl: gsap.core.Timeline | null = null;
          let exitTl: gsap.core.Timeline | null = null;
          let h1ExitTween: gsap.core.Tween | null = null;
          let driftTween: gsap.core.Tween | null = null;
          let driftSt: ScrollTrigger | null = null;
          let pointerSt: ScrollTrigger | null = null;
          let pointerActive = false;

          const onMove = (e: PointerEvent) => {
            if (!pBgLayer || !contentLayer || !ghostEl) return;
            const r = root.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            bgX?.(nx * -24);
            bgY?.(ny * -14);
            txX?.(nx * 8);
            txY?.(ny * 5);
            gX?.(nx * 20);
          };
          const onLeave = () => {
            bgX?.(0);
            bgY?.(0);
            txX?.(0);
            txY?.(0);
            gX?.(0);
          };

          let bgX: ReturnType<typeof gsap.quickTo> | null = null;
          let bgY: ReturnType<typeof gsap.quickTo> | null = null;
          let txX: ReturnType<typeof gsap.quickTo> | null = null;
          let txY: ReturnType<typeof gsap.quickTo> | null = null;
          let gX: ReturnType<typeof gsap.quickTo> | null = null;

          const enablePointer = () => {
            if (!finePointer || pointerActive) return;
            pointerActive = true;
            root.addEventListener("pointermove", onMove, { passive: true });
            root.addEventListener("pointerleave", onLeave);
          };

          const disablePointer = () => {
            if (!pointerActive) return;
            pointerActive = false;
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
            onLeave();
          };

          if (finePointer && pBgLayer && contentLayer && ghostEl) {
            bgX = gsap.quickTo(pBgLayer, "x", { duration: 0.9, ease: "power3.out" });
            bgY = gsap.quickTo(pBgLayer, "y", { duration: 0.9, ease: "power3.out" });
            txX = gsap.quickTo(contentLayer, "x", { duration: 1.1, ease: "power3.out" });
            txY = gsap.quickTo(contentLayer, "y", { duration: 1.1, ease: "power3.out" });
            gX = gsap.quickTo(ghostEl, "x", { duration: 1.3, ease: "power3.out" });
          }

          const onVisChange = () => {
            if (!driftTween) return;
            if (document.hidden) driftTween.pause();
            else if (driftSt?.isActive) driftTween.play();
          };

          (async () => {
            try {
              if (document.fonts) await document.fonts.ready;
              if (cancelled) return;

              const quick = revealGate.isQuick;

              // Split H1 and Lead after fonts load; rebuild H1 scrub on re-split
              let firstH1Split = true;
              let h1Lines: Element[] = [];
              if (h1El) {
                h1Split = SplitText.create(h1El, {
                  type: "lines",
                  mask: "lines",
                  autoSplit: true,
                  aria: "none",
                  linesClass: "split-line",
                  onSplit(self) {
                    h1Lines = self.lines;
                    if (isDesktop) {
                      h1ExitTween?.kill();
                      h1ExitTween = gsap.fromTo(
                        self.lines,
                        { yPercent: 0, opacity: 1 },
                        {
                          yPercent: -45,
                          opacity: 0,
                          stagger: 0.08,
                          ease: "none",
                          immediateRender: false,
                          scrollTrigger: {
                            trigger: root,
                            start: "10% top",
                            end: "55% top",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                          },
                        }
                      );
                    }
                    if (!firstH1Split) {
                      gsap.set(self.lines, { yPercent: 0, skewY: 0 });
                    }
                    firstH1Split = false;
                  },
                });
              }

              let leadLines: Element[] = [];
              if (leadEl) {
                leadSplit = SplitText.create(leadEl, {
                  type: "lines",
                  mask: "lines",
                  autoSplit: true,
                  aria: "none",
                  linesClass: "split-line",
                });
                leadLines = leadSplit.lines;
              }

              // Build C3 Entrance Timeline (paused until revealGate opens)
              const tl = gsap.timeline({
                paused: true,
                onStart: () => {
                  const layers = [bgLayer, contentLayer, ghostEl].filter(Boolean) as HTMLElement[];
                  layers.forEach((el) => (el.style.willChange = "transform"));
                },
                onComplete: () => {
                  const layers = [bgLayer, contentLayer, ghostEl].filter(Boolean) as HTMLElement[];
                  layers.forEach((el) => (el.style.willChange = "auto"));
                  setEntranceDone(true);

                  // Start ambient drift only after entrance completes
                  const conn = navigator.connection;
                  if (HERO_AMBIENT && isDesktop && !conn?.saveData && driftLayer) {
                    driftTween = gsap.fromTo(
                      driftLayer,
                      { scale: 1.0, xPercent: 0 },
                      {
                        scale: 1.03,
                        xPercent: -1.2,
                        duration: 28,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        paused: true,
                      }
                    );
                    driftSt = ScrollTrigger.create({
                      trigger: root,
                      start: "top bottom",
                      end: "bottom top",
                      onToggle: (s) => {
                        if (s.isActive && !document.hidden) driftTween?.play();
                        else driftTween?.pause();
                      },
                    });
                    if (driftSt.isActive && !document.hidden) driftTween.play();
                    document.addEventListener("visibilitychange", onVisChange);
                  }

                  // Enable fine-pointer parallax when hero is in view
                  if (finePointer) {
                    pointerSt = ScrollTrigger.create({
                      trigger: root,
                      start: "top bottom",
                      end: "bottom top",
                      onToggle: (s) => {
                        if (s.isActive) enablePointer();
                        else disablePointer();
                      },
                    });
                    if (pointerSt.isActive) enablePointer();
                  }
                },
              });
              entranceTl = tl;

              if (bgLayer) {
                tl.fromTo(bgLayer, { scale: 1.18 }, { scale: 1.04, duration: 2.0, ease: "expo.out" }, 0);
              }

              if (exposeLayer) {
                if (quick) {
                  gsap.set(exposeLayer, { opacity: 0 });
                } else {
                  tl.fromTo(exposeLayer, { opacity: 0.55 }, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0);
                }
              }

              const headerEl = document.querySelector("header");
              if (headerEl && !quick) {
                tl.fromTo(
                  headerEl,
                  { y: -24, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.64, ease: EASE.out, clearProps: "transform,opacity" },
                  0.1
                );
              }

              if (eyebrowBg) {
                tl.fromTo(
                  eyebrowBg,
                  { scaleX: 0, transformOrigin: "left" },
                  { scaleX: 1, duration: 0.7, ease: EASE.out },
                  0.15
                );
              }
              if (eyebrowFg) {
                tl.fromTo(eyebrowFg, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: EASE.out }, 0.27);
              }

              if (h1Lines.length > 0) {
                tl.fromTo(
                  h1Lines,
                  { yPercent: 115, skewY: 3 },
                  { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.09, ease: "expo.out" },
                  0.25
                );
              }

              if (leadLines.length > 0) {
                tl.fromTo(
                  leadLines,
                  { yPercent: 115 },
                  { yPercent: 0, duration: 0.9, stagger: 0.06, ease: EASE.out },
                  0.55
                );
              }

              if (ctaEls.length > 0) {
                tl.fromTo(
                  ctaEls,
                  { y: 16, scale: 0.98, opacity: 0 },
                  { y: 0, scale: 1, opacity: 1, duration: 0.7, stagger: 0.08, ease: EASE.out },
                  0.75
                );
              }

              if (stackLine) {
                tl.fromTo(
                  stackLine,
                  { scaleX: 0, transformOrigin: isDesktop ? "right" : "left" },
                  { scaleX: 1, duration: 0.7, ease: EASE.out },
                  0.9
                );
              }
              if (stackWords.length > 0) {
                tl.fromTo(
                  stackWords,
                  { yPercent: 115 },
                  { yPercent: 0, duration: 0.9, stagger: 0.08, ease: EASE.out },
                  0.94
                );
              }

              if (ghostEl) {
                tl.fromTo(
                  ghostEl,
                  { xPercent: 6, opacity: 0 },
                  { xPercent: 0, opacity: 0.06, duration: 1.2, ease: EASE.out },
                  1.0
                );
              }

              if (cueLabel) {
                tl.fromTo(cueLabel, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: EASE.out }, 1.4);
              }
              if (cueLine) {
                tl.fromTo(
                  cueLine,
                  { scaleY: 0, transformOrigin: "top" },
                  { scaleY: 1, duration: 1.0, ease: EASE.out },
                  1.4
                );
              }

              // C7 timings: quick mode ~0.8s (timeScale 3), mobile shortened ~1.6s (timeScale 1.5)
              if (quick) {
                tl.timeScale(3);
              } else if (isMobile) {
                tl.timeScale(1.5);
              }

              // C5 Scroll Exit (scrubbed, no pin)
              exitTl = gsap.timeline({
                scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              });

              if (isDesktop) {
                if (scrollLayer) {
                  exitTl.fromTo(
                    scrollLayer,
                    { yPercent: 0, scale: 1 },
                    { yPercent: 14, scale: 1.12, ease: "none", immediateRender: false },
                    0
                  );
                }
                if (scrimDarken) {
                  exitTl.fromTo(
                    scrimDarken,
                    { opacity: 0 },
                    { opacity: 0.35, ease: "none", immediateRender: false },
                    0
                  );
                }
                if (leadEl) {
                  exitTl.fromTo(
                    leadEl,
                    { y: 0, opacity: 1 },
                    { y: -30, opacity: 0, ease: "none", duration: 0.35, immediateRender: false },
                    0.1
                  );
                }
                ctaEls.forEach((btn) => {
                  exitTl?.fromTo(
                    btn,
                    { y: 0, opacity: 1 },
                    { y: -30, opacity: 0, ease: "none", duration: 0.35, immediateRender: false },
                    0.1
                  );
                });
                if (stackWrap) {
                  exitTl.fromTo(
                    stackWrap,
                    { x: 0, opacity: 1 },
                    { x: 48, opacity: 0, ease: "none", duration: 0.4, immediateRender: false },
                    0.2
                  );
                }
                if (ghostEl) {
                  exitTl.fromTo(
                    ghostEl,
                    { yPercent: 0, opacity: 0.06 },
                    { yPercent: -25, opacity: 0, ease: "none", duration: 0.7, immediateRender: false },
                    0
                  );
                }
                if (cueWrap) {
                  exitTl.fromTo(
                    cueWrap,
                    { opacity: 1 },
                    { opacity: 0, ease: "none", duration: 0.08, immediateRender: false },
                    0
                  );
                }
              } else {
                // Simplified mobile scroll exit
                if (scrollLayer) {
                  exitTl.fromTo(
                    scrollLayer,
                    { yPercent: 0 },
                    { yPercent: 10, ease: "none", immediateRender: false },
                    0
                  );
                }
                if (contentLayer) {
                  exitTl.fromTo(
                    contentLayer,
                    { y: 0, opacity: 1 },
                    { y: -24, opacity: 0, ease: "none", duration: 0.5, immediateRender: false },
                    0.1
                  );
                }
              }

              // Set initial t=0 states synchronously before showing content
              tl.progress(0).pause();
              showContent();

              await revealGate.ready();
              if (cancelled) return;
              tl.play(0);
            } catch (err) {
              showContent();
              setEntranceDone(true);
              console.warn("Hero motion notice:", err);
            }
          })();

          return () => {
            cancelled = true;
            disablePointer();
            document.removeEventListener("visibilitychange", onVisChange);
            pointerSt?.kill();
            driftSt?.kill();
            driftTween?.kill();
            h1ExitTween?.kill();
            exitTl?.kill();
            entranceTl?.kill();
            leadSplit?.revert();
            h1Split?.revert();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      data-hero-root=""
      className="relative min-h-[100svh] lg:min-h-[820px] lg:max-h-[940px] w-full flex items-end md:items-center justify-center overflow-hidden bg-[#0B1E36]"
    >
      {/* Layer 1: Scroll parallax -> Layer 2: Pointer parallax -> Layer 3: Ambient drift -> Layer 4: Entrance scale */}
      <div data-hero-scroll="" className="absolute inset-0 z-0">
        <div data-p-bg="" className="w-full h-full">
          <div data-p-drift="" className="w-full h-full">
            <div data-hero-bg="" className="w-full h-full relative">
              <PictureImage
                stem="hero-desktop"
                widths={[768, 1280, 1920, 2560]}
                mobileStem="hero-mobile"
                mobileWidths={[780, 1170]}
                placeholderKey="hero-desktop"
                alt="Offshore engineer in navy coveralls and a white hard hat on a platform deck"
                width={2560}
                height={1440}
                priority
                sizes="100vw"
                className="w-full h-full object-cover object-[center_14%] md:object-[75%_25%] lg:object-[82%_25%]"
              />
              <HeroVideo
                active={entranceDone}
                poster="/images/hero-desktop-1920.webp"
                triggerRef={rootRef}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Single directional legibility scrim (left-to-right on desktop, bottom scrim on mobile) */}
      <div data-hero-scrim="" className="absolute inset-0 z-[1] pointer-events-none">
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0B1E36]/92 via-[#0B1E36]/62 to-transparent" />
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#0B1E36]/95 via-[#0B1E36]/60 to-transparent" />
        <div data-hero-scrim-darken="" className="absolute inset-0 bg-[#0B1E36] opacity-0" />
      </div>

      {/* Navy exposure overlay for entrance fade-in */}
      <div
        data-hero-expose=""
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-[#0B1E36] opacity-0 pointer-events-none"
      />

      {/* Massive Ghost Word MEDDY */}
      <div
        data-hero-ghost=""
        data-reveal=""
        aria-hidden="true"
        className="hidden md:block absolute right-6 lg:right-12 bottom-4 z-[3] font-display text-[130px] lg:text-[210px] font-bold text-white/[0.06] select-none pointer-events-none leading-none tracking-tighter"
      >
        MEDDY
      </div>

      {/* Foreground Content */}
      <div
        data-hero-content=""
        data-reveal=""
        className="site-container relative z-10 w-full pt-28 pb-12 md:pt-36 md:pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Left Content Column */}
          <div className="md:col-span-8 lg:col-span-7 space-y-5">
            {/* Eyebrow chip */}
            <div className="relative inline-flex items-center px-3 py-1 rounded-[2px] border border-white/[0.12] overflow-hidden">
              <span
                data-hero-eyebrow-bg=""
                aria-hidden="true"
                className="absolute inset-0 bg-white/[0.08]"
              />
              <span data-hero-eyebrow-fg="" className="relative z-10 inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F69E28]" />
                <span className="font-body text-xs font-semibold tracking-wider text-white uppercase">
                  {COMPANY_FACTS.eyebrow}
                </span>
              </span>
            </div>

            {/* H1: Sentence case, two balanced lines */}
            <h1
              data-hero-h1=""
              data-reveal=""
              className="font-display text-[42px] sm:text-6xl lg:text-[82px] font-bold text-white leading-[0.96] tracking-tight [text-wrap:balance] max-w-[14ch]"
            >
              Engineering the Energy Future
            </h1>

            {/* Sub-lead */}
            <p
              data-hero-lead=""
              data-reveal=""
              className="font-body text-base sm:text-lg text-white/85 max-w-xl leading-relaxed"
            >
              Meddy Oil &amp; Gas Limited works with operators across Nigeria on well construction, oil field operations, integrated project delivery, FPSO and vessel support, and power.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div data-hero-cta="" className="w-full sm:w-auto">
                <Button href="#contact" variant="primary" showArrow={true} className="w-full sm:w-auto">
                  Request Consultation
                </Button>
              </div>
              <div data-hero-cta="" className="w-full sm:w-auto">
                <Button href="/services" variant="secondary" showArrow={false} className="w-full sm:w-auto">
                  View Capabilities
                </Button>
              </div>
            </div>
          </div>

          {/* Right Bottom Stack (unboxed: top hairline + Safety / Reliability / Performance) */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-end md:items-end">
            <div data-hero-stack="" className="w-full md:w-auto text-left md:text-right space-y-3 pt-2 md:pt-0">
              <div data-hero-stack-line="" className="h-[1px] w-24 md:ml-auto bg-white/30" />
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <div
                    data-hero-stack-word=""
                    className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-white uppercase leading-tight"
                  >
                    Safety
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    data-hero-stack-word=""
                    className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#F69E28] uppercase leading-tight"
                  >
                    Reliability
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    data-hero-stack-word=""
                    className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-white uppercase leading-tight"
                  >
                    Performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue (bottom centre on desktop, static after entrance draw) */}
      <div
        data-hero-cue=""
        data-reveal=""
        aria-hidden="true"
        className="hidden md:flex flex-col items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <span
          data-hero-cue-label=""
          className="font-body text-[12px] tracking-[0.12em] uppercase text-white/70"
        >
          Scroll
        </span>
        <span
          data-hero-cue-line=""
          className="w-[1px] h-[56px] bg-white/50 block"
        />
      </div>
    </section>
  );
}
