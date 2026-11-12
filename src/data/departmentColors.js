export const departmentThemes = {
  Engineering: {
    dot: "#60A5FA",
    accent: "#3B82F6",
    darkAccent: "#7DD3FC",
    pillBgLight: "rgba(59, 130, 246, 0.08)",
    pillBgDark: "rgba(125, 211, 252, 0.11)",
    cardGradient: "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
    cardShadow: "rgba(37, 99, 235, 0.32)",
    code: "SEC-01 // TECH"
  },
  Design: {
    dot: "#A78BFA",
    accent: "#8B5CF6",
    darkAccent: "#C4B5FD",
    pillBgLight: "rgba(139, 92, 246, 0.08)",
    pillBgDark: "rgba(196, 181, 253, 0.11)",
    cardGradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    cardShadow: "rgba(124, 58, 237, 0.32)",
    code: "SEC-02 // VISUAL"
  },
  Product: {
    dot: "#FBBF24",
    accent: "#D97706",
    darkAccent: "#FCD34D",
    pillBgLight: "rgba(245, 158, 11, 0.09)",
    pillBgDark: "rgba(252, 211, 77, 0.11)",
    cardGradient: "linear-gradient(135deg, #D97706 0%, #FBBF24 100%)",
    cardShadow: "rgba(217, 119, 6, 0.32)",
    code: "SEC-03 // STRATEGY"
  },
  Marketing: {
    dot: "#F472B6",
    accent: "#DB2777",
    darkAccent: "#F9A8D4",
    pillBgLight: "rgba(236, 72, 153, 0.08)",
    pillBgDark: "rgba(249, 168, 212, 0.11)",
    cardGradient: "linear-gradient(135deg, #DB2777 0%, #F472B6 100%)",
    cardShadow: "rgba(219, 39, 119, 0.32)",
    code: "SEC-04 // GROWTH"
  },
  Operations: {
    dot: "#34D399",
    accent: "#059669",
    darkAccent: "#6EE7B7",
    pillBgLight: "rgba(16, 185, 129, 0.08)",
    pillBgDark: "rgba(110, 231, 183, 0.11)",
    cardGradient: "linear-gradient(135deg, #059669 0%, #34D399 100%)",
    cardShadow: "rgba(5, 150, 105, 0.32)",
    code: "SEC-05 // OPS"
  }
};

export const getDepartmentTheme = (department) => {
  return (
    departmentThemes[department] || {
      dot: "#818CF8",
      accent: "#6366F1",
      darkAccent: "#A5B4FC",
      pillBgLight: "rgba(99, 102, 241, 0.08)",
      pillBgDark: "rgba(165, 180, 252, 0.11)",
      cardGradient: "linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)",
      cardShadow: "rgba(79, 70, 229, 0.32)",
      code: "SEC-00 // GENERAL"
    }
  );
};

export const getVibeTokens = (isDark) => {
  if (isDark) {
    return {
      pageBg: "#111522",
      heroBg:
        "radial-gradient(ellipse 85% 65% at 72% 30%, rgba(129, 140, 248, 0.16) 0%, rgba(192, 132, 252, 0.11) 45%, transparent 78%)",
      gridLine: "rgba(226, 232, 240, 0.025)",
      navBg: "rgba(17, 21, 34, 0.82)",
      cardBg: "#171C2D",
      cardBgElevated: "#1C2237",
      cardBorder: "rgba(226, 232, 240, 0.07)",
      cardBorderHover: "rgba(165, 180, 252, 0.28)",
      textPrimary: "#E6EAF2",
      textSecondary: "#9AA5B8",
      textMuted: "#6E7A91",
      chipBg: "rgba(226, 232, 240, 0.05)",
      chipBorder: "rgba(226, 232, 240, 0.07)",
      chipText: "#BCC5D6",
      inputBg: "#171C2D",
      activePillBg: "rgba(129, 140, 248, 0.2)",
      activePillText: "#C7D2FE",
      activePillBorder: "rgba(129, 140, 248, 0.35)",
      primaryBtnBg: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
      primaryBtnText: "#FFFFFF",
      badgeNewBg: "rgba(96, 165, 250, 0.14)",
      badgeNewText: "#93C5FD",
      shadow: "0 8px 28px rgba(7, 10, 18, 0.28)"
    };
  }
  return {
    pageBg: "#F4F6FA",
    heroBg:
      "radial-gradient(ellipse 85% 65% at 72% 30%, rgba(167, 139, 250, 0.13) 0%, rgba(96, 165, 250, 0.11) 45%, transparent 78%)",
    gridLine: "rgba(71, 85, 105, 0.035)",
    navBg: "rgba(244, 246, 250, 0.84)",
    cardBg: "#FAFBFD",
    cardBgElevated: "#FFFFFF",
    cardBorder: "rgba(148, 163, 184, 0.22)",
    cardBorderHover: "rgba(99, 102, 241, 0.35)",
    textPrimary: "#1E2536",
    textSecondary: "#5A657D",
    textMuted: "#8792A8",
    chipBg: "#EEF1F7",
    chipBorder: "rgba(148, 163, 184, 0.18)",
    chipText: "#4B556B",
    inputBg: "#FAFBFD",
    activePillBg: "#E8ECFA",
    activePillText: "#4338CA",
    activePillBorder: "rgba(99, 102, 241, 0.28)",
    primaryBtnBg: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    primaryBtnText: "#FFFFFF",
    badgeNewBg: "#EBF2FE",
    badgeNewText: "#3B82F6",
    shadow: "0 6px 24px rgba(30, 37, 54, 0.04)"
  };
};