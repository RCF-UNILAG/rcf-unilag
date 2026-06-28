"use client";

import { useRelativeTime } from "@/hooks/use-relative-time";

export function RelativeTime({ dateStr, className }: { dateStr: string; className?: string }) {
  const label = useRelativeTime(dateStr);
  return (
    <time dateTime={dateStr} className={className} title={new Date(dateStr).toLocaleString("en-NG")}>
      {label}
    </time>
  );
}
