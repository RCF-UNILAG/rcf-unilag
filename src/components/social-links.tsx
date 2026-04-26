import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  settings: SiteSettings;
  className?: string;
}

export function SocialLinks({ settings, className }: SocialLinksProps) {
  const socialNetworks = [
    { key: "social_youtube", name: "YouTube", icon: "/brands/youtube.svg" },
    { key: "social_instagram", name: "Instagram", icon: "/brands/instagram.svg" },
    { key: "social_twitter", name: "X", icon: "/brands/x.svg" },
    { key: "social_facebook", name: "Facebook", icon: "/brands/facebook.svg" },
  ];

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socialNetworks.map((social) => {
        const url = settings[social.key];
        if (!url) return null;

        return (
          <Link
            key={social.name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <Image
              src={social.icon}
              alt={social.name}
              className="invert-100"
              width={16}
              height={16}
            />
          </Link>
        );
      })}
    </div>
  );
}