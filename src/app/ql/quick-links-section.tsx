import { getQuickLinks } from "@/lib/quick-links";
import { QuickLinkCard } from "@/components/quick-link-card";
import { Link2Off } from "lucide-react";

export async function QuickLinksSection() {
  const links = await getQuickLinks();

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-3">
      {links.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {links.map((link) => (
            <QuickLinkCard key={link.url} link={link} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
          <Link2Off className="w-8 h-8 opacity-40" />
          <p className="text-sm">No active links at the moment.</p>
        </div>
      )}
    </section>
  );
}
