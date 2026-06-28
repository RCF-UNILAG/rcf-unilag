"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      onClick={() => copy(value)}
      aria-label={copied ? "Copied!" : `Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-2 py-1 transition-all duration-200 select-none cursor-pointer",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        copied && "text-green-600 hover:text-green-600 hover:bg-green-50",
        className,
      )}
    >
      {copied ? (
        <>
          <Check size={12} className="shrink-0" />
          Copied!
        </>
      ) : (
        <>
          <Copy size={12} className="shrink-0" />
          Copy
        </>
      )}
    </button>
  );
}
