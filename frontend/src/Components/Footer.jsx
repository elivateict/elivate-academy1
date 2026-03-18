import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import BrandLogo from "./BrandLogo";

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Curriculum", to: "/curriculum" },
  { label: "Alumni", to: "/alumni" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Full-Stack Development",
  "Mobile App Development",
  "Internet of Things (IoT)",
  "Basic Computer Skills",
  "Digital Marketing",
];

function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-[#d8edf1] bg-white text-[#144a58]"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#7ed8e6] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[700px] -translate-x-1/2 bg-[#7ed8e6]/25 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-6 pt-14 pb-8 md:px-16 lg:px-24"
      >
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-4">
          <div className="space-y-5 md:col-span-2">
            <Link to="/" className="inline-flex w-fit" aria-label="Livate Academy home">
              <BrandLogo className="max-w-[14rem] sm:max-w-[16rem]" />
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
              Livate Academy empowers the next generation of developers through
              hands-on, project-based bootcamps designed for real-world success.
            </p>

            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] bg-clip-text text-2xl font-bold text-transparent">
                  4+
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Courses
                </span>
              </div>
              <div className="h-6 w-px bg-[#d8edf1]" />
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] bg-clip-text text-2xl font-bold text-transparent">
                  100+
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Alumni
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d6273]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-slate-600 transition-colors hover:text-[#1d6273]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#7ed8e6] opacity-0 transition-opacity group-hover:opacity-100" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d6273]">
                Our Services
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/curriculum"
                      className="group -mx-3 flex items-center gap-2.5 rounded-lg border-l-2 border-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-200 hover:border-[#7ed8e6] hover:bg-[#f4fbfd] hover:text-[#144a58]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1d6273]/70 transition-colors group-hover:bg-[#7ed8e6]" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d6273]">
                Connect With Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-[#d8edf1] bg-[#f7fcfd] transition-all duration-300 hover:scale-110 hover:border-pink-400/50 hover:bg-pink-500/10"
                >
                  <FaInstagram className="text-lg text-[#1d6273] transition-colors group-hover:text-pink-500" />
                </a>
                <a
                  href="#"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-[#d8edf1] bg-[#f7fcfd] transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10"
                >
                  <FaFacebookF className="text-lg text-[#1d6273] transition-colors group-hover:text-blue-500" />
                </a>
                <a
                  href="252614068829"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-[#d8edf1] bg-[#f7fcfd] transition-all duration-300 hover:scale-110 hover:border-green-400/50 hover:bg-green-500/10"
                >
                  <FaWhatsapp className="text-lg text-[#1d6273] transition-colors group-hover:text-green-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d8edf1] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="text-sm text-slate-500">
              © {year} Livate Academy. All rights reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-500 transition-colors hover:text-[#1d6273]">
                Privacy & Data Protection
              </a>
              <a href="#" className="text-sm text-slate-500 transition-colors hover:text-[#1d6273]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
