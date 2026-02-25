import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Layers, Crown, ShoppingCart, Code2, Sparkles, Monitor, Search, Shield, Headphones, Zap, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Services() {
  const { tr, t, lang } = useI18n();

  const packages = [
    {
      icon: Layers,
      name: tr(t.services.landing.name),
      price: tr(t.services.landing.price),
      desc: tr(t.services.landing.desc),
      features: t.services.landing.features[lang],
      popular: false,
    },
    {
      icon: Crown,
      name: tr(t.services.business.name),
      price: tr(t.services.business.price),
      desc: tr(t.services.business.desc),
      features: t.services.business.features[lang],
      popular: true,
    },
    {
      icon: ShoppingCart,
      name: tr(t.services.ecommerce.name),
      price: tr(t.services.ecommerce.price),
      desc: tr(t.services.ecommerce.desc),
      features: t.services.ecommerce.features[lang],
      popular: false,
    },
    {
      icon: Code2,
      name: tr(t.services.custom.name),
      price: tr(t.services.custom.price),
      desc: tr(t.services.custom.desc),
      features: t.services.custom.features[lang],
      popular: false,
    },
  ];

  const includedFeatures = t.services.included[lang];

  const includedIcons = [Monitor, Search, Shield, Headphones, Zap, Cpu];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
              <Sparkles size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
                {tr(t.services.badge)}
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif font-bold text-offwhite mb-6"
            data-testid="text-services-title"
          >
            {tr(t.services.title)}
            <span className="text-gold-gradient">{tr(t.services.titleAccent)}</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-services-description"
          >
            {tr(t.services.description)}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-32"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative rounded-xl overflow-hidden ${
                pkg.popular
                  ? "glass glow-gold"
                  : "glass-card"
              }`}
              data-testid={`card-service-${i}`}
            >
              {pkg.popular && (
                <motion.div
                  className="absolute top-0 left-0 right-0 bg-gold-400 text-navy-500 text-center py-1.5 text-xs font-bold tracking-wider uppercase"
                  initial={{ y: -30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  data-testid="badge-popular"
                >
                  {tr(t.services.popular)}
                </motion.div>
              )}

              <div className={`p-7 ${pkg.popular ? "pt-12" : ""}`}>
                <motion.div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
                    pkg.popular ? "bg-gold-400/20" : "bg-gold-400/10"
                  }`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <pkg.icon size={22} className="text-gold-400" />
                </motion.div>

                <h3 className="text-xl font-serif font-semibold text-offwhite mb-2" data-testid={`text-service-name-${i}`}>
                  {pkg.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {pkg.desc}
                </p>

                <div className="mb-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{tr(t.services.startingFrom)}</span>
                  <p className="text-2xl font-serif font-bold text-gold-gradient mt-1" data-testid={`text-service-price-${i}`}>
                    {pkg.price}
                  </p>
                </div>

                <div className="space-y-3 mb-7">
                  {pkg.features.map((feature: string, fi: number) => (
                    <motion.div
                      key={fi}
                      className="flex items-start gap-2.5"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fi * 0.05 + 0.3 }}
                    >
                      <Check size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-offwhite/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/beta">
                  <motion.div
                    className={`w-full text-center py-3 rounded-md text-sm font-semibold cursor-pointer transition-all ${
                      pkg.popular
                        ? "bg-gold-400 text-navy-500 glow-gold-sm"
                        : "border border-gold-400/20 text-offwhite hover:border-gold-400/40 hover:bg-gold-400/5"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`button-service-cta-${i}`}
                  >
                    {pkg.popular ? tr(t.services.getStarted) : tr(t.services.contactUs)}
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              {tr(t.services.includedTitle)}
            </span>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {tr(t.services.includedDesc)}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {includedFeatures.map((feature: string, i: number) => {
              const Icon = includedIcons[i] || Check;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 glass-card rounded-lg px-5 py-4 group hover:glow-gold-sm transition-all duration-300"
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  data-testid={`included-feature-${i}`}
                >
                  <div className="w-8 h-8 rounded-md bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                    <Icon size={16} className="text-gold-400" />
                  </div>
                  <span className="text-sm text-offwhite/80 font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl p-12 md:p-16 text-center glow-gold relative overflow-visible max-w-4xl mx-auto"
        >
          <motion.img
            src="/images/3d-sphere.png"
            alt=""
            className="absolute -top-10 -right-10 w-24 opacity-50 hidden md:block"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images/3d-torus.png"
            alt=""
            className="absolute -bottom-8 -left-8 w-20 opacity-40 hidden md:block"
            animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <h2 className="text-2xl md:text-4xl font-serif font-bold text-offwhite mb-4" data-testid="text-services-cta-title">
            {tr(t.services.ctaTitle)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {tr(t.services.ctaDesc)}
          </p>
          <Link href="/beta">
            <motion.div
              className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-lg cursor-pointer"
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-services-cta"
            >
              {tr(t.services.ctaButton)}
              <ArrowRight size={20} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
