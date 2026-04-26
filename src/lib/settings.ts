import { fetchAndParseCSV } from "./csv";

export type SiteSettings = Record<string, string>;

const SITE_CSV_URL = process.env.NEXT_PUBLIC_SITE_CSV_URL;

const FALLBACK_SITE_SETTINGS_CSV = `Key,Value
about_heading,Who We Are
about_mission,"Our mission is to raise a generation of excellence, deeply rooted in the word of God and equipped to transform our campus."
about_vision,"To see every student on campus experience the love of Christ and discover their God-given purpose."
social_instagram,https://instagram.com/rcfunilag
social_twitter,https://x.com/rcfunilag
social_youtube,https://youtube.com/@rcfunilag
footer_email,hello@rcfunilag.org
`;

export const SITE_SETTINGS_TAG = 'site-settings';

export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await fetchAndParseCSV(SITE_CSV_URL, {
    fallbackCsvText: FALLBACK_SITE_SETTINGS_CSV,
    tags: [SITE_SETTINGS_TAG],
  });

  const settings = rows.reduce((acc, row) => {
    const key = row["Key"]?.trim();
    const value = row["Value"]?.trim() || "";

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {} as SiteSettings);

  return settings;
}