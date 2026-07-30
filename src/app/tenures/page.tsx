import Link from "next/link";
import { Metadata } from "next";
import { getTenures } from "@/lib/tenure";
import { TenureTimeline } from "@/components/tenure-timeline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tenures | RCF UNILAG",
  description:
    "Explore the rich history of seasons RCF has gone through in her journey as a fellowship.",
};

export default async function ArchivePage() {
  const tenures = await getTenures();

  const data = tenures.map((tenure) => ({
    // e.g. "2026" or "August, 2026" — the timeline reads cleaner with just the end date.
    title: tenure.endLabel,
    content: (
      <Link href={`/tenures/${tenure.slug}`} className="block group">
        <h2 className="mb-2 text-4xl font-semibold group-hover:underline">
          {tenure.name || tenure.theme}
        </h2>
        {tenure.name && (
          <p className="mb-4 font-normal italic text-sm md:text-base text-muted-foreground">
            {tenure.theme}
          </p>
        )}
        {tenure.description && (
          <p className="mb-8 font-normal text-base text-muted-foreground">
            {tenure.description}
          </p>
        )}
        {tenure.bannerUrl && (
          <div>
            <Image
              src={tenure.bannerUrl}
              alt={tenure.name}
              width={2160}
              height={2700}
              className="w-full max-w-xl h-auto rounded-lg"
            />
          </div>
        )}
      </Link>
    ),
  }));

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="section pb-1 md:pb-6 flex flex-col gap-2">
        <h1 className="font-display font-bold text-4xl md:text-5xl max-w-5xl uppercase text-balance">
          A timeline of every season
        </h1>
        <p className="text-base max-w-xl">
          The Fellowship has gone through several seasons since 1986.
        </p>
      </div>
      <div className="section">
        <TenureTimeline data={data} />
      </div>
    </div>
  );
}
