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
      {/* <span
        className="shrink-0 flex items-center justify-center w-11 h-11 text-2xl rounded-lg"
        aria-hidden="true"
      >
        {link.icon}
      </span> */}

      <span className="flex-1 font-medium text-foreground text-sm sm:text-base text-center group-hover:text-primary transition-all duration-200">
        {link.title}
      </span>

      {/* Arrow — slides in on hover */}
      <span className="shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <ArrowRight className="size-4" />
      </span>
    </a>
  );
}
