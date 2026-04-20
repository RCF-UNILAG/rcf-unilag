import Link from "next/link";
import { type Sermon } from "@/lib/sermons";
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
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{sermon.speaker}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
        {sermon.title}
      </h3>

      <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
        {sermon.description}
      </p>

      <div className="mt-auto">
        <Button asChild className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 transition-colors">
          <Link href={sermon.youtube_link} target="_blank" rel="noopener noreferrer">
            <PlayCircle className="w-4 h-4 mr-2" />
            Watch Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
