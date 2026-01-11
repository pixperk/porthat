import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";

interface GitHubChartProps {
  username: string;
}

export default function GitHubChart({ username }: GitHubChartProps) {
  const { colors, mode } = useTheme();
  const chartColor = colors.primary.replace("#", "");

  return (
    <motion.section variants={ANIMATION.fadeIn} className="mb-5 sm:mb-6">
      <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
        <span style={{ color: colors.foreground }} className="font-medium">Contributions</span> @{username}
      </p>
      <img
        src={`https://ghchart.rshah.org/${chartColor}/${username}`}
        alt="GitHub Contributions"
        className="w-full rounded-lg"
        style={{
          filter: mode === "dark" ? "invert(1) hue-rotate(180deg)" : "none",
        }}
      />
    </motion.section>
  );
}
