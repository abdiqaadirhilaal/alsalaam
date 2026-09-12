import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import schoolLogo from "../../assets/school-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/teachers", label: "Teachers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Events" },
  { to: "/achievements", label: "Achievements" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container-page flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {settings?.logo ? (
            <img src={settings.logo} alt="School logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-400" />
          ) : (
            <img src={schoolLogo} alt="Alsalaam School logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-400" />
          )}
          <div className="leading-tight">
            <p className={`font-display font-bold text-sm md:text-base ${scrolled ? "text-navy-900" : "text-white"}`}>
              Alsalaam School
            </p>
            <p className={`text-[10px] md:text-xs tracking-wide ${scrolled ? "text-navy-500" : "text-white/80"}`}>
              Primary & Secondary
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  scrolled
                    ? isActive
                      ? "text-navy-800 bg-navy-50"
                      : "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
                    : isActive
                    ? "text-white bg-white/15"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link to="/admissions" className="btn-secondary !py-2.5 !px-5 text-sm">
            Apply Now
          </Link>
        </div>

        <button
          className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-navy-900" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive ? "bg-navy-50 text-navy-800" : "text-navy-600 hover:bg-navy-50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/admissions" onClick={() => setOpen(false)} className="btn-secondary justify-center mt-2">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
