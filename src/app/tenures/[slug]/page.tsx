import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTenures } from "@/lib/archive";
import { Button } from "@/components/ui/button";
import { TenureStorySection, TenureTeamSection } from "@/components/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenures = await getTenures();
  const tenure = tenures.find((t) => t.slug === slug);

  if (!tenure) {
    return { title: "Tenure Not Found | RCF UNILAG" };
  }

  return {
    title: `${tenure.name} — ${tenure.period} | RCF UNILAG`,
    description: tenure.description,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function TenureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenures = await getTenures();

  // Slug is stored on the object — no string manipulation needed here.
  const tenure = tenures.find((t) => t.slug === slug);
  if (!tenure) notFound();

  // Newest tenure (index 0) is the fellowship's current one.
  const isCurrent = tenures[0]?.slug === tenure.slug;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button asChild variant="outline">
          <Link href="/tenures">
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </Link>
        </Button>
      </div>

      <TenureStorySection tenure={tenure} />
      <TenureTeamSection tenure={tenure} isCurrent={isCurrent} />
    </div>
  );
}
