import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { THEME_PRESETS, type ThemeColors, createThemeFromCoolors, parseCoolorsUrl } from "../lib/themes";

type Mode = "dark" | "light";

interface ThemeContextType {
  colors: ThemeColors;
  themeName: string;
  mode: Mode;
  setTheme: (name: string) => void;
  setMode: (mode: Mode, event?: React.MouseEvent) => void;
  setCustomTheme: (coolorsUrl: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({ children, initialTheme = "ocean", storageKey = "portfolio-mode" }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState(initialTheme);
  const [customColors, setCustomColors] = useState<{ light: ThemeColors; dark: ThemeColors } | null>(null);
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem(storageKey) as Mode) || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  const setTheme = (name: string) => {
    if (THEME_PRESETS[name]) {
      setThemeName(name);
      setCustomColors(null);
    }
  };

  const setMode = async (newMode: Mode, event?: React.MouseEvent) => {
    const root = window.document.documentElement;
    const supportsViewTransitions =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsViewTransitions || !event) {
      localStorage.setItem(storageKey, newMode);
      setModeState(newMode);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(async () => {
      localStorage.setItem(storageKey, newMode);
      setModeState(newMode);
    });

    await transition.ready;

    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const setCustomTheme = (coolorsUrl: string) => {
    const hexCodes = parseCoolorsUrl(coolorsUrl);
    if (hexCodes.length >= 5) {
      setThemeName("custom");
      setCustomColors({
        dark: createThemeFromCoolors(hexCodes, true),
        light: createThemeFromCoolors(hexCodes, false),
      });
    }
  };

  const getColors = (): ThemeColors => {
    if (customColors) {
      return customColors[mode];
    }
    const preset = THEME_PRESETS[themeName] || THEME_PRESETS.ocean;
    return preset[mode];
  };

  return (
    <ThemeContext.Provider value={{ colors: getColors(), themeName, mode, setTheme, setMode, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
