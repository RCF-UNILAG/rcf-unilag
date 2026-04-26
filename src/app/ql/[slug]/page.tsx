import { redirect, notFound } from "next/navigation";
import { getQuickLinks } from "@/lib/quick-links";

export default async function QuickLinkRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const links = await getQuickLinks();

  const targetLink = links.find(
    (link) => link.slug?.toLowerCase() === slug.toLowerCase() && link.is_active,
  );

  if (targetLink && targetLink.url) {
    redirect(targetLink.url);
  }

  notFound();
}
