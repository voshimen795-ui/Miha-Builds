import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Code2, Zap, Shield, Star, Users, Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { tr, t } = useI18n();

  const features = [
    { icon: Code2, title: tr(t.features.precision), description: tr(t.features.precisionDesc) },
    { icon: Zap, title: tr(t.features.lightning), description: tr(t.features.lightningDesc) },
    { icon: Shield, title: tr(t.features.futureProof), description: tr(t.features.futureProofDesc) },
  ];

  const stats = [
    { value: "100%", label: tr(t.stats.satisfaction), icon: Star },
    { value: "50+", label: tr(t.stats.projects), icon: Globe2 },
    { value: "24/7", label: tr(t.stats.support), icon: Users },
  ];

  const processSteps = [
    { num: "01", title: tr(t.process.discovery), desc: tr(t.process.discoveryDesc) },
    { num: "02", title: tr(t.process.design), desc: tr(t.process.designDesc) },
    { num: "03", title: tr(t.process.develop), desc: tr(t.process.developDesc) },
    { num: "04", title: tr(t.process.deploy), desc: tr(t.process.deployDesc) },
  ];

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
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
              data-testid="text-beta-spots"
            >
              {tr(t.hero.betaSpots)}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/beta">
                <motion.div
                  className="group px-8 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-base flex items-center gap-3 cursor-pointer glow-gold"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-apply-hero"
                >
                  {tr(t.hero.claimSpot)}
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.div>
              </Link>
              <Link href="/lab">
                <motion.div
                  className="px-8 py-4 rounded-md border border-gold-400/20 text-offwhite font-medium text-base cursor-pointer hover:border-gold-400/40 transition-colors"
                  whileHover={{ scale: 1.03, borderColor: "rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-view-work"
                >
                  {tr(t.hero.viewWork)}
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
        </motion.div>
      </section>

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center group"
                data-testid={`stat-${i}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon size={20} className="text-gold-400 mx-auto mb-3" />
                </motion.div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-xs md:text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.span
              className="text-xs font-medium text-gold-400 tracking-[0.3em] uppercase mb-4 block"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {tr(t.features.sectionLabel)}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-offwhite">
              {tr(t.features.sectionTitle)}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card rounded-lg p-8 text-center group hover:glow-gold-sm transition-all duration-500"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                data-testid={`card-feature-${i}`}
              >
                <motion.div
                  className="w-14 h-14 rounded-lg bg-gold-400/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-400/20 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <feature.icon size={24} className="text-gold-400" />
                </motion.div>
                <h3 className="text-xl font-serif font-semibold text-offwhite mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              {tr(t.process.sectionLabel)}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-offwhite">
              {tr(t.process.sectionTitle)} <span className="text-gold-gradient">{tr(t.process.sectionTitleAccent)}</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 12, transition: { duration: 0.3 } }}
                className="flex gap-6 md:gap-10 py-8 border-b border-gold-400/10 last:border-b-0 group cursor-default"
                data-testid={`process-step-${i}`}
              >
                <motion.span
                  className="text-4xl md:text-5xl font-serif font-bold text-gold-400/20 group-hover:text-gold-400/50 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.num}
                </motion.span>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-offwhite mb-2 group-hover:text-gold-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-12 md:p-16 text-center glow-gold relative overflow-visible"
          >
            <motion.img
              src="/images/3d-sphere.png"
              alt=""
              className="absolute -top-10 -right-10 w-28 opacity-50 hidden md:block"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/images/3d-torus.png"
              alt=""
              className="absolute -bottom-8 -left-8 w-24 opacity-40 hidden md:block"
              animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-offwhite mb-6">
              {tr(t.cta.title)}
              <span className="text-gold-gradient">{tr(t.cta.titleAccent)}</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {tr(t.cta.description)}
            </p>
            <Link href="/beta">
              <motion.div
                className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-lg cursor-pointer"
                whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-apply-cta"
              >
                {tr(t.cta.button)}
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-gold-400/10 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Miha Builds" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-serif text-sm text-muted-foreground">
              Miha Builds 2026
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {tr(t.footer.tagline)}
          </p>
        </div>
      </footer>
    </div>
  );
}
