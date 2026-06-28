import {
  PageHero,
  PageHeroContent,
  PageHeroDescription,
  PageHeroHeading,
} from "@/components/ui/page-hero";
import { Building2, Users } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { Metadata } from "next";
import { RadialRingProgress } from "@/components/fundraising-progress";
import { getGivingProjects } from "@/lib/give";
import { RelativeTime } from "@/components/relative-time";

export const metadata: Metadata = {
  title: "Give | RCF UNILAG",
  description:
    "Support RCF UNILAG through generous giving. We give because He first gave.",
};

function AccountCard({
  label,
  account,
  bankName,
  icon
}: {
  label: string;
  account: string;
  bankName: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col w-full gap-6 px-6 py-4 bg-white border border-border rounded-xl shadow-xs transition-all duration-200">
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl font-semibold">{account}</h2>
          <CopyButton value={account} />
        </div>
        <p className="text-sm text-muted-foreground">
          {bankName}
        </p>
      </div>
    </div>
  );
}

export default async function Page() {
  const projects = await getGivingProjects();
  // For now we only have one project — the 1k from 1k initiative.
  const initiative = projects[0];
  return (
    <div className="min-h-screen bg-white">
      <PageHero>
        <PageHeroContent align="center" maxWidth="lg">
          <PageHeroHeading size="sm" className="font-bold">Be part of what God is doing RCF UNILAG</PageHeroHeading>
          <PageHeroDescription className="normal-case !text-xl">
            We give because He first gave
          </PageHeroDescription>
        </PageHeroContent>
      </PageHero>

      {/* Account cards */}
      <div className="section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <AccountCard label="Tithes & Offerings" account="1020269239" bankName="United Bank for Africa (UBA)" icon={<Building2 size={16} />} />
          <AccountCard label="Projects" account="1013422102" bankName="Zenith Bank" icon={<Building2 size={16} />} />
        </div>
      </div>

      {/* ── 1k from 1k Initiative ─────────────────────────────────────────── */}
      <section className="bg-muted/40 border-y border-border">
        <div className="section grid grid-cols-1 md:grid-cols-2 gap-16">

          <div className="flex flex-col gap-12 flex-1 min-w-0">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Project
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                The 1k from 1k Initiative
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                Be one of the <strong>1,000 individuals</strong> to give{" "}
                <strong>₦1,000</strong> each between now and the first Sunday in
                July to raise <strong>1 million Naira</strong> together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch">
              <div className="flex flex-col gap-2 px-5 py-4 rounded-xl border border-border bg-white shadow-xs">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Account Number
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-bold tracking-tight">1020269239</p>
                  <CopyButton value="1020269239" />
                </div>
                <p className="text-sm text-muted-foreground">
                  United Bank for Africa (UBA)
                </p>
              </div>
              <div className="flex flex-col gap-2 px-5 py-4 rounded-xl border border-border bg-white shadow-xs">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Transfer Description
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-bold tracking-tight font-mono">1k from 1k</p>
                  <CopyButton value="1k from 1k" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Add this as your payment narration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Users size={16} className="shrink-0 text-primary" />
              <p>
                <strong className="text-foreground">{initiative.donorCount.toLocaleString()} people</strong>{" "}
                have already given. It's you next.
              </p>
            </div>

          </div>

          <div className="flex flex-col items-center gap-6 md:shrink-0">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold">Progress so far</h3>
              {initiative.lastUpdated && (
                <p className="text-sm text-muted-foreground">
                  Last updated <RelativeTime dateStr={initiative.lastUpdated} />
                </p>
              )}
            </div>

            {/* ── Option A: Radial Ring (recommended) ── */}
            <RadialRingProgress
              current={initiative.amountRaised}
              donors={initiative.donorCount}
              goal={initiative.goal}
            />

            {/* ── Option B: Liquid Fill ─────────────── */}
            {/* <LiquidFillProgress
              current={initiative.amountRaised}
              donors={initiative.donorCount}
              goal={initiative.goal}
            /> */}

            {/* ── Option C: Dot Grid (1,000 dots) ───── */}
            {/* <DotGridProgress
              current={initiative.amountRaised}
              donors={initiative.donorCount}
              goal={initiative.goal}
            /> */}

            {/* ── Option D: Sonar / Radar ────────────── */}
            {/* <SonarProgress
              current={initiative.amountRaised}
              donors={initiative.donorCount}
              goal={initiative.goal}
            /> */}
          </div>

        </div>
      </section>
    </div>
  );
}
