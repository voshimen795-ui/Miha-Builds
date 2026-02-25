import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();
  const { tr, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location === "/beta" || location === "/admin" || location === "/services" || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          data-testid="sticky-cta"
        >
          <div className="glass-strong rounded-xl px-6 py-3 flex items-center gap-4 glow-gold-sm">
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-offwhite">
                {tr(t.sticky.spotsLeft)}
              </p>
              <p className="text-xs text-muted-foreground">
                {tr(t.sticky.limited)}
              </p>
            </div>
            <Link href="/beta">
              <motion.div
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm cursor-pointer whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-sticky-apply"
              >
                {tr(t.sticky.applyNow)}
                <ArrowRight size={14} />
              </motion.div>
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-offwhite transition-colors p-1"
              data-testid="button-dismiss-sticky"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
