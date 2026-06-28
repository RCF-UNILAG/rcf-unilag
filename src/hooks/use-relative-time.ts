import { useState, useEffect } from "react";

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // graceful fallback

  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffSec < 60)  return rtf.format(-diffSec, "second");
  if (diffMin < 60)  return rtf.format(-diffMin, "minute");
  if (diffHr  < 24)  return rtf.format(-diffHr,  "hour");
  if (diffDay < 30)  return rtf.format(-diffDay, "day");

  // Fall back to a readable absolute date for older entries
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Returns a live-updating relative time string ("3 seconds ago", "2 minutes ago", etc.)
 * for a given ISO date string. Updates every second while recent, every minute otherwise.
 */
export function useRelativeTime(dateStr: string): string {
  const [label, setLabel] = useState(() => getRelativeTime(dateStr));

  useEffect(() => {
    if (!dateStr) return;

    function update() {
      setLabel(getRelativeTime(dateStr));
    }

    // Tick every second for fresh updates; switch to every 60 s once > 1 min old
    const interval = setInterval(() => {
      const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
      if (diffSec >= 60) {
        clearInterval(interval);
        update();
        setInterval(update, 60_000); // coarser ticking from here on
      } else {
        update();
      }
    }, 1_000);

    return () => clearInterval(interval);
  }, [dateStr]);

  return label;
}
