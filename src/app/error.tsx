"use client";

import React, { useEffect } from "react";
import AppLink from "@/components/motion/AppLink";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught:", error);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    if (typeof window !== "undefined") {
      window.__lenis?.start?.();
    }
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0B1E36] text-white py-24">
      <div className="site-container text-center space-y-6 max-w-xl">
        <span className="font-mono text-xs text-[#F69E28] uppercase tracking-widest">
          CLIENT RECOVERY // DISPLAY INTERRUPTED
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold uppercase tracking-tight text-white">
          Unable to Load View
        </h1>
        <p className="font-body text-base text-white/75 max-w-md mx-auto leading-relaxed">
          A display error occurred while rendering this section. You can retry loading the page or return to the homepage.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-12 px-6 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-semibold text-sm rounded-[2px] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <AppLink
            href="/"
            className="inline-flex items-center gap-2 h-12 px-6 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 font-semibold text-sm rounded-[2px] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </AppLink>
        </div>
      </div>
    </div>
  );
}
