import { QuickLinksSection } from "@/app/ql/quick-links-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Links | RCF UNILAG",
  description:
    "Quick access to important RCF UNILAG resources — WhatsApp groups, giving links, event sign-ups, and more.",
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-muted border-b border-gray-100 pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-display uppercase tracking-tight sm:text-6xl mb-6">
            RCF UNILAG
          </h1>
          <p className="text-sm leading-tighter text-muted-foreground max-w-2xl mx-auto sm:text-base">
            Everything you need, all in one place.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuickLinksSection />
      </div>
    </div>
  );
}
