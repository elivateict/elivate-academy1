import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Hackthon", to: "/hackathons" },
  { label: "Curriculum", to: "/curriculum" },
  { label: "Alumni", to: "/alumni" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8edf1] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-10 lg:px-0">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="w-fit" aria-label="Livate Academy home">
            <BrandLogo className="max-w-[10.5rem] sm:max-w-[11.75rem]" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center justify-end gap-5 text-base font-medium text-[#1d6273]">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-[#7ed8e6]">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/getstarted"
                  className="rounded-full bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-5 py-2 font-semibold text-white shadow-[0_18px_40px_rgba(29,98,115,0.18)] transition-all hover:brightness-110"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8edf1] bg-[#f7fcfd] text-[#1d6273] shadow-sm transition-colors hover:bg-[#eff9fb] lg:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close mobile menu overlay"
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-40 bg-[#144a58]/18 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.nav
                id="mobile-navigation"
                className="relative z-50 mt-4 overflow-hidden rounded-3xl border border-[#d8edf1] bg-white shadow-[0_24px_60px_rgba(29,98,115,0.14)] lg:hidden"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <motion.ul
                  className="flex flex-col px-4 py-4 text-base font-medium text-[#1d6273]"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.04,
                      },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {navLinks.map(({ label, to }) => (
                    <motion.li
                      key={to}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -12 },
                      }}
                    >
                      <Link
                        to={to}
                        className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-[#f4fbfd] hover:text-[#144a58]"
                      >
                        <span>{label}</span>
                        <span className="text-[#7ed8e6]">/</span>
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    className="pt-3"
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -12 },
                    }}
                  >
                    <Link
                      to="/getstarted"
                      className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-5 py-3 font-semibold text-white shadow-[0_18px_40px_rgba(29,98,115,0.18)] transition-all hover:brightness-110"
                    >
                      Get Started
                    </Link>
                  </motion.li>
                </motion.ul>
              </motion.nav>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
