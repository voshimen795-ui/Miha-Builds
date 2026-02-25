import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Code2, Zap, Shield } from "lucide-react";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

const features = [
  {
    icon: Code2,
    title: "Precision Engineering",
    description: "Every pixel, every interaction, meticulously crafted for the modern web.",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Optimized for speed. Sub-second load times that keep users engaged.",
  },
  {
    icon: Shield,
    title: "Future-Proof Stack",
    description: "Built with cutting-edge technologies that scale with your vision.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-400/10 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(220_26%_14%)_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-10">
              <Sparkles size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-widest uppercase">
                Now Accepting Applications
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <motion.img
              src={logoImg}
              alt="Miha Builds"
              className="w-24 h-24 mx-auto mb-10 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              data-testid="img-hero-logo"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.05]"
            data-testid="text-hero-headline"
          >
            <span className="text-offwhite">Building the</span>
            <br />
            <span className="text-gold-gradient">2026 Digital</span>
            <br />
            <span className="text-offwhite">Standard.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-4"
            data-testid="text-hero-subheadline"
          >
            Premium web experiences for brands that refuse to blend in.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-gold-400 font-semibold mb-12"
            data-testid="text-beta-spots"
          >
            3 Free Beta Spots Available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/beta">
              <motion.div
                className="group px-8 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-base flex items-center gap-3 cursor-pointer glow-gold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-apply-hero"
              >
                Claim Your Spot
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>
            <Link href="/lab">
              <motion.div
                className="px-8 py-4 rounded-md border border-gold-400/20 text-offwhite font-medium text-base cursor-pointer hover:border-gold-400/40 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-view-work"
              >
                View Our Work
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-offwhite/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-gold-400" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-medium text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              Why Miha Builds
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-offwhite">
              Engineered for Excellence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-lg p-8 text-center group hover:glow-gold-sm transition-all duration-500"
                data-testid={`card-feature-${i}`}
              >
                <div className="w-14 h-14 rounded-lg bg-gold-400/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-400/20 transition-colors">
                  <feature.icon size={24} className="text-gold-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-offwhite mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-offwhite mb-6">
              Ready to Build Something
              <span className="text-gold-gradient"> Extraordinary</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              We partner with ambitious brands to create digital experiences that set new standards. Limited spots available.
            </p>
            <Link href="/beta">
              <motion.div
                className="inline-flex items-center gap-3 px-10 py-4 rounded-md bg-gold-400 text-navy-500 font-semibold text-lg cursor-pointer glow-gold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-apply-cta"
              >
                Apply for Free Beta
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-gold-400/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Miha Builds" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-serif text-sm text-muted-foreground">
              Miha Builds 2026
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Building the future, one pixel at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
