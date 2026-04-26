import { getSermons } from "@/lib/sermons";
import { SermonBrowser } from "./sermon-browser";
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
      <div className="bg-muted border-b border-gray-100 pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-display uppercase tracking-tight sm:text-6xl mb-6">
            Sermons
          </h1>
          <p className="text-sm leading-tighter text-muted-foreground max-w-2xl mx-auto sm:text-base">
            Explore our collection of recent messages, series, and teachings.
            Grow your faith and catch up on anything you missed.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <SermonBrowser initialSermons={sermons} />
      </div>
    </div>
  );
}
