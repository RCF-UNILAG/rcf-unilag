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
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  // console.log(formattedDate)

  return (
    <article className="flex flex-col">
      <div
        className="relative block aspect-video overflow-hidden rounded-2xl"
      >
        <SermonThumbnail
          youtubeUrl={sermon.youtube_link}
          title={sermon.title}
        />       
      </div>

      <div className="flex gap-x-1.5 relative bottom-0 right-0 translate-y-1/2 -translate-x-1/2 z-1000">
        <Link href={sermon.youtube_link} target="_blank" rel="noopener noreferrer" className="p-2 lg:p-3 rounded-full bg-teal-800">
          <Image
            src="/brands/youtube.svg"
            alt="YouTube"
            className="invert-100"
            width={16}
            height={16}
          />
        </Link>

        <Link href={sermon.spotify_link} target="_blank" rel="noopener noreferrer" className="p-2 lg:p-3 rounded-full bg-teal-800">
          <Image
            src="/brands/spotify.svg"
            alt="YouTube"
            className="invert-100"
            width={16}
            height={16}
          />
        </Link>
      </div>

      <p className="text-muted-foreground line-clamp-3 text-xs mt-4">
        {formattedDate}
      </p>

      <h3 className="text-base font-bold line-clamp-2 mt-1">
        {sermon.title}
      </h3>

      <p className="text-muted-foreground line-clamp-3 grow text-sm mt-1">
        {sermon.description}
      </p>
    </article>
  );
}

