import type { Tenure } from "@/lib/archive";
import { TenureCarousel } from "./TenureCarousel";

interface CurrentTenureSectionProps {
  tenure: Tenure;
}

export function CurrentTenureSection({ tenure }: CurrentTenureSectionProps) {
  const president = tenure.executives.find(
    (e) => e.role.toLowerCase() === "president",
  ) ?? tenure.executives[0];

  return (
    <section className="bg-foreground">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ── Left column — copy ───────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                The Tenure
              </span>
            </div>

            {/* Heading + subtitle */}
            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none text-background">
                Phaneros Doxa
              </h2>
              <p className="font-display italic text-lg text-background/50">
                {tenure.theme}
              </p>
            </div>

            <div className="border-t border-background/10" />

            {/* Body copy */}
            <div className="flex flex-col gap-5 text-sm text-background/60 leading-relaxed">
              <p>
                Every time God gives a theme to a people, it is more than a
                slogan — it is a revelation of what He desires to do in a
                season. For this tenure, God has given us the theme PHANEROS
                DOXA, meaning Manifest Glory.
              </p>
              <p>
                The inspiration comes from John 2:11: &ldquo;&hellip;and
                manifested forth His glory.&rdquo; Throughout Scripture,
                whenever God revealed His Glory, men never remained the same.
                Moses encountered this Glory in Exodus 33&ndash;34. In 2
                Chronicles 5:13&ndash;14, the priests worshipped and the Glory
                of God filled the temple so strongly that they could not stand
                to minister.
              </p>
              <p>
                One thing is clear: nobody truly encounters the Glory of God and
                remains ordinary. This is what God is calling us into as a
                fellowship — not mere religion or routine Christianity, but a
                people who genuinely behold Him and carry His Presence.
              </p>
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-secondary pl-5 py-1">
              <p className="italic text-background/80 leading-relaxed text-sm">
                &ldquo;One thing is clear: nobody truly encounters the Glory of
                God and remains ordinary.&rdquo;
              </p>
            </blockquote>

            {/* Divider + sign-off */}
            {president && (
              <div className="flex flex-col gap-4">
                <div className="border-t border-background/10" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-background/80">
                    {president.name}
                  </p>
                  <p className="text-xs text-background/40 uppercase tracking-widest font-medium">
                    {president.role}, RCF UNILAG · {tenure.year}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right column — carousel ──────────────────────────────────── */}
          <TenureCarousel
            slides={[
              // Slide 1: President portrait
              {
                type: "president",
                photoUrl: president?.photoUrl,
                name: president?.name,
                role: president?.role,
              },
              // Slide 2: Tenure banner image (only when one is set)
              ...(tenure.bannerUrl
                ? [
                  {
                    type: "banner-image" as const,
                    imageUrl: tenure.bannerUrl,
                  },
                ]
                : []),
              {
                type: "banner-image",
                imageUrl: "https://res.cloudinary.com/dpjo7lpww/image/upload/v1782603276/thmg-1_umnaxb.jpg"
              },
              {
                type: "banner-image",
                imageUrl: "https://res.cloudinary.com/dpjo7lpww/image/upload/v1782603198/thmg-2_ane5og.jpg"
              },
              // Slide 3: Text/identity card — always present
              // {
              //   type: "banner-text" as const,
              //   theme: tenure.theme,
              //   year: tenure.year,
              // },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
