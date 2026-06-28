const pillars = [
  {
    index: "01",
    title: "The Word of God & Prayer",
    description:
      "Scripture is the non-negotiable foundation of all we do. Through systematic Bible study, consistent corporate prayer, and personal devotion, we build believers who know God intimately — not just know of Him. Every spiritual activity flows from this.",
    tag: "Scripture & Prayer",
  },
  {
    index: "02",
    title: "Evangelism & Outreach",
    description:
      "The gospel moves outward by design. Faculty missions, hostel outreaches, and campus-wide evangelism are not occasional events — they are the heartbeat of our mandate. We exist to bring others in, not to remain a closed community.",
    tag: "Evangelism",
  },
  {
    index: "03",
    title: "Fellowship & Community",
    description:
      "We are one family — a home away from home for every Alakite. Through genuine community, intentional discipleship, and mutual care, RCF UNILAG provides every student a place of belonging, accountability, and deep spiritual friendship.",
    tag: "Community",
  },
] as const;

export function PillarsSection() {
  return (
    <section className="section">
      {/* Two-column header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-end">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* <span className="block h-px w-10 bg-primary" /> */}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              How We Operate
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-foreground">
            Three <em>Pillars</em>
          </h2>
        </div>
        <p className="text-foreground/70 leading-relaxed">
          Every programme, gathering, and initiative within RCF UNILAG is built
          upon three enduring commitments. These are not aspirational values —
          they are the active disciplines that have sustained and grown this
          fellowship through every tenure since 1986.
        </p>
      </div>

      {/* Pillar rows */}
      <ol className="flex flex-col">
        {pillars.map((pillar, i) => (
          <li
            key={pillar.index}
            className={`grid grid-cols-[5rem_1fr] lg:grid-cols-[5rem_1fr_auto] items-start gap-x-6 py-10 border-t border-border ${i === pillars.length - 1 ? "border-b" : ""
              }`}
          >
            {/* Index number */}
            <span
              className="font-display font-bold text-5xl lg:text-7xl leading-none text-border select-none"
              aria-hidden="true"
            >
              {pillar.index}
            </span>

            {/* Body */}
            <div className="flex flex-col gap-2 pt-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed max-w-prose">
                {pillar.description}
              </p>
            </div>

            {/* Tag badge — hidden on mobile */}
            <div className="hidden lg:flex items-start pt-2">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap">
                {pillar.tag}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
