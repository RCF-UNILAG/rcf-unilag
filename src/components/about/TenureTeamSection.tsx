import Image from "next/image";
import type { Tenure } from "@/lib/archive";

interface TenureTeamSectionProps {
  tenure: Tenure;
  /** True when this tenure is the fellowship's current one. Only affects the eyebrow label. */
  isCurrent?: boolean;
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

export function TenureTeamSection({ tenure, isCurrent }: TenureTeamSectionProps) {
  const { executives, cohortName, year } = tenure;
  const teamDescription =
    tenure.teamDescription ||
    (cohortName
      ? `${cohortName} is the executive council of RCF UNILAG for ${year}.`
      : `The executive council of RCF UNILAG for ${year}.`);

  return (
    <section id="executives" className="bg-muted">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {isCurrent ? `Current Tenure · ${year}` : `${year} Tenure`}
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-foreground">
              {cohortName ? `Meet ${cohortName}` : "Meet the Team"}
            </h2>
          </div>

          <p className="text-foreground/70 leading-relaxed">{teamDescription}</p>
        </div>

        {executives.length > 0 ? (
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
        ) : (
          <p className="text-muted-foreground">
            No leadership details recorded for this tenure.
          </p>
        )}
      </div>
    </section>
  );
}
