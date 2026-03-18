import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../utils/api";

const initialFormData = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  city: "",
  gender: "",
  highestEducation: "",
  mernStackExperience: "",
  hasComputer: "",
  studyRiseAcademy: "",
};

function RegisterHackthon() {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(apiUrl(`/api/hackathons/${id}`));
        const data = await response.json();

        if (response.ok && data.success) {
          setHackathon(data.data);
        } else {
          setMessage({
            type: "error",
            text: data.message || "Hackathon not found.",
          });
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: "We could not load this hackathon right now.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(apiUrl("/api/hackathon-registrations"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hackathonId: id,
          hackathonTitle: hackathon.title,
          fullName: formData.fullName,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          city: formData.city,
          gender: formData.gender,
          highestEducation: formData.highestEducation,
          mernStackExperience: formData.mernStackExperience,
          hasComputer: formData.hasComputer === "true",
          hasLaptop: formData.hasComputer === "true",
          studyRiseAcademy: formData.studyRiseAcademy === "true",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData(initialFormData);
        setMessage({
          type: "success",
          text: "Your hackathon registration was submitted successfully.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "We could not submit your registration.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7fcfd] px-6 text-[#144a58]">
        <p className="text-sm text-slate-500 md:text-base">
          Loading registration form...
        </p>
      </main>
    );
  }

  if (!hackathon) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7fcfd] px-6 text-[#144a58]">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Hackathon not found
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            We could not find the hackathon you are trying to register for.
          </p>
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:brightness-110"
          >
            Back to hackathons
          </Link>
        </div>
      </main>
    );
  }

  const registrationOpen = hackathon.registrationOpen !== false;
  const formattedDate = hackathon.date
    ? new Date(hackathon.date).toLocaleDateString()
    : "";

  return (
    <main className="min-h-screen bg-[#f7fcfd] py-16 text-[#144a58] md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-0">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 md:text-sm">
          <Link to="/hackathons" className="transition-colors hover:text-[#1d6273]">
            Hackathons
          </Link>
          <span>/</span>
          <Link
            to={`/hackathons/${hackathon._id}`}
            className="transition-colors hover:text-[#1d6273]"
          >
            {hackathon.title}
          </Link>
          <span>/</span>
          <span className="text-slate-600">Registration</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="rounded-3xl border border-[#d8edf1] bg-white p-6 shadow-[0_22px_70px_rgba(29,98,115,0.08)] md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#1d6273]">
              Hackathon registration
            </p>
            <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
              Join {hackathon.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Fill in your real details so the team can review your application
              for this hackathon.
            </p>

            {message.text && (
              <div
                className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {!registrationOpen ? (
              <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="text-lg font-semibold text-amber-800">
                  Registration has ended
                </h2>
                <p className="mt-2 text-sm text-amber-700">
                  The registration time for this hackathon is over. Please check
                  back for the next hackathon.
                </p>
                <Link
                  to={`/hackathons/${hackathon._id}`}
                  className="mt-4 inline-flex items-center rounded-full bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-amber-700"
                >
                  Back to hackathon page
                </Link>
              </div>
            ) : submitted ? (
              <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-lg font-semibold text-emerald-800">
                  Registration received
                </h2>
                <p className="mt-2 text-sm text-emerald-700">
                  Your details were saved successfully. The team can now review
                  your hackathon registration.
                </p>
                <Link
                  to={`/hackathons/${hackathon._id}`}
                  className="mt-4 inline-flex items-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-700"
                >
                  Return to hackathon page
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#144a58]">
                    Selected hackathon
                  </label>
                  <input
                    type="text"
                    value={hackathon.title}
                    readOnly
                    className="w-full rounded-2xl border border-[#d8edf1] bg-[#eef8fa] px-4 py-3 text-sm font-medium text-[#144a58] outline-none"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      WhatsApp number
                    </label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Where do you live?
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City / district"
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Highest education
                    </label>
                    <select
                      name="highestEducation"
                      value={formData.highestEducation}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    >
                      <option value="">Select education level</option>
                      <option value="Primary school">Primary school</option>
                      <option value="Secondary school">Secondary school</option>
                      <option value="Degree">Degree</option>
                      <option value="Master">Master</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Computer experience
                    </label>
                    <select
                      name="mernStackExperience"
                      value={formData.mernStackExperience}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    >
                      <option value="">Select your level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#144a58]">
                      Do you have a computer?
                    </label>
                    <select
                      name="hasComputer"
                      value={formData.hasComputer}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                    >
                      <option value="">Choose an option</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#144a58]">
                    Are you already studying at Livate Academy?
                  </label>
                  <select
                    name="studyRiseAcademy"
                    value={formData.studyRiseAcademy}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-[#d8edf1] bg-[#fcfeff] px-4 py-3 text-sm text-[#144a58] outline-none transition focus:border-[#7ed8e6] focus:ring-2 focus:ring-[#d8edf1]"
                  >
                    <option value="">Choose an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#d8edf1] pt-5 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : "Submit registration"}
                  </button>
                  <Link
                    to={`/hackathons/${hackathon._id}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#d8edf1] bg-white px-6 py-3 text-sm font-medium text-[#144a58] transition hover:border-[#7ed8e6] hover:text-[#1d6273]"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-[#d8edf1] bg-white p-6 shadow-[0_18px_50px_rgba(29,98,115,0.08)]">
              <p className="text-xs uppercase tracking-[0.22em] text-[#1d6273]">
                Event details
              </p>
              <h2 className="mt-3 text-xl font-semibold">{hackathon.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {hackathon.description}
              </p>

              <div className="mt-5 space-y-3 rounded-2xl border border-[#d8edf1] bg-[#f7fcfd] p-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium text-[#144a58]">
                    {formattedDate || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-[#144a58]">
                    {hackathon.location || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Registration</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      registrationOpen
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {registrationOpen ? "Open now" : "Closed"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-[#d8edf1] bg-white p-6 text-sm text-slate-600">
              <p className="font-semibold text-[#144a58]">
                What we collect
              </p>
              <p className="mt-2 leading-relaxed">
                This form saves your name, email, WhatsApp number, where you
                live, education, computer availability, and other registration
                details for this specific hackathon.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default RegisterHackthon;
