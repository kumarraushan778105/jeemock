import assert from "node:assert/strict";
import test from "node:test";
import { prepareStartMode, resolveStartMode } from "./start-mode.ts";

test("every mode fails when fullscreen is unavailable", () => {
  for (const mode of ["normal", "strict", "nta"] as const) {
    assert.deepEqual(resolveStartMode(mode, { fullscreenSupported: false, isFullscreen: false }), {
      ok: false,
      error: "Fullscreen is not supported in this browser.",
    });
  }
});

test("every mode succeeds once fullscreen is active", () => {
  for (const mode of ["normal", "strict", "nta"] as const) {
    assert.deepEqual(resolveStartMode(mode, { fullscreenSupported: true, isFullscreen: true }), {
      ok: true,
    });
  }
});

test("NTA mode requests fullscreen before launching", async () => {
  let requested = false;
  const result = await prepareStartMode("nta", {
    fullscreenSupported: true,
    isFullscreen: false,
    requestFullscreen: async () => {
      requested = true;
      return true;
    },
  });

  assert.equal(result.ok, true);
  assert.equal(requested, true);
});

test("prepareStartMode requests fullscreen for normal mode before launching", async () => {
  let requested = false;
  const result = await prepareStartMode("normal", {
    fullscreenSupported: true,
    isFullscreen: false,
    requestFullscreen: async () => {
      requested = true;
      return true;
    },
  });

  assert.equal(result.ok, true);
  assert.equal(requested, true);
});
