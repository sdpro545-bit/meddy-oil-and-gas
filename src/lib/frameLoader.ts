import manifest from "@/lib/frames-manifest.json";

export type DecodedFrame = ImageBitmap | HTMLImageElement;

export const FRAME_COUNT = manifest.frameCount;
export const INITIAL_PRELOAD_COUNT = Math.min(10, FRAME_COUNT);

function padFrame(index: number): string {
  return String(index + 1).padStart(4, "0");
}

function getFrameUrl(index: number, isMobile: boolean): string {
  const dir = isMobile ? "/frames-sm" : "/frames";
  return `${dir}/frame_${padFrame(index)}.webp`;
}

async function decodeFrame(url: string): Promise<DecodedFrame | null> {
  try {
    if (typeof createImageBitmap === "function") {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      return await createImageBitmap(blob);
    }
  } catch {
    // Fallback to HTMLImageElement.decode()
  }

  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.src = url;
    const done = () => resolve(img.naturalWidth > 0 ? img : null);
    if (typeof img.decode === "function") {
      img.decode().then(done).catch(done);
    } else {
      img.onload = done;
      img.onerror = () => resolve(null);
    }
  });
}

class FrameStore {
  private frames: Array<DecodedFrame | null> = new Array(FRAME_COUNT).fill(null);
  private started = false;
  private isMobile = false;
  private initialPromise: Promise<void> | null = null;
  private onFrameReadyCallbacks = new Set<() => void>();

  start(isMobile: boolean, onInitialProgress?: (pct: number) => void): Promise<void> {
    if (typeof window === "undefined") return Promise.resolve();
    if (this.started && this.initialPromise) {
      return this.initialPromise;
    }

    this.started = true;
    this.isMobile = isMobile;

    this.initialPromise = (async () => {
      let loadedInitial = 0;
      const initialTasks = Array.from({ length: INITIAL_PRELOAD_COUNT }, (_, i) =>
        decodeFrame(getFrameUrl(i, this.isMobile)).then((frame) => {
          this.frames[i] = frame;
          loadedInitial += 1;
          onInitialProgress?.(Math.round((loadedInitial / INITIAL_PRELOAD_COUNT) * 100));
          this.notify();
        })
      );

      await Promise.all(initialTasks);

      // Continue loading remaining frames in the background with bounded concurrency
      this.loadRemainingInBackground();
    })();

    return this.initialPromise;
  }

  private async loadRemainingInBackground() {
    const concurrency = 6;
    let nextIdx = INITIAL_PRELOAD_COUNT;

    const worker = async () => {
      while (nextIdx < FRAME_COUNT) {
        const idx = nextIdx++;
        if (this.frames[idx]) continue;
        const frame = await decodeFrame(getFrameUrl(idx, this.isMobile));
        this.frames[idx] = frame;
        this.notify();
      }
    };

    await Promise.all(Array.from({ length: concurrency }, () => worker()));
  }

  getFrame(index: number): DecodedFrame | null {
    const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, index));
    if (this.frames[clamped]) return this.frames[clamped];

    // Nearest loaded fallback so scrubbing never flashes blank
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (clamped - offset >= 0 && this.frames[clamped - offset]) {
        return this.frames[clamped - offset];
      }
      if (clamped + offset < FRAME_COUNT && this.frames[clamped + offset]) {
        return this.frames[clamped + offset];
      }
    }
    return null;
  }

  subscribe(cb: () => void): () => void {
    this.onFrameReadyCallbacks.add(cb);
    return () => {
      this.onFrameReadyCallbacks.delete(cb);
    };
  }

  private notify() {
    this.onFrameReadyCallbacks.forEach((cb) => cb());
  }
}

export const frameStore = new FrameStore();
