"use client";

import React from "react";
import AppLink from "@/components/motion/AppLink";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  showArrow = true,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center gap-3 h-13 px-7 text-sm font-bold uppercase tracking-wider rounded-[2px] transition-colors duration-200 select-none overflow-hidden active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] focus-visible:ring-2 focus-visible:ring-[#F69E28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E36]",
    secondary:
      "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 hover:border-white/40 focus-visible:ring-2 focus-visible:ring-white",
    dark:
      "bg-[#0B1E36] hover:bg-[#102A47] text-white border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-[#F69E28]",
  };

  const content = (
    <>
      {/* Rolling Label Container */}
      <span className="relative inline-block overflow-hidden h-[1.2em] leading-tight">
        <span
          className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-current"
        >
          {children}
        </span>
      </span>

      {showArrow && (
        <span className="relative w-4 h-4 overflow-hidden inline-flex items-center justify-center flex-shrink-0">
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5"
          />
          <ArrowRight
            aria-hidden="true"
            className="w-4 h-4 absolute transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-5 group-hover:translate-x-0"
          />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <AppLink
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </AppLink>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
