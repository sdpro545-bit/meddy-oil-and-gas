"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, Menu, X, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
    },
    { name: "Projects", href: "/projects" },
    { name: "QHSE", href: "/qhse" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-[#0B1E36]/90 backdrop-blur-xl h-[64px] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-[#0B1E36]/80 backdrop-blur-lg h-[70px] border-b border-white/[0.05]"
        }`}
      >
        <div className="site-container h-full flex items-center justify-between">
          {/* Logo Brand Lockup */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-white/95 p-1 flex items-center justify-center shadow-sm ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
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
              <span className="font-display text-xl font-bold leading-none tracking-tight text-white group-hover:text-[#F69E28] transition-colors">
                MEDDY
              </span>
              <span className="font-body text-[9px] font-semibold tracking-[0.18em] text-white/70 uppercase mt-0.5">
                OIL &amp; GAS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Apple UI refined style) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-5"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 font-body text-[14px] font-medium transition-all duration-200 ${
                        isActive
                          ? "text-[#F69E28]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform" />
                    </Link>

                    {/* Apple-style Translucent Dropped Card */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-88 bg-[#0B1E36]/95 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-[10px] font-mono font-bold tracking-widest text-[#F69E28] uppercase px-3 py-1.5 border-b border-white/[0.08] mb-1.5">
                          Capabilities &amp; Scope
                        </div>
                        <div className="space-y-0.5">
                          {SERVICES_DATA.map((srv) => (
                            <Link
                              key={srv.slug}
                              href={`/services/${srv.slug}`}
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-all group/item"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-[#F69E28] font-mono text-[11px] opacity-80">
                                  {srv.number}
                                </span>
                                <span>{srv.title}</span>
                              </div>
                              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 transition-all text-[#F69E28]" />
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
                  className={`relative py-1.5 font-body text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F69E28] rounded-full shadow-[0_0_8px_#F69E28]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search website"
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Apple-style Sleek Pill Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-[38px] px-5 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.97] text-[#0B1E36] font-body text-[13px] font-bold rounded-full transition-all shadow-[0_4px_16px_rgba(246,158,40,0.25)] hover:shadow-[0_6px_20px_rgba(246,158,40,0.4)]"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="p-1.5 text-white/90 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Apple-style sleek full-screen frosted glass) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B1E36]/95 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shadow-sm">
                <Image
                  src="/favicon-32x32.png"
                  alt="Meddy Oil & Gas Mark"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-wide">
                MEDDY OIL &amp; GAS
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-2xl font-display uppercase tracking-wide transition-colors ${
                    pathname === link.href ? "text-[#F69E28]" : "text-white hover:text-[#F69E28]"
                  }`}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-white/[0.08]">
                    {SERVICES_DATA.map((srv) => (
                      <Link
                        key={srv.slug}
                        href={`/services/${srv.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm text-white/70 hover:text-white py-1"
                      >
                        {srv.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Clean Bottom Action: Address & Phone removed per explicit user instruction */}
          <div className="pt-6 border-t border-white/[0.08]">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-bold text-sm flex items-center justify-center rounded-full transition-all shadow-md active:scale-95"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}

      {/* Simple Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B1E36]/95 border border-white/[0.12] w-full max-w-lg rounded-2xl p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wider">
                Search Site
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search capabilities, operations, or policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-white text-sm placeholder-white/40 rounded-xl focus:outline-none focus:border-[#F69E28] transition-colors"
                autoFocus
              />
            </div>
            <div className="mt-4 max-h-60 overflow-y-auto space-y-1">
              {searchQuery.trim().length > 0 &&
                SERVICES_DATA.filter((s) =>
                  s.title.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="block p-2.5 hover:bg-white/[0.06] rounded-lg text-white text-xs transition-colors"
                  >
                    <span className="text-[#F69E28] font-mono mr-2">[{s.number}]</span>
                    {s.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
