"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion/tokens";
import { useLenis } from "./MotionProvider";

interface TransitionContextType {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function useTransitionRouter() {
  return useContext(TransitionContext);
}

export function TransitionLink({
  href,
  children,
  className = "",
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}) {
  const { navigate } = useTransitionRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Ignore if modified click, external, anchor link, or same path
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#") ||
      href === pathname
    ) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export function TransitionOverlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { lenis } = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingHref = useRef<string | null>(null);

  const navigate = (href: string) => {
    if (isTransitioning) return;

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);
    pendingHref.current = href;

    if (!overlayRef.current || !logoRef.current) {
      router.push(href);
      setIsTransitioning(false);
      return;
    }

    // Step 2: Cover panel rises from bottom over 480ms (inOut). Logo icon fades in at 120ms.
    const tl = gsap.timeline({
      defaults: { ease: EASE.inOut },
      onComplete: () => {
        router.push(href);
      },
    });

    tl.set(overlayRef.current, { display: "flex", yPercent: 100 })
      .to(overlayRef.current, { yPercent: 0, duration: 0.48 }, 0)
      .fromTo(logoRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.32, ease: EASE.out }, 0.12);
  };

  // Step 4: When pathname updates after router.push, lift the panel
  useEffect(() => {
    if (!isTransitioning) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    if (typeof window !== "undefined") {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    if (!overlayRef.current || !logoRef.current) {
      setIsTransitioning(false);
      return;
    }

    // Reveal: panel lifts upward over 520ms (inOut)
    const tl = gsap.timeline({
      defaults: { ease: EASE.inOut },
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
        setIsTransitioning(false);
        pendingHref.current = null;
      },
    });

    tl.to(logoRef.current, { opacity: 0, duration: 0.18, ease: EASE.out }, 0)
      .to(overlayRef.current, { yPercent: -100, duration: 0.52 }, 0.08);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {/* Brand Curtain Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[90] bg-[#0B1E36] hidden items-center justify-center pointer-events-none"
      >
        <div ref={logoRef} className="w-16 h-16 relative">
          <Image
            src="/icon-512.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
