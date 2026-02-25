import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Beaker, Loader2, Filter } from "lucide-react";
import ProjectCard from "@/components/project-card";
import type { Project } from "@shared/schema";

export default function Lab() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", ...new Set(projects?.map((p) => p.category) || [])];
  const filtered = activeFilter === "All" ? projects : projects?.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
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

        {!isLoading && projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-20 z-30 mb-10"
          >
            <div className="glass-strong rounded-xl px-4 py-3 flex items-center gap-3 max-w-xl mx-auto">
              <Filter size={14} className="text-gold-400 flex-shrink-0" />
              <div className="flex items-center gap-1 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeFilter === cat
                        ? "bg-gold-400/20 text-gold-400 border border-gold-400/30"
                        : "text-muted-foreground hover:text-offwhite"
                    }`}
                    data-testid={`button-filter-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20" data-testid="loading-projects">
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={32} className="text-gold-400 animate-spin" />
              <p className="text-muted-foreground text-sm">Loading projects...</p>
            </div>
          </div>
        ) : filtered && filtered.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-8"
            data-testid="grid-projects"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
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
              {activeFilter !== "All" ? `No ${activeFilter} projects yet` : "Projects Coming Soon"}
            </h3>
            <p className="text-muted-foreground">
              {activeFilter !== "All" ? (
                <button
                  onClick={() => setActiveFilter("All")}
                  className="text-gold-400 underline underline-offset-4"
                  data-testid="button-clear-filter"
                >
                  View all projects
                </button>
              ) : (
                "We're cooking up something special. Check back soon."
              )}
            </p>
          </motion.div>
        )}

        {!isLoading && projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-xl p-10 inline-block relative overflow-visible">
              <motion.img
                src="/images/3d-cube.png"
                alt=""
                className="absolute -top-6 -right-6 w-16 opacity-50 hidden md:block"
                animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-xl font-serif text-offwhite mb-2">
                Want your project here?
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                We have 3 free beta spots remaining.
              </p>
              <a
                href="/beta"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-gold-400 text-navy-500 font-semibold text-sm"
                data-testid="button-lab-apply"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
