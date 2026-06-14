import Link from "next/link";
import { type Sermon } from "@/lib/sermons";
import { SermonThumbnail } from "@/components/sermon-thumbnail";
import { PlayCircle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SermonCardProps {
  sermon: Sermon;
}

export function SermonCard({ sermon }: SermonCardProps) {
  const formattedDate = new Date(sermon.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={sermon.youtube_link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full bg-white rounded-xs overflow-hidden border border-border shadow-xs hover:shadow-sm transition-shadow duration-300">
      {/* Thumbnail */}
      <div
        className="relative block aspect-video overflow-hidden"
      >
        <SermonThumbnail
          youtubeUrl={sermon.youtube_link}
          title={sermon.title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 text-xs tracking-tight text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{sermon.speaker}</span>
          </div>
        </div>

        <h3 className="text-base font-bold line-clamp-2">
          {sermon.title}
        </h3>

        <p className="text-muted-foreground line-clamp-3 flex-grow text-sm">
          {sermon.description}
        </p>
      </div>
    </Link>
  );
}
