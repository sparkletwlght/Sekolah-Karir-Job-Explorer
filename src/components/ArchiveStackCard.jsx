import { useState } from "react";
import { getDepartmentTheme } from "../data/departmentColors";

export default function ArchiveStackCard({
  dept,
  index,
  totalCount,
  scrollProgress,
  roleCount,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getDepartmentTheme(dept);

  const step = 1 / totalCount;
  const start = index * step;
  const end = start + step;

  const localProgress =
    index === 0
      ? 1
      : Math.min(Math.max((scrollProgress - start) / step, 0), 1);

  const cardsAbove = Math.max(0, (scrollProgress - end) / step);
  const scale = index === totalCount - 1 ? 1 : Math.max(0.88, 1 - cardsAbove * 0.04);
  const brightness = Math.max(0.72, 1 - cardsAbove * 0.1);
  const cardOpacity = Math.max(0.75, 1 - cardsAbove * 0.08);

  const translateY = index === 0 ? 0 : (1 - localProgress) * 110;
  const stackOffset = index * 13;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        position: "absolute",
        top: `${stackOffset}px`,
        left: 0,
        right: 0,
        transform: `translate3d(0, ${translateY}vh, 0) scale(${scale})`,
        transformOrigin: "top center",
        filter: `brightness(${brightness})`,
        opacity: cardOpacity,
        zIndex: index + 10,
        transition: "transform 0.12s ease-out, filter 0.18s ease, opacity 0.18s ease",
        cursor: "pointer"
      }}
    >
      {/* Tab Folder Solid Berwarna */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: theme.accent,
          color: "#FFFFFF",
          padding: "8px 20px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          fontSize: "11px",
          fontWeight: "800",
          letterSpacing: "1.2px",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <span>{theme.code}</span>
      </div>

      {/* Badan Folder Solid Vibrant Gradient */}
      <div
        style={{
          background: theme.cardGradient,
          color: "#FFFFFF",
          borderRadius: "0 24px 24px 24px",
          padding: "28px",
          boxShadow: `0 20px 45px ${theme.cardShadow}, inset 0 1px 1px rgba(255, 255, 255, 0.45)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "200px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Dekorasi lingkaran cahaya lembut di pojok kartu (fix bug posisi sebelumnya) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-45px",
            right: "-45px",
            width: "170px",
            height: "170px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255, 255, 255, 0.24)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: "800",
                padding: "5px 14px",
                borderRadius: "999px",
                marginBottom: "12px",
                fontVariantNumeric: "tabular-nums"
              }}
            >
              {roleCount} Posisi Tersedia
            </span>
            <h2
              style={{
                fontSize: "clamp(1.65rem, 4vw, 2.3rem)",
                fontWeight: "900",
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.15,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.12)"
              }}
            >
              Divisi {dept}
            </h2>
          </div>

          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              backgroundColor: "#FFFFFF",
              color: theme.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "900",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
              flexShrink: 0,
              transform: isHovered ? "translate(2px, -2px) scale(1.06)" : "translate(0, 0) scale(1)",
              transition: "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            ↗
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.28)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            fontWeight: "700"
          }}
        >
          <span style={{ opacity: 0.92 }}>Klik folder untuk membuka arsip</span>
          <span
            style={{
              backgroundColor: isHovered ? "rgba(255, 255, 255, 0.34)" : "rgba(255, 255, 255, 0.22)",
              padding: "5px 12px",
              borderRadius: "999px",
              fontWeight: "800",
              transition: "background-color 0.2s ease"
            }}
          >
            Buka Sektor
          </span>
        </div>
      </div>
    </div>
  );
}