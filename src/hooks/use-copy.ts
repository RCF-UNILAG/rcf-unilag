import { useState, useCallback } from "react";

interface UseCopyOptions {
  /** How long (ms) the copied state stays active. Default: 2000 */
  timeout?: number;
}

interface UseCopyReturn {
  copied: boolean;
  copy: (value: string) => Promise<void>;
}

export function useCopy({ timeout = 2000 }: UseCopyOptions = {}): UseCopyReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (value: string) => {
      if (copied) return;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Fallback for older browsers / non-secure contexts
        const el = document.createElement("textarea");
        el.value = value;
        el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    },
    [copied, timeout],
  );

  return { copied, copy };
}
