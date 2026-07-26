import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Eye, Filter, Star, Users, Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";

const gradients = [
  "from-navy-400/30 via-gold-400/10 to-navy-600/30",
  "from-gold-400/15 via-navy-500/20 to-gold-400/10",
  "from-navy-500/25 via-navy-400/15 to-gold-400/15",
  "from-gold-400/10 via-navy-400/20 to-navy-500/25",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [iframeError, setIframeError] = useState(false);
  const { tr, t } = useI18n();
  const gradient = gradients[index % gradients.length];
  const hasImage = !!project.imageUrl;

  return (
    <motion.div
      className="group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`card-project-${index}`}
    >
      <div className="glass-card rounded-lg transition-all duration-500 group-hover:glow-gold-sm overflow-hidden">
        <div className="bg-navy-600/80 rounded-t-lg px-4 py-3 flex items-center gap-2">
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
            data-testid={`link-project-external-${index}`}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="relative aspect-[16/10] bg-navy-700/40 overflow-hidden">
          {hasImage ? (
            <motion.img
              src={project.imageUrl!}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.05 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : !iframeError ? (
            <iframe
              src={project.url}
              title={project.title}
              className="w-full h-full border-0 pointer-events-none"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
              onError={() => setIframeError(true)}
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-sm text-muted-foreground font-medium">{project.title}</span>
            </div>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-navy-500/60 backdrop-blur-sm cursor-pointer z-10"
            data-testid={`link-project-visit-${index}`}
          >
            <span className="px-6 py-2.5 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm flex items-center gap-2">
              {hasImage ? <Eye size={16} /> : <ExternalLink size={16} />}
              {tr(t.lab.visitSite)}
            </span>
          </a>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-offwhite font-serif" data-testid={`text-project-title-${index}`}>
              {project.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20 flex-shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-desc-${index}`}>
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  { value: "100%", label: "satisfaction", icon: Star },
  { value: "50+", label: "projects", icon: Globe2 },
  { value: "24/7", label: "support", icon: Users },
] as const;

export default function Projects() {
  const { tr, t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-28 md:py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
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

        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <stat.icon size={20} className="text-gold-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground tracking-wide">
                {tr(t.stats[stat.label])}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {categories.length > 2 && (
          <div className="flex justify-center mb-10">
            <div className="glass-strong rounded-xl px-4 py-3 flex items-center gap-3">
              <Filter size={14} className="text-gold-400 flex-shrink-0" />
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeFilter === cat
                        ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                        : "text-muted-foreground hover:text-offwhite"
                    }`}
                    data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {cat === "All" ? tr(t.lab.all) : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <motion.div layout className="grid md:grid-cols-2 gap-8" data-testid="grid-projects">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
