import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import { getSkillIcon } from "../../lib/skillIcons";
import type { Skill } from "../../types/portfolio";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
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
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {skills.map((skill, index) => {
            const IconComponent = getSkillIcon(skill.icon);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.03 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border"
                style={{
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                }}
              >
                {IconComponent && (
                  <IconComponent
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: colors.primary }}
                  />
                )}
                <span className="text-xs sm:text-sm truncate" style={{ color: colors.foreground }}>
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
