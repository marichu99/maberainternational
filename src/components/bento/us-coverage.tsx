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

const ZONES: { label: string; timeZone: string }[] = [
  { label: "ET", timeZone: "America/New_York" },
  { label: "CT", timeZone: "America/Chicago" },
  { label: "MT", timeZone: "America/Denver" },
  { label: "PT", timeZone: "America/Los_Angeles" },
];

export function UsCoverage() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
        U.S. coverage
      </h3>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {ZONES.map((zone) => (
          <li key={zone.label} className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-stone">{zone.label}</span>
            <span className="font-display text-xl text-bone tabular-nums">
              {now
                ? new Date(now).toLocaleTimeString("en-US", {
                    timeZone: zone.timeZone,
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
