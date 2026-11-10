import Link from "next/link";
import Image from "next/image";
import { type Sermon } from "@/lib/sermons";
import { SermonThumbnail, } from "@/components/sermon-thumbnail";
import { SocialLinks } from "@/components/social-links";

interface SermonCardProps {
  sermon: Sermon;
}
const socialNetworks = [
  { key: "social_youtube", name: "YouTube", icon: "/brands/youtube.svg" },
  { key: "social_instagram", name: "Instagram", icon: "/brands/instagram.svg" },
];

export function SermonCard({ sermon }: SermonCardProps) {
  const formattedDate = new Date(sermon.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // console.log(formattedDate)

  return (
    <article className="flex flex-col rounded-2xl overflow-clip bg-white shadow-sm">
      <div className="relative">
        <div className="relative overflow-clip aspect-video bg-black">
          <SermonThumbnail
            youtubeUrl={sermon.youtube_link}
            title={sermon.title}
          />
        </div>
      
        <div className="flex gap-x-3 absolute bottom-0 right-5 translate-y-2/5">
          <Link href={sermon.youtube_link} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-black hover:brightness-110">
            <Image
              src="/brands/youtube-big.svg"
              alt="YouTube"
              className=""
              width={25}
              height={25}
            />
          </Link>

          <Link href={sermon.spotify_link} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-black hover:brightness-110">
            <Image
              src="/brands/spotify-big.svg"
              alt="YouTube"
              className=""
              width={25}
              height={25}
            />
          </Link>
        </div>
        
      </div>

      <div className="flex flex-col gap-y-3 p-5">
        <div className="text-muted-foreground line-clamp-1 text-xs flex gap-x-3">
          <span className="flex gap-x-1">
            <Image
              src="/icons/calendar.svg"
              alt="calendar-icon"
              width={12}
              height={12}
            />
            {formattedDate}
          </span>
          <span className="flex gap-x-1">
            <Image
              src="/icons/person.svg"
              alt="person-icon"
              width={12}
              height={12}
            />
            {sermon.speaker}
          </span>
        </div>

        <h3 className="font-bold line-clamp-2 text-2xl">
          {sermon.title}
        </h3>

        <p className="text-muted-foreground line-clamp-3 grow text-xs">
          {sermon.description}
        </p>
      </div>
    </article>
  );
}

