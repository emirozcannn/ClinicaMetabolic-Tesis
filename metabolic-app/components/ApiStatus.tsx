"use client";

import { useEffect, useState } from "react";

import { getHealth } from "@/lib/api";

type ApiStatusState = "checking" | "ready" | "unavailable";

export function ApiStatus() {
  const [state, setState] = useState<ApiStatusState>("checking");

  useEffect(() => {
    let active = true;
    const maxAttempts = 20;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const response = await getHealth();
        if (!active) {
          return;
        }
        if (response.status === "ok" && response.model_loaded) {
          setState("ready");
          return;
        }
      } catch {
        // ignore and retry
      }

      if (attempts >= maxAttempts) {
        setState("unavailable");
        return;
      }

      window.setTimeout(() => {
        void poll();
      }, 3000);
    };

    void poll();

    return () => {
      active = false;
    };
  }, []);

  if (state === "ready") {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`no-print border-b px-4 py-2 text-sm ${
        state === "checking"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-rose-200 bg-rose-50 text-rose-900"
      }`}
    >
      {state === "checking"
        ? "Backend is warming up... (this may take ~30 seconds on first visit)"
        : "Backend unavailable — please try again in a moment"}
    </div>
  );
}
