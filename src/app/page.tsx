import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flower, FlowerDrawn } from "@/components/icons";
import Link from "next/link";
import { HandwrittenCircle } from "./animated-circle";
import { getSermons } from "@/lib/sermons";
import { SermonCard } from "@/components/sermon-card";
import Image from "next/image";
import { getSiteSettings } from "@/lib/settings";
import { SocialLinks } from "@/components/social-links";
const backgroundUrl = "/images/home_01.jpg";

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
              <Link href="/ql/become-a-member">
                <Button size="lg">Join Us</Button>
              </Link>
              <Link href="/ql">
                <Button size="lg" variant="outline">
                  Quick Links
                </Button>
              </Link>
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
      <section className="section flex flex-col gap-10">
        <div>
          <h2 className="text-3xl font-normal">Welcome</h2>
          <h1 className="text-6xl font-black uppercase tracking-tighter flex flex-col md:block">
            We are RCF UNILAG,{" "}
            <span className="w-fit relative text-secondary">
              <span className="absolute w-[calc(100%+1rem)] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <HandwrittenCircle className="w-full stroke-[6px]" />
              </span>
              <span className="relative">One Family</span>
            </span>
          </h1>
          <p className="font-medium mt-2 text-lg">
            This is a place to grow in faith and in life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              style={
                { "--bg-url": `url(${feature.image})` } as React.CSSProperties
              }
              className="relative h-96 bg-(image:--bg-url) p-4 text-white bg-no-repeat bg-cover bg-bottom flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black" />
              <div className="relative">
                <p>We are a people of</p>
                <h2 className="uppercase font-extrabold text-4xl">
                  {feature.title}
                </h2>
              </div>
              <div className="relative">
                <Button asChild className="bg-black/10">
                  <Link href={feature.href}>{feature.callToAction}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Sermons Section */}
      <section className="bg-muted">
        <div className="section flex flex-col gap-10">
          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-bold uppercase tracking-tight text-foreground">
                Latest Sermons
              </h2>
              <p className="text-muted-foreground">
                Catch up on recent messages and teachings
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/sermons">View Sermons</Link>
            </Button>
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
