import Image from "next/image";
import type { Executive } from "@/lib/archive";

interface MeetTheTeamSectionProps {
  executives: Executive[];
  tenureYear: string;
}

function PersonPlaceholder() {
  return (
    <svg
      className="w-10 h-10 text-muted-foreground/30"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="22" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MeetTheTeamSection({
  executives,
  tenureYear,
}: MeetTheTeamSectionProps) {
  return (
    <section id="executives" className="bg-muted">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Current Tenure · {tenureYear}
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-foreground">
              Meet Doxa 45
            </h2>
          </div>

          <p className="text-foreground/70 leading-relaxed">
            Doxa 45 is the forty-fifth executive council of RCF UNILAG — raised
            from within this same fellowship, entrusted with the vision for this
            season, and set apart to carry the manifest glory of God to every
            corner of this campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
          {executives.map((exec) => (
            <article
              key={`${exec.name}-${exec.role}`}
              className="flex flex-col bg-card"
            >
              {/* Image area */}
              <div className="aspect-[3/4] w-full bg-muted relative flex items-center justify-center overflow-hidden">
                {exec.photoUrl ? (
                  <Image
                    src={exec.photoUrl}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <PersonPlaceholder />
                )}
              </div>

              {/* Info area */}
              <div className="p-3.5 flex flex-col gap-0.5 border-t border-border">
                <p className="text-[13px] font-medium text-foreground leading-snug">
                  {exec.name}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {exec.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
