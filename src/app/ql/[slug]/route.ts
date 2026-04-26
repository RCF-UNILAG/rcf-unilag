import { NextResponse } from "next/server";
import { getQuickLinks } from "@/lib/quick-links";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const links = await getQuickLinks({ includeInactive: true });

  const targetLink = links.find(
    (link) => link.slug?.toLowerCase() === slug.toLowerCase(),
  );

  if (targetLink && targetLink.url) {
    return NextResponse.redirect(targetLink.url, 307);
  }

  const notFoundUrl = new URL('/404', request.url);
  return NextResponse.redirect(notFoundUrl, 307);
}