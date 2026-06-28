// const stats = [
//   { value: "2,000+", label: "Active Members" },
//   { value: "38+", label: "Years of Ministry" },
//   { value: "10+", label: "Fellowship Branches" },
//   { value: "300K+", label: "Lives Impacted" },
// ] as const;

export function MissionVisionSection() {
  return (
    <section>
      {/* Cards area */}
      <div className="section pb-0">
        {/* Section header */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-3">
            {/* <span className="block h-px w-10 bg-primary" /> */}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              What We Stand For
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-foreground">
            Mission &amp; Vision
          </h2>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-border rounded-xl overflow-hidden">
          {/* Card 1 — Mission */}
          <article className="relative bg-card p-8 lg:p-12 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border">
            <span
              className="absolute top-4 right-6 font-display font-bold text-7xl lg:text-9xl leading-none text-border/40 select-none pointer-events-none"
              aria-hidden="true"
            >
              01
            </span>
            <div className="flex flex-col gap-2 relative z-10">
              <h3 className="font-display font-bold text-xl tracking-tight text-foreground">
                Our Mission
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                To establish a vibrant, Christ-centred community within the
                University of Lagos — reaching every student, nurturing every
                believer, and ensuring that no part of this campus remains
                untouched by the love and message of Jesus Christ.
              </p>
            </div>
          </article>

          {/* Card 2 — Vision */}
          <article className="relative bg-card p-8 lg:p-12 flex flex-col gap-6">
            <span
              className="absolute top-4 right-6 font-display font-bold text-7xl lg:text-9xl leading-none text-border/40 select-none pointer-events-none"
              aria-hidden="true"
            >
              02
            </span>
            <div className="flex flex-col gap-2 relative z-10">
              <h3 className="font-display font-bold text-xl tracking-tight text-foreground">
                Our Vision
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                To see every student at the University of Lagos walking in the
                complete freedom and victory that God has made available through
                Christ Jesus — spiritually alive, academically excellent, and
                relationally whole.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Stats band */}
      {/* <div className="mt-12 bg-primary">
        <div className="section py-12">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center px-4 py-6 ${index < stats.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-primary-foreground/20"
                  : ""
                  } ${
                  // On mobile 2-col: add bottom border to first row (items 0 and 1)
                  index === 0 || index === 1
                    ? "border-b lg:border-b-0"
                    : ""
                  }`}
              >
                <dt className="font-display font-bold text-4xl sm:text-5xl text-primary-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-primary-foreground/60 font-semibold">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div> */}
    </section>
  );
}
