import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Check, Beaker, MonitorPlay } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";

/** Branded preview panel shown when no screenshot is set (or a live embed
 *  hasn't loaded). Designed to look intentional rather than like a fallback. */
function PreviewPanel({ project }: { project: Project }) {
  const { tr } = useI18n();
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-navy-400/40 via-gold-400/10 to-navy-600/50 flex flex-col items-center justify-center gap-5 px-6 text-center">
      <motion.img
        src="/images/3d-sphere.png"
        alt=""
        className="absolute top-6 right-8 w-20 opacity-40 hidden md:block"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/images/3d-torus.png"
        alt=""
        className="absolute bottom-6 left-8 w-16 opacity-30 hidden md:block"
        animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="w-16 h-16 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
        <MonitorPlay size={28} className="text-gold-400" />
      </div>
      <div>
        <p className="font-serif text-3xl md:text-4xl text-offwhite mb-2">{project.title}</p>
        <p className="text-sm text-gold-400/90">{tr(project.tagline)}</p>
      </div>
      <span className="text-xs text-muted-foreground font-mono">
        {project.url.replace(/^https?:\/\//, "")}
      </span>
    </div>
  );
}

/** "Cvećara Trofej" -> "cvecara-trofej", so each card gets a stable own test id. */
function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ProjectShowcase({ project }: { project: Project }) {
  const [frameLoaded, setFrameLoaded] = useState(false);
  const { tr, t, lang } = useI18n();
  const hasImage = !!project.imageUrl;
  const useFrame = !hasImage && project.livePreview === true;
  const slug = slugify(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      data-testid={`card-project-${slug}`}
    >
      <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-400/50 via-gold-400/10 to-gold-400/30 transition-all duration-500 group-hover:from-gold-400/70">
        <div className="glass-strong rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-navy-600/80 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-navy-700/60 rounded-md px-3 py-1 flex items-center gap-2 max-w-md mx-auto">
                <Globe size={12} className="text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate font-mono">
                  {project.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-gold-400"
              data-testid={`link-project-external-${slug}`}
              aria-label={`Open ${project.title}`}
            >
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Preview: static image if provided, else a live iframe layered over
              a branded placeholder that stays visible until the frame loads. */}
          <div className="relative aspect-[16/9] bg-navy-700/40 overflow-hidden">
            {hasImage ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            ) : useFrame ? (
              <>
                <iframe
                  src={project.url}
                  title={project.title}
                  className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-700 ${
                    frameLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                  onLoad={() => setFrameLoaded(true)}
                />
                {!frameLoaded && <PreviewPanel project={project} />}
              </>
            ) : (
              <PreviewPanel project={project} />
            )}

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-navy-500/60 backdrop-blur-sm cursor-pointer z-10"
              data-testid={`link-project-visit-${slug}`}
            >
              <span className="px-7 py-3 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm flex items-center gap-2 glow-gold-sm">
                <ExternalLink size={16} />
                {tr(t.lab.visitSite)}
              </span>
            </a>
          </div>

          {/* Details */}
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <h3
                  className="text-2xl md:text-3xl font-serif font-bold text-offwhite mb-1.5"
                  data-testid={`text-project-title-${slug}`}
                >
                  {project.title}
                </h3>
                <p className="text-gold-400 text-sm font-medium">{tr(project.tagline)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20">
                  {tr(project.category)}
                </span>
                {project.status && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                    {tr(project.status)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-base text-offwhite/80 leading-relaxed mb-8" data-testid={`text-project-desc-${slug}`}>
              {tr(project.description)}
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {project.highlights[lang].map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-offwhite/75 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-6 border-t border-gold-400/10">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md text-xs font-mono text-offwhite/70 bg-navy-600/60 border border-gold-400/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { tr, t } = useI18n();

  return (
    <section id="projects" className="py-28 md:py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
              <Beaker size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
                {tr(t.lab.badge)}
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif font-bold text-offwhite mb-6"
            data-testid="text-projects-title"
          >
            {tr(t.lab.title)} <span className="text-gold-gradient">{tr(t.lab.titleAccent)}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {tr(t.lab.description)}
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project) => (
            <ProjectShowcase key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
