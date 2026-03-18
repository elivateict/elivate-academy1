import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/api";

function HackthonPost() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(apiUrl("/api/hackathons"));
        const data = await response.json();

        if (
          response.ok &&
          data.success &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setHackathons(data.data);
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <section className="bg-white py-16 text-[#144a58] md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-0">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#1d6273]">
              Livate Academy Hackathons
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Hackathons aan qabannay
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 md:text-base">
              Boggan waxaa ka muuqda qaar ka mid ah hackathon-nada aan ku
              qabannay Livate Academy si aan ardayda ugu dhiirrigelino{" "}
              <span className="font-medium text-[#1d6273]">
                innovation, teamwork
              </span>{" "}
              iyo xalinta dhibaatooyinka dhabta ah.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#d8edf1] bg-[#f7fcfd] px-4 py-3 text-sm text-slate-600">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#1d6273] to-[#7ed8e6] text-xs font-semibold text-white">
              3+
            </span>
            <div>
              <p className="font-medium text-[#144a58]">Hackathons la qabtay</p>
              <p className="text-xs text-slate-500">
                Isku-darka coding, design & business.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-slate-500">Loading hackathons...</div>
        ) : hackathons.length === 0 ? (
          <div className="mt-10 text-sm text-slate-500">
            Weli hackathon lama darin. Fadlan isticmaal dashboard-ka si aad u
            abuurto hackathon cusub.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((hack) => {
              const id = hack._id;
              const firstImage =
                hack.images && hack.images.length > 0 ? hack.images[0] : null;
              const formattedDate = hack.date
                ? new Date(hack.date).toLocaleDateString()
                : "";
              const registrationOpen = hack.registrationOpen !== false;

              return (
                <article
                  key={id}
                  className="group relative overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] shadow-[0_18px_60px_rgba(29,98,115,0.08)]"
                >
                  <div className="relative h-40 overflow-hidden md:h-44">
                    {firstImage ? (
                      <img
                        src={firstImage}
                        alt={hack.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-[#eff9fb] to-[#dff5f8]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#144a58]/20 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1d6273] to-[#7ed8e6]" />
                  </div>

                  <div className="flex h-full flex-col p-5 pt-4 md:p-6 md:pt-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7ed8e6] animate-pulse" />
                        {formattedDate}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-[#7ed8e6]/40 bg-[#eff9fb] px-3 py-1 text-[11px] text-[#1d6273]">
                          {hack.location}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] ${
                            registrationOpen
                              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          {registrationOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-[#1d6273] md:text-xl">
                      {hack.title}
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {hack.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#d8edf1] pt-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1 w-6 rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6]" />
                        Demo Day & Pitch Session
                      </span>
                      <Link
                        to={`/hackathons/${id}`}
                        className="text-xs font-medium text-[#1d6273] underline-offset-2 hover:underline"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default HackthonPost;
