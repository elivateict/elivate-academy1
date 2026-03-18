function CoursesHome() {
  const courses = [
    {
      id: 1,
      title: "Web Development",
      level: "Beginner to Advanced",
      badge: "Most Popular",
      description:
        "Master modern web foundations from Figma designs to fully responsive frontends and production-ready backends.",
      topics: [
        "Figma UI Design",
        "HTML & CSS",
        "Tailwind CSS",
        "JavaScript & React",
        "Node.js, Express & Mongoose",
        "Intro to AI for web",
      ],
      color: "from-[#1d6273] via-[#4eaebe] to-[#7ed8e6]",
      icon: "🌐",
    },
    {
      id: 2,
      title: "IoT Development",
      level: "Beginner to Advanced",
      badge: "Most Innovative",
      description:
        "Learn how to build smart systems by connecting hardware devices with software and the internet.",
      topics: [
        "Arduino & Microcontroller Basics",
        "Sensors & Actuators Integration",
        "IoT Communication (WiFi, Bluetooth, MQTT)",
        "Embedded Programming (C/C++)",
        "Cloud IoT Platforms",
        "Smart Device Project Development",
      ],
      projects: [
        "Smart Home Automation System",
        "Smart Temperature & Humidity Monitor",
        "IoT-Based Security Alarm System",
        "Smart Irrigation System",
        "Remote Device Control with Mobile/Web",
      ],
      color: "from-[#4eaebe] via-[#1d6273] to-[#7ed8e6]",
      icon: "📡",
    },
    {
      id: 3,
      title: "Mobile App Development",
      level: "Beginner to Advanced",
      badge: "New",
      description:
        "Build beautiful, high-performance mobile apps using Flutter for Android, iOS, and beyond.",
      topics: [
        "Flutter & Dart fundamentals",
        "Modern UI layouts",
        "State management basics",
        "REST APIs & JSON",
        "Publishing & deployment overview",
      ],
      color: "from-[#7ed8e6] via-[#4eaebe] to-[#1d6273]",
      icon: "📱",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto mb-12 max-w-6xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#7ed8e6] md:text-base">
          Our Programs
        </p>
        <h2 className="mb-3 text-3xl font-extrabold md:text-4xl lg:text-5xl">
          Career-Ready Tech Courses
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
          Choose a learning path that matches your ambition from modern web
          development to mobile apps.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="group relative h-full overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] shadow-[0_18px_50px_rgba(29,98,115,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(29,98,115,0.12)]"
          >
            <div
              className={`absolute inset-x-0 -top-24 h-40 bg-gradient-to-r ${course.color} opacity-20 blur-3xl group-hover:opacity-35`}
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col gap-4 p-7">
              <div className="mb-1 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eff9fb] ring-2 ring-[#d8edf1] text-2xl">
                    <span aria-hidden="true">{course.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-xs text-slate-500">{course.level}</p>
                  </div>
                </div>

                <span className="rounded-full bg-[#eff9fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1d6273]">
                  {course.badge}
                </span>
              </div>

              <p className="text-sm text-slate-600">{course.description}</p>

              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {course.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1d6273]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {course.projects && (
                <div className="mt-2">
                  <p className="mb-1.5 text-xs font-semibold text-[#1d6273]">
                    Projects Students Will Build:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {course.projects.map((project) => (
                      <li key={project} className="flex items-start gap-2">
                        <span className="text-[#1d6273]">•</span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#d8edf1] pt-3">
                <button className="rounded-xl bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110">
                  View Curriculum
                </button>
                <button className="text-sm text-[#1d6273] underline-offset-4 hover:text-[#144a58] hover:underline">
                  Talk to advisor
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CoursesHome;
