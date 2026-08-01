import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getQuickLinkBySlug } from "@/lib/quick-links";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const targetLink = await getQuickLinkBySlug(slug);

  if (targetLink?.url) {
    return NextResponse.redirect(targetLink.url, 307);
  }

  notFound();
}
