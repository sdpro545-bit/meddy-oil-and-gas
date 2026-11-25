"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en-NG">
      <body className="bg-[#0B1E36] text-white antialiased min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-xl">
          <span className="font-mono text-xs text-[#F69E28] uppercase tracking-widest block">
            MEDDY OIL &amp; GAS // RECOVERY
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Something Went Wrong
          </h1>
          <p className="text-base text-white/75 leading-relaxed">
            The page could not complete rendering. Please retry or return to the main site.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="h-12 px-6 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-semibold text-sm rounded-[2px] cursor-pointer"
            >
              Reload View
            </button>
            <Link
              href="/"
              className="inline-flex items-center h-12 px-6 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 font-semibold text-sm rounded-[2px]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
