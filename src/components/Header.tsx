"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, COMPANY_FACTS } from "@/lib/data";
import { useLenis } from "@/components/motion/MotionProvider";
import AppLink from "@/components/motion/AppLink";
import SearchPalette from "@/components/SearchPalette";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/lib/motion/tokens";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesAccordion, setServicesAccordion] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(pathname !== "/");

  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const lastSearchBtnRef = useRef<HTMLButtonElement | null>(null);
  const bar1Ref = useRef<HTMLElement>(null);
  const bar2Ref = useRef<HTMLElement>(null);
  const labelMenuRef = useRef<HTMLSpanElement>(null);
  const labelCloseRef = useRef<HTMLSpanElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionChevronRef = useRef<SVGSVGElement>(null);

  const morphTlRef = useRef<gsap.core.Timeline | null>(null);
  const panelTlRef = useRef<gsap.core.Timeline | null>(null);
  const dropdownTlRef = useRef<gsap.core.Timeline | null>(null);
  const lastScrollYRef = useRef(0);
  const headerHiddenRef = useRef(false);
  const mobileMenuOpenRef = useRef(false);
  const searchOpenRef = useRef(false);

  const { stopScroll, startScroll } = useLenis();

  useEffect(() => {
    if (pathname !== "/") {
      setHeroVisible(true);
      return;
    }
    setHeroVisible(document.documentElement.dataset.heroVisible === "true");
    const onHeroVis = (e: Event) => {
      const custom = e as CustomEvent<{ visible: boolean }>;
      setHeroVisible(Boolean(custom.detail?.visible));
    };
    window.addEventListener("meddy:hero-visibility", onHeroVis);
    return () => window.removeEventListener("meddy:hero-visibility", onHeroVis);
  }, [pathname]);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    searchOpenRef.current = searchOpen;
  }, [searchOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const setBackgroundInert = useCallback((isInert: boolean) => {
    if (typeof document === "undefined") return;
    const targets = document.querySelectorAll("main, footer");
    targets.forEach((el) => {
      if (isInert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }, []);

  // Ensure body scroll, inert, and Lenis are never left locked if Header unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      setBackgroundInert(false);
      startScroll();
    };
  }, [setBackgroundInert, startScroll]);

  // Build reversible hamburger + panel timelines once
  useGSAP(() => {
    if (!bar1Ref.current || !bar2Ref.current || !labelMenuRef.current || !labelCloseRef.current || !panelRef.current) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hamburger morph timeline (bar container is 10px tall, two 2px bars at top:0 and bottom:0 -> centres 8px apart)
    gsap.set(labelCloseRef.current, { yPercent: 100 });
    const morphTl = gsap.timeline({ paused: true });
    morphTl
      .to(bar1Ref.current, { y: 4, duration: 0.22, ease: EASE.out }, 0)
      .to(bar2Ref.current, { y: -4, duration: 0.22, ease: EASE.out }, 0)
      .to(labelMenuRef.current, { yPercent: -100, duration: 0.3, ease: EASE.out }, 0)
      .to(labelCloseRef.current, { yPercent: 0, duration: 0.3, ease: EASE.out }, 0)
      .to(bar1Ref.current, { rotate: 45, duration: 0.35, ease: EASE.out }, 0.14)
      .to(bar2Ref.current, { rotate: -45, duration: 0.35, ease: EASE.out }, 0.14);
    morphTlRef.current = morphTl;

    // Menu panel timeline (always mounted, visibility: hidden when closed)
    const panel = panelRef.current;
    gsap.set(panel, { visibility: "hidden" });

    const linkLines = panel.querySelectorAll("[data-menu-line]");
    const numEls = panel.querySelectorAll("[data-menu-num]");
    const hairlines = panel.querySelectorAll("[data-menu-hairline]");
    const footerBlock = panel.querySelector("[data-menu-footer]");

    const panelTl = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(panel, { visibility: "visible" });
      },
      onReverseComplete: () => {
        gsap.set(panel, { visibility: "hidden" });
      },
    });

    if (reduce) {
      panelTl.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" });
    } else {
      panelTl
        .fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE.inOut },
          0
        )
        .fromTo(
          hairlines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.55, stagger: 0.04, ease: EASE.out },
          0.18
        )
        .fromTo(
          numEls,
          { opacity: 0 },
          { opacity: 1, duration: 0.45, stagger: 0.05, ease: EASE.out },
          0.2
        )
        .fromTo(
          linkLines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.65, stagger: 0.06, ease: EASE.out },
          0.22
        );

      if (footerBlock) {
        panelTl.fromTo(
          footerBlock,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: EASE.out },
          0.38
        );
      }
    }

    panelTlRef.current = panelTl;
  }, { scope: headerRef });

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    mobileMenuOpenRef.current = true;
    stopScroll();
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);

    if (headerRef.current && headerHiddenRef.current) {
      headerHiddenRef.current = false;
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.32, ease: EASE.out });
    }

    morphTlRef.current?.timeScale(1).play();
    panelTlRef.current?.timeScale(1).play();

    requestAnimationFrame(() => {
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    });
  }, [setBackgroundInert, stopScroll]);

  const closeMobileMenu = useCallback(
    (restoreFocus = true) => {
      if (!mobileMenuOpenRef.current) return;
      setMobileMenuOpen(false);
      mobileMenuOpenRef.current = false;
      startScroll();
      document.body.style.overflow = "";
      setBackgroundInert(false);

      morphTlRef.current?.timeScale(1.4).reverse();
      panelTlRef.current?.timeScale(1.4).reverse();

      if (restoreFocus) {
        requestAnimationFrame(() => {
          menuBtnRef.current?.focus();
        });
      }
    },
    [setBackgroundInert, startScroll]
  );

  const toggleMobileMenu = () => {
    if (mobileMenuOpenRef.current) {
      closeMobileMenu(true);
    } else {
      openMobileMenu();
    }
  };

  // Close menu and dropdown automatically on route change
  useEffect(() => {
    if (mobileMenuOpenRef.current) {
      closeMobileMenu(false);
    }
    setServicesDropdown(false);
  }, [pathname, closeMobileMenu]);

  // Animate Services dropdown with GSAP (280ms open, 40ms item stagger, 160ms close)
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll("[data-dropdown-item]");

    dropdownTlRef.current?.kill();

    if (servicesDropdown) {
      gsap.set(el, { display: "block", pointerEvents: "auto" });
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: EASE.out }, 0)
          .fromTo(items, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.24, stagger: 0.04, ease: EASE.out }, 0.04);
        dropdownTlRef.current = tl;
      }
    } else {
      if (reduce) {
        gsap.set(el, { display: "none", opacity: 0, pointerEvents: "none" });
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            if (dropdownRef.current) gsap.set(dropdownRef.current, { display: "none", pointerEvents: "none" });
          },
        });
        tl.to(el, { opacity: 0, y: 6, duration: 0.16, ease: EASE.out });
        dropdownTlRef.current = tl;
      }
    }
  }, [servicesDropdown]);

  // Animate mobile Services accordion height with GSAP
  useEffect(() => {
    const el = accordionRef.current;
    const chev = accordionChevronRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (servicesAccordion) {
      gsap.set(el, { display: "block" });
      if (reduce) {
        gsap.set(el, { height: "auto", opacity: 1 });
        if (chev) gsap.set(chev, { rotate: 180 });
      } else {
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.32, ease: EASE.out });
        if (chev) gsap.to(chev, { rotate: 180, duration: 0.32, ease: EASE.out });
      }
    } else {
      if (reduce) {
        gsap.set(el, { height: 0, opacity: 0, display: "none" });
        if (chev) gsap.set(chev, { rotate: 0 });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.24,
          ease: EASE.out,
          onComplete: () => {
            if (accordionRef.current) gsap.set(accordionRef.current, { display: "none" });
          },
        });
        if (chev) gsap.to(chev, { rotate: 0, duration: 0.32, ease: EASE.out });
      }
    }
  }, [servicesAccordion]);

  // Hide header on scroll down, show on scroll up (transform only, 320ms). Never hide within 80px or when menu/search is open.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY;
      const heroEl = pathname === "/" ? document.getElementById("hero") : null;
      const pastHero = heroEl ? heroEl.getBoundingClientRect().bottom <= 80 : y > 80;
      setScrolled(pastHero);

      const isMobile = window.innerWidth < 1024;
      if (!headerRef.current) return;
      if (!pastHero || isMobile || mobileMenuOpenRef.current || searchOpenRef.current) {
        if (headerHiddenRef.current) {
          headerHiddenRef.current = false;
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.32, ease: EASE.out });
        }
        lastScrollYRef.current = y;
        return;
      }

      const delta = y - lastScrollYRef.current;
      if (delta > 8 && !headerHiddenRef.current) {
        headerHiddenRef.current = true;
        gsap.to(headerRef.current, { yPercent: -100, duration: 0.32, ease: EASE.out });
      } else if (delta < -8 && headerHiddenRef.current) {
        headerHiddenRef.current = false;
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.32, ease: EASE.out });
      }
      lastScrollYRef.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K or / search, Escape, focus trap in mobile menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!searchOpenRef.current && document.activeElement instanceof HTMLElement) {
          lastSearchBtnRef.current = document.activeElement as HTMLButtonElement;
        }
        setSearchOpen((prev) => !prev);
        return;
      }

      if (
        e.key === "/" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !searchOpenRef.current
      ) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        const isEditable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          Boolean(target?.isContentEditable);
        if (!isEditable) {
          e.preventDefault();
          if (document.activeElement instanceof HTMLElement) {
            lastSearchBtnRef.current = document.activeElement as HTMLButtonElement;
          }
          setSearchOpen(true);
          return;
        }
      }

      if (e.key === "Escape") {
        if (servicesDropdown) setServicesDropdown(false);
        if (mobileMenuOpenRef.current) closeMobileMenu(true);
        if (searchOpenRef.current) setSearchOpen(false);
        return;
      }

      // Focus trap when mobile menu is open
      if (e.key === "Tab" && mobileMenuOpenRef.current && panelRef.current) {
        const focusables = [
          ...(menuBtnRef.current ? [menuBtnRef.current] : []),
          ...Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null),
        ];
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileMenu, servicesDropdown]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Projects", href: "/projects" },
    { name: "QHSE", href: "/qhse" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[64px] lg:h-[80px] transition-all duration-300 ${
          !heroVisible && pathname === "/"
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${
          scrolled || mobileMenuOpen
            ? "bg-[#0B1E36] border-b border-white/[0.08]"
            : "bg-[#0B1E36]/85 border-b border-white/[0.06]"
        }`}
      >
        <div className="site-container h-full flex items-center justify-between">
          {/* Logo Brand Lockup */}
          <AppLink href="/" className="flex items-center gap-3 z-50">
            <div className="w-9 h-9 rounded-[2px] bg-white p-1 flex items-center justify-center">
              <img
                src="/meddy-mark.png"
                alt="Meddy Oil & Gas Mark"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-xl font-bold leading-none tracking-tight text-white hover:text-[#F69E28] transition-colors">
                MEDDY
              </span>
              <span className="font-body text-[9px] font-semibold tracking-[0.18em] text-white/70 uppercase mt-0.5">
                OIL &amp; GAS
              </span>
            </div>
          </AppLink>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith("/services"));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownWrapperRef}
                    className="relative py-6 group"
                    onMouseEnter={() => {
                      if (canHover) setServicesDropdown(true);
                    }}
                    onMouseLeave={() => {
                      if (canHover) setServicesDropdown(false);
                    }}
                    onBlur={(e) => {
                      if (!dropdownWrapperRef.current?.contains(e.relatedTarget as Node)) {
                        setServicesDropdown(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <AppLink
                        href={link.href}
                        className={`font-body text-[14px] font-medium transition-colors ${
                          isActive ? "text-[#F69E28]" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </AppLink>
                      <button
                        type="button"
                        aria-expanded={servicesDropdown}
                        aria-haspopup="true"
                        aria-label="Toggle services submenu"
                        onClick={() => setServicesDropdown((prev) => !prev)}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setServicesDropdown(true);
                          }
                        }}
                        className="p-0.5 text-white/70 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#F69E28] rounded-[2px] cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                            servicesDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Services Dropdown */}
                    <div
                      ref={dropdownRef}
                      style={{ display: "none", opacity: 0 }}
                      className="absolute top-full left-0 w-80 bg-[#0B1E36] border border-white/[0.12] rounded-[2px] p-2 shadow-2xl"
                    >
                      <div className="text-[10px] font-mono font-bold tracking-widest text-[#F69E28] uppercase px-3 py-1.5 border-b border-white/[0.08]">
                        Capabilities
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {SERVICES_DATA.map((srv) => (
                          <div key={srv.slug}>
                            <AppLink
                              href={`/services/${srv.slug}`}
                              data-dropdown-item=""
                              onClick={() => setServicesDropdown(false)}
                              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors rounded-[2px]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[#F69E28] font-mono text-[11px]">
                                  {srv.number}
                                </span>
                                <span>{srv.title}</span>
                              </div>
                              <ArrowUpRight className="w-3 h-3 text-[#F69E28] opacity-60" />
                            </AppLink>
                            {srv.sections && srv.sections.length > 0 && (
                              <div className="pl-9 pr-2 pb-1 space-y-0.5">
                                {srv.sections.map((sec) => (
                                  <AppLink
                                    key={sec.anchor}
                                    href={`/services/${srv.slug}#${sec.anchor}`}
                                    data-dropdown-item=""
                                    onClick={() => setServicesDropdown(false)}
                                    className="block px-2 py-1 text-[11px] font-medium text-white/60 hover:text-[#F69E28] hover:bg-white/[0.04] transition-colors rounded-[2px]"
                                  >
                                    {sec.title}
                                  </AppLink>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <AppLink
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-[14px] font-medium font-body transition-colors group ${
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline draws from left */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#F69E28] transition-transform duration-200 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </AppLink>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                lastSearchBtnRef.current = e.currentTarget;
                setSearchOpen(true);
              }}
              aria-label="Search site"
              className="w-9 h-9 rounded-[2px] bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <AppLink
              href="/contact"
              className="inline-flex items-center justify-center h-[38px] px-5 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] text-[#0B1E36] font-body text-[13px] font-bold rounded-[2px] transition-all"
            >
              Get In Touch
            </AppLink>
          </div>

          {/* Mobile Search + Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden z-50">
            <button
              type="button"
              onClick={(e) => {
                lastSearchBtnRef.current = e.currentTarget;
                setSearchOpen(true);
              }}
              aria-label="Search"
              className="w-8 h-8 rounded-[2px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex items-center gap-2.5 min-h-[44px] min-w-[44px] px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#F69E28] focus:ring-offset-2 focus:ring-offset-[#0B1E36] rounded-[2px] cursor-pointer"
            >
              {/* 10px tall bars container: 2px bars at top:0 and bottom:0 -> centres 8px apart, ±4px morph meets cleanly at centre */}
              <span className="relative w-[22px] h-[10px] block" aria-hidden="true">
                <i
                  ref={bar1Ref}
                  className="absolute top-0 left-0 w-[22px] h-[2px] bg-white rounded-[1px] block origin-center"
                />
                <i
                  ref={bar2Ref}
                  className="absolute bottom-0 left-0 w-[22px] h-[2px] bg-white rounded-[1px] block origin-center"
                />
              </span>

              {/* Rolling label */}
              <span
                className="hidden sm:inline-block relative h-[18px] w-[42px] overflow-hidden text-[13px] leading-[18px] font-semibold tracking-wide text-left"
                aria-hidden="true"
              >
                <span ref={labelMenuRef} className="block leading-[18px]">
                  Menu
                </span>
                <span ref={labelCloseRef} className="block leading-[18px] absolute top-0 left-0">
                  Close
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel (Always mounted, visibility: hidden when closed) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        aria-label="Navigation Menu"
        style={{ visibility: "hidden" }}
        className="fixed inset-0 z-40 bg-[#0B1E36] flex flex-col pt-20 px-6 pb-8 overflow-y-auto lg:hidden"
      >
        <div className="flex-1 space-y-1 py-4">
          {navLinks.map((link, idx) => {
            const num = `0${idx + 1}`;
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div key={link.name} className="py-3 relative">
                  <button
                    type="button"
                    aria-expanded={servicesAccordion}
                    onClick={() => setServicesAccordion((prev) => !prev)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span data-menu-num="" className="font-mono text-sm text-[#F69E28] font-bold">
                        {num}
                      </span>
                      <span className="overflow-hidden inline-block">
                        <span
                          data-menu-line=""
                          className="inline-block font-display text-3xl sm:text-4xl font-bold uppercase text-white group-hover:text-[#F69E28] transition-colors"
                        >
                          {link.name}
                        </span>
                      </span>
                    </div>
                    <ChevronDown
                      ref={accordionChevronRef}
                      className={`w-5 h-5 ${
                        servicesAccordion ? "text-[#F69E28]" : "text-white/60"
                      }`}
                    />
                  </button>

                  <div
                    ref={accordionRef}
                    style={{ display: "none", height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 pt-3 pb-1 space-y-2">
                      <AppLink
                        href="/services"
                        onClick={() => closeMobileMenu(false)}
                        className="block text-sm font-semibold text-[#F69E28] hover:text-white py-1"
                      >
                        All Capabilities Overview
                      </AppLink>
                      {SERVICES_DATA.map((srv) => (
                        <div key={srv.slug}>
                          <AppLink
                            href={`/services/${srv.slug}`}
                            onClick={() => closeMobileMenu(false)}
                            className="block text-sm font-medium text-white/70 hover:text-white py-1"
                          >
                            {srv.title}
                          </AppLink>
                          {srv.sections && srv.sections.length > 0 && (
                            <div className="pl-4 border-l border-white/15 ml-1 my-1 space-y-1">
                              {srv.sections.map((sec) => (
                                <AppLink
                                  key={sec.anchor}
                                  href={`/services/${srv.slug}#${sec.anchor}`}
                                  onClick={() => closeMobileMenu(false)}
                                  className="block text-xs font-medium text-white/55 hover:text-[#F69E28] py-0.5"
                                >
                                  {sec.title}
                                </AppLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div data-menu-hairline="" className="h-[1px] bg-white/[0.08] mt-3 w-full" />
                </div>
              );
            }

            return (
              <div key={link.name} className="py-3 relative">
                <AppLink
                  href={link.href}
                  onClick={() => closeMobileMenu(false)}
                  className="flex items-baseline gap-3 group"
                >
                  <span data-menu-num="" className="font-mono text-sm text-[#F69E28] font-bold">
                    {num}
                  </span>
                  <span className="overflow-hidden inline-block">
                    <span
                      data-menu-line=""
                      className={`inline-block font-display text-3xl sm:text-4xl font-bold uppercase transition-colors ${
                        isActive ? "text-[#F69E28]" : "text-white group-hover:text-[#F69E28]"
                      }`}
                    >
                      {link.name}
                    </span>
                  </span>
                </AppLink>
                <div data-menu-hairline="" className="h-[1px] bg-white/[0.08] mt-3 w-full" />
              </div>
            );
          })}
        </div>

        {/* Clean Bottom Action */}
        <div data-menu-footer="" className="pt-4 border-t border-white/[0.08] space-y-3">
          <AppLink
            href="/contact"
            onClick={() => closeMobileMenu(false)}
            className="w-full h-14 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-bold text-sm flex items-center justify-center rounded-[2px] transition-all"
          >
            Get In Touch
          </AppLink>
          <div className="text-xs text-white/60 text-center font-body">
            {COMPANY_FACTS.address}
          </div>
          {COMPANY_FACTS.email && (
            <div className="text-xs text-white/60 text-center font-body">
              <a href={`mailto:${COMPANY_FACTS.email}`} className="hover:underline">
                {COMPANY_FACTS.email}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Real Search Palette (Phase D3) */}
      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        returnFocusRef={lastSearchBtnRef}
      />
    </>
  );
}
