import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../Components/BrandLogo";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const activeLinkClass =
    "border border-[#7ed8e6]/30 bg-[#1d6273]/20 text-[#a8ebf5]";

  return (
    <aside className="min-h-screen w-64 border-r border-white/10 bg-[#070F24] p-6">
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <BrandLogo className="max-w-[10.75rem]" />
        <p className="mt-3 text-sm text-[#9fe5ee]">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/dashboard/students"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/students")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>All Students</span>
        </Link>

        <Link
          to="/dashboard/create"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/create")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Student</span>
        </Link>

        <Link
          to="/dashboard/classes"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/classes")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span>Class Management</span>
        </Link>

        <Link
          to="/dashboard/hackathons"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/hackathons")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Hackathons</span>
        </Link>

        <Link
          to="/dashboard/hackathon-registrations"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/hackathon-registrations")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <span>Hackathon Registrations</span>
        </Link>

        <Link
          to="/dashboard/contacts"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive("/dashboard/contacts")
              ? activeLinkClass
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Contact Messages</span>
        </Link>

        <Link
          to="/"
          className="mt-8 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-white/5 hover:text-white"
        >
          <svg
            className="h-5 w-5"
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
          <span>Back to Website</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
