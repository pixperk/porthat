export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  muted: string;
  background: string;
  foreground: string;
  card: string;
  border: string;
}

export interface ThemePreset {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  ocean: {
    name: "Ocean",
    dark: {
      primary: "#0077b6",
      secondary: "#023e8a",
      accent: "#00b4d8",
      highlight: "#48cae4",
      muted: "#90e0ef",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#0077b6",
      secondary: "#023e8a",
      accent: "#00b4d8",
      highlight: "#48cae4",
      muted: "#90e0ef",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.6)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  midnight: {
    name: "Midnight",
    dark: {
      primary: "#7c3aed",
      secondary: "#4c1d95",
      accent: "#a78bfa",
      highlight: "#c4b5fd",
      muted: "#ddd6fe",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#7c3aed",
      secondary: "#4c1d95",
      accent: "#a78bfa",
      highlight: "#c4b5fd",
      muted: "#ddd6fe",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.6)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  sunset: {
    name: "Sunset",
    dark: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#fb923c",
      highlight: "#fdba74",
      muted: "#fed7aa",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#ea580c",
      secondary: "#c2410c",
      accent: "#f97316",
      highlight: "#fdba74",
      muted: "#fed7aa",
      background: "#fffbf5",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  forest: {
    name: "Forest",
    dark: {
      primary: "#059669",
      secondary: "#065f46",
      accent: "#10b981",
      highlight: "#34d399",
      muted: "#6ee7b7",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#059669",
      secondary: "#065f46",
      accent: "#10b981",
      highlight: "#34d399",
      muted: "#6ee7b7",
      background: "#f5fdf8",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  rose: {
    name: "Rose",
    dark: {
      primary: "#e11d48",
      secondary: "#9f1239",
      accent: "#f43f5e",
      highlight: "#fb7185",
      muted: "#fda4af",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#e11d48",
      secondary: "#9f1239",
      accent: "#f43f5e",
      highlight: "#fb7185",
      muted: "#fda4af",
      background: "#fffbfc",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  monochrome: {
    name: "Monochrome",
    dark: {
      primary: "#737373",
      secondary: "#525252",
      accent: "#a3a3a3",
      highlight: "#d4d4d4",
      muted: "#e5e5e5",
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#525252",
      secondary: "#404040",
      accent: "#737373",
      highlight: "#a3a3a3",
      muted: "#d4d4d4",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.8)",
      border: "rgba(0,0,0,0.1)",
    },
  },
};

export function createThemeFromCoolors(hexCodes: string[], isDark: boolean): ThemeColors {
  const [primary, secondary, accent, highlight, muted] = hexCodes;
  return {
    primary: primary || "#0077b6",
    secondary: secondary || "#023e8a",
    accent: accent || "#00b4d8",
    highlight: highlight || "#48cae4",
    muted: muted || "#90e0ef",
    background: isDark ? "#0a0a0a" : "#fafafa",
    foreground: isDark ? "#fafafa" : "#0a0a0a",
    card: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };
}

export function parseCoolorsUrl(url: string): string[] {
  const match = url.match(/coolors\.co\/([a-f0-9-]+)/i);
  if (!match) return [];
  return match[1].split("-").map((hex) => `#${hex}`);
}

export function getGradient(colors: ThemeColors): string {
  return `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`;
}

export function getSectionGradient(colors: ThemeColors, mode: "light" | "dark"): string {
  if (mode === "dark") {
    return `linear-gradient(to bottom right, ${colors.secondary}15, transparent, ${colors.primary}10)`;
  }
  return `linear-gradient(to bottom right, ${colors.muted}80, white, ${colors.highlight}50)`;
}

export function getGlowColor(colors: ThemeColors, mode: "light" | "dark"): string {
  return mode === "dark" ? `${colors.primary}30` : `${colors.highlight}40`;
}
