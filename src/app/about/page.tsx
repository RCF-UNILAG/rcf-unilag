import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTenures } from "@/lib/tenure";
import { Button } from "@/components/ui/button";
import {
  StorySection,
  ScriptureBanner,
  MissionVisionSection,
  PillarsSection,
  TenureStorySection,
  TenureTeamSection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About | RCF UNILAG",
  description:
    "Learn about the Redeemed Christian Fellowship at the University of Lagos — established in 1986 under the apostolic oversight of Pastor E.A. Adeboye to take the gospel to every student, every faculty, and every corridor of campus life.",
};

const backgroundUrl = "https://res.cloudinary.com/dpjo7lpww/image/upload/v1782604154/one-family_j0i02b.jpg"

export default async function About() {
  const tenures = await getTenures();
  // Tenures are sorted newest-first; index 0 is the current tenure.
  const currentTenure = tenures[0];

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      {/* DO NOT MODIFY: existing hero section preserved as-is */}
      <div className="relative flex flex-col h-[40rem] w-full items-center justify-center bg-black">
        <div
          style={{ "--bg-url": `url(${backgroundUrl})` } as React.CSSProperties}
          className="absolute inset-0 bg-(image:--bg-url) bg-black bg-no-repeat bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text pt-8 pb-2 text-center font-display text-5xl font-bold text-transparent sm:text-7xl">
          Called to a campus.
        </p>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text pt-2 pb-8 text-center font-display text-2xl font-bold text-transparent sm:text-5xl opacity-50">
          Sent to a generation.
        </p>
        <p className="relative text-white/50 text-center max-w-2xl">
          Since 1986, the Redeemed Christian Fellowship at the University of
          Lagos has existed to see every student encounter Jesus Christ and walk
          in the fullness of life He provides.
        </p>
      </div>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <StorySection />

      {/* ── Scripture Banner ─────────────────────────────────────────────── */}
      <ScriptureBanner />

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <MissionVisionSection />

      {/* ── Three Pillars ─────────────────────────────────────────────────── */}
      <PillarsSection />

      {/* ── Current Tenure ────────────────────────────────────────────────── */}
      {currentTenure && <TenureStorySection tenure={currentTenure} />}

      {/* ── Meet the Team ─────────────────────────────────────────────────── */}
      {currentTenure && (
        <TenureTeamSection tenure={currentTenure} isCurrent />
      )}

      {/* ── Explore Past Tenures ─────────────────────────────────────────── */}
      <div className="bg-muted pb-24 flex justify-center">
        <Button asChild size="lg" variant="black">
          <Link href="/tenures">See Past Tenures</Link>
        </Button>
      </div>
    </div>
  );
}
