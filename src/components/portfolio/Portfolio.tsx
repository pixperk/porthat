import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { Hero, Experience, Education, Projects, SkillSlider, Blog, Footer, GitHubChart, SpotifyWidget, IllustrationOverlay } from "./index";
import type { PortfolioData } from "../../types/portfolio";

interface PortfolioProps {
  data: PortfolioData;
}

function PortfolioContent({ data }: PortfolioProps) {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.foreground}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24"
        initial="hidden"
        animate="visible"
        variants={ANIMATION.stagger}
      >
        <Hero profile={data.profile} roles={data.roles} socials={data.socials} />

        <motion.section variants={ANIMATION.fadeIn} className="mb-6">
          <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
            My <span style={{ color: colors.foreground }} className="font-medium">skills</span>
          </p>
          <SkillSlider skills={data.skills} />
        </motion.section>

        <GitHubChart username={data.github} />
        <SpotifyWidget />
        <Experience experiences={data.experience} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <Blog blogs={data.blogs} />
        <Footer quotes={data.quotes} handle={data.profile.handle} />
      </motion.div>

      {data.illustration && <IllustrationOverlay />}
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <ThemeProvider initialTheme={data.theme}>
      <PortfolioContent data={data} />
    </ThemeProvider>
  );
}
