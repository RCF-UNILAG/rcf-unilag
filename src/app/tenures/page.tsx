import Link from "next/link";
import { Metadata } from "next";
import { getTenures } from "@/lib/archive";
import { Timeline } from "@/components/tenure-timeline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tenures | RCF UNILAG",
  description:
    "Explore the rich history of seasons RCF has gone through in her journey as a fellowship.",
};

export default async function ArchivePage() {
  const tenures = await getTenures();

  const data = tenures.map((tenure) => ({
    title: tenure.year,
    content: (
      <Link href={`/tenures/${tenure.slug}`} className="block group">
        <h2 className="mb-2 text-2xl md:text-4xl font-semibold group-hover:underline">
          {tenure.name}
        </h2>
        {tenure.theme && (
          <p className="mb-4 font-normal italic text-sm md:text-base text-muted-foreground">
            {tenure.theme}
          </p>
        )}
        {tenure.description && (
          <p className="mb-8 font-normal text-sm md:text-base text-muted-foreground">
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
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </Link>
    ),
  }));

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="section">
        <h1 className="font-semibold text-2xl md:text-5xl mb-4 max-w-4xl">
          See how RCF UNILAG has transited from one tenure to another.
        </h1>
        <p className="text-sm md:text-base max-w-sm">
          A timeline of every season RCF UNILAG has walked through — tap a
          tenure to read its full story.
        </p>
      </div>
      <div className="section">
        <Timeline data={data} />
      </div>
    </div>
  );
}
