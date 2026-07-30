import type { Tenure } from "@/lib/archive";
import { TenureCarousel } from "./TenureCarousel";
import { cn } from "@/lib/utils";
import { parseSpeechBlocks, renderSpeechInline } from "@/lib/speech-markdown";

interface TenureStorySectionProps {
  tenure: Tenure;
  className?: string;
}

export function TenureStorySection({ tenure, className }: TenureStorySectionProps) {
  const president = tenure.executives.find(
    (e) => e.role.toLowerCase() === "president",
  ) ?? tenure.executives[0];

  // Fall back to the tenure description when no presidential speech was recorded
  // (e.g. older tenures added before this field existed), so the copy column
  // never sits empty.
  const bodyText = tenure.speech.trim() || tenure.description.trim();
  const blocks = parseSpeechBlocks(bodyText);
  const hasBody = blocks.length > 0;

  return (
    <section className={cn("bg-foreground", className)}>
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ── Left column — copy ───────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                The Tenure
              </span>
            </div>

            {/* Heading + subtitle */}
            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none text-background">
                {tenure.name || tenure.theme}
              </h2>
              {tenure.name && (
                <p className="font-display italic text-lg text-background/50">
                  {tenure.theme}
                </p>
              )}
            </div>

            {hasBody && <div className="border-t border-background/10" />}

            {/* Body copy — paragraphs and blockquotes (the pull quote), in the order they appear in the speech. */}
            {blocks.length > 0 && (
              <div className="flex flex-col gap-5">
                {blocks.map((block, i) =>
                  block.type === "blockquote" ? (
                    <blockquote key={i} className="border-l-4 border-secondary pl-5 py-1">
                      <p className="italic text-background/80 leading-relaxed text-sm">
                        &ldquo;{renderSpeechInline(block.text, `bq-${i}`)}&rdquo;
                      </p>
                    </blockquote>
                  ) : (
                    <p key={i} className="text-sm text-background/60 leading-relaxed">
                      {renderSpeechInline(block.text, `p-${i}`)}
                    </p>
                  ),
                )}
              </div>
            )}

            {/* Divider + sign-off */}
            {president && (
              <div className="flex flex-col gap-4">
                <div className="border-t border-background/10" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-background/80">
                    {president.name}
                  </p>
                  <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
                    {president.role}, RCF UNILAG · {tenure.period}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right column — carousel ──────────────────────────────────── */}
          <TenureCarousel
            slides={[
              // Slide 1: President portrait
              {
                type: "badged-image",
                photoUrl: president?.photoUrl,
                name: president?.name,
                role: president?.role,
              },
              // Slide 2: Tenure banner image (only when one is set)
              ...(tenure.bannerUrl
                ? [
                  {
                    type: "banner-image" as const,
                    imageUrl: tenure.bannerUrl,
                  },
                ]
                : []),
              // Additional gallery images, sheet-driven
              ...tenure.galleryUrls.map((imageUrl) => ({
                type: "banner-image" as const,
                imageUrl,
              })),
            ]}
          />
        </div>
      </div>
    </section>
  );
}
