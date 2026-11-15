import { getSermons } from "@/lib/sermons";
import { SermonBrowser } from "./sermon-browser";
import { PageHeroSimple } from "@/components/ui/page-hero";
import { Metadata } from "next";
import Link from "next/link"
import Image from "next/image";
import { getSiteContent } from "@/lib/site-content";

const content = await getSiteContent();

export const metadata: Metadata = {
  title: "Sermons | RCF UNILAG",
  description:
    "Browse and watch previous sermons and teachings from RCF UNILAG.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();
  // 

  return (
    <div className="min-h-screen bg-[#FAF2F6] flex flex-col">
      {/* Header Section */}
      <PageHeroSimple
        heading="Sermons"
        description="Explore our collection of recent messages, series, and teachings. Grow your faith and catch up on anything you missed. Missed a service? Catch up anytime, anywhere — stream on YouTube or take the Word on the go with Spotify."
        headingSize="xl"
        actions={
          <SermonPlatformLinks
            spotifyUrl={content.social_spotify}
            youtubeUrl={content.social_youtube}
          />
        }
        className="bg-[#EAD9EE]"
      />

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <SermonBrowser initialSermons={sermons} />
      </div>
    </div>
  );
}


function SermonPlatformLinks({
  spotifyUrl,
  youtubeUrl,
}: {
  spotifyUrl: string;
  youtubeUrl: string;
}) {
  const linkStyle =
    "inline-flex items-center justify-center rounded-full! px-16 py-5 border-2 border-white text-white bg-[#CF2B78] hover:brightness-110";

  return (
    <div className="flex items-center justify-between gap-9 w-fit justify-self-center">
      <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
      <Image
        src="/brands/spotify-big.svg"
        alt="Spotify"
        className="mr-3"
        width={25}
        height={25}
      />
      Listen on Spotify
      </Link>

      <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
      <Image
        src="/brands/youtube-big.svg"
        alt="YouTube"
        className="mr-3"
        width={25}
        height={25}
      />
        Listen on YouTube
      </Link>
    </div>
    );
}