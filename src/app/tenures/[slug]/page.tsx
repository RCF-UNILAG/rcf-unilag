import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getLeadershipArchive } from "@/lib/archive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenures = await getLeadershipArchive();
  const tenure = tenures.find((t) => t.slug === slug);

  if (!tenure) {
    return { title: "Tenure Not Found | RCF UNILAG" };
  }

  return {
    title: `${tenure.theme} — ${tenure.year}`,
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
  const tenures = await getLeadershipArchive();

  // Slug is stored on the object — no string manipulation needed here.
  const tenure = tenures.find((t) => t.slug === slug);
  if (!tenure) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* ── Back link ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/archive"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back to Archive
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="tenure-theme"
        className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm mb-4">
            {tenure.year}
          </p>
          <h1
            id="tenure-theme"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight"
          >
            {tenure.theme}
          </h1>
          <p className="sm:text-lg leading-relaxed max-w-2xl">
            {tenure.description}
          </p>
        </div>
      </section>

      {/* ── Meet the Leaders ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="leaders-heading"
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28"
      >
        {/* <h2
          id="leaders-heading"
          className="text-2xl font-bold font-display tracking-tight mb-10"
        >
          Meet the Leaders
        </h2> */}

        {tenure.pastors.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7"
          >
            {tenure.pastors.map((pastor) => (
              <li key={`${tenure.slug}-${pastor.name}`}>
                <div className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={pastor.photoUrl}
                      alt={pastor.name}
                      fill
                      sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold leading-snug">{pastor.name}</p>
                    <p className="text-muted-foreground">
                      {pastor.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No leadership details recorded for this tenure.
          </p>
        )}
      </section>
    </div>
  );
}
