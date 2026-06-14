import { getSermons } from "@/lib/sermons";
import { SermonBrowser } from "./sermon-browser";
import { PageHeroSimple } from "@/components/ui/page-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons | RCF UNILAG",
  description:
    "Browse and watch previous sermons and teachings from RCF UNILAG.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHeroSimple
        heading="Sermons"
        description="Explore our collection of recent messages, series, and teachings. Grow your faith and catch up on anything you missed."
      />

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <SermonBrowser initialSermons={sermons} />
      </div>
    </div>
  );
}
