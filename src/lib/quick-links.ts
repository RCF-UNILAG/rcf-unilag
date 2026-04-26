import { fetchAndParseCSV } from "./csv";

export interface QuickLink {
  title: string;
  slug: string;
  url: string;
  icon: string;
  is_active: boolean;
  order: string;
}

const QL_CSV_URL = process.env.NEXT_PUBLIC_QL_CSV_URL;

const FALLBACK_CSV_DATA = `Timestamp,Link Title,Destination URL,Slug,Icon (Emoji),Is Active,Display Order
4/26/2026 10:00:00,Join our WhatsApp Community,https://chat.whatsapp.com/example,whatsapp,💬,TRUE,10
4/26/2026 10:05:00,Give / Donate,https://paystack.com/example,give,💸,TRUE,9
4/26/2026 10:10:00,Register for Camp Meeting 2026,https://forms.gle.com/example,camp-2026,🏕️,TRUE,8
4/26/2026 10:15:00,Prayer Requests,https://forms.gle.com/prayer,prayer,🙏,TRUE,7
4/26/2026 10:20:00,Follow us on Instagram,https://instagram.com/rcfunilag,instagram,📸,TRUE,6
4/26/2026 10:25:00,Subscribe on YouTube,https://youtube.com/@rcfunilag,youtube,▶️,TRUE,5
4/26/2026 10:30:00,Old Prayer Hotline,https://example.com/old,old-prayer,📞,FALSE,4
`;

export const QUICK_LINK_TAG = 'quick-links';

export async function getQuickLinks({ includeInactive = false } = {}): Promise<QuickLink[]> {
  const rows = await fetchAndParseCSV(QL_CSV_URL, {
    fallbackCsvText: FALLBACK_CSV_DATA,
    tags: [QUICK_LINK_TAG],
  });

  const links: QuickLink[] = rows.map((link) => ({
    title: link["Link Title"] ?? "",
    slug: link["Slug"] ?? "",
    url: link["Destination URL"] ?? "#",
    icon: link["Icon (Emoji)"] ?? "",
    is_active: link["Is Active"] !== "FALSE",
    order: link["Display Order"] ?? "0",
  }));
  console.log("links", links)

  const filteredLinks = includeInactive ? links : links.filter((link) => link.is_active);

  return filteredLinks.sort((a, b) => Number(b.order) - Number(a.order));
}

