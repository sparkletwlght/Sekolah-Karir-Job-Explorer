import { useState, useEffect } from "react";
import { getVibeTokens } from "../data/departmentColors";

const ROTATING_ROLES = [
  "Product Designer",
  "Growth Marketer",
  "Frontend Engineer",
  "Product Manager"
];

const POPULAR_TAGS = ["React", "Remote", "Figma", "Internship", "Jakarta"];

export default function HeroSection({
  isDark,
  searchQuery,
  onSearchChange,
  onSelectPopularTag,
  onSortBySalary,
  urgentRoles = [],
  onOpenRole,
  totalRoles,
  allRoles = []
}) {
  const vibe = getVibeTokens(isDark);
  const [roleIdx, setRoleIdx] = useState(0);
  const [urgentIdx, setUrgentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const deptCount = allRoles.length
    ? new Set(allRoles.map((r) => r.department)).size
    : 4;
  const remoteCount = allRoles.length
    ? allRoles.filter((r) => r.workMode === "Remote").length
    : 4;
  const newRolesCount = allRoles.length
    ? allRoles.filter((r) => r.isNew).length || totalRoles
    : totalRoles;

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (urgentRoles.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setUrgentIdx((prev) => (prev + 1) % urgentRoles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [urgentRoles.length, isPaused]);

  const activeUrgent = urgentRoles[urgentIdx] || urgentRoles[0];

  const scrollToGrid = () => {
    const el = document.getElementById("jobs-grid");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        backgroundImage: `${vibe.heroBg}, linear-gradient(to right, ${vibe.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${vibe.gridLine} 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        borderBottom: `1px solid ${vibe.cardBorder}`,
        padding: "48px 32px 56px 32px",
        overflow: "hidden"
      }}
    >
      <style>{`
        @keyframes skUrgentPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.55; }
        }
        @keyframes skFloatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes skCardSwap {
          from { opacity: 0; transform: translateY(6px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes skProgressFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .sk-urgent-card {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
        }
        .sk-urgent-card:hover {
          transform: translateY(-3px);
          border-color: ${vibe.cardBorderHover} !important;
          box-shadow: ${
            isDark
              ? "0 24px 48px rgba(0, 0, 0, 0.52)"
              : "0 20px 44px rgba(79, 70, 229, 0.13)"
          } !important;
        }
        .sk-urgent-card:active {
          transform: scale(0.985);
        }
        .sk-urgent-body {
          animation: skCardSwap 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sk-float-badge {
          animation: skFloatSlow 4.2s ease-in-out infinite;
          transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.24s ease,
                      box-shadow 0.24s ease;
        }
        .sk-float-badge:hover {
          animation-play-state: paused;
          transform: translateY(-2px) scale(1.02) !important;
          border-color: ${vibe.cardBorderHover} !important;
        }
      `}</style>

     <div
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "44px",
        alignItems: "center"
      }}
    >
        {/* KOLOM KIRI */}
        <div>
          <button
            type="button"
            onClick={scrollToGrid}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: vibe.cardBg,
              border: `1px solid ${vibe.cardBorder}`,
              padding: "5px 13px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: "600",
              color: vibe.textSecondary,
              marginBottom: "18px",
              cursor: "pointer"
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                animation: "skUrgentPulse 2s ease-in-out infinite"
              }}
            />
            <span style={{ color: isDark ? "#34D399" : "#059669", fontWeight: "700" }}>
              Sedang merekrut
            </span>
            <span>• {totalRoles} posisi terbuka</span>
          </button>

          <h1
            style={{
              fontSize: "clamp(2.15rem, 4.2vw, 3.1rem)",
              fontWeight: "850",
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
              color: vibe.textPrimary,
              margin: "0 0 14px 0"
            }}
          >
            Wujudkan karier impianmu sebagai{" "}
            <span
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(90deg, #60A5FA 0%, #C084FC 100%)"
                  : "linear-gradient(90deg, #2563EB 0%, #9333EA 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}
            >
              {ROTATING_ROLES[roleIdx]}
            </span>
          </h1>

          <p
            style={{
              fontSize: "14.5px",
              lineHeight: 1.65,
              color: vibe.textSecondary,
              maxWidth: "490px",
              margin: "0 0 24px 0"
            }}
          >
            Jelajahi lowongan dari seluruh tim Sekolah Karir. Transparan soal gaji,
            jelas soal ekspektasi, dan bisa dilamar dalam hitungan detik.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: vibe.inputBg,
              border: `1px solid ${vibe.cardBorder}`,
              borderRadius: "12px",
              padding: "5px 5px 5px 14px",
              boxShadow: vibe.shadow,
              maxWidth: "505px",
              marginBottom: "13px"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={vibe.textMuted} strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              aria-label="Cari lowongan"
              placeholder="Posisi, skill, atau lokasi..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") scrollToGrid();
              }}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "8px 10px",
                fontSize: "13px",
                color: vibe.textPrimary
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Hapus kata kunci"
                style={{
                  background: vibe.chipBg,
                  border: "none",
                  color: vibe.textMuted,
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  fontSize: "11px",
                  cursor: "pointer",
                  marginRight: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={scrollToGrid}
              style={{
                background: vibe.primaryBtnBg,
                color: vibe.primaryBtnText,
                border: "none",
                padding: "9px 16px",
                borderRadius: "9px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Cari lowongan
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "28px"
            }}
          >
            <span style={{ fontSize: "12px", color: vibe.textMuted }}>Populer:</span>
            {POPULAR_TAGS.map((tag) => {
              const isTagActive = searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectPopularTag(isTagActive ? "" : tag)}
                  style={{
                    background: isTagActive ? vibe.activePillBg : vibe.cardBg,
                    border: `1px solid ${isTagActive ? vibe.activePillBorder : vibe.cardBorder}`,
                    color: isTagActive ? vibe.activePillText : vibe.textSecondary,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "34px", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "11px", color: vibe.textMuted, display: "block" }}>
                lowongan terbuka
              </span>
              <strong style={{ fontSize: "1.4rem", fontWeight: "800", color: vibe.textPrimary, fontVariantNumeric: "tabular-nums" }}>
                {totalRoles}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: vibe.textMuted, display: "block" }}>
                tim merekrut
              </span>
              <strong style={{ fontSize: "1.4rem", fontWeight: "800", color: vibe.textPrimary, fontVariantNumeric: "tabular-nums" }}>
                {deptCount}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: vibe.textMuted, display: "block" }}>
                posisi remote
              </span>
              <strong style={{ fontSize: "1.4rem", fontWeight: "800", color: vibe.textPrimary, fontVariantNumeric: "tabular-nums" }}>
                {remoteCount}
              </strong>
            </div>
          </div>
        </div>

        {/* Urgent Job Card */}
        {activeUrgent && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              position: "relative",
              maxWidth: "460px",
              width: "100%",
              marginLeft: "auto",
              padding: "16px 4px"
            }}
          >
            {/* Floating Badge Top Right */}
            <button
              type="button"
              onClick={scrollToGrid}
              className="sk-float-badge"
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                zIndex: 10,
                background: vibe.cardBgElevated,
                border: `1px solid ${vibe.cardBorder}`,
                borderRadius: "999px",
                padding: "5px 13px",
                fontSize: "11px",
                fontWeight: "600",
                color: vibe.textPrimary,
                boxShadow: vibe.shadow,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10B981",
                  animation: "skUrgentPulse 1.8s infinite"
                }}
              />
              <span>
                <strong>{newRolesCount}</strong> lowongan baru minggu ini
              </span>
            </button>

            {/* Main Compact Urgent Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpenRole(activeUrgent)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenRole(activeUrgent);
                }
              }}
              className="sk-urgent-card"
              style={{
                position: "relative",
                overflow: "hidden",
                background: isDark ? "rgba(23, 28, 45, 0.92)" : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${vibe.cardBorder}`,
                borderRadius: "18px",
                padding: "18px 20px 22px 20px",
                cursor: "pointer",
                boxShadow: isDark
                  ? "0 20px 44px rgba(0, 0, 0, 0.42)"
                  : "0 18px 42px rgba(79, 70, 229, 0.08)"
              }}
            >
              {!isPaused && urgentRoles.length > 1 && (
                <div
                  key={`prog-${activeUrgent.id}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2.5px",
                    background: isDark
                      ? "linear-gradient(90deg, #60A5FA, #C084FC)"
                      : "linear-gradient(90deg, #4F46E5, #EC4899)",
                    transformOrigin: "left center",
                    animation: "skProgressFill 4.5s linear forwards"
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px"
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: isDark ? "#FCA5A5" : "#E11D48",
                    background: isDark ? "rgba(244, 63, 94, 0.14)" : "rgba(225, 29, 72, 0.08)",
                    padding: "3px 9px",
                    borderRadius: "999px"
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#F43F5E",
                      animation: "skUrgentPulse 1.4s infinite"
                    }}
                  />
                  Urgent Hiring
                </span>

                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <span style={{ fontSize: "11px", color: vibe.textMuted, marginRight: "2px", fontVariantNumeric: "tabular-nums" }}>
                    {urgentIdx + 1}/{urgentRoles.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setUrgentIdx((prev) => (prev - 1 + urgentRoles.length) % urgentRoles.length)
                    }
                    aria-label="Sebelumnya"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      border: `1px solid ${vibe.cardBorder}`,
                      background: vibe.chipBg,
                      color: vibe.textSecondary,
                      fontSize: "11px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgentIdx((prev) => (prev + 1) % urgentRoles.length)}
                    aria-label="Berikutnya"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      border: `1px solid ${vibe.cardBorder}`,
                      background: vibe.chipBg,
                      color: vibe.textSecondary,
                      fontSize: "11px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>

              <div key={activeUrgent.id} className="sk-urgent-body">
                <div style={{ display: "flex", gap: "11px", alignItems: "center", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: activeUrgent.avatarBg,
                      color: "#FFFFFF",
                      fontWeight: "800",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {activeUrgent.companyInitial}
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: vibe.textMuted, margin: "0 0 1px 0" }}>
                      {activeUrgent.company} • {activeUrgent.location}
                    </p>
                    <h3 style={{ fontSize: "15px", fontWeight: "800", color: vibe.textPrimary, margin: 0 }}>
                      {activeUrgent.title}
                    </h3>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <span
                    style={{
                      background: "rgba(245, 158, 11, 0.14)",
                      color: "#F59E0B",
                      padding: "2.5px 8px",
                      borderRadius: "6px",
                      fontSize: "10.5px",
                      fontWeight: "700"
                    }}
                  >
                    • {activeUrgent.department}
                  </span>
                  <span
                    style={{
                      background: vibe.chipBg,
                      color: vibe.chipText,
                      padding: "2.5px 8px",
                      borderRadius: "6px",
                      fontSize: "10.5px"
                    }}
                  >
                    {activeUrgent.type}
                  </span>
                  <span
                    style={{
                      background: vibe.chipBg,
                      color: vibe.chipText,
                      padding: "2.5px 8px",
                      borderRadius: "6px",
                      fontSize: "10.5px"
                    }}
                  >
                    {activeUrgent.workMode}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "14px" }}>
                  {activeUrgent.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        border: `1px solid ${vibe.chipBorder}`,
                        color: vibe.textSecondary,
                        padding: "2px 7px",
                        borderRadius: "5px",
                        fontSize: "10px"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: `1px solid ${vibe.cardBorder}`
                  }}
                >
                  <div>
                    <span style={{ fontSize: "10px", color: vibe.textMuted, display: "block" }}>
                      Gaji / bulan
                    </span>
                    <strong style={{ fontSize: "13.5px", color: vibe.textPrimary }}>
                      {activeUrgent.salary}
                    </strong>
                  </div>
                  <span
                    style={{
                      background: vibe.primaryBtnBg,
                      color: "#FFFFFF",
                      padding: "7px 14px",
                      borderRadius: "8px",
                      fontSize: "11.5px",
                      fontWeight: "700",
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    Lamar cepat
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Pills */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginTop: "-14px",
                marginLeft: "-26px",
                paddingRight: "6px",
                position: "relative",
                zIndex: 10
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (onSortBySalary) onSortBySalary();
                  scrollToGrid();
                }}
                className="sk-float-badge"
                style={{
                  background: vibe.cardBgElevated,
                  border: `1px solid ${vibe.cardBorder}`,
                  borderRadius: "11px",
                  padding: "7px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: vibe.shadow,
                  fontSize: "11px",
                  textAlign: "left",
                  cursor: "pointer"
                }}
              >
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "7px",
                    background: "rgba(245, 158, 11, 0.16)",
                    color: "#F59E0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </span>
                <div>
                  <span style={{ color: vibe.textMuted, display: "block", fontSize: "9.5px" }}>
                    Gaji hingga
                  </span>
                  <strong style={{ color: vibe.textPrimary, fontSize: "11px" }}>Rp 30 jt / bulan</strong>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPopularTag("Remote");
                  scrollToGrid();
                }}
                className="sk-float-badge"
                style={{
                  background: vibe.cardBgElevated,
                  border: `1px solid ${vibe.cardBorder}`,
                  borderRadius: "11px",
                  padding: "7px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: vibe.shadow,
                  fontSize: "11px",
                  textAlign: "left",
                  cursor: "pointer",
                  animationDelay: "1.4s"
                }}
              >
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "7px",
                    background: "rgba(59, 130, 246, 0.16)",
                    color: "#3B82F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <div>
                  <strong style={{ color: vibe.textPrimary, display: "block", fontSize: "11px" }}>{remoteCount} posisi</strong>
                  <span style={{ color: vibe.textMuted, fontSize: "9.5px" }}>bisa remote</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}