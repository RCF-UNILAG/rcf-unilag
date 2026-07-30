import type { ReactNode } from "react";

// A deliberately tiny markdown subset for the Tenures sheet's `Speech` column:
// blank-line-separated paragraphs, **bold**, *italic*/_italic_, and a
// blockquote block (every line starts with `>`) — which doubles as the pull
// quote, positioned wherever the writer places it in the speech.

export interface SpeechBlock {
  type: "paragraph" | "blockquote";
  text: string;
}

export function parseSpeechBlocks(speech: string): SpeechBlock[] {
  return speech
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim());
      const isBlockquote = lines.every((line) => line.startsWith(">"));

      if (isBlockquote) {
        return {
          type: "blockquote",
          text: lines.map((line) => line.replace(/^>\s?/, "")).join(" "),
        };
      }

      return { type: "paragraph", text: lines.join(" ") };
    });
}

// Renders bold ("**text**") and italic ("*text*" or "_text_") spans within a block of plain text.
export function renderSpeechInline(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g)
    .filter(Boolean)
    .map((token, i) => {
      const key = `${keyPrefix}-${i}`;
      if (token.startsWith("**") && token.endsWith("**")) {
        return <strong key={key}>{token.slice(2, -2)}</strong>;
      }
      if (
        (token.startsWith("*") && token.endsWith("*")) ||
        (token.startsWith("_") && token.endsWith("_"))
      ) {
        return <em key={key}>{token.slice(1, -1)}</em>;
      }
      return token;
    });
}
