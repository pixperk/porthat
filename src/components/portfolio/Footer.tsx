import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

interface FooterProps {
  quotes: string[];
  handle: string;
}

export default function Footer({ quotes, handle }: FooterProps) {
  const { colors } = useTheme();
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [quotes]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center py-6 sm:py-8"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div
          className="h-px w-12 sm:w-16 rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${colors.accent}50)` }}
        />
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: colors.accent }} />
        <div
          className="h-px w-12 sm:w-16 rounded-full"
          style={{ background: `linear-gradient(to left, transparent, ${colors.accent}50)` }}
        />
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-6 sm:mb-8"
      >
        <p
          className="text-base sm:text-lg md:text-xl font-serif italic max-w-md mx-auto leading-relaxed px-4"
          style={{ color: `${colors.foreground}b3`, textShadow: `0 0 40px ${colors.highlight}20` }}
        >
          "{quote}"
        </p>
      </motion.blockquote>

      <p className="text-[10px] sm:text-xs" style={{ color: `${colors.foreground}4d` }}>
        crafted with purpose — <span style={{ color: colors.accent }}>@{handle}</span>
      </p>
    </motion.section>
  );
}
