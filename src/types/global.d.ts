import type Lenis from "lenis";

export interface RevealGateHandle {
  isOpen: boolean;
  isQuick: boolean;
  open: (quick?: boolean) => void;
  close: () => void;
  ready: () => Promise<void>;
  setQuick: (quick: boolean) => void;
}

export interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

declare global {
  interface Window {
    __lenis?: Lenis | null;
    __motionStats?: () => { triggers: number; tweens: number };
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  }

  interface Navigator {
    connection?: NetworkInformationLike;
  }

  var __revealGate: RevealGateHandle | undefined;
}
