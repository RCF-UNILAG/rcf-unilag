import Link from "next/link";
import { Metadata } from "next";
import { getLeadershipArchive, LeadershipTenure } from "@/lib/archive";
import { PageHeroSimple } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Leadership Archive | RCF UNILAG",
  description:
    "A record of every leadership tenure and the pastors who served RCF UNILAG.",
};

export default async function ArchivePage() {
  const tenures = await getLeadershipArchive();

  return (
    <div className="min-h-screen bg-white">
      <PageHeroSimple
        heading="Our Tenures"
        description="Celebrating every generation of leaders who have faithfully served RCF UNILAG."
      />

      <div className="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tenures.map((tenure, index) => {
          const isBig = index === 0;

          return (
            <Link
              key={tenure.slug}
              data-size={isBig ? "lg" : "sm"}
              className="[data-size=lg]:col-span-2 [data-size=lg]:row-span-2"
              href={`/tenures/${tenure.slug}`}
            >
              <TenureCard tenure={tenure} />
            </Link>
          )
        })}
      </div>
    </div>
  );
}

export function TenureCard({ tenure }: { tenure: LeadershipTenure }) {
  return (
    <div className={"w-full flex flex-col gap-2"}>
      <div className="w-full relative bg-muted aspect-video" />
      <div className="">
        <h4 className="font-semibold">{tenure.theme}</h4>
        <p className="text-muted-foreground text-sm">{tenure.description}</p>
      </div>
    </div>
  )
}

// export function BigTenureCard({ tenure }: { tenure: LeadershipTenure }) {
//   return (
//     <div className="w-full relative bg-muted aspect-3/2">
//       <div className="absolute bottom-5 left-5">
//         <h4 className="font-semibold">{tenure.theme}</h4>
//         <p className="text-muted-foreground text-sm">{tenure.description}</p>
//       </div>
//     </div>
//   )
// }