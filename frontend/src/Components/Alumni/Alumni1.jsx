const alumni = [
  {
    name: "Cumar Axmed",
    role: "Software Engineer ",
    course: "Full Stack Development",
    image: "/images/alumni-hani.png",
  },
  {
    name: "Fadumo Maxamed",
    role: "Founder ",
    course: "Mobile Development (Flutter)",
    image: "/images/alumni-abshira.png",
  },
  {
    name: "Maxamed Cismaan",
    role: "IoT Engineer ",
    course: "IoT Development",
    image: "/images/alumni-asha-abshir.png",
  },
  {
    name: "Hodan Cali",
    role: "IT Support Lead ",
    course: "Basic Computer Skills",
    image: "/images/alumni-habiba.png",
  },
  {
    name: "Cabdiraxmaan Nuur",
    role: "Fullstack Developer ",
    course: "Full Stack Development",
    image: "/images/alumni-asha-kahie.png",
  },
  {
    name: "Ubax Cismaan",
    role: "Mobile App Developer",
    course: "Mobile Development (Flutter)",
    image: "/images/alumni-asha-hassan.png",
  },
  {
    name: "Axmed Yuusuf",
    role: "IoT Engineer ",
    course: "IoT Development",
    image: "/images/alumni-faiza.png",
  },
  {
    name: "Maryan Cabdi",
    role: "Office Administrator ",
    course: "Basic Computer Skills",
    image: "/images/alumni-nasteha.png",
  },
];

function Alumni1() {
  return (
    <section className="bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto mb-12 max-w-6xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d6273] md:text-sm">
          Alumni Success
        </p>
        <h1 className="mb-3 text-3xl font-extrabold md:text-4xl lg:text-5xl">
          Meet Our Graduates
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base">
          From bootcamp to the global tech industry, our alumni are building
          products, leading teams, and inspiring the next generation of Somali
          technologists.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {alumni.map((person) => (
          <article
            key={person.name}
            className="group relative overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] shadow-[0_18px_50px_rgba(29,98,115,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(29,98,115,0.12)]"
          >
            <div
              className="absolute inset-x-0 -top-20 h-32 bg-gradient-to-b from-[#1d6273]/30 via-[#7ed8e6]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-4 px-6 pt-8 pb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-[#1d6273] via-[#4eaebe] to-[#7ed8e6] p-[3px] shadow-lg shadow-[#1d6273]/15">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 right-0 h-4 w-4 rounded-full border-2 border-white bg-[#7ed8e6]" />
              </div>

              <div className="text-center">
                <h2 className="mb-1 text-base font-semibold text-[#1d6273] md:text-lg">
                  {person.name}
                </h2>
                <p className="mb-1.5 text-xs text-slate-600 md:text-sm">
                  {person.role}
                </p>
                <span className="inline-block rounded-full bg-[#eff9fb] px-2.5 py-0.5 text-[10px] font-medium text-[#1d6273]">
                  {person.course}
                </span>
              </div>

              <div className="mt-3 flex w-full items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#1d6273]/80">
                  Livate Academy Alumni
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Alumni1;
