"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TenureCarouselSlide {
  type: "president" | "banner-image" | "banner-text";
  photoUrl?: string;
  name?: string;
  role?: string;
  theme?: string;
  year?: string;
  imageUrl?: string;
}

interface TenureCarouselProps {
  slides: TenureCarouselSlide[];
}

export function TenureCarousel({ slides }: TenureCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="flex flex-col gap-3">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              {slide.type === "president" && (
                <div className="relative aspect-[3/4] w-full bg-muted/10 rounded-sm overflow-hidden">
                  {/* Role badge */}
                  <div className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-widest px-3 py-1.5">
                    {slide.role ?? "President"}
                  </div>

                  {slide.photoUrl ? (
                    <Image
                      src={slide.photoUrl}
                      alt={slide.name ?? "President"}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-20 h-20 text-background/10"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="32"
                          cy="22"
                          r="12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Name caption */}
                  {slide.name && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-sm font-semibold text-white leading-snug">
                        {slide.name}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {slide.type === "banner-image" && slide.imageUrl && (
                <div className="relative aspect-[3/4] w-full bg-muted/10 rounded-sm overflow-hidden">
                  <Image
                    src={slide.imageUrl}
                    alt="Tenure banner"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}

              {slide.type === "banner-text" && (
                <div className="aspect-[3/4] w-full border border-background/10 bg-background/5 rounded-sm flex flex-col items-center justify-center text-center gap-4 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                    Doxa 45
                  </p>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-background leading-none">
                    Phaneros Doxa
                  </h3>
                  <p className="font-display italic text-base text-background/50">
                    {slide.theme}
                  </p>
                  <span
                    className="block h-px w-10 bg-secondary"
                    aria-hidden="true"
                  />
                  {slide.year && (
                    <p className="text-xs text-background/30 uppercase tracking-widest font-medium mt-2">
                      {slide.year}
                    </p>
                  )}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5" aria-hidden="true">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              current === i
                ? "w-6 bg-secondary"
                : "w-1.5 bg-background/20 hover:bg-background/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
