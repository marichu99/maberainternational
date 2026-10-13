"use client";

import { useSyncExternalStore } from "react";

let cachedNow = Date.now();

function subscribe(callback: () => void) {
  const interval = setInterval(() => {
    cachedNow = Date.now();
    callback();
  }, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return cachedNow;
}

function getServerSnapshot() {
  return null;
}

export function LiveClock() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
        Local time
      </h3>
      <p className="font-display mt-3 text-4xl text-bone tabular-nums">
        {now
          ? new Date(now).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "--:--:--"}
      </p>
    </div>
  );
}
