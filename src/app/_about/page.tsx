const backgroundUrl =
  "https://rcfunilag.com/wp-content/uploads/2023/05/Snapinsta.app_319123953_447057657639854_8008908822574769902_n_1024-1-e1685060519110.jpg.webp";

export default function About() {
  return (
    <div>
      <div className="relative h-[500px] isolate bg-black/90 [&>div]:mix-blend-luminosity">
        <div
          style={{ "--bg-url": `url(${backgroundUrl})` } as React.CSSProperties}
          className="size-full bg-(image:--bg-url) bg-black bg-no-repeat bg-cover bg-bottom"
        />
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black via-transparent to-black" />
      </div>
      <section className="section relative flex flex-col gap-24">
        <div className="max-w-3xl space-y-2 mx-auto">
          <h1 className="text-4xl font-bold font-display tracking-tighter uppercase text-balance sm:text-6xl">
            We are the{" "}
            <span className="text-primary">
              Redeemed Christian Fellowship, UNILAG
            </span>
          </h1>
          <p className="text-lg">
            We are RCF UNILAG, the campus fellowship of Christ the
            Redeemer&apos;s Ministry (RCCG). We are unapologetically
            Christ-centred, we carry a mandate to illuminate our world, from
            this campus to the world. We are the Chosen Generation.
          </p>
        </div>
        {/* <div className="flex flex-col gap-8 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center-safe gap-6">
            <div className="w-full h-[250px] relative">
              <Image
                src="/images/mission.webp"
                alt="mission"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase">Our Mission</h3>
              <p>
                <ul className="list-decimal list-inside">
                  <li>To make heaven.</li>
                  <li>
                    To take as many people (students, corpers, youth) with us.
                  </li>
                  <li>
                    To have a member of RCF/RCCF in every family across the
                    nation.
                  </li>
                  <li>
                    To accomplish No. 1 above, holiness will be our lifestyle.
                  </li>
                  <li>
                    To accomplish No. 2 and 3 above, we will plant fellowships
                    within every campus (federal universities, polytechnics,
                    colleges, technical schools, etc) across the nation. We will
                    pursue these objectives until every nation in the world is
                    reached for the Lord Jesus Christ.
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center-safe gap-6">
            <div className="w-full h-[250px] relative">
              <Image
                src="/images/vision.webp"
                alt="mission"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase">Our Vision</h3>
              <p>
                RCF UNILAG Chapter envisions a vibrant and diverse campus
                fellowship within the University of Lagos, where students are
                transformed through the love of Christ. We aim to create an
                inclusive community that embraces students from various
                backgrounds, nations, and cultures. Our vision is to empower
                young leaders to become influential voices on campus, spreading
                the message of Christ and igniting a spiritual awakening.
                Through vibrant worship, authentic fellowship, and a focus on
                individual growth, we provide a nurturing environment for
                students to develop their faith. RCF UNILAG aspires to be a
                catalyst for positive change, impacting lives and inspiring a
                generation rooted in love and committed to the spiritual
                transformation of the University of Lagos community.
              </p>
            </div>
          </div>
        </div> */}
      </section>
      {/* <section id="executives" className="section space-y-8">
        <h1 className="text-5xl font-black uppercase text-center">
          Our <span className="text-primary">Executives</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {new Array(12).fill(0).map((item, index) => (
            <div key={index} className="h-[300px] bg-muted" />
          ))}
        </div>
      </section> */}
    </div>
  );
}
