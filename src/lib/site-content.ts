import { fetchAndParseCSV } from "./csv";

export type SiteContent = Record<string, string>;

const SITE_CONTENT_CSV_URL = process.env.NEXT_PUBLIC_SITE_CONTENT_CSV_URL;

const FALLBACK_SITE_CONTENT_CSV = `Key,Value
about_heading,Who We Are
about_mission,"Our mission is to raise a generation of excellence, deeply rooted in the word of God and equipped to transform our campus."
about_vision,"To see every student on campus experience the love of Christ and discover their God-given purpose."
social_instagram,https://instagram.com/rcfunilag
social_twitter,https://x.com/rcfunilag
social_youtube,https://youtube.com/@rcfunilag
footer_email,officialrcfunilag@gmail.com
link_become_a_member,/ql/join
link_give,/ql/give
link_youtube_live,https://www.youtube.com/@rcfunilagtv
link_phone,tel:+2349091488306
link_substack_embed,https://rcfunilag.substack.com/embed?background=transparent
home_hero_image,https://res.cloudinary.com/dpjo7lpww/image/upload/v1781396846/4cce8efd6dfc1f090d1bd130ffa0ed7a3a925264_vtomzv.jpg
home_sunday_image,https://res.cloudinary.com/dpjo7lpww/image/upload/v1781396840/15d9f3f201166fa93ac1067d4f244211d3fcbaba_1_t0tx5x.jpg
story_image,https://res.cloudinary.com/dpjo7lpww/image/upload/v1782605665/thmg-4_vwcpjo.jpg
pillar_word_image,/images/pillar-word.jpg
pillar_love_image,/images/pillar-love.jpg
pillar_excellence_image,/images/pillar-excellence.png
`;

export const SITE_CONTENT_TAG = 'site-content';

export async function getSiteContent(): Promise<SiteContent> {
  const rows = await fetchAndParseCSV(SITE_CONTENT_CSV_URL, {
    fallbackCsvText: FALLBACK_SITE_CONTENT_CSV,
    tags: [SITE_CONTENT_TAG],
  });

  const content = rows.reduce((acc, row) => {
    const key = row["Key"]?.trim();
    const value = row["Value"]?.trim() || "";

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {} as SiteContent);

  return content;
}
