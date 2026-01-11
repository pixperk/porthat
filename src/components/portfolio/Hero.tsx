import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, Mail, Calendar, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getGradient } from "../../lib/themes";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";

interface HeroProps {
  profile: Profile;
  roles: string[];
  socials: Social[];
}

export default function Hero({ profile, roles, socials }: HeroProps) {
  const { colors, mode, setMode } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <>
      <motion.div variants={ANIMATION.fadeIn} className="relative mb-6">
        <div className="relative overflow-hidden rounded-2xl h-32 sm:h-40">
          <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
          <button
            onClick={(e) => setMode(mode === "dark" ? "light" : "dark", e)}
            className="absolute top-3 right-3 p-2 rounded-lg transition-colors backdrop-blur-sm hover:bg-white/30 cursor-pointer"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <div className="absolute -bottom-12 left-6 sm:left-8 z-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 shadow-xl"
            style={{ borderColor: colors.background, backgroundColor: colors.background }}
          >
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </motion.div>

      <motion.section
        variants={ANIMATION.fadeIn}
        className="rounded-2xl border p-6 sm:p-8 mb-6 pt-16 sm:pt-14 backdrop-blur-xl"
        style={{
          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
          borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-semibold" style={{ color: colors.foreground }}>
              {profile.name}
            </h1>
            <span className="text-sm" style={{ color: `${colors.foreground}80` }}>
              @{profile.handle}
            </span>
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: `${colors.foreground}b3`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
              }}
            >
              <Download className="w-3 h-3" />
              Resume
            </motion.a>
          </div>
          <div className="h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm"
                style={{ color: `${colors.foreground}99` }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed mb-5 sm:mb-6" style={{ color: `${colors.foreground}b3` }}>
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ background: getGradient(colors), boxShadow: `0 10px 15px -3px ${colors.primary}40` }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
            <span className="relative z-10">Let's talk</span>
          </motion.a>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all duration-300 cursor-pointer"
            style={{
              borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              color: colors.foreground,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
              e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
            }}
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Drop a mail
          </motion.a>
        </div>

        <div>
          <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
            Find me on the <span style={{ color: colors.foreground }} className="font-medium">internet</span>
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  color: `${colors.foreground}b3`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
                  e.currentTarget.style.color = colors.foreground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                  e.currentTarget.style.color = `${colors.foreground}b3`;
                }}
              >
                <Icon name={social.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
