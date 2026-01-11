import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Settings, X, Palette, BookOpen, Check, Sun, Moon, Github, Twitter } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { THEME_PRESETS } from "../../lib/themes";

const FEATURES = [
  "6 built-in theme presets with light/dark modes",
  "Custom theme support via Coolors.co URLs",
  "Animated view transitions for theme switching",
  "GitHub contribution chart integration",
  "Spotify now playing widget",
  "Responsive skill slider with auto-scroll",
  "Expandable experience and education sections",
  "Project cards with gradient hover effects",
  "Blog section with reading time estimates",
  "Framer Motion animations throughout",
  "SEO-optimized with OG meta tags",
  "Fully customizable via data.json",
];

export default function IllustrationOverlay() {
  const { colors, themeName, mode, setTheme, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeKeys = Object.keys(THEME_PRESETS);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl backdrop-blur-md border transition-transform hover:scale-110 cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          borderColor: `${colors.highlight}40`,
        }}
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto border-l shadow-2xl"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold" style={{ color: colors.foreground }}>
                    Porthat Demo Mode
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer"
                    style={{ color: colors.foreground }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div
                  className="p-4 rounded-xl mb-6 border"
                  style={{
                    backgroundColor: `${colors.highlight}15`,
                    borderColor: `${colors.highlight}30`,
                  }}
                >
                  <p className="text-sm" style={{ color: colors.foreground }}>
                    This panel is visible because <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">illustration: true</code> is set in your <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">data.json</code>. Set it to <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">false</code> for production.
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4" style={{ color: colors.highlight }} />
                    <h3 className="font-medium" style={{ color: colors.foreground }}>
                      Theme Presets
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {themeKeys.map((key) => {
                      const preset = THEME_PRESETS[key];
                      const isActive = themeName === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className="flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer"
                          style={{
                            backgroundColor: isActive ? `${colors.highlight}20` : "transparent",
                            borderColor: isActive ? colors.highlight : colors.border,
                          }}
                        >
                          <div className="flex gap-0.5">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: preset.dark.primary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: preset.dark.highlight }}
                            />
                          </div>
                          <span className="text-sm flex-1 text-left" style={{ color: colors.foreground }}>
                            {preset.name}
                          </span>
                          {isActive && <Check className="w-4 h-4" style={{ color: colors.highlight }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {mode === "dark" ? (
                      <Moon className="w-4 h-4" style={{ color: colors.highlight }} />
                    ) : (
                      <Sun className="w-4 h-4" style={{ color: colors.highlight }} />
                    )}
                    <h3 className="font-medium" style={{ color: colors.foreground }}>
                      Mode
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => setMode("light", e)}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer"
                      style={{
                        backgroundColor: mode === "light" ? `${colors.highlight}20` : "transparent",
                        borderColor: mode === "light" ? colors.highlight : colors.border,
                      }}
                    >
                      <Sun className="w-4 h-4" style={{ color: colors.foreground }} />
                      <span className="text-sm" style={{ color: colors.foreground }}>Light</span>
                    </button>
                    <button
                      onClick={(e) => setMode("dark", e)}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer"
                      style={{
                        backgroundColor: mode === "dark" ? `${colors.highlight}20` : "transparent",
                        borderColor: mode === "dark" ? colors.highlight : colors.border,
                      }}
                    >
                      <Moon className="w-4 h-4" style={{ color: colors.foreground }} />
                      <span className="text-sm" style={{ color: colors.foreground }}>Dark</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4" style={{ color: colors.highlight }} />
                    <h3 className="font-medium" style={{ color: colors.foreground }}>
                      Features
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {FEATURES.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm" style={{ color: `${colors.foreground}b3` }}>
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.highlight }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium" style={{ color: colors.foreground }}>
                    How to Use
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: `${colors.foreground}b3` }}>
                    <p>1. Edit <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">src/data/data.json</code> with your info</p>
                    <p>2. Set theme preset in <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">"theme"</code> field</p>
                    <p>3. Available themes: <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">{themeKeys.join(", ")}</code></p>
                    <p>4. Or use custom Coolors URL for custom themes</p>
                    <p>5. Set <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs">"illustration": false</code> for production</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t space-y-3" style={{ borderColor: colors.border }}>
                  <a
                    href="https://github.com/pixperk/porthat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl font-medium transition-all cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      color: "white",
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                  <a
                    href="https://twitter.com/pixperk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl font-medium transition-all border cursor-pointer"
                    style={{
                      borderColor: colors.border,
                      color: colors.foreground,
                    }}
                  >
                    <Twitter className="w-4 h-4" />
                    Follow @pixperk
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
