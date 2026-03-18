import { useState, useEffect } from "react";
import { apiUrl } from "../../utils/api";

function Getstarted1() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    gender: "",
    location: "",
    educationLevel: "",
    institutionName: "",
    hasLaptop: "",
    className: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true);
      const response = await fetch(apiUrl("/api/classes"));
      const data = await response.json();

      if (data.success) {
        // Filter only active classes with registration open
        const activeClasses = data.data.filter(
          (cls) => cls.isActive !== false && cls.registrationOpen !== false
        );
        setClasses(activeClasses);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoadingClasses(false);
    }
  };

  // Get current page URL for sharing
  const getShareUrl = () => {
    return window.location.href;
  };

  // Social media sharing functions
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnTwitter = () => {
    const text = "Join Livate Academy Tech Community! Start your journey to becoming a tech professional.";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnWhatsApp = () => {
    const text = "Join Livate Academy Tech Community! Start your journey to becoming a tech professional. " + getShareUrl();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setMessage({
        type: "success",
        text: "Link copied to clipboard!",
      });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validate all fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.whatsappNumber ||
      !formData.gender ||
      !formData.location ||
      !formData.educationLevel ||
      !formData.institutionName ||
      !formData.hasLaptop ||
      !formData.className
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all fields including class selection",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          gender: formData.gender,
          location: formData.location,
          educationLevel: formData.educationLevel,
          institutionName: formData.institutionName,
          hasLaptop: formData.hasLaptop,
          className: formData.className,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registration successful! Welcome to our tech community.",
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          whatsappNumber: "",
          gender: "",
          location: "",
          educationLevel: "",
          institutionName: "",
          hasLaptop: "",
          className: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-16 text-[#144a58] md:px-8">
      {/* background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#1d6273]/18 via-[#4eaebe]/16 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-[#7ed8e6]/25 via-[#4eaebe]/18 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-5xl w-full">
        <div className="rounded-3xl border border-[#d8edf1] bg-[#fcfeff] px-6 py-8 shadow-[0_24px_80px_rgba(29,98,115,0.08)] backdrop-blur-md md:px-10 md:py-10">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d6273] md:text-sm">
              Get Started
            </p>
            <h1 className="mb-2 text-2xl font-extrabold text-[#144a58] md:text-3xl lg:text-4xl">
              Join Our Tech Community
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Start your journey to becoming a tech professional. Fill out the
              form below to begin your transformation.
            </p>
          </div>

          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                message.type === "success"
                  ? "bg-green-500/20 border border-green-500/50 text-green-300"
                  : "bg-red-500/20 border border-red-500/50 text-red-300"
              }`}
            >
              <p className="text-sm md:text-base">{message.text}</p>
            </div>
          )}

          {/* Show message if no classes available */}
          {!loadingClasses && classes.length === 0 && (
            <div className="mb-6 p-6 rounded-xl bg-yellow-500/20 border border-yellow-500/50">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">No Classes Available</h3>
                
              
              </div>
            </div>
          )}

          {/* Form - Only show if classes are available */}
          {!loadingClasses && classes.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm md:text-base">
            {/* Full name */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] placeholder:text-slate-400 focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] placeholder:text-slate-400 focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+25261xxxxxxx"
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] placeholder:text-slate-400 focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">Gender</label>
              <div className="flex flex-wrap gap-6 text-sm md:text-base">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#7ed8e6] text-[#1d6273] focus:ring-[#7ed8e6]"
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#7ed8e6] text-[#1d6273] focus:ring-[#7ed8e6]"
                    required
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Where do you live?
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your city/location"
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] placeholder:text-slate-400 focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              />
            </div>

            {/* Education level */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Level of Education
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              >
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* University / School */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                University/School Name
              </label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="Enter your institution name"
                className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] placeholder:text-slate-400 focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                required
              />
            </div>

            {/* Laptop */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Do you have a laptop?
              </label>
              <div className="flex flex-wrap gap-6 text-sm md:text-base">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasLaptop"
                    value="Yes"
                    checked={formData.hasLaptop === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#7ed8e6] text-[#1d6273] focus:ring-[#7ed8e6]"
                    required
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasLaptop"
                    value="No"
                    checked={formData.hasLaptop === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 border-[#7ed8e6] text-[#1d6273] focus:ring-[#7ed8e6]"
                    required
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Class Selection */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-200">
                Select Class/Session
              </label>
              {loadingClasses ? (
                <div className="text-gray-400 text-sm">Loading classes...</div>
              ) : classes.length === 0 ? (
                <div className="text-yellow-400 text-sm">
                  No active classes available. Please contact administrator.
                </div>
              ) : (
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d8edf1] bg-white px-4 py-3 text-sm text-[#144a58] focus:border-[#1d6273] focus:outline-none focus:ring-2 focus:ring-[#7ed8e6] md:text-base"
                  required
                >
                  <option value="">Select a class/session</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls.className}>
                      {cls.className}
                      {cls.description && ` - ${cls.description}`}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] py-3 text-sm font-semibold text-white shadow-lg shadow-[#1d6273]/40 transition-all hover:brightness-110 hover:shadow-[0_0_35px_rgba(126,216,230,0.4)] md:py-3.5 md:text-base ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registering..." : "Start Your Tech Journey"}
              </button>
            </div>
          </form>
          )}

          {/* Loading state */}
          {loadingClasses && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-[#1d6273]"></div>
              <p className="mt-4 text-slate-500">Loading classes...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Getstarted1;
