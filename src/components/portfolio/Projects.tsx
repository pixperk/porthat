import { motion } from "framer-motion";
import { Github, ExternalLink, MoveUpRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { Project } from "../../types/portfolio";

const GRADIENT_IMAGES = [
  "/assets/gradient1.jpg",
  "/assets/gradient2.jpg",
  "/assets/gradient3.jpg",
  "/assets/gradient4.jpg",
];

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { colors, mode } = useTheme();

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.primary})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Things I've built
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          variants={ANIMATION.cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              variants={ANIMATION.cardItem}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={ANIMATION.spring}
              className="group rounded-xl border overflow-hidden cursor-pointer"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
              }}
            >
              <div className="relative h-36 sm:h-44 overflow-hidden bg-black">
                <img
                  src={GRADIENT_IMAGES[index % 4]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[90%] sm:w-[85%] h-[85%] sm:h-[80%] object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md backdrop-blur-md transition-colors bg-black/50 hover:bg-black/70 text-white"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md backdrop-blur-md transition-colors bg-black/50 hover:bg-black/70 text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: colors.foreground }}>
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
                  {project.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                    style={{ color: colors.primary }}
                  >
                    View Project
                    <MoveUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                          color: `${colors.foreground}b3`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
