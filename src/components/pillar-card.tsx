import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LongSwiggleUnderline, ShortSwiggleUnderline } from "./icons";

export type PillarCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  orientation?: "image-left" | "image-right";
};

export function PillarCard({
  eyebrow = "We are a people of",
  title,
  description,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  orientation = "image-left",
}: PillarCardProps) {
  const imageLeft = orientation === "image-left";

  return (
    <div className="relative flex flex-col gap-2">
      <div className={cn("md:absolute md:top-0 md:left-0 w-full h-[480px] flex items-center", imageLeft ? "justify-start" : "justify-end")}>
        <div
          className="relative w-full md:w-1/2 shrink-0 h-full rounded-xl overflow-hidden"
        >
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div
        className={cn("relative flex md:min-h-[480px] items-center w-full z-1", imageLeft ? "md:justify-end" : "md:justify-start")}
      >
        <div className={cn("w-full md:w-[calc(50%+4rem)] bg-card p-10 xl:p-12 flex flex-col gap-4 rounded-xl shadow-sm")}>
          {eyebrow && (
            <p className="text-sm font-semibold">
              {eyebrow}
            </p>
          )}

          <div>
            <h3
              className="relative inline uppercase font-display text-primary font-semibold text-4xl xl:text-5xl tracking-tighter leading-none"
            >
              {title}
              <span className="absolute inset-x-0 -bottom-1">
                {title.length > 7 ? <LongSwiggleUnderline className="w-full" /> : <ShortSwiggleUnderline className="w-full" />}
              </span>
            </h3>
          </div>

          <p className="leading-relaxed text-foreground/80 max-w-prose">
            {description}
          </p>

          {ctaLabel && ctaHref && (
            <div className="mt-2">
              <Button asChild variant="black" className="rounded-full">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
