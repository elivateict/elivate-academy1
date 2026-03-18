import { useState } from "react";
import { apiUrl } from "../../utils/api";

function Contact1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Message sent successfully! We will get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to send message. Please try again.",
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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#d8edf1] bg-[#fcfeff] p-8 shadow-[0_24px_60px_rgba(29,98,115,0.08)]">
        <h1 className="mb-1 text-2xl font-bold text-[#1d6273]">Contact Us</h1>
        <p className="mb-6 text-sm text-slate-500">
          Have a question? Send us a message.
        </p>

        {message.text && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              message.type === "success"
                ? "border border-green-500/40 bg-green-500/10 text-green-700"
                : "border border-red-500/40 bg-red-500/10 text-red-700"
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-slate-600">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-[#d8edf1] bg-white px-4 py-2.5 text-[#144a58] focus:border-[#1d6273] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border border-[#d8edf1] bg-white px-4 py-2.5 text-[#144a58] focus:border-[#1d6273] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+25261xxxxxxx"
              className="w-full rounded-lg border border-[#d8edf1] bg-white px-4 py-2.5 text-[#144a58] focus:border-[#1d6273] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="w-full rounded-lg border border-[#d8edf1] bg-white px-4 py-2.5 text-[#144a58] focus:border-[#1d6273] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">Message *</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full resize-none rounded-lg border border-[#d8edf1] bg-white px-4 py-2.5 text-[#144a58] focus:border-[#1d6273] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full rounded-xl bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] py-3 font-semibold text-white transition hover:brightness-110 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact1;
