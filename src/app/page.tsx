import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flower, FlowerDrawn } from "@/components/icons";
import Link from "next/link";
import { HandwrittenCircle } from "./animated-circle";
import { getSermons } from "@/lib/sermons";
import { SermonCard } from "@/components/sermon-card";
import { getSiteSettings, SiteSettings } from "@/lib/settings";
import { SocialLinks } from "@/components/social-links";
import { PillarCard } from "@/components/pillar-card";
const backgroundUrl = "/images/home_01.jpg";

const pillars = [
  {
    title: "The Word",
    description:
      "At RCF UNILAG, the Word is our ultimate compass. We grow in the knowledge of scripture and apply it daily to become formidable believers. Our Sunday Services and Bible Studies are deeply anchored in this truth.",
    image:
      "/images/pillar-word.jpg",
    ctaLabel: "Watch Sermons",
    ctaHref: "/sermons",
    orientation: "image-left" as const,
  },
  {
    title: "Love",
    description: "At RCF UNILAG, the love of Christ is our native language. You were not meant to navigate university life alone. Here, you will experience love in action—a supportive family that prays with you, carries your burdens, and does life together.",
    image:
      "/images/pillar-love.jpg",
    ctaLabel: "Join our Community",
    ctaHref: "/ql/become-a-member",
    orientation: "image-right" as const,
  },
  {
    title: "Excellence",
    description: "At RCF UNILAG, we believe academic excellence is a spiritual responsibility. With God's help and our diligent Academic Unit, we provide the study materials and support you need to achieve excellent grades.",
    image:
      "/images/pillar-excellence.png",
    ctaLabel: "Check Achievements",
    ctaHref: "/about",
    orientation: "image-left" as const,
  },
  // {
  //   title: "Prayer",
  //   description:
  //     "Prayer is the heartbeat of RCF UNILAG. From our weekly Divine Encounter nights to personal intercession, we cultivate a culture of dependence on God, believing He moves mountains in response to the prayers of His people.",
  //   image:
  //     "https://rcfunilag.com/wp-content/uploads/2023/05/Snapinsta.app_345309011_740436354489814_8763262030661234831_n_1024-e1685062328403.jpg.webp",
  //   ctaLabel: "Drop Prayer Requests",
  //   ctaHref: "/prayer",
  //   orientation: "image-right" as const,
  // },
];

const features = [
  {
    image:
      "https://rcfunilag.com/wp-content/uploads/2023/05/Snapinsta.app_345309011_740436354489814_8763262030661234831_n_1024-e1685062328403.jpg.webp",
    title: "The Word",
    callToAction: "See sermons",
    href: "",
  },
  {
    image: "https://rcfunilag.com/wp-content/uploads/2023/05/rcf-exc.jpeg.webp",
    title: "Excellence",
    callToAction: "Check achievements",
    href: "",
  },
  {
    image:
      "https://rcfunilag.com/wp-content/uploads/2023/05/Snapinsta.app_342729953_1062808808027284_8768411877360006972_n_1024.jpg",
    title: "Prayer",
    callToAction: "Drop prayer requests",
    href: "",
  },
];

export default async function Home() {
  const settings = await getSiteSettings();
  const sermons = await getSermons();
  const latestSermons = sermons.slice(0, 3);

  return (
    <div>
      <Hero settings={settings} />

      <WeAreRCFSection />

      {/* Latest Sermons Section */}
      <section className="bg-[#EAD9EE]">
        <div className="section flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-5xl font-display font-bold uppercase tracking-tight text-foreground">
              Latest Sermons
            </h2>
            <p className="text-muted-foreground">
              Catch up on recent messages and teachings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestSermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <div className="relative">
      <div
        style={{ "--bg-url": `url(${backgroundUrl})` } as React.CSSProperties}
        className="absolute inset-0 bg-(image:--bg-url) bg-black bg-no-repeat bg-cover bg-bottom"
      />
      <div className="absolute inset-0 backdrop-grayscale" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(116,58,86,0.4)_0.92%,rgba(26,0,12,0.8)_100%)] bg-blend-multiply opacity-70" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative px-4 pt-40 pb-16 md:py-40 h-dvh flex flex-col gap-8 justify-center items-center text-white text-center">
        <div className="flex flex-col gap-10 items-center">
          <Badge
            variant="outline"
            className="bg-accent/10 text-white uppercase py-2 px-6 gap-2 sm:text-base"
          >
            <Flower className="size-6!" />
            Welcome to RCF UNILAG
            <Flower className="size-6!" />
          </Badge>
          <div className="flex flex-col gap-2 items-center-safe">
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter flex flex-col md:block">
              RCF,{" "}
              <span className="bg-linear-to-r from-[#E71A57] to-[#9342AB] bg-clip-text text-transparent">
                One Family
              </span>
              <span className="absolute bottom-0 left-0 -translate-x-3/4 translate-y-12">
                <FlowerDrawn className="hidden md:block" />
              </span>
              <span className="absolute top-0 right-0 translate-x-3/4 -translate-y-8 rotate-180 text-[#E71B5D]">
                <FlowerDrawn className="hidden sm:block" />
              </span>
            </h1>
            <p className="sm:w-xl md:text-xl">
              We are passionate about our members. A place to grow in faith,
              excel in academics, and find your purpose in God.
            </p>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
            <Button asChild size="lg">
              <Link href="/ql/become-a-member" target="_blank">
                Join Us
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ql">
                Quick Links
              </Link>
            </Button>
          </div>
        </div>
        <div className="sm:mt-auto flex flex-col gap-4 items-center">
          <div className="hidden sm:flex flex-col gap-4 items-center">
            <h3 className="font-bold text-base">OUR WEEKLY SERVICES</h3>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 [&>span:nth-child(1)]:justify-end [&>span:nth-child(3)]:justify-start text-base">
              <span className="flex"><span className="font-bold">SUN</span>: 8:00 AM (Service)</span>
              <span className="mx-auto">|</span>
              <span className="flex"><span className="font-bold">TUE</span>: 6:00 PM (Bible Study)</span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 [&>span:nth-child(1)]:justify-end [&>span:nth-child(3)]:justify-start text-base">
              <span className="flex"><span className="font-bold">THU</span>: 6:00 PM (Evangelism)</span>
              <span className="mx-auto">|</span>
              <span className="flex"><span className="font-bold">FRI</span>: 6:00 PM (Divine Encounter)</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span>Connect with us:</span>
            <SocialLinks settings={settings} className="flex items-center gap-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function WeAreRCFSection() {
  return (
    <section className="bg-muted">
      <div className="section flex flex-col gap-24">
        <div className="text-center flex flex-col gap-6">
          <h1 className="text-6xl font-bold uppercase font-display tracking-tighter">
            We are RCF UNILAG
          </h1>
          <div className="flex justify-center">
            <h2 className="relative text-6xl font-bold uppercase font-display tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              One Family
              <span className="absolute -inset-4 sm:-inset-6">
                <HandwrittenCircle className="!w-full !h-full" />
              </span>
            </h2>
          </div>
          <p className="text-center">
            We are passionate about our members. A place to grow in faith, excel
            in academics, and find your purpose in God.
          </p>
        </div>
        <div className="flex flex-col gap-16">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}