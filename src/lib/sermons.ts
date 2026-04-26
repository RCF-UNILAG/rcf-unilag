import { fetchAndParseCSV } from "./csv";

export interface Sermon {
  id: string;
  date: string;
  title: string;
  speaker: string;
  description: string;
  youtube_link: string;
}

const SERMONS_CSV_URL = process.env.NEXT_PUBLIC_SERMONS_CSV_URL;

const FALLBACK_CSV_DATA = `Timestamp,Date Preached,Sermon Title,Speaker,Description,YouTube Link
4/20/2026 10:30:00,2026-04-19,Treasure in Earthen Vessels,Pastor Taiwo Tonade,"An encouraging message about God's power working through our weaknesses.",https://www.youtube.com/live/lff2BI8Ib8o?si=SUFs__iOeEEDHAiO&t=1566
4/13/2026 11:15:00,2026-04-12,The Path of the Just,Pastor Timilehin,"A deep dive into walking in righteousness and following God's light.",https://www.youtube.com/live/YHOhgr08poE?si=GPsXDJ_Sr5rssaL5&t=877
4/6/2026 09:45:00,2026-04-05,The Manifestation of Excellence,Pastor Taiwo Tonade,"Discovering how to cultivate and manifest a spirit of excellence in every area of life.",https://www.youtube.com/live/DEh6r_5uuqg?si=iCnbOFACYCaelUvN&t=2298
3/30/2026 14:20:00,2026-03-29,Stepping into Your Desired Miracle | Bible Study,Pastor Ezra Akanni,"A profound Bible study session on preparing for and positioning yourself to receive your miracle.",https://www.youtube.com/live/6HwnMKfmPw8?si=2w9yfXN-BoN2l_Zx&t=1298
3/23/2026 16:05:00,2026-03-22,The Builder's Ark,Pastor Tolulope Kayode,"Understanding God's principles for building a lasting and secure spiritual foundation.",https://www.youtube.com/live/AYR69vD0ZC4?si=hMXNou6EzgGh505D&t=1125
3/16/2026 10:10:00,2026-03-15,Koinonia,Pastor Taiwo Tonade,"Experiencing deep spiritual fellowship, partnership, and intimacy with the Holy Spirit.",https://www.youtube.com/live/8-ZVpptaf3s?si=aezP3kKtTz2yh3Mj&t=1489
`;

export const SERMONS_TAG = 'sermons';

export async function getSermons(): Promise<Sermon[]> {
  const rows = await fetchAndParseCSV(SERMONS_CSV_URL, {
    fallbackCsvText: FALLBACK_CSV_DATA,
    tags: [SERMONS_TAG],
  });

  const sermons: Sermon[] = rows
    .map((row, index) => ({
      id: String(index + 1),
      date: row["Date Preached"] ?? "",
      title: row["Sermon Title"] ?? "",
      speaker: row["Speaker"] ?? "",
      description:
        row["Description"] ||
        "Watch this powerful message from our fellowship.",
      youtube_link: row["YouTube Link"] ?? "",
    }))
    // Sort by date (newest first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return sermons;
}

export function getYouTubeVideoId(url: string): string | null {
  const YOUTUBE_ID_REGEX =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([\w-]{11})/;
  const match = url.match(YOUTUBE_ID_REGEX);
  return match?.[1] ?? null;
}
