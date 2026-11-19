export type StartMode = "normal" | "strict" | "nta";

export const START_MODE_CONFIG: Record<StartMode, { label: string; description: string }> = {
  normal: {
    label: "Normal Mode",
    description: "Regular exam experience. The test always starts in fullscreen.",
  },
  strict: {
    label: "Strict Mode (Recommended)",
    description:
      "The test starts in Fullscreen. Every tab switch, window switch or minimise counts as one violation — after 3 violations your test is submitted automatically.",
  },
  nta: {
    label: "NTA-Style CBT Mode",
    description: "Experience a JEE Main-style computer-based examination interface in fullscreen.",
  },
};

export interface StartModeDecision {
  ok: boolean;
  error?: string;
}

export interface StartModePreparationOptions {
  fullscreenSupported: boolean;
  isFullscreen: boolean;
  requestFullscreen: () => Promise<boolean>;
}

export function resolveStartMode(
  _mode: StartMode,
  env: { fullscreenSupported: boolean; isFullscreen: boolean },
): StartModeDecision {
  if (!env.fullscreenSupported) {
    return { ok: false, error: "Fullscreen is not supported in this browser." };
  }
  return { ok: true };
}

async function waitForFullscreenActivation(): Promise<boolean> {
  if (typeof document === "undefined") return true;
  if (document.fullscreenElement) return true;

  return await new Promise<boolean>((resolve) => {
    const cleanup = () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.clearTimeout(timeoutId);
    };

    const onFullscreenChange = () => {
      if (document.fullscreenElement) {
        cleanup();
        resolve(true);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    const timeoutId = window.setTimeout(() => {
      cleanup();
      resolve(false);
    }, 1500);
  });
}

export async function prepareStartMode(
  mode: StartMode,
  env: StartModePreparationOptions,
): Promise<StartModeDecision> {
  const decision = resolveStartMode(mode, {
    fullscreenSupported: env.fullscreenSupported,
    isFullscreen: env.isFullscreen,
  });
  if (!decision.ok) return decision;

  if (!env.fullscreenSupported) {
    return { ok: false, error: "Fullscreen is not supported in this browser." };
  }

  if (env.isFullscreen) return { ok: true };

  const entered = await env.requestFullscreen();
  if (!entered) {
    return {
      ok: false,
      error: "Fullscreen permission was denied. Please allow fullscreen to start the test.",
    };
  }

  const activated = await waitForFullscreenActivation();
  if (!activated) {
    return {
      ok: false,
      error: "Fullscreen could not be activated. Please allow fullscreen to start the test.",
    };
  }

  return { ok: true };
}
