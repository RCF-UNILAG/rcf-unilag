import Papa from "papaparse";

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

export async function getQuickLinks(): Promise<QuickLink[]> {
  if (!QL_CSV_URL) {
    return parseCSV(FALLBACK_CSV_DATA);
  }

  let csvText = FALLBACK_CSV_DATA;

  try {
    const response = await fetch(QL_CSV_URL, {
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      csvText = await response.text();
    }
  } catch {
    console.warn("Failed to fetch quick links CSV, using fallback data.");
  }

  return parseCSV(csvText);
}

async function parseCSV(csvText: string): Promise<QuickLink[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const links = results.data.map((link) => {
          return {
            title: link["Link Title"] ?? "",
            slug: link["Slug"] ?? "",
            url: link["Destination URL"] ?? "#",
            icon: link["Icon (Emoji)"] ?? "",
            is_active: link["Is Active"] !== "FALSE",
            order: link["Display Order"] ?? "0",
          };
        });

        const active = links
          .filter((link) => link.is_active)
          .sort((a, b) => Number(b.order) - Number(a.order));
        resolve(active);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
