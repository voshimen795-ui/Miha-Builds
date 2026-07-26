import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/motion";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { tr, t } = useI18n();

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/3 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-400/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(220_26%_14%)_70%)]" />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={scaleIn} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-10">
              <Sparkles size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-widest uppercase">
                {tr(t.hero.badge)}
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-12">
            <motion.img
              src={logoImg}
              alt="Miha Builds"
              className="w-24 h-24 mx-auto mb-10 rounded-xl glow-gold-sm"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              data-testid="img-hero-logo"
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.05]"
            data-testid="text-hero-headline"
          >
            <span className="text-offwhite">{tr(t.hero.headlinePre)}</span>
            <br />
            <motion.span
              className="text-gold-gradient inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {tr(t.hero.headlineMid)}
            </motion.span>
            <br />
            <span className="text-offwhite">{tr(t.hero.headlinePost)}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-4"
            data-testid="text-hero-subheadline"
          >
            {tr(t.hero.subheadline)}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gold-400 font-semibold mb-12"
            data-testid="text-hero-tagline"
          >
            {tr(t.hero.betaSpots)}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="group px-8 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-base flex items-center gap-3 cursor-pointer glow-gold"
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-view-work"
            >
              {tr(t.hero.viewWork)}
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-md border border-gold-400/20 text-offwhite font-medium text-base cursor-pointer hover:border-gold-400/40 transition-colors"
              whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-contact-hero"
            >
              {tr(t.hero.claimSpot)}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-label="Scroll to projects"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-offwhite/20 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-gold-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
