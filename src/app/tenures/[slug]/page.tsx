import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTenures } from "@/lib/archive";
import { Button } from "@/components/ui/button";

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
  const tenures = await getTenures();

  // Slug is stored on the object — no string manipulation needed here.
  const tenure = tenures.find((t) => t.slug === slug);
  if (!tenure) notFound();

  return (
    <div className="min-h-screen bg-white pt-16 space-y-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button asChild variant="outline">
          <Link href="/tenures">
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </Link>
        </Button>
      </div>

      <section
        aria-labelledby="tenure-theme"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-4">
          <h1
            id="tenure-theme"
            className="text-4xl lg:text-5xl font-bold tracking-tight"
          >
            {tenure.theme}
          </h1>
          <p className="sm:text-lg leading-relaxed max-w-2xl text-muted-foreground">
            {tenure.description}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="leaders-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* <h2
          id="leaders-heading"
          className="text-2xl font-bold mb-8"
        >
          Our Pastors
        </h2> */}

        {tenure.executives.length > 0 ? (
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-x-4 md:gap-y-8 lg:grid-cols-4"
          >
            {tenure.executives.map((pastor) => (
              <li key={`${tenure.slug}-${pastor.name}`}>
                <div className="group/team">
                  <div className="relative overflow-hidden rounded-2xl bg-muted/50 transition duration-200">
                    <div className="absolute inset-0 h-full w-full bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)] bg-size-[5px_5px] bg-fixed"></div>
                    {/* <div className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-6" style="--background: #ffffff; --height: 1px; --width: 5px; --fade-stop: 90%; --offset: 200px; mask-composite: exclude;"></div>
                    <div className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-auto bottom-6" style="--background: #ffffff; --height: 1px; --width: 5px; --fade-stop: 90%; --offset: 200px; mask-composite: exclude;"></div>
                    <div class="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width) bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-6" style="--background: #ffffff; --height: 5px; --width: 1px; --fade-stop: 90%; --offset: 80px; mask-composite: exclude;"></div>
                    <div class="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width) bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] right-6 left-auto" style="--background: #ffffff; --height: 5px; --width: 1px; --fade-stop: 90%; --offset: 80px; mask-composite: exclude;"></div> */}
                    <div className="p-3">
                      <div className="relative overflow-hidden">
                        <Image
                          src={pastor.photoUrl}
                          alt={pastor.name}
                          height={1020}
                          width={1024}
                          sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="aspect-square rounded-2xl object-cover duration-200 will-change-transform group-hover/team:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-lg font-semibold tracking-tight text-balance text-neutral-900 md:text-xl">{pastor.name}</p>
                  <p className="text-sm text-neutral-600 md:text-base">{pastor.role}</p>
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
    </div >
  );
}
