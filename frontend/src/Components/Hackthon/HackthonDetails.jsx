import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../../utils/api";

function HackthonDetails() {
  const { id } = useParams();
  const [hack, setHack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(
          apiUrl(`/api/hackathons/${id}`)
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setHack(data.data);
        }
      } catch (error) {
        console.error("Error fetching hackathon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-[#144a58]">
        <p className="text-sm text-slate-500 md:text-base">
          Loading hackathon details...
        </p>
      </main>
    );
  }

  if (!hack) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-[#144a58]">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Hackathon lama helin
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            Ma helin hackathon leh ID-ga aad isku dayday in aad furto. Fadlan
            kusoo noqo liiska hackathon-nada.
          </p>
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:brightness-110"
          >
            ← Back to Hackathons
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = hack.date
    ? new Date(hack.date).toLocaleDateString()
    : "";
  const registrationOpen = hack.registrationOpen !== false;

  return (
    <main className="min-h-screen bg-white py-16 text-[#144a58] md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 md:text-sm">
          <Link to="/hackathons" className="transition-colors hover:text-[#1d6273]">
            Hackathons
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-slate-600">{hack.title}</span>
        </div>

        <section className="relative mb-10 overflow-hidden rounded-3xl border border-[#d8edf1] bg-[#fcfeff] shadow-[0_22px_70px_rgba(29,98,115,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1d6273] to-[#7ed8e6]" />

          <div className="relative p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#1d6273]">
                  Livate Academy Hackathon
                </p>
                <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
                  {hack.title}
                </h1>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                  {hack.description}
                </p>
              </div>

              <div className="min-w-[220px] shrink-0 space-y-3 rounded-2xl border border-[#d8edf1] bg-[#f7fcfd] px-4 py-3 text-xs md:text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium text-[#144a58]">{formattedDate}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-[#144a58]">
                    {hack.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {hack.images && hack.images.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold md:text-xl">
              Muuqaallo ka socda hackathon-ka
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {hack.images.slice(0, 4).map((src, index) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-2xl border border-[#d8edf1] bg-[#f7fcfd]"
                >
                  <img
                    src={src}
                    alt={`${hack.title} team photo ${index + 1}`}
                    className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-44"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#144a58]/18 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-5">
            <h2 className="text-lg font-semibold md:text-xl">
              Faahfaahinta hackathon-kan
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              {hack.details}
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#d8edf1] bg-[#f7fcfd] px-5 py-4">
              <p className="mb-2 text-sm font-semibold">
                Ma xiisaynaysaa hackathon-ka xiga?
              </p>
              <p className="mb-4 text-xs text-slate-600 md:text-sm">
                Buuxi form-ka si aad ugu biirto hackathon-kan. Waxaan kaa
                weydiin doonaa magacaaga, meesha aad dagan tahay, email-ka,
                waxbarashadaada, iyo haddii aad haysato computer.
              </p>
              {registrationOpen ? (
                <Link
                  to={`/hackathons/${hack._id}/register`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-4 py-2.5 text-xs font-medium text-white transition-all hover:brightness-110 md:text-sm"
                >
                  Join this hackathon
                </Link>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 md:text-sm">
                    Registration for this hackathon has ended.
                  </div>
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-slate-300 px-4 py-2.5 text-xs font-medium text-slate-600 md:text-sm"
                  >
                    Registration closed
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 rounded-2xl border border-dashed border-[#d8edf1] bg-[#fcfeff] px-5 py-4 text-xs text-slate-600 md:text-sm">
              <p className="font-semibold text-[#144a58]">
                Macallin / Partner mise Sponsor?
              </p>
              <p>
                Haddii aad rabto in aad nala shaqayso hackathon-nada xiga sida
                mentor, judge ama sponsor, fadlan nala soo xiriir.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-xs text-[#1d6273] hover:text-[#144a58] md:text-sm"
              >
                → Contact Livate Academy
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default HackthonDetails;
