declare global {
  interface Window {
    playerjs?: {
      Player: new (iframe: HTMLIFrameElement) => PlayerJsInstance;
    };
  }
}

export interface PlayerJsInstance {
  pause: () => void;
  on: (event: string, callback: () => void) => void;
}

// Bunny Stream's embed player implements the player.js protocol, letting a
// page on a different origin control playback (pause/play) via postMessage
// without needing direct access to the iframe's cross-origin document.
const SCRIPT_SRC = "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";

let loadPromise: Promise<boolean> | null = null;

export const loadPlayerJsScript = (): Promise<boolean> => {
  if (typeof window !== "undefined" && window.playerjs) return Promise.resolve(true);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return loadPromise;
};
