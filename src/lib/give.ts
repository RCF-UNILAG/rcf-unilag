import { unstable_cache } from "next/cache";
import { fetchAndParseCSV } from "./csv";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GivingProject {
  /** Human-readable project name, e.g. "The 1k from 1k Initiative" */
  name: string;
  description: string;
  accountNumber: string;
  bank: string;
  /** The narration donors should add when transferring, e.g. "1k from 1k" */
  description2: string;
  /** Running total raised, in Naira */
  amountRaised: number;
  /** Number of individual contributors */
  donorCount: number;
  /** Fundraising goal, in Naira */
  goal: number;
  /** ISO date string of last update, e.g. "2026-06-27" */
  lastUpdated: string;
}

const MOCK_GIVING_PROJECTS_CSV = `Name,Description,AccountNumber,Bank,TransferDescription,AmountRaised,DonorCount,Goal,LastUpdated
The 1k from 1k Initiative,"Be one of the 1,000 individuals to give ₦1,000 each between now and the first Sunday in July to raise 1 million Naira together.",1020269239,United Bank for Africa (UBA),1k from 1k,0,0,1000000,2026-06-27T13:20:00+01:00
`;

// ─── Env-driven URL (undefined → falls back to mock data above) ───────────────

const GIVING_PROJECTS_CSV_URL = process.env.GIVING_PROJECTS_CSV_URL;

export const GIVING_TAG = "giving-projects";

// ─── Core fetch & parse ───────────────────────────────────────────────────────

async function fetchGivingProjects(): Promise<GivingProject[]> {
  const rows = await fetchAndParseCSV(GIVING_PROJECTS_CSV_URL, {
    fallbackCsvText: MOCK_GIVING_PROJECTS_CSV,
    tags: [GIVING_TAG],
  });

  return rows.map((row) => ({
    name: row["Name"] ?? "",
    description: row["Description"] ?? "",
    accountNumber: row["AccountNumber"] ?? "",
    bank: row["Bank"] ?? "",
    description2: row["TransferDescription"] ?? "",
    amountRaised: Number(row["AmountRaised"] ?? 0),
    donorCount: Number(row["DonorCount"] ?? 0),
    goal: Number(row["Goal"] ?? 1_000_000),
    lastUpdated: row["LastUpdated"] ?? "",
  }));
}

// ─── Cached public export ─────────────────────────────────────────────────────

export const getGivingProjects = unstable_cache(
  fetchGivingProjects,
  ["giving-projects"],
  { tags: [GIVING_TAG] },
);
