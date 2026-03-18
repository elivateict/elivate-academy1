function Choose() {
  const reasons = [
    {
      id: 1,
      title: "Modern Tech Stack",
      description:
        "Learn the same tools used by high-growth startups and global tech companies.",
      emoji: "💻",
      highlight: "Hands-on projects & real code reviews.",
    },
    {
      id: 2,
      title: "Continuous Learning",
      description:
        "Always-updated curriculum so you stay aligned with industry trends and best practices.",
      emoji: "🔁",
      highlight: "Weekly workshops & community support.",
    },
    {
      id: 3,
      title: "Career Launch",
      description:
        "From CV to portfolio to interviews, we guide you until you land real opportunities.",
      emoji: "🚀",
      highlight: "Career coaching, mock interviews & referrals.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto mb-12 max-w-5xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#7ed8e6] md:text-base">
          Why Choose Our Academy
        </p>
        <h2 className="mb-3 text-3xl font-extrabold md:text-4xl lg:text-5xl">
          Experience Future-Ready Tech Education
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
          We blend practical skills, mentorship, and career support to help you
          move from beginner to job-ready with confidence.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {reasons.map((reason) => (
          <article
            key={reason.id}
            className="relative overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-7 py-8 shadow-[0_18px_45px_rgba(29,98,115,0.08)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(126,216,230,0.26),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(29,98,115,0.12),transparent_55%)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(29,98,115,0.12)]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff9fb] ring-2 ring-[#d8edf1] text-2xl">
              <span aria-hidden="true">{reason.emoji}</span>
            </div>

            <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
            <p className="mb-3 text-sm text-slate-600">{reason.description}</p>
            <p className="text-xs font-medium text-[#1d6273]">
              {reason.highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Choose;
