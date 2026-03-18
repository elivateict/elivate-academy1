import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { apiUrl } from "../utils/api";

function ReadHackathonRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const res = await fetch(
          apiUrl(`/api/hackathon-registrations/${id}`)
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setRegistration(data.data);
        }
      } catch (error) {
        console.error("Error fetching registration:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#050716]">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center text-gray-400">
          Loading registration...
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="flex min-h-screen bg-[#050716]">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center text-gray-400">
          Registration not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050716]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/dashboard/hackathon-registrations")}
            className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to registrations
          </button>

          <div className="bg-[#070F24]/90 border border-white/10 rounded-xl p-6">
            <h1 className="text-2xl font-bold text-white mb-4">
              Registration Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Full Name</p>
                <p className="text-white font-medium">
                  {registration.fullName}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium break-all">
                  {registration.email}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">WhatsApp</p>
                <p className="text-white font-medium">
                  {registration.whatsappNumber}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Gender</p>
                <p className="text-white font-medium">{registration.gender}</p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Highest Education</p>
                <p className="text-white font-medium">
                  {registration.highestEducation}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">MERN Experience</p>
                <p className="text-white font-medium">
                  {registration.mernStackExperience}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Has Laptop</p>
                <p className="text-white font-medium">
                  {registration.hasLaptop ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Study at Ado Madhasana</p>
                <p className="text-white font-medium">
                  {registration.studyRiseAcademy ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Created At</p>
                <p className="text-white font-medium">
                  {registration.createdAt
                    ? new Date(registration.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Updated At</p>
                <p className="text-white font-medium">
                  {registration.updatedAt
                    ? new Date(registration.updatedAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadHackathonRegistration;

