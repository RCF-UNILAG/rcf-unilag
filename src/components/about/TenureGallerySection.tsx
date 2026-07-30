"use client";

import * as React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface TenureGallerySectionProps {
  images: string[];
}

export function TenureGallerySection({ images }: TenureGallerySectionProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="bg-background">
      <div className="section">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Gallery
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter text-foreground">
            Moments from the Season
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, i) => (
            <button
              key={`${imageUrl}-${i}`}
              type="button"
              onClick={() => setSelected(imageUrl)}
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={imageUrl}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[90vw] border-none bg-transparent p-0 shadow-none sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">Gallery image</DialogTitle>
          {selected && (
            <div className="relative h-[80vh] w-full">
              <Image
                src={selected}
                alt="Gallery image, full size"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          )}
          <DialogClose className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}
