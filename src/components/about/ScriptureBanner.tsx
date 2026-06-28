export function ScriptureBanner() {
  return (
    <section className="bg-foreground relative overflow-hidden">
      {/* Decorative large opening quote */}
      <span
        className="absolute top-0 left-4 sm:left-10 select-none pointer-events-none font-display font-bold text-[20rem] leading-none text-background/5"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative section py-20 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <blockquote className="text-background">
          <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl leading-snug font-medium">
            But you are a chosen generation, a royal priesthood, a holy nation,
            His own special people, that you may proclaim the praises of Him who
            called you out of darkness into His marvellous light.
          </p>
        </blockquote>
        <cite className="text-muted-foreground text-sm uppercase tracking-widest font-semibold not-italic">
          1 Peter 2:9
        </cite>
      </div>
    </section>
  );
}
