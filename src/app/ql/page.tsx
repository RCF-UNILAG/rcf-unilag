import { QuickLinksSection } from "@/app/ql/quick-links-section";
import { PageHero, PageHeroContent, PageHeroDescription, PageHeroHeading, PageHeroSimple } from "@/components/ui/page-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Links | RCF UNILAG",
  description:
    "Quick access to important RCF UNILAG resources — WhatsApp groups, giving links, event sign-ups, and more.",
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero variant={"transparent"}>
        <PageHeroContent>
          <PageHeroHeading className="flex flex-col text-center">
            <span className="text-6xl font-display font-bold tracking-tighter">
              THIS IS
            </span>
            <span className="text-6xl font-display font-bold tracking-tighter bg-linear-to-r from-[#E71A57] to-[#9342AB] bg-clip-text text-transparent">
              RCF UNILAG
            </span>
          </PageHeroHeading>
          <PageHeroDescription>Everything you need, all in one place.</PageHeroDescription>
        </PageHeroContent>
      </PageHero>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuickLinksSection />
      </div>
    </div>
  );
}
