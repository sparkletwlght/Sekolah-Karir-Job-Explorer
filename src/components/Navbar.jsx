import { getVibeTokens } from "../data/departmentColors";

export default function Navbar({
  currentView,
  savedCount,
  isLoggedIn,
  isDark,
  onToggleTheme,
  onOpenQuickSearch,
  onNavigateExplorer,
  onToggleSaved,
  onToggleLogin
}) {
  const vibe = getVibeTokens(isDark);

  return (
    <header
      className="sk-nav-header"
      style={{
        position: "sticky",
        top: "14px",
        zIndex: 100,
        padding: "0 32px",
        pointerEvents: "none"
      }}
    >
      <div
        className="sk-nav-pill"
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          background: vibe.navBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${vibe.navBorder}`,
          borderRadius: "999px",
          padding: "8px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          boxShadow: vibe.shadow,
          pointerEvents: "auto"
        }}
      >
        <button
          type="button"
          onClick={onNavigateExplorer}
          style={{
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              flexShrink: 0
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span style={{ fontSize: "14.5px", fontWeight: "800", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            <span style={{ color: vibe.textPrimary }}>Sekolah</span>
            <span style={{ color: isDark ? "#7DD3FC" : "#2563EB" }}>Karir</span>
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
          <button
            type="button"
            onClick={onOpenQuickSearch}
            aria-label="Cari cepat"
            className="sk-search-trigger"
            style={{
              background: vibe.chipBg,
              border: `1px solid ${vibe.chipBorder}`,
              borderRadius: "999px",
              padding: "6px 10px 6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: vibe.textMuted,
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="sk-search-label">Cari cepat...</span>
            </span>
            <kbd
              className="sk-search-kbd"
              style={{
                background: vibe.cardBg,
                border: `1px solid ${vibe.cardBorder}`,
                borderRadius: "6px",
                padding: "1px 6px",
                fontSize: "10px",
                fontWeight: "700",
                color: vibe.textSecondary
              }}
            >
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: vibe.chipBg,
              border: `1px solid ${vibe.chipBorder}`,
              color: isDark ? "#FDE047" : vibe.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleSaved}
            aria-pressed={currentView === "saved"}
            style={{
              background: currentView === "saved" ? vibe.activePillBg : vibe.chipBg,
              border: `1px solid ${
                currentView === "saved" ? vibe.activePillBorder : vibe.chipBorder
              }`,
              color: currentView === "saved" ? vibe.activePillText : vibe.textPrimary,
              borderRadius: "999px",
              padding: "6px 11px",
              fontSize: "12px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{savedCount}</span>
          </button>

          <button
            type="button"
            onClick={onToggleLogin}
            style={{
              background: vibe.primaryBtnBg,
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            {isLoggedIn ? "Angie" : "Masuk"}
          </button>
        </div>
      </div>
    </header>
  );
}