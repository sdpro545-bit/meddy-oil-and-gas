"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, COMPANY_FACTS } from "@/lib/data";
import { useLenis } from "@/components/motion/MotionProvider";
import gsap from "gsap";
import { EASE, DUR } from "@/lib/motion/tokens";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesAccordion, setServicesAccordion] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const bar1Ref = useRef<HTMLElement>(null);
  const bar2Ref = useRef<HTMLElement>(null);
  const labelMenuRef = useRef<HTMLSpanElement>(null);
  const labelCloseRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const morphTlRef = useRef<gsap.core.Timeline | null>(null);

  const pathname = usePathname();
  const { stopScroll, startScroll } = useLenis();
  const lastScrollY = useRef(0);

  // Close menu and dropdown on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setServicesDropdown(false);
  }, [pathname]);

  // Scroll visibility (hides on scroll down, shows on scroll up)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrolledPast = currentY > 80;
      setScrolled(isScrolledPast);

      if (mobileMenuOpen) return; // Keep visible when menu is open

      if (currentY > 80 && currentY > lastScrollY.current + 5) {
        // Scrolling down -> hide header
        setHeaderVisible(false);
      } else if (currentY < lastScrollY.current - 5 || currentY <= 80) {
        // Scrolling up or near top -> show header
        setHeaderVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  // Animate header translateY
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      y: headerVisible ? 0 : -80,
      duration: DUR.base,
      ease: EASE.out,
    });
  }, [headerVisible]);

  // Two-stage morph timeline for hamburger button (Apple-style)
  useEffect(() => {
    if (!bar1Ref.current || !bar2Ref.current || !labelMenuRef.current || !labelCloseRef.current) return;

    const tl = gsap.timeline({ paused: true });
    // Stage 1: bars slide to centre line (y: ±4 to 0, 280ms)
    tl.to(bar1Ref.current, { y: 4, duration: 0.28, ease: EASE.out }, 0)
      .to(bar2Ref.current, { y: -4, duration: 0.28, ease: EASE.out }, 0)
      // Rolling label swap (Menu rolls up, Close rolls in)
      .to(labelMenuRef.current, { yPercent: -100, duration: 0.35, ease: EASE.out }, 0)
      .fromTo(labelCloseRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: EASE.out }, 0)
      // Stage 2: bars rotate to cross (rotate: 45 and -45, 420ms)
      .to(bar1Ref.current, { rotate: 45, duration: 0.42, ease: EASE.out }, 0.12)
      .to(bar2Ref.current, { rotate: -45, duration: 0.42, ease: EASE.out }, 0.12);

    morphTlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    stopScroll();
    document.body.style.overflow = "hidden";
    if (morphTlRef.current) {
      morphTlRef.current.timeScale(1).play();
    }
  };

  const closeMobileMenu = () => {
    if (morphTlRef.current) {
      morphTlRef.current.timeScale(1.4).reverse();
    }
    setMobileMenuOpen(false);
    startScroll();
    document.body.style.overflow = "";
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) closeMobileMenu();
        if (searchOpen) setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, searchOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0B1E36] border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ height: "72px" }}
      >
        <div className="site-container h-full flex items-center justify-between">
          {/* Logo Brand Lockup */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="w-9 h-9 rounded-[2px] bg-white p-1 flex items-center justify-center">
              <Image
                src="/favicon-32x32.png"
                alt="Meddy Oil & Gas Mark"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
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
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative py-6 group"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-body text-[14px] font-medium transition-colors ${
                        isActive ? "text-[#F69E28]" : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                          servicesDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Services Dropdown */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 w-80 bg-[#0B1E36] border border-white/[0.12] rounded-[2px] p-2 shadow-2xl animate-in fade-in duration-200">
                        <div className="text-[10px] font-mono font-bold tracking-widest text-[#F69E28] uppercase px-3 py-1.5 border-b border-white/[0.08]">
                          Capabilities
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {SERVICES_DATA.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors rounded-[2px]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[#F69E28] font-mono text-[11px]">
                                  {srv.number}
                                </span>
                                <span>{srv.title}</span>
                              </div>
                              <ArrowUpRight className="w-3 h-3 text-[#F69E28] opacity-60" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
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
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search site"
              className="w-9 h-9 rounded-[2px] bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Reference-accurate 2px radius CTA button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-[38px] px-5 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] text-[#0B1E36] font-body text-[13px] font-bold rounded-[2px] transition-all"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburger Button with Rolling Label & 2-stage morph */}
          <div className="flex items-center gap-2 lg:hidden z-50">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-8 h-8 rounded-[2px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white"
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
              className="flex items-center gap-2 min-h-[44px] min-w-[44px] px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#F69E28] focus:ring-offset-2 focus:ring-offset-[#0B1E36] rounded-[2px]"
            >
              {/* Bars container */}
              <span className="relative w-[22px] h-[16px] flex flex-col justify-between" aria-hidden="true">
                <i
                  ref={bar1Ref}
                  className="w-[22px] h-[2px] bg-white rounded-[1px] block transition-transform origin-center"
                />
                <i
                  ref={bar2Ref}
                  className="w-[22px] h-[2px] bg-white rounded-[1px] block transition-transform origin-center"
                />
              </span>

              {/* Rolling label */}
              <span className="hidden sm:inline-block relative h-[16px] overflow-hidden text-[13px] font-semibold tracking-wide" aria-hidden="true">
                <span ref={labelMenuRef} className="block leading-none">
                  Menu
                </span>
                <span ref={labelCloseRef} className="block leading-none absolute top-0 left-0">
                  Close
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel (Full viewport 100dvh, navy #0B1E36) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-40 bg-[#0B1E36] flex flex-col pt-20 px-6 pb-8 overflow-y-auto lg:hidden"
        >
          <div className="flex-1 space-y-1 py-4">
            {navLinks.map((link, idx) => {
              const num = `0${idx + 1}`;
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="border-b border-white/[0.08] py-3">
                    <button
                      onClick={() => setServicesAccordion(!servicesAccordion)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-sm text-[#F69E28] font-bold">
                          {num}
                        </span>
                        <span className="font-display text-3xl sm:text-4xl font-bold uppercase text-white group-hover:text-[#F69E28] transition-colors">
                          {link.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                          servicesAccordion ? "rotate-180 text-[#F69E28]" : ""
                        }`}
                      />
                    </button>

                    {servicesAccordion && (
                      <div className="pl-8 pt-3 pb-1 space-y-2">
                        {SERVICES_DATA.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            onClick={closeMobileMenu}
                            className="block text-sm font-medium text-white/70 hover:text-white py-1"
                          >
                            {srv.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={link.name} className="border-b border-white/[0.08] py-3">
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-baseline gap-3 group"
                  >
                    <span className="font-mono text-sm text-[#F69E28] font-bold">
                      {num}
                    </span>
                    <span
                      className={`font-display text-3xl sm:text-4xl font-bold uppercase transition-colors ${
                        isActive ? "text-[#F69E28]" : "text-white group-hover:text-[#F69E28]"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Clean Bottom Action: square 2px radius CTA button */}
          <div className="pt-4 border-t border-white/[0.08] space-y-3">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="w-full h-14 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-bold text-sm flex items-center justify-center rounded-[2px] transition-all"
            >
              Get In Touch
            </Link>
            <div className="text-xs text-white/60 text-center font-body">
              <a href={`mailto:${COMPANY_FACTS.email}`} className="hover:underline">
                {COMPANY_FACTS.email}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0B1E36] border border-white/[0.12] w-full max-w-lg rounded-[2px] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wider">
                Search Site
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="w-7 h-7 rounded-[2px] bg-white/[0.08] flex items-center justify-center text-white/60 hover:text-white"
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Search services, operations, or QHSE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white/[0.06] border border-white/[0.15] rounded-[2px] px-4 text-white text-sm placeholder-white/40 focus:border-[#F69E28] focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
