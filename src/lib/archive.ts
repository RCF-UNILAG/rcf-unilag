import { unstable_cache } from "next/cache";
import { fetchAndParseCSV } from "./csv";

export interface Executive {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Tenure {
  year: string;
  slug: string;
  theme: string;
  description: string;
  bannerUrl: string;
  executives: Executive[];
}

// ─── Mock / fallback data ────────────────────────────────────────────────────
// These will be swapped for real Google Sheets URLs via env vars.
// The shape of the CSV columns must remain stable for the swap to be seamless.

const MOCK_TENURES_CSV = `Year,Theme,Description,BannerUrl
2025/2026,The Tenure of His Manifest Glory,A year characterized by revival and deep spiritual awakening across the campus.,https://res.cloudinary.com/dpjo7lpww/image/upload/v1782603276/thmg-1_umnaxb.jpg
`;

const MOCK_PASTORS_CSV = `Year,Role,Name,PhotoUrl
2025/2026,President,Taiwo Tonade,https://res.cloudinary.com/dpjo7lpww/image/upload/v1782535779/taiwo_sjnvtt.jpg
2025/2026,Vice President I & Workers Director,Iyanuoluwa Adeboye,
2025/2026,Vice President II & Alumni Coordinator,Timilehin Alegbeleye,
2025/2026,General Secretary,Oyinkansola Odunlade,https://res.cloudinary.com/dpjo7lpww/image/upload/v1782602802/oyinkansola_rie971.jpg
`;

// ─── Env-driven URLs (undefined → falls back to mock data above) ─────────────

const TENURES_CSV_URL = process.env.TENURES_CSV_URL;
const EXECUTIVES_CSV_URL = process.env.EXECUTIVES_CSV_URL;

export const TENURE_TAG = "leadership-archive";

async function fetchTenures(): Promise<Tenure[]> {
  const [tenureRows, pastorRows] = await Promise.all([
    fetchAndParseCSV(TENURES_CSV_URL, {
      fallbackCsvText: MOCK_TENURES_CSV,
      tags: [TENURE_TAG],
    }),
    fetchAndParseCSV(EXECUTIVES_CSV_URL, {
      fallbackCsvText: MOCK_PASTORS_CSV,
      tags: [TENURE_TAG],
    }),
  ]);

  const executivesByYear = new Map<string, Executive[]>();
  for (const row of pastorRows) {
    const year = row["Year"] ?? "";
    if (!executivesByYear.has(year)) executivesByYear.set(year, []);
    executivesByYear.get(year)!.push({
      name: row["Name"] ?? "",
      role: row["Role"] ?? "",
      photoUrl: row["PhotoUrl"] ?? "",
    });
  }

  const tenures: Tenure[] = tenureRows.map((row) => {
    const year = row["Year"] ?? "";
    const theme = row["Theme"] ?? "";
    return {
      year,
      slug: theme.replace(" ", "-").toLowerCase(),
      theme,
      description: row["Description"] ?? "",
      bannerUrl: row["BannerUrl"] ?? "",
      executives: executivesByYear.get(year) ?? [],
    };
  });

  // Sort newest-first. "2025/2026" > "2024/2025" lexicographically, so a
  // simple string comparison works for the YYYY/YYYY format.
  tenures.sort((a, b) => b.year.localeCompare(a.year));

  return tenures;
}

export const getTenures = unstable_cache(
  fetchTenures,
  ["leadership-archive"],
  { tags: [TENURE_TAG] },
);
