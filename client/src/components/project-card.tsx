import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Monitor } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const gradients = [
  "from-navy-400/30 via-gold-400/10 to-navy-600/30",
  "from-gold-400/15 via-navy-500/20 to-gold-400/10",
  "from-navy-500/25 via-navy-400/15 to-gold-400/15",
  "from-gold-400/10 via-navy-400/20 to-navy-500/25",
];

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [iframeError, setIframeError] = useState(false);
  const gradient = gradients[index % gradients.length];
  const { tr, t } = useI18n();
  const hasImage = !!project.imageUrl;

  return (
    <motion.div
      className="group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`card-project-${project.id}`}
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
            data-testid={`link-project-external-${project.id}`}
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
          ) : null}

          {!hasImage && (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center ${iframeError ? '' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500`}>
              {iframeError && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <Monitor size={28} className="text-gold-400" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{project.title}</span>
                </div>
              )}
            </div>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-navy-500/60 backdrop-blur-sm cursor-pointer z-10"
            data-testid={`link-project-visit-${project.id}`}
          >
            <motion.div
              className="px-6 py-2.5 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm flex items-center gap-2"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <ExternalLink size={16} />
              {tr(t.lab.visitSite)}
            </motion.div>
          </a>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-offwhite font-serif" data-testid={`text-project-title-${project.id}`}>
              {project.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20 flex-shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-desc-${project.id}`}>
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
