import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Beaker, Loader2 } from "lucide-react";
import ProjectCard from "@/components/project-card";
import type { Project } from "@shared/schema";

export default function Lab() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
            <Beaker size={14} className="text-gold-400" />
            <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
              The Lab
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-offwhite mb-6" data-testid="text-lab-title">
            Our <span className="text-gold-gradient">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-lab-description">
            Every project is a testament to our commitment to excellence.
            Explore our latest builds rendered in real-time.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20" data-testid="loading-projects">
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={32} className="text-gold-400 animate-spin" />
              <p className="text-muted-foreground text-sm">Loading projects...</p>
            </div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8" data-testid="grid-projects">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-testid="empty-projects"
          >
            <div className="w-20 h-20 rounded-xl bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
              <Beaker size={32} className="text-gold-400" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-offwhite mb-3">
              Projects Coming Soon
            </h3>
            <p className="text-muted-foreground">
              We're cooking up something special. Check back soon.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
