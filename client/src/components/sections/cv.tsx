import { motion } from "framer-motion";
import {
  FileText, Download, ExternalLink, MapPin, Globe2, Wifi, Target,
  GraduationCap, Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { staggerContainer, fadeUp } from "@/lib/motion";
import logoImg from "@assets/IMG_20260225_201123_554_1772047207845.webp";

const CV_URL = "/Mihailo-Kojic-CV.pdf";

export default function CV() {
  const { tr, t } = useI18n();

  const details = [
    { icon: MapPin, label: tr(t.cv.locationLabel), value: tr(t.cv.location) },
    { icon: Wifi, label: tr(t.cv.availabilityLabel), value: tr(t.cv.availability) },
    { icon: Globe2, label: tr(t.cv.languagesLabel), value: tr(t.cv.languages) },
    { icon: Target, label: tr(t.cv.focusLabel), value: tr(t.cv.focus) },
  ];

  return (
    <section id="cv" className="py-28 md:py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
              <FileText size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
                {tr(t.cv.badge)}
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif font-bold text-offwhite"
            data-testid="text-cv-title"
          >
            {tr(t.cv.title)}
            <span className="text-gold-gradient">{tr(t.cv.titleAccent)}</span>
          </motion.h2>
        </motion.div>

        {/* Centered, gold-bordered résumé card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
        >
          {/* Gradient border frame */}
          <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-400/60 via-gold-400/10 to-gold-400/40 glow-gold">
            <div className="glass-strong rounded-2xl px-7 py-10 md:px-14 md:py-14 text-center relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="pointer-events-none absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-400/30 rounded-tl-2xl" />
              <div className="pointer-events-none absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-400/30 rounded-br-2xl" />

              <motion.img
                src={logoImg}
                alt={tr(t.cv.name)}
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover ring-2 ring-gold-400/40 glow-gold-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                data-testid="img-cv-avatar"
              />

              <h3
                className="text-3xl md:text-4xl font-serif font-bold text-offwhite mb-2"
                data-testid="text-cv-name"
              >
                {tr(t.cv.name)}
              </h3>
              <p className="text-gold-400 font-medium mb-1">{tr(t.cv.role)}</p>
              <p className="text-sm text-muted-foreground italic mb-9">{tr(t.cv.tagline)}</p>

              <div className="w-16 h-px bg-gold-400/30 mx-auto mb-9" />

              {/* Key details */}
              <div className="grid sm:grid-cols-2 gap-5 text-left mb-10">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-gold-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <d.icon size={14} className="text-gold-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {d.label}
                      </p>
                      <p className="text-sm text-offwhite/90">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile */}
              <div className="text-left mb-9">
                <h4 className="text-xs font-medium text-gold-400 tracking-[0.25em] uppercase mb-3">
                  {tr(t.cv.profileTitle)}
                </h4>
                <p className="text-sm md:text-base text-offwhite/80 leading-relaxed">
                  {tr(t.cv.profile)}
                </p>
              </div>

              {/* Featured project */}
              <div className="text-left mb-9 glass-card rounded-xl p-6">
                <h4 className="text-xs font-medium text-gold-400 tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                  <Sparkles size={13} />
                  {tr(t.cv.highlightTitle)}
                </h4>
                <p className="font-serif text-lg text-offwhite mb-2">{tr(t.cv.highlightName)}</p>
                <p className="text-sm text-offwhite/75 leading-relaxed">{tr(t.cv.highlight)}</p>
              </div>

              {/* Education */}
              <div className="text-left mb-10">
                <h4 className="text-xs font-medium text-gold-400 tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
                  <GraduationCap size={14} />
                  {tr(t.cv.educationTitle)}
                </h4>
                <div className="space-y-4">
                  {[
                    { title: tr(t.cv.edu1), detail: tr(t.cv.edu1Detail) },
                    { title: tr(t.cv.edu2), detail: tr(t.cv.edu2Detail) },
                  ].map((e) => (
                    <div key={e.title} className="border-l-2 border-gold-400/25 pl-4">
                      <p className="text-sm font-medium text-offwhite/90">{e.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{e.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-16 h-px bg-gold-400/30 mx-auto mb-9" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href={CV_URL}
                  download="Mihailo-Kojic-CV.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm glow-gold-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-cv-download"
                >
                  <Download size={16} />
                  {tr(t.cv.download)}
                </motion.a>
                <motion.a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border border-gold-400/25 text-offwhite font-medium text-sm hover:border-gold-400/50 hover:bg-gold-400/5 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="link-cv-view"
                >
                  <ExternalLink size={15} />
                  {tr(t.cv.viewOnline)}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
