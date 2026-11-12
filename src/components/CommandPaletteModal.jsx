import { useEffect, useRef, useState } from "react";
import { getVibeTokens } from "../data/departmentColors";

export default function CommandPaletteModal({
  isOpen,
  roles,
  actions,
  isDark,
  onClose,
  onSelectRole
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const vibe = getVibeTokens(isDark);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setActiveIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [isOpen]);

  const trimmed = query.trim().toLowerCase();

  const roleItems = (
    trimmed
      ? roles.filter(
          (r) =>
            r.title.toLowerCase().includes(trimmed) ||
            r.company.toLowerCase().includes(trimmed) ||
            r.department.toLowerCase().includes(trimmed) ||
            r.location.toLowerCase().includes(trimmed) ||
            r.workMode.toLowerCase().includes(trimmed) ||
            r.tags.some((t) => t.toLowerCase().includes(trimmed))
        ).slice(0, 6)
      : roles.slice(0, 4)
  ).map((role) => ({
    id: `role-${role.id}`,
    group: trimmed ? "Lowongan" : "Lowongan terbaru",
    role,
    run: () => {
      onClose();
      onSelectRole(role);
    }
  }));

  const actionItems = actions
    .filter((a) => !trimmed || a.label.toLowerCase().includes(trimmed))
    .map((action) => ({
      ...action,
      group: "Aksi",
      run: () => {
        onClose();
        action.run();
      }
    }));

  const items = [...roleItems, ...actionItems];
  const safeIndex = items.length ? Math.min(activeIndex, items.length - 1) : -1;

  useEffect(() => {
    if (!isOpen || safeIndex < 0) return;
    listRef.current
      ?.querySelector(`[data-cmd-index="${safeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleGlobalKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((safeIndex + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((safeIndex - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[safeIndex]?.run();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "11vh 16px 16px 16px"
      }}
    >
      <style>{`
        @keyframes skPalettePop {
          from { opacity: 0; transform: scale(0.96) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes skBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Backdrop Blur */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: isDark ? "rgba(5, 8, 16, 0.72)" : "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          animation: "skBackdropFade 0.16s ease forwards"
        }}
      />

      {/* Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian cepat"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          borderRadius: "20px",
          overflow: "hidden",
          background: isDark ? "rgba(23, 28, 45, 0.96)" : "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${vibe.cardBorderHover}`,
          boxShadow: isDark
            ? "0 28px 64px rgba(0, 0, 0, 0.65)"
            : "0 24px 60px rgba(15, 23, 42, 0.22)",
          animation: "skPalettePop 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards"
        }}
      >
        {/* Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 16px",
            borderBottom: `1px solid ${vibe.cardBorder}`
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={vibe.textMuted} strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Cari lowongan atau ketik perintah…"
            autoComplete="off"
            style={{
              flex: 1,
              height: "54px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: vibe.textPrimary
            }}
          />
          <kbd
            style={{
              border: `1px solid ${vibe.chipBorder}`,
              borderRadius: "6px",
              padding: "2px 7px",
              fontSize: "11px",
              color: vibe.textMuted
            }}
          >
            Esc
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          role="listbox"
          style={{
            maxHeight: "min(58vh, 400px)",
            overflowY: "auto",
            padding: "8px"
          }}
        >
          {items.length === 0 ? (
            <div style={{ padding: "36px 16px", textAlign: "center" }}>
              <p style={{ fontSize: "14px", fontWeight: "700", color: vibe.textPrimary, margin: 0 }}>
                Tidak ada hasil
              </p>
              <p style={{ fontSize: "13px", color: vibe.textMuted, marginTop: "6px" }}>
                Coba kata kunci lain untuk “{query.trim()}”.
              </p>
            </div>
          ) : (
            items.map((item, idx) => {
              const isActive = idx === safeIndex;
              const showGroup = idx === 0 || items[idx - 1].group !== item.group;

              return (
                <div key={item.id}>
                  {showGroup && (
                    <p
                      style={{
                        padding: "10px 12px 6px 12px",
                        margin: 0,
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: vibe.textMuted
                      }}
                    >
                      {item.group}
                    </p>
                  )}

                  <div
                    role="option"
                    aria-selected={isActive}
                    data-cmd-index={idx}
                    onPointerMove={() => !isActive && setActiveIndex(idx)}
                    onClick={item.run}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: isActive
                        ? isDark
                          ? "rgba(129, 140, 248, 0.16)"
                          : "#EEF2FF"
                        : "transparent",
                      transition: "background-color 0.14s ease"
                    }}
                  >
                    {item.role ? (
                      <>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "9px",
                            background: item.role.avatarBg,
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: "800",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}
                        >
                          {item.role.companyInitial}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "13px",
                              fontWeight: "700",
                              color: vibe.textPrimary,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }}
                          >
                            {item.role.title}
                          </p>
                          <p
                            style={{
                              margin: "2px 0 0 0",
                              fontSize: "11px",
                              color: vibe.textMuted
                            }}
                          >
                            {item.role.department} · {item.role.location} · {item.role.workMode}
                          </p>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: vibe.textSecondary }}>
                          {item.role.salary}
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "9px",
                            background: isActive
                              ? isDark
                                ? "rgba(129, 140, 248, 0.24)"
                                : "#E0E7FF"
                              : vibe.chipBg,
                            border: `1px solid ${isActive ? vibe.activePillBorder : vibe.chipBorder}`,
                            color: isActive
                              ? isDark
                                ? "#A5B4FC"
                                : "#4F46E5"
                              : vibe.textSecondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.15s ease"
                          }}
                        >
                          {item.icon}
                        </span>
                        <span style={{ flex: 1, fontSize: "13px", fontWeight: "600", color: vibe.textPrimary }}>
                          {item.label}
                        </span>
                        {item.hint && (
                          <span
                            style={{
                              background: vibe.chipBg,
                              padding: "2px 7px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: "700",
                              color: vibe.textMuted,
                              fontVariantNumeric: "tabular-nums"
                            }}
                          >
                            {item.hint}
                          </span>
                        )}
                      </>
                    )}

                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "13px",
                        color: isActive ? (isDark ? "#A5B4FC" : "#4F46E5") : "transparent",
                        transform: isActive ? "translateX(0)" : "translateX(-4px)",
                        transition: "all 0.15s ease"
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "10px 16px",
            borderTop: `1px solid ${vibe.cardBorder}`,
            background: isDark ? "rgba(15, 20, 34, 0.6)" : "#F8FAFC",
            fontSize: "11px",
            color: vibe.textMuted
          }}
        >
          <span>↑ ↓ navigasi</span>
          <span>↵ pilih</span>
          <span style={{ marginLeft: "auto" }}>Tips: ketik “remote” atau “tema”</span>
        </div>
      </div>
    </div>
  );
}