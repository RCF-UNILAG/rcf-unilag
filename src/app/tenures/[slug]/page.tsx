import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTenures } from "@/lib/tenure";
import { Button } from "@/components/ui/button";
import { TenureStorySection, TenureTeamSection, TenureGallerySection } from "@/components/about";

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
    title: `${tenure.name || tenure.theme} — ${tenure.period} | RCF UNILAG`,
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

  const galleryImages = [tenure.bannerUrl, ...tenure.galleryUrls].filter(Boolean);

  return (
    <div className="min-h-screen pt-16">
      <TenureStorySection tenure={tenure} className="bg-black" />
      <TenureTeamSection tenure={tenure} isCurrent={isCurrent} />
      <TenureGallerySection images={galleryImages} />
    </div>
  );
}
