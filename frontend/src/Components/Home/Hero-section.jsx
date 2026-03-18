import { useState } from "react";
import ecosystemImage from "../../assets/Screenshot 2026-03-18 114527.png";

function HeroSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 text-[#144a58] md:px-16 md:py-24 lg:px-24">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#1d6273]/18 via-[#4eaebe]/18 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gradient-to-tl from-[#7ed8e6]/28 via-[#4eaebe]/18 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8edf1] bg-[#f7fcfd] px-3 py-1 text-[11px] text-[#1d6273] backdrop-blur md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ed8e6] animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em]">
              Become a job-ready developer
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-[#144a58] md:text-5xl lg:text-6xl">
            Tech{" "}
            <span className="bg-gradient-to-r from-[#7ed8e6] via-[#4eaebe] to-[#1d6273] bg-clip-text text-transparent">
              software
            </span>
            <br />
            In Somalia
          </h1>

          <p className="mb-8 max-w-xl text-sm text-slate-600 md:text-base">
            By delivering industry-relevant training, we empower learners to
            unlock new career opportunities with confidence and strong
            capabilities.
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <a
              href="/curriculum"
              className="rounded-xl bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-6 py-3 font-semibold text-white shadow-lg shadow-[#1d6273]/15 transition-all hover:brightness-110"
            >
              Explore Courses
            </a>
            <a
              href="/about"
              className="rounded-xl border border-[#d8edf1] px-6 py-3 text-[#144a58] transition-all hover:border-[#7ed8e6] hover:bg-[#f4fbfd]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -top-4 -right-2 z-10 hidden items-center gap-2 rounded-2xl border border-[#7ed8e6]/40 bg-gradient-to-r from-[#1d6273]/10 to-[#7ed8e6]/20 px-4 py-2.5 shadow-lg shadow-[#1d6273]/10 backdrop-blur-md md:flex">
            <span className="text-2xl">🎓</span>
            <span className="text-xs font-semibold text-[#1d6273]">
              Livate Academy
            </span>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#1d6273]/12 via-[#4eaebe]/18 to-[#7ed8e6]/16 blur-xl opacity-80 transition-opacity group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-3xl border-2 border-[#d8edf1] shadow-2xl shadow-[#1d6273]/10">
              <div className="aspect-[4/3] min-h-[280px] w-full bg-gradient-to-br from-[#182636] via-[#122030] to-[#0c1824] md:aspect-video">
                <img
                  src={ecosystemImage}
                  alt="Livate Academy ecosystem image using your academy data"
                  className={`h-full w-full object-contain bg-[#122030] transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImgLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {!imgLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="flex gap-3 text-4xl md:text-5xl">
                      <span className="opacity-80">💻</span>
                      <span className="opacity-80">📱</span>
                      <span className="opacity-80">🌐</span>
                    </div>
                    <p className="max-w-xs text-center text-sm font-medium text-[#d7f7fb]">
                      Loading your Livate Academy data image
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#7ed8e6]/80 to-transparent" />
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#144a58]/20 to-transparent" />
            </div>

            <div className="absolute -bottom-3 -left-3 -z-10 h-20 w-20 rounded-2xl border border-[#7ed8e6]/20 bg-gradient-to-br from-[#1d6273]/15 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
