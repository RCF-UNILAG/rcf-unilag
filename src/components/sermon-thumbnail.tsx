"use client";

import { useState } from "react";
import Image from "next/image";
import { getYouTubeVideoId } from "@/lib/sermons";

interface SermonThumbnailProps {
  youtubeUrl: string;
  title: string;
}

export function SermonThumbnail({ youtubeUrl, title }: SermonThumbnailProps) {
  const videoId = getYouTubeVideoId(youtubeUrl);

  const sources = videoId
    ? [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        "/default-sermon.jpg",
      ]
    : ["/default-sermon.jpg"];

  const [srcIndex, setSrcIndex] = useState(0);

  return (
    <Image
      src={sources[srcIndex]}
      alt={title}
      fill
      className="object-cover transition-transform duration-300 hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setSrcIndex((i) => Math.min(i + 1, sources.length - 1))}
    />
  );
}
