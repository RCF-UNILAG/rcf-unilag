import { unstable_cache } from "next/cache";
import { fetchAndParseCSV } from "./csv";
import { slugify } from "./utils";
import { parseTenureYearRange } from "./tenure-date";

export interface Executive {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Tenure {
  /** Raw `ID` column value, e.g. "2025/2026". Used as the join key with the Executives sheet — display elsewhere via period/endLabel instead. */
  id: string;
  /** Full range, formatted for display, e.g. "2025/2026" or "August, 2025 – August, 2026". */
  period: string;
  /** End of the range only, formatted for display, e.g. "2026" or "August, 2026". */
  endLabel: string;
  slug: string;
  /** Short motto/badge, e.g. "Phaneros Doxa" — the primary heading on the tenure page. */
  name: string;
  /** Descriptive sentence, e.g. "The Tenure of His Manifest Glory" — shown as a subtitle. */
  theme: string;
  description: string;
  /** President's speech / theme reflection. Lightweight markdown: blank-line-separated paragraphs, **bold**, *italic*, and a blockquote (lines starting with `>`) for the pull quote. */
  speech: string;
  /** e.g. "Doxa 45" — used for the "Meet {cohortName}" heading. */
  cohortName: string;
  /** Blurb under the "Meet the Team" heading. Falls back to a generic sentence when empty. */
  teamDescription: string;
  bannerUrl: string;
  /** Extra carousel images, beyond the banner. */
  galleryUrls: string[];
  executives: Executive[];
}

// ─── Mock / fallback data ────────────────────────────────────────────────────
// These are used if the live Google Sheets URLs are unreachable. The shape of
// the CSV columns must remain stable for the swap to be seamless.

const MOCK_TENURES_CSV = `ID,Period,Name,Theme,Description,Speech,Cohort Name,Team Description,Banner URL,Gallery URLs
2025/2026, August 2025 - August 2026,Phaneros Doxa,The Tenure of His Manifest Glory,A year characterized by revival and deep spiritual awakening across the campus.,"Every time God gives a theme to a people, it is more than a slogan — it is a revelation of what He desires to do in a season. For this tenure, God has given us the theme **PHANEROS DOXA**, meaning *Manifest Glory*.

The inspiration comes from John 2:11: ""...and manifested forth His glory."" Throughout Scripture, whenever God revealed His Glory, men never remained the same. Moses encountered this Glory in Exodus 33—34. In 2 Chronicles 5:13—14, the priests worshipped and the Glory of God filled the temple so strongly that they could not stand to minister.

One thing is clear: nobody truly encounters the Glory of God and remains ordinary. This is what God is calling us into as a fellowship — not mere religion or routine Christianity, but a people who genuinely behold Him and carry His Presence.

> One thing is clear: nobody truly encounters the Glory of God and remains ordinary.",Doxa 45,"Doxa 45 is the forty-fifth executive council of RCF UNILAG, raised from within this same fellowship as Davids from the bush, entrusted with the vision for this season, and set apart to carry the manifest glory of God to every corner of this campus.",https://res.cloudinary.com/dpjo7lpww/image/upload/v1782603276/thmg-1_umnaxb.jpg,https://res.cloudinary.com/dpjo7lpww/image/upload/v1782633721/glorious4_pcktuh.jpg|https://res.cloudinary.com/dpjo7lpww/image/upload/v1782603198/thmg-2_ane5og.jpg
`;

const MOCK_PASTORS_CSV = `Tenure ID,Role,Name,Photo URL
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

  const executivesById = new Map<string, Executive[]>();
  for (const row of pastorRows) {
    const id = row["Tenure ID"] ?? "";
    if (!executivesById.has(id)) executivesById.set(id, []);
    executivesById.get(id)!.push({
      name: row["Name"] ?? "",
      role: row["Role"] ?? "",
      photoUrl: row["PhotoUrl"] ?? "",
    });
  }

  const ranked = tenureRows.map((row) => {
    const id = row["ID"] ?? "";
    const theme = row["Theme"]?.trim() ?? "";
    const name = row["Name"]?.trim() ?? "";
    const { yearLabel, endLabel, sortKey } = parseTenureYearRange(row["Period"] ?? "");
    const tenure: Tenure = {
      id,
      period: yearLabel,
      endLabel,
      slug: slugify(name || id),
      name,
      theme,
      description: row["Description"] ?? "",
      speech: row["Speech"] ?? "",
      cohortName: row["Cohort Name"] ?? "",
      teamDescription: row["Team Description"] ?? "",
      bannerUrl: row["Banner URL"] ?? "",
      galleryUrls:
        row["Gallery URLs"]
          ?.split("|")
          .map((s) => s.trim())
          .filter(Boolean) ?? [],
      executives: executivesById.get(id) ?? [],
    };
    return { tenure, sortKey };
  });

  // Sort newest-first by the parsed end date, so month-aware ranges
  // ("August 2025/August 2026") sort correctly alongside plain years.
  ranked.sort((a, b) => b.sortKey - a.sortKey);

  return ranked.map((r) => r.tenure);
}

export const getTenures = unstable_cache(
  fetchTenures,
  ["leadership-archive"],
  { tags: [TENURE_TAG] },
);
