function ImpactHome() {
  const stats = [
    {
      id: 1,
      label: "Graduates",
      value: "500+",
      description: "Tech professionals trained",
      color: "from-[#1d6273] to-[#4eaebe]",
      emoji: "🎓",
    },
    {
      id: 2,
      label: "Coding Bootcamps",
      value: "9",
      description: "Specialized tech programs",
      color: "from-[#4eaebe] to-[#7ed8e6]",
      emoji: "💻",
    },
    {
      id: 3,
      label: "Campuses",
      value: "1",
      description: "State-of-the-art facilities",
      color: "from-[#1d6273] to-[#7ed8e6]",
      emoji: "🏢",
    },
    {
      id: 4,
      label: "Tech Events",
      value: "15",
      description: "Industry networking",
      color: "from-[#4eaebe] to-[#1d6273]",
      emoji: "🎯",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto mb-12 max-w-6xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#7ed8e6]">
          Our Impact
        </p>
        <h2 className="mb-3 text-3xl font-extrabold md:text-4xl lg:text-5xl">
          Our Impact
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
          Transforming lives through technology education and innovation.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col gap-4 rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-6 py-7 shadow-[0_18px_45px_rgba(29,98,115,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(29,98,115,0.12)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-3xl" aria-hidden="true">
                {item.emoji}
              </span>
              <div
                className={`rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-sm font-semibold text-white shadow-md`}
              >
                {item.value}
              </div>
            </div>

            <div className="mt-1 text-left">
              <h3 className="mb-1 text-lg font-semibold">{item.label}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImpactHome;
