"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, Menu, X, ArrowRight, Settings } from "lucide-react";
import { SERVICES_DATA, COMPANY_FACTS } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-[#102A47]/95 backdrop-blur-md h-[72px] shadow-lg border-b border-white/10"
            : "bg-transparent h-[80px]"
        }`}
      >
        <div className="site-container h-full flex items-center justify-between">
          {/* Logo Brand Lockup */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[4px] bg-white p-1 flex items-center justify-center shadow-sm">
              <Image
                src="/favicon-32x32.png"
                alt="Meddy Oil & Gas Mark"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-2xl font-bold leading-none tracking-tight text-white group-hover:text-[#F69E28] transition-colors">
                MEDDY
              </span>
              <span className="font-body text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                OIL & GAS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-6"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-body text-[15px] font-medium transition-colors ${
                        isActive ? "text-[#F69E28]" : "text-white/90 hover:text-[#F69E28]"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 opacity-70 group-hover:translate-y-0.5 transition-transform" />
                    </Link>

                    {/* Dropdown Menu */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 w-80 bg-[#0B1E36] border border-white/10 rounded-[4px] p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="text-[11px] font-semibold tracking-wider text-[#F69E28] uppercase px-3 py-1.5 border-b border-white/10 mb-2">
                          Capabilities & Solutions
                        </div>
                        {SERVICES_DATA.map((srv) => (
                          <Link
                            key={srv.slug}
                            href={`/services/${srv.slug}`}
                            className="block px-3 py-2 rounded-[2px] text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <span className="text-[#F69E28] mr-2 text-xs font-mono">{srv.number}</span>
                            {srv.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 font-body text-[15px] font-medium transition-colors ${
                    isActive ? "text-[#F69E28]" : "text-white/90 hover:text-[#F69E28]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F69E28]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Icon Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search website"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#F69E28] hover:bg-white/5 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-[48px] px-6 bg-[#F69E28] hover:bg-[#E08518] active:scale-[0.98] text-[#0B1E36] font-body text-[15px] font-semibold rounded-[2px] transition-all shadow-sm"
            >
              <span>Get In Touch</span>
              <Settings className="w-4 h-4 opacity-75" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="p-2 text-white hover:text-[#F69E28]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B1E36] flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-[4px] bg-white p-1 flex items-center justify-center">
                <Image
                  src="/favicon-32x32.png"
                  alt="Meddy Oil & Gas Mark"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                MEDDY OIL & GAS
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-white hover:text-[#F69E28]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-xl font-display uppercase tracking-wide ${
                    pathname === link.href ? "text-[#F69E28]" : "text-white hover:text-[#F69E28]"
                  }`}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-white/10">
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

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="text-xs text-white/60">
              {COMPANY_FACTS.address}
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 bg-[#F69E28] text-[#0B1E36] font-semibold flex items-center justify-center rounded-[2px]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}

      {/* Simple Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#102A47] border border-white/20 w-full max-w-lg rounded-[4px] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                Site Search
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search services, operations, or policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B1E36] border border-white/20 px-4 py-3 text-white placeholder-white/40 rounded-[2px] focus:outline-none focus:border-[#F69E28]"
                autoFocus
              />
            </div>
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {searchQuery.trim().length > 0 &&
                SERVICES_DATA.filter((s) =>
                  s.title.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="block p-2 hover:bg-white/5 rounded text-white text-sm"
                  >
                    <span className="text-[#F69E28] mr-2">[{s.number}]</span>
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
