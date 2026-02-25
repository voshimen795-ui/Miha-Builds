import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, tr, t } = useI18n();

  const navLinks = [
    { href: "/", label: tr(t.nav.home) },
    { href: "/services", label: tr(t.nav.services) },
    { href: "/lab", label: tr(t.nav.lab) },
    { href: "/beta", label: tr(t.nav.beta) },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleLang = () => setLang(lang === "sr" ? "en" : "sr");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4 h-20">
            <Link href="/" data-testid="link-home">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={logoImg}
                  alt="Miha Builds"
                  className="h-10 w-10 rounded-md object-cover"
                  data-testid="img-logo"
                />
                <span className="font-serif text-lg font-semibold tracking-tight text-offwhite">
                  Miha Builds
                </span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`relative px-5 py-2 rounded-md text-sm font-medium tracking-wide cursor-pointer transition-colors ${
                      location === link.href
                        ? "text-gold-400"
                        : "text-offwhite/70 hover:text-offwhite"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-offwhite/70 hover:text-offwhite border border-gold-400/10 hover:border-gold-400/30 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid="button-lang-toggle"
              >
                <Globe size={14} className="text-gold-400" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lang}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {lang === "sr" ? "EN" : "SR"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <Link href="/beta">
                <motion.div
                  className="px-6 py-2.5 rounded-md text-sm font-semibold bg-gold-400 text-navy-500 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-apply-nav"
                >
                  {tr(t.nav.applyForBeta)}
                </motion.div>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-offwhite/70 border border-gold-400/10"
                whileTap={{ scale: 0.95 }}
                data-testid="button-lang-toggle-mobile"
              >
                <Globe size={12} className="text-gold-400" />
                {lang === "sr" ? "EN" : "SR"}
              </motion.button>
              <button
                className="text-offwhite p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 glass-strong md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`text-2xl font-serif cursor-pointer ${
                        location === link.href
                          ? "text-gold-400"
                          : "text-offwhite/70"
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/beta">
                  <span
                    className="px-8 py-3 rounded-md text-lg font-semibold bg-gold-400 text-navy-500 cursor-pointer inline-block"
                    data-testid="button-apply-mobile"
                  >
                    {tr(t.nav.applyForBeta)}
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
