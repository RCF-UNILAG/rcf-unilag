import { type QuickLink } from "@/lib/quick-links";
import { ArrowRight } from "lucide-react";

interface QuickLinkCardProps {
  link: QuickLink;
}

export function QuickLinkCard({ link }: QuickLinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 w-full px-6 py-4 bg-white border border-border rounded-md shadow-xs hover:bg-secondary/10 transition-all duration-200"
    >
      <span className="flex-1 font-medium text-foreground text-sm sm:text-base text-center group-hover:text-primary transition-all duration-200">
        {link.title}
      </span>
    </a>
  );
}
