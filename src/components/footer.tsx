"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="section py-12 md:py-16 flex flex-col gap-16">
        {/*Subscribe to our newsletter*/}
        {/* <div className="mx-auto w-full max-w-xl flex flex-col gap-6">
          <h2 className="uppercase font-bold text-lg tracking-wider text-center">
            Want to get the latest Updates from us?
          </h2>
          <Input placeholder="Your Email" />
          <Button>Subscribe</Button>
        </div> */}

        {/* <iframe src="https://rcfunilag.substack.com/embed" width="480" height="320" style={{ border: "1px solid #EEE", background: "white" }} className="max-w-xl w-full mx-auto" /> */}

        <iframe
          src="https://rcfunilag.substack.com/embed?background=transparent"
          width="480"
          height="150"
          style={{ border: "1px solid #EEE", background: "transparent" }}
          className="max-w-xl w-full mx-auto"
        />

        <div />

        {/*Links*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-4 lg:gap-4 lg:grid-cols-3">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="RCF UNILAG"
                width={64}
                height={64}
                loading="eager"
              />
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-3xl leading-none tracking-tight">
                  RCF UNILAG
                </h3>
                <small className="tracking-tigher text-base font-lighter">
                  Redeemed Christian Fellowship
                </small>
              </div>
            </div>
            <p className="text-sm">
              We are RCF UNILAG, the campus fellowship of Christ the
              Redeemer&apos;s Ministry (RCCG). We are unapologetically
              Christ-centred, we carry a mandate to illuminate our world, from
              this campus to the world. We are the Chosen Generation.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#">
                <Image
                  src="/brands/youtube.svg"
                  alt="YouTube"
                  className="invert-100"
                  width={16}
                  height={16}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/brands/instagram.svg"
                  alt="Instagram"
                  className="invert-100"
                  width={16}
                  height={16}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/brands/x.svg"
                  alt="X"
                  className="invert-100"
                  width={16}
                  height={16}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/brands/facebook.svg"
                  alt="Facebook"
                  className="invert-100"
                  width={16}
                  height={16}
                />
              </Link>
            </div>
          </div>

          <FooterColumn
            title="Quick Links"
            links={[
              { text: "About Us", href: "/about" },
              { text: "Give", href: "/ql/give" },
              // { text: "Gallery", href: "/gallery" },
              { text: "Contact Us", href: "tel:+2349091488306" },
              { text: "Become a member", href: "/ql/become-a-member" },
            ]}
            className="lg:justify-self-center"
          />

          <div className="flex flex-col gap-3 lg:justify-self-end">
            <h4 className="uppercase font-extralight text-xl">Visit Us</h4>
            <ul className="space-y-3">
              {[
                {
                  title: "Sundays",
                  description: "8:00 AM @ Staff School Hall",
                },
                {
                  title: "Tuesdays (Bible Study)",
                  description: "6:00 PM @ SUB-Frontage",
                },
                {
                  title: "Thursday (Evangelism)",
                  description: "6:00 PM @ SUB-Frontage",
                },
                {
                  title: "Fridays (Divine Encounter)",
                  description: "6:00 PM @ SUB-Frontage",
                },
              ].map((link) => (
                <li key={link.title} className="flex flex-col">
                  <span className="text-sm font-semibold">{link.title}</span>
                  <span className="text-sm font-normal">
                    {link.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-muted-foreground/30" />

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <small>
            &copy; {new Date().getFullYear()} | The Redeemed Christian
            Fellowship, UNILAG
          </small>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { text: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4 className="uppercase font-extralight text-xl">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.text}>
            <Link
              href={link.href}
              className="text-sm font-medium hover:underline"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
