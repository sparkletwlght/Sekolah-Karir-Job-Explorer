import { useState } from "react";
import { getDepartmentTheme, getVibeTokens } from "../data/departmentColors";
import BookmarkIcon from "./BookmarkIcon";

const trackPointer = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export default function RoleCard({ role, isDark, onClick, onSave, isSaved, isApplied = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getDepartmentTheme(role.department);
  const vibe = getVibeTokens(isDark);

  const deptBg = isDark ? theme.pillBgDark : theme.pillBgLight;
  const deptText = isDark ? theme.darkAccent : theme.accent;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onPointerMove={trackPointer}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: vibe.cardBg,
        border: `1px solid ${isHovered ? vibe.cardBorderHover : vibe.cardBorder}`,
        borderRadius: "16px",
        padding: "20px",
        cursor: "pointer",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.24s ease, box-shadow 0.24s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isHovered
          ? isDark
            ? "0 16px 36px rgba(0, 0, 0, 0.42)"
            : "0 14px 32px rgba(30, 37, 54, 0.08)"
          : vibe.shadow
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight radial halus mengikuti pointer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${
            isDark ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.07)"
          }, transparent 75%)`
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Top Row: Company Initial + Title + Bookmark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
            marginBottom: "14px"
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: role.avatarBg,
                color: "#FFFFFF",
                fontWeight: "800",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: isHovered ? "scale(1.05) rotate(-3deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {role.companyInitial}
            </div>
            <div>
              <p style={{ fontSize: "11px", color: vibe.textMuted, margin: "0 0 2px 0" }}>
                {role.company}
              </p>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: vibe.textPrimary,
                  margin: 0,
                  lineHeight: 1.3
                }}
              >
                {role.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Hapus ${role.title} dari tersimpan` : `Simpan ${role.title}`}
            title={isSaved ? "Hapus dari tersimpan" : "Simpan lowongan"}
            style={{
              background: isSaved
                ? isDark
                  ? "rgba(59, 130, 246, 0.2)"
                  : "#EFF6FF"
                : "transparent",
              border: `1px solid ${isSaved ? "#3B82F6" : vibe.chipBorder}`,
              borderRadius: "8px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            <BookmarkIcon
              isSaved={isSaved}
              fillColor="#3B82F6"
              strokeColor={vibe.textMuted}
              size={14}
            />
          </button>
        </div>

        {/* Badges Row */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span
            style={{
              background: deptBg,
              color: deptText,
              padding: "3px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: theme.dot
              }}
            />
            {role.department}
          </span>

          <span
            style={{
              background: vibe.chipBg,
              color: vibe.chipText,
              padding: "3px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "500"
            }}
          >
            {role.type}
          </span>

          <span
            style={{
              background: vibe.chipBg,
              color: vibe.chipText,
              padding: "3px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "500"
            }}
          >
            {role.workMode}
          </span>
        </div>

        {/* Location (Map Pin) */}
        <p
          style={{
            fontSize: "12px",
            color: vibe.textMuted,
            margin: "0 0 18px 0",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{role.location}</span>
        </p>
      </div>

      {/* Footer: Salary & Posted Status */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: "14px",
          borderTop: `1px solid ${vibe.cardBorder}`
        }}
      >
        <div>
          <span style={{ fontSize: "10px", color: vibe.textMuted, display: "block", marginBottom: "2px" }}>
            Estimasi gaji / bulan
          </span>
          <span style={{ fontSize: "13px", fontWeight: "800", color: vibe.textPrimary }}>
            {role.salary}
            {role.salaryStatus === "Nego" && (
              <span style={{ fontWeight: "500", color: vibe.textMuted }}> · Nego</span>
            )}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {isApplied ? (
            <span
              style={{
                background: isDark ? "rgba(16, 185, 129, 0.16)" : "#ECFDF5",
                color: isDark ? "#6EE7B7" : "#059669",
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Sudah dilamar</span>
            </span>
          ) : role.isNew ? (
            <span
              style={{
                background: vibe.badgeNewBg,
                color: vibe.badgeNewText,
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: "700"
              }}
            >
              Baru · {role.postedLabel}
            </span>
          ) : (
            <span style={{ fontSize: "11px", color: vibe.textMuted }}>
              {role.postedLabel}
            </span>
          )}

          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: isHovered ? "22px" : "0px",
              height: "22px",
              borderRadius: "999px",
              background: vibe.primaryBtnBg,
              color: "#FFFFFF",
              opacity: isHovered ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}