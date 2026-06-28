import Image from "next/image";

const STORY_IMAGE_SRC =
  "https://res.cloudinary.com/dpjo7lpww/image/upload/v1782605665/thmg-4_vwcpjo.jpg";

function StoryImagePlaceholder() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        className="w-24 h-24 text-muted-foreground/20"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="20"
          y="8"
          width="56"
          height="56"
          rx="6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="48" cy="78" r="16" stroke="currentColor" strokeWidth="2" />
        <line
          x1="48"
          y1="64"
          x2="48"
          y2="62"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function StorySection() {
  return (
    <section id="our-story" className="section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: Copy */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow label */}
          <div className="flex items-center gap-3">
            {/* <span className="block h-px w-10 bg-primary" /> */}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Story
            </span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-tight text-foreground">
            Rooted in Faith.
            <br />
            Anchored in Purpose.
          </h2>

          <div className="flex flex-col gap-6 text-foreground/80 leading-relaxed">
            <p>
              The Redeemed Christian Fellowship, UNILAG Chapter, is an arm of
              Christ the Redeemer&apos;s Ministry, a subsidiary of the Redeemed
              Christian Church of God operating under the apostolic oversight of
              Pastor E.A. Adeboye. We were established at the University of
              Lagos in 1986 with a single, unwavering mandate: to take the
              gospel to every student, every faculty, and every corridor of
              campus life.
            </p>
            <p>
              We are not merely a campus programme. We are a living community —
              one that has, through nearly four decades and hundreds of tenures,
              seen students transformed by the power of the Word of God,
              discipled in prayer, and released into the world as vessels of
              lasting impact.
            </p>
            <p className="font-semibold text-foreground">
              Our identity is the Chosen Generation. Our commission is the
              campus. Our method is Christ.
            </p>
          </div>
        </div>

        {/* Right: Image + blockquote */}
        <div className="flex flex-col gap-6">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full bg-muted border border-border rounded-xl overflow-hidden">
            {STORY_IMAGE_SRC ? (
              <Image
                src={STORY_IMAGE_SRC}
                alt="RCF UNILAG — one family"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <StoryImagePlaceholder />
            )}
          </div>

          {/* Blockquote */}
          {/* <blockquote className="border-l-4 border-primary pl-5 py-1">
            <p className="italic text-foreground/70 leading-relaxed">
              &ldquo;We are the chosen generation, called to shine in the heart
              of the university.&rdquo;
            </p>
          </blockquote> */}
        </div>
      </div>
    </section>
  );
}
