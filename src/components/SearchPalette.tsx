"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import gsap from "gsap";
import { SERVICES_DATA } from "@/lib/data";
import type { SearchDoc, SearchGroup } from "@/lib/pages-index";
import { useLenis } from "@/components/motion/MotionProvider";
import { useTransitionRouter } from "@/components/motion/PageTransition";
import { EASE } from "@/lib/motion/tokens";

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

const POPULAR_ITEMS: SearchDoc[] = [
  ...SERVICES_DATA.map((srv) => ({
    id: `popular-${srv.slug}`,
    group: "Services" as const,
    title: srv.title,
    url: `/services/${srv.slug}`,
    summary: srv.shortSummary,
    keywords: "",
    body: "",
  })),
  {
    id: "popular-contact",
    group: "Pages" as const,
    title: "Contact & Office Location",
    url: "/contact",
    summary: "Plot 3, Block 109, Victoria Arobieke Street, Lekki Phase 1, Lagos, Nigeria.",
    keywords: "",
    body: "",
  },
];

const GROUP_ORDER: SearchGroup[] = ["Services", "Pages", "Safety and Quality"];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const tokens = useMemo(
    () =>
      query
        .trim()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2),
    [query]
  );

  if (!tokens.length) return <>{text}</>;

  const pattern = new RegExp(`(${tokens.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <mark
            key={`${part}-${idx}`}
            className="bg-[#F69E28]/25 text-[#F69E28] px-0.5 rounded-[1px]"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={`${part}-${idx}`}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default function SearchPalette({
  open,
  onClose,
  returnFocusRef,
}: SearchPaletteProps) {
  const [rendered, setRendered] = useState(open);
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [miniSearch, setMiniSearch] = useState<{
    search: (q: string) => Array<SearchDoc & { score: number }>;
  } | null>(null);
  const [indexLoading, setIndexLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const skipFocusRestoreRef = useRef(false);

  const pathname = usePathname();
  const { stopScroll, startScroll } = useLenis();
  const { navigate } = useTransitionRouter();

  // Lazy-load minisearch + JSON index strictly on first open
  useEffect(() => {
    if (!open || miniSearch) return;

    let cancelled = false;
    setIndexLoading(true);

    Promise.all([import("minisearch"), import("@/lib/search-index.json")])
      .then(([miniMod, docsMod]) => {
        if (cancelled) return;
        const MiniSearch = miniMod.default;
        const docs = docsMod.default as SearchDoc[];

        const ms = new MiniSearch<SearchDoc>({
          fields: ["title", "keywords", "summary", "body"],
          storeFields: ["id", "group", "title", "url", "summary"],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: { title: 5, keywords: 3, summary: 2, body: 1 },
          },
        });
        ms.addAll(docs);

        setMiniSearch(
          ms as unknown as {
            search: (q: string) => Array<SearchDoc & { score: number }>;
          }
        );
        setIndexLoading(false);
      })
      .catch(() => {
        if (!cancelled) setIndexLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, miniSearch]);

  // 120ms search debounce (instant reset when cleared)
  useEffect(() => {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      setDebouncedQuery("");
      setActiveIdx(0);
      return;
    }
    const timer = window.setTimeout(() => {
      setDebouncedQuery(trimmed);
      setActiveIdx(0);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [rawQuery]);

  // Compute results & sections
  const { sections, flatItems } = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      return {
        sections: [{ group: "Popular" as const, items: POPULAR_ITEMS }],
        flatItems: POPULAR_ITEMS,
      };
    }

    if (!miniSearch) {
      return { sections: [], flatItems: [] as SearchDoc[] };
    }

    const hits = miniSearch.search(q).slice(0, 8);
    const byGroup = new Map<SearchGroup, SearchDoc[]>();
    for (const grp of GROUP_ORDER) byGroup.set(grp, []);

    for (const hit of hits) {
      const bucket = byGroup.get(hit.group) ?? byGroup.get("Pages")!;
      bucket.push({
        id: hit.id,
        group: hit.group,
        title: hit.title,
        url: hit.url,
        summary: hit.summary,
        keywords: "",
        body: "",
      });
    }

    const builtSections: Array<{ group: SearchGroup; items: SearchDoc[] }> = [];
    const orderedFlat: SearchDoc[] = [];

    for (const grp of GROUP_ORDER) {
      const grpItems = byGroup.get(grp) || [];
      if (grpItems.length > 0) {
        builtSections.push({ group: grp, items: grpItems });
        orderedFlat.push(...grpItems);
      }
    }

    return { sections: builtSections, flatItems: orderedFlat };
  }, [debouncedQuery, miniSearch]);

  // Clamp activeIdx when result list changes
  useEffect(() => {
    if (flatItems.length === 0) {
      setActiveIdx(-1);
    } else if (activeIdx < 0 || activeIdx >= flatItems.length) {
      setActiveIdx(0);
    }
  }, [flatItems.length, activeIdx]);

  // Helper to toggle background inert & scroll lock cleanly
  const setPageLock = useCallback(
    (locked: boolean) => {
      if (typeof document === "undefined") return;
      if (locked) {
        stopScroll();
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        startScroll();
      }
      const targets = document.querySelectorAll("main, footer");
      targets.forEach((el) => {
        if (locked) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
    },
    [startScroll, stopScroll]
  );

  // Open / close lifecycle with GSAP motion (280ms open / 30ms item stagger / 160ms close)
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      skipFocusRestoreRef.current = false;
      setRendered(true);
      setPageLock(true);

      const frame = window.requestAnimationFrame(() => {
        inputRef.current?.focus();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const backdrop = backdropRef.current;
        const dialog = dialogRef.current;

        if (!backdrop || !dialog) return;

        gsap.killTweensOf([backdrop, dialog]);
        if (reduce) {
          gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "none" });
          gsap.set(dialog, { opacity: 1, y: 0, clearProps: "transform" });
          return;
        }

        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.24, ease: EASE.out });
        gsap.fromTo(
          dialog,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.28, ease: EASE.out, clearProps: "transform" }
        );

        const rows = listRef.current?.querySelectorAll("[data-search-item]") ?? [];
        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.22, stagger: 0.03, ease: EASE.out, clearProps: "transform" }
          );
        }
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      setPageLock(false);

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const backdrop = backdropRef.current;
      const dialog = dialogRef.current;

      const finishClose = () => {
        setRendered(false);
        setRawQuery("");
        setDebouncedQuery("");
        setActiveIdx(0);
        if (!skipFocusRestoreRef.current) {
          window.requestAnimationFrame(() => {
            returnFocusRef?.current?.focus();
          });
        }
      };

      if (skipFocusRestoreRef.current || reduce || !backdrop || !dialog) {
        finishClose();
        return;
      }

      gsap.killTweensOf([backdrop, dialog]);
      gsap.to(dialog, { opacity: 0, y: 8, duration: 0.16, ease: EASE.out });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.16,
        ease: EASE.out,
        onComplete: finishClose,
      });
    }
  }, [open, returnFocusRef, setPageLock]);

  // Safety unlock if unmounted while open
  useEffect(() => {
    return () => {
      if (wasOpenRef.current) setPageLock(false);
    };
  }, [setPageLock]);

  const handleSelectUrl = useCallback(
    (url: string) => {
      skipFocusRestoreRef.current = true;
      setPageLock(false);
      setRendered(false);
      setRawQuery("");
      setDebouncedQuery("");
      onClose();

      const parsed = new URL(url, window.location.origin);
      if (parsed.pathname === pathname && parsed.hash) {
        window.setTimeout(() => {
          (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } })
            .__lenis?.scrollTo(parsed.hash, { offset: -80 });
        }, 40);
        return;
      }
      navigate(url);
    },
    [navigate, onClose, pathname, setPageLock]
  );

  // Scroll selected keyboard option into view
  useEffect(() => {
    if (activeIdx < 0) return;
    const el = document.getElementById(`search-option-${activeIdx}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  // Keyboard navigation + focus trap inside dialog
  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setActiveIdx((prev) => (prev + 1) % flatItems.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setActiveIdx((prev) => (prev <= 0 ? flatItems.length - 1 : prev - 1));
      return;
    }

    if (e.key === "Home") {
      if (flatItems.length > 0 && document.activeElement !== inputRef.current) {
        e.preventDefault();
        setActiveIdx(0);
      }
      return;
    }

    if (e.key === "End") {
      if (flatItems.length > 0 && document.activeElement !== inputRef.current) {
        e.preventDefault();
        setActiveIdx(flatItems.length - 1);
      }
      return;
    }

    if (e.key === "Enter" && activeIdx >= 0 && flatItems[activeIdx]) {
      const target = document.activeElement as HTMLElement | null;
      if (target?.dataset.searchDirectAction === "true") return;
      e.preventDefault();
      handleSelectUrl(flatItems[activeIdx].url);
      return;
    }

    if (e.key === "Tab" && dialogRef.current) {
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

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

  if (!rendered) return null;

  const isSearching = debouncedQuery.trim().length > 0;
  const activeOptionId =
    activeIdx >= 0 && flatItems[activeIdx] ? `search-option-${activeIdx}` : undefined;

  const liveAnnouncement = indexLoading
    ? "Loading search index"
    : !isSearching
      ? "Showing popular services and contact link"
      : flatItems.length === 0
        ? `No results found for ${debouncedQuery}`
        : `${flatItems.length} result${flatItems.length === 1 ? "" : "s"} available for ${debouncedQuery}`;

  let runningIndex = -1;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      onKeyDown={handleDialogKeyDown}
      className="fixed inset-0 z-[60] bg-[#061221]/80 backdrop-blur-[2px] flex items-start justify-center sm:pt-[12vh] sm:px-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search site"
        className="w-full h-full sm:h-auto sm:max-h-[76vh] sm:max-w-[640px] bg-[#0B1E36] border-0 sm:border sm:border-white/[0.14] rounded-none sm:rounded-[2px] flex flex-col overflow-hidden"
      >
        {/* Top Input Row (56px height, 16px text for iOS zoom safety) */}
        <div className="flex items-center gap-3 h-[56px] px-4 border-b border-white/[0.1] shrink-0">
          <Search className="w-4 h-4 text-[#F69E28] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results-listbox"
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-label="Search services, operations, safety, or pages"
            inputMode="search"
            enterKeyHint="search"
            autoFocus
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search wireline, testing, FPSO, QHSE, or contact..."
            className="flex-1 h-full bg-transparent text-white text-[16px] placeholder-white/40 focus:outline-none"
          />

          {rawQuery.length > 0 && (
            <button
              type="button"
              data-search-direct-action="true"
              onClick={() => {
                setRawQuery("");
                setDebouncedQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search query"
              className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-white/60 hover:text-white border border-white/[0.12] rounded-[2px] cursor-pointer"
            >
              Clear
            </button>
          )}

          <button
            type="button"
            data-search-direct-action="true"
            onClick={onClose}
            aria-label="Close search"
            className="w-8 h-8 rounded-[2px] bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen-reader live result announcer */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
        </div>

        {/* Results / Empty / No-Results Container */}
        <div
          ref={listRef}
          id="search-results-listbox"
          role="listbox"
          aria-label="Search results"
          className="flex-1 overflow-y-auto px-3 py-3 space-y-5"
        >
          {indexLoading && isSearching && (
            <div className="px-3 py-6 text-xs font-mono text-white/50">
              Loading search index...
            </div>
          )}

          {!indexLoading && isSearching && flatItems.length === 0 ? (
            <div className="px-3 py-8 text-center space-y-5">
              <div className="space-y-1.5">
                <p className="font-display text-lg font-bold uppercase text-white">
                  No matches for &ldquo;{debouncedQuery}&rdquo;
                </p>
                <p className="font-body text-xs text-white/60">
                  Try another capability keyword or reach our team directly.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {["wireline", "well testing", "FPSO", "safety", "careers"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    data-search-direct-action="true"
                    onClick={() => {
                      setRawQuery(term);
                      setDebouncedQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-[2px] text-xs font-mono text-white/80 hover:text-[#F69E28] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  data-search-direct-action="true"
                  onClick={() => handleSelectUrl("/contact")}
                  className="inline-flex items-center gap-2 h-10 px-5 bg-[#F69E28] hover:bg-[#E08518] text-[#0B1E36] font-body text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
                >
                  <span>Go to Contact Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            sections.map((section) => (
              <div key={section.group} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#F69E28]">
                  {section.group}
                </div>

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const selected = idx === activeIdx;

                    return (
                      <button
                        key={item.id}
                        id={`search-option-${idx}`}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        data-search-item=""
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => handleSelectUrl(item.url)}
                        className={`w-full text-left px-3 py-2.5 rounded-[2px] flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                          selected
                            ? "bg-white/[0.09] border-l-2 border-[#F69E28]"
                            : "hover:bg-white/[0.05] border-l-2 border-transparent"
                        }`}
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-body text-sm font-semibold text-white">
                              <HighlightText text={item.title} query={debouncedQuery} />
                            </span>
                            <span className="font-mono text-[10px] text-white/45 truncate">
                              {item.url}
                            </span>
                          </div>
                          <p className="font-body text-xs text-white/65 line-clamp-1">
                            <HighlightText text={item.summary} query={debouncedQuery} />
                          </p>
                        </div>

                        <ArrowUpRight
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            selected ? "text-[#F69E28]" : "text-white/30"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer keyboard hints */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-[#081629] text-[11px] font-mono text-white/45 shrink-0">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span>Ctrl+K / /</span>
        </div>
      </div>
    </div>
  );
}
