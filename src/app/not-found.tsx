import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0B1E36] text-white py-24">
      <div className="site-container text-center space-y-6 max-w-xl">
        <span className="font-mono text-xs text-[#F69E28] uppercase tracking-widest">
          ERROR 404 // RESOURCE NOT FOUND
        </span>
        <h1 className="font-display text-6xl sm:text-7xl font-bold uppercase tracking-tight text-white">
          Coordinates Unavailable
        </h1>
        <p className="font-body text-base text-white/70 max-w-md mx-auto leading-relaxed">
          The requested page or operational record cannot be located on the Meddy Oil &amp; Gas network.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-6 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-semibold text-sm rounded-[2px] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
