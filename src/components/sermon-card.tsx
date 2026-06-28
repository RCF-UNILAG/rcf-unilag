import Link from "next/link";
import { type Sermon } from "@/lib/sermons";
import { SermonThumbnail } from "@/components/sermon-thumbnail";

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
    <Link href={sermon.youtube_link} target="_blank" rel="noopener noreferrer" className="flex flex-col">
      <div
        className="relative block aspect-video overflow-hidden rounded-md"
      >
        <SermonThumbnail
          youtubeUrl={sermon.youtube_link}
          title={sermon.title}
        />
      </div>

      <h3 className="text-base font-bold line-clamp-2 mt-4">
        {sermon.title}
      </h3>

      <p className="text-muted-foreground line-clamp-3 flex-grow text-sm mt-1">
        {sermon.description}
      </p>
    </Link>
  );
}
