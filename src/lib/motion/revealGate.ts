type Gate = {
  isOpen: boolean;
  isQuick: boolean;
  open: (quick?: boolean) => void;
  close: () => void;
  ready: () => Promise<void>;
  setQuick: (quick: boolean) => void;
};

function create(): Gate {
  let resolve: () => void = () => {};
  let p = Promise.resolve();
  let failsafeTimer: ReturnType<typeof setTimeout> | null = null;

  const g: Gate = {
    isOpen: true,
    isQuick: false,
    setQuick(quick: boolean) {
      g.isQuick = quick;
    },
    open(quick?: boolean) {
      if (typeof quick === "boolean") g.isQuick = quick;
      if (failsafeTimer) {
        clearTimeout(failsafeTimer);
        failsafeTimer = null;
      }
      if (g.isOpen) return;
      g.isOpen = true;
      resolve();
    },
    close() {
      if (!g.isOpen) return;
      g.isOpen = false;
      p = new Promise<void>((r) => {
        resolve = r;
      });
      if (failsafeTimer) clearTimeout(failsafeTimer);
      failsafeTimer = setTimeout(() => {
        g.open();
      }, 5000);
    },
    ready() {
      return g.isOpen ? Promise.resolve() : p;
    },
  };
  return g;
}

export const revealGate: Gate = (globalThis.__revealGate ??= create());

// If the head script marked intro=play on initial load, close the gate immediately before components mount
if (typeof document !== "undefined") {
  const intro = document.documentElement.dataset.intro;
  const skipQuery = window.location.search.includes("skip_intro");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (intro === "play" && !skipQuery && !reduce) {
    revealGate.close();
  } else if (intro === "skip") {
    revealGate.setQuick(true);
  }
}
