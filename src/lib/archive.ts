import { unstable_cache } from "next/cache";
import { fetchAndParseCSV } from "./csv";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface LeadershipPastor {
  name: string;
  role: string;
  photoUrl: string;
}

export interface LeadershipTenure {
  year: string;    // e.g. "2025/2026"
  slug: string;    // e.g. "2025-2026" — derived at parse time, not at render time
  theme: string;
  description: string;
  pastors: LeadershipPastor[];
}

// ─── Mock / fallback data ────────────────────────────────────────────────────
// These will be swapped for real Google Sheets URLs via env vars.
// The shape of the CSV columns must remain stable for the swap to be seamless.

const MOCK_TENURES_CSV = `Year,Theme,Description
2025/2026,The Outpouring,A year characterized by revival and deep spiritual awakening across the campus.
2024/2025,Deeply Rooted,Our focus was establishing strong foundations in the Word of God.`;

const MOCK_PASTORS_CSV = `Year,Role,Name,PhotoUrl
2025/2026,President,John Doe,https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80
2025/2026,General Secretary,Jane Smith,https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80
2024/2025,President,David Ojo,https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80`;

// ─── Env-driven URLs (undefined → falls back to mock data above) ─────────────

const TENURES_CSV_URL = process.env.LEADERSHIP_TENURES_CSV_URL;
const PASTORS_CSV_URL = process.env.LEADERSHIP_PASTORS_CSV_URL;

export const LEADERSHIP_ARCHIVE_TAG = "leadership-archive";

// ─── Core fetch & parse (unwrapped) ─────────────────────────────────────────

async function fetchLeadershipArchive(): Promise<LeadershipTenure[]> {
  const [tenureRows, pastorRows] = await Promise.all([
    fetchAndParseCSV(TENURES_CSV_URL, {
      fallbackCsvText: MOCK_TENURES_CSV,
      tags: [LEADERSHIP_ARCHIVE_TAG],
    }),
    fetchAndParseCSV(PASTORS_CSV_URL, {
      fallbackCsvText: MOCK_PASTORS_CSV,
      tags: [LEADERSHIP_ARCHIVE_TAG],
    }),
  ]);

  // Index pastors by Year for O(1) join
  const pastorsByYear = new Map<string, LeadershipPastor[]>();
  for (const row of pastorRows) {
    const year = row["Year"] ?? "";
    if (!pastorsByYear.has(year)) pastorsByYear.set(year, []);
    pastorsByYear.get(year)!.push({
      name: row["Name"] ?? "",
      role: row["Role"] ?? "",
      photoUrl: row["PhotoUrl"] ?? "",
    });
  }

  const tenures: LeadershipTenure[] = tenureRows.map((row) => {
    const year = row["Year"] ?? "";
    return {
      year,
      // Slug is derived exactly once — here at parse time.
      slug: year.replace("/", "-"),
      theme: row["Theme"] ?? "",
      description: row["Description"] ?? "",
      pastors: pastorsByYear.get(year) ?? [],
    };
  });

  // Sort newest-first. "2025/2026" > "2024/2025" lexicographically, so a
  // simple string comparison works for the YYYY/YYYY format.
  tenures.sort((a, b) => b.year.localeCompare(a.year));

  return tenures;
}

// ─── Cached public export ────────────────────────────────────────────────────

export const getLeadershipArchive = unstable_cache(
  fetchLeadershipArchive,
  ["leadership-archive"],
  { tags: [LEADERSHIP_ARCHIVE_TAG] },
);
