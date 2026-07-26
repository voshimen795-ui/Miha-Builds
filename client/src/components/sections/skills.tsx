import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiPostgresql, SiVite, SiGit, SiGithub,
  SiVercel, SiFigma, SiFramer,
} from "react-icons/si";
import { Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { staggerContainer, fadeUp } from "@/lib/motion";

interface Skill {
  name: string;
  icon: IconType;
}

export default function Skills() {
  const { tr, t } = useI18n();

  const groups: { label: string; skills: Skill[] }[] = [
    {
      label: tr(t.skills.frontend),
      skills: [
        { name: "React", icon: SiReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
      ],
    },
    {
      label: tr(t.skills.backend),
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "PostgreSQL", icon: SiPostgresql },
      ],
    },
    {
      label: tr(t.skills.tooling),
      skills: [
        { name: "Vite", icon: SiVite },
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Vercel", icon: SiVercel },
      ],
    },
    {
      label: tr(t.skills.design),
      skills: [
        { name: "Figma", icon: SiFigma },
        { name: "Framer Motion", icon: SiFramer },
      ],
    },
  ];

  return (
    <section id="skills" className="py-28 md:py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-gold-sm mb-8">
              <Cpu size={14} className="text-gold-400" />
              <span className="text-xs font-medium text-gold-300 tracking-[0.3em] uppercase">
                {tr(t.skills.badge)}
              </span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-serif font-bold text-offwhite mb-6">
            {tr(t.skills.title)}
            <span className="text-gold-gradient">{tr(t.skills.titleAccent)}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {tr(t.skills.description)}
          </motion.p>
        </motion.div>

        <div className="space-y-10">
          {groups.map((group) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-medium text-gold-400/80 tracking-widest uppercase mb-5 text-center">
                {group.label}
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ duration: 0.25 }}
                    className="glass-card rounded-xl px-6 py-5 flex flex-col items-center gap-3 w-32 group hover:glow-gold-sm"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/[.\s]+/g, "-")}`}
                  >
                    <skill.icon className="text-3xl text-offwhite/70 group-hover:text-gold-400 transition-colors" />
                    <span className="text-xs text-muted-foreground text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
