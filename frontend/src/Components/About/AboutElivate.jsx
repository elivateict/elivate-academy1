function AboutElivate() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-10 h-52 w-52 rounded-full bg-gradient-to-br from-[#1d6273]/20 via-[#4eaebe]/18 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-gradient-to-tl from-[#7ed8e6]/26 via-[#4eaebe]/18 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-16 md:space-y-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d6273] md:text-sm">
            About Livate Academy
          </p>
          <h1 className="mb-4 text-3xl font-extrabold md:text-4xl lg:text-5xl">
            Shaping the Future of Tech Education
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            We&apos;re on a mission to transform passionate learners into
            exceptional tech professionals through innovative education and
            hands-on experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-7 py-7 shadow-[0_20px_60px_rgba(29,98,115,0.08)] md:px-9 md:py-9">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-10 left-0 h-40 w-40 rounded-full bg-[#1d6273]/12 blur-3xl" />
            </div>

            <div className="relative space-y-4">
              <h2 className="text-xl font-bold text-[#1d6273] md:text-2xl">
                Our Mission
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                At Livate Academy, our mission is to deliver high-quality
                technology and coding education to individuals who aspire to
                build successful careers in the rapidly growing digital world.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                We design our lessons and projects to provide a practical,
                industry-focused learning experience that prepares students to
                succeed in real technology environments.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                Our purpose is to create opportunities, encourage innovation,
                and equip learners with the skills required to solve real-world
                challenges through software and modern technology.
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-7 py-7 shadow-[0_20px_60px_rgba(29,98,115,0.08)] md:px-9 md:py-9">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-[#7ed8e6]/18 blur-3xl" />
            </div>

            <div className="relative space-y-4">
              <h2 className="text-xl font-bold text-[#1d6273] md:text-2xl">
                Our Vision
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                Our vision is to inspire people across Somalia and beyond to
                explore opportunities in technology, programming, and digital
                innovation.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                We believe that learning technology can empower a new generation
                to develop creative solutions that benefit their communities and
                the wider world.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                Our goal is to make tech education accessible and understandable
                for everyone, giving every motivated learner the chance to
                become a confident creator in the digital era.
              </p>
            </div>
          </article>
        </div>

        <section className="space-y-8">
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-2xl font-extrabold md:text-3xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
              Principles that guide how we teach, support, and grow with our
              learners every day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Innovation",
                description:
                  "Pushing the boundaries of technology education with cutting-edge curriculum.",
                emoji: "🚀",
              },
              {
                title: "Excellence",
                description:
                  "Committed to delivering the highest quality tech education and mentorship.",
                emoji: "💡",
              },
              {
                title: "Global Impact",
                description:
                  "Building a community of skilled developers ready to solve real problems.",
                emoji: "🌍",
              },
            ].map((value) => (
              <article
                key={value.title}
                className="flex flex-col gap-4 rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-7 py-7 shadow-[0_18px_50px_rgba(29,98,115,0.08)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eff9fb] ring-2 ring-[#d8edf1] text-xl">
                  <span aria-hidden="true">{value.emoji}</span>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutElivate;
