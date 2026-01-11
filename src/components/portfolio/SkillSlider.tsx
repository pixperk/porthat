import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { getSkillIcon } from "../../lib/skillIcons";
import type { Skill } from "../../types/portfolio";

interface SkillSliderProps {
  skills: Skill[];
}

export default function SkillSlider({ skills }: SkillSliderProps) {
  const { colors, mode } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden w-full max-w-full">
      <div
        className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${colors.background}, transparent)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${colors.background}, transparent)` }}
      />

      <div
        ref={scrollContainerRef}
        className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedSkills.map((skill, index) => {
          const IconComponent = getSkillIcon(skill.icon);
          return (
            <motion.div
              key={`${skill.name}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: (index % skills.length) * 0.1 }}
              className="flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full min-w-[110px] sm:min-w-[130px] md:min-w-[140px] border transition-all duration-300 backdrop-blur-sm"
              style={{
                backgroundColor: mode === "dark"
                  ? "rgba(24, 24, 27, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
                boxShadow: mode === "light" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {IconComponent && (
                <IconComponent
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  style={{ color: skill.color }}
                />
              )}
              <span
                className="text-xs sm:text-sm font-medium whitespace-nowrap leading-none"
                style={{ color: colors.foreground }}
              >
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
