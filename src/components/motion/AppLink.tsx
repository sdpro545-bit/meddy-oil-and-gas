"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "@/components/motion/PageTransition";

export default function AppLink({
  href,
  onClick,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const { navigate } = useTransitionRouter();
  const pathname = usePathname();
  const h = String(href);

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        const external = /^(https?:|mailto:|tel:)/.test(h);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          external
        ) {
          return;
        }
        const url = new URL(h, window.location.origin);
        if (url.pathname === pathname) {
          if (url.hash) {
            e.preventDefault();
            window.__lenis?.scrollTo(url.hash, { offset: -80 });
          }
          return;
        }
        e.preventDefault();
        navigate(h);
      }}
    />
  );
}
