import { useState, useEffect, useRef } from "react";
import ArchiveStackCard from "./ArchiveStackCard";

const AMBIENT_DOTS = [
  { id: 1, left: "10%", top: "24%", size: 6, color: "#38BDF8" },
  { id: 2, left: "86%", top: "28%", size: 6, color: "#A78BFA" },
  { id: 3, left: "16%", top: "74%", size: 5, color: "#F472B6" },
  { id: 4, left: "82%", top: "72%", size: 6, color: "#FBBF24" },
  { id: 5, left: "50%", top: "18%", size: 5, color: "#34D399" }
];

export default function ArchiveSplashScreen({
  archiveDepts,
  roles,
  isDark,
  onToggleTheme,
  onSelectDept,
  onSkip
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable > 0) {
            const currentScrolled = -rect.top;
            const progress = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
            setScrollProgress(progress);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "360vh",
        background: isDark
          ? "linear-gradient(160deg, #090D16 0%, #131836 52%, #1E1136 100%)"
          : "linear-gradient(160deg, #E0F2FE 0%, #F8FAFC 48%, #F3E8FF 100%)",
        color: isDark ? "#F8FAFC" : "#0F172A",
        position: "relative"
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "22px 18px 34px 18px"
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1
          }}
        >
          {AMBIENT_DOTS.map((dot) => (
            <span
              key={dot.id}
              style={{
                position: "absolute",
                left: dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                borderRadius: "50%",
                backgroundColor: dot.color,
                opacity: isDark ? 0.55 : 0.45
              }}
            />
          ))}
        </div>

        <div
          style={{
            maxWidth: "820px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            zIndex: 50
          }}
        >
          <span
            style={{
              background: isDark ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.85)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.18)"
                : "1px solid rgba(148, 163, 184, 0.25)",
              color: isDark ? "#E2E8F0" : "#1E293B",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "0.8px"
            }}
          >
            KARIR ARCHIVE
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={onToggleTheme}
              title={isDark ? "Ubah ke Soft Daylight" : "Ubah ke Velvet Dark"}
              aria-label="Toggle Vibe"
              style={{
                background: isDark ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.88)",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(148, 163, 184, 0.25)",
                color: isDark ? "#FDE047" : "#475569",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={onSkip}
              style={{
                background: isDark ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.9)",
                color: isDark ? "#FFFFFF" : "#0F172A",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.22)"
                  : "1px solid rgba(148, 163, 184, 0.25)",
                padding: "9px 16px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer"
              }}
            >
              Lewati ke Explorer
            </button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "10px auto 0 auto",
            zIndex: 40
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.85rem, 4.5vw, 3.05rem)",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Eksplorasi Arsip{" "}
            <span
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #F472B6 100%)"
                  : "linear-gradient(135deg, #0284C7 0%, #4F46E5 50%, #DB2777 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}
            >
              Sektor Karir
            </span>
          </h1>
          <p
            style={{
              color: isDark ? "#CBD5E1" : "#475569",
              fontSize: "13px",
              marginTop: "8px",
              fontWeight: "500"
            }}
          >
            Scroll ke bawah untuk menumpuk folder divisi secara interaktif.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: "660px",
            width: "100%",
            height: "305px",
            margin: "12px auto auto auto",
            zIndex: 20
          }}
        >
          {archiveDepts.map((dept, index) => {
            const count = roles.filter((r) => r.department === dept).length;
            return (
              <ArchiveStackCard
                key={dept}
                dept={dept}
                index={index}
                totalCount={archiveDepts.length}
                scrollProgress={scrollProgress}
                roleCount={count}
                onClick={() => onSelectDept(dept)}
              />
            );
          })}
        </div>

        <div
          style={{
            maxWidth: "300px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            zIndex: 50
          }}
        >
          <div
            style={{
              height: "5px",
              backgroundColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(15, 23, 42, 0.1)",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "8px"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.round(scrollProgress * 100)}%`,
                backgroundImage: isDark
                  ? "linear-gradient(90deg, #38BDF8, #F472B6, #FDE047)"
                  : "linear-gradient(90deg, #0284C7, #E11D48, #D97706)"
              }}
            />
          </div>
          <span
            style={{
              fontSize: "11px",
              color: isDark ? "#CBD5E1" : "#475569",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums"
            }}
          >
            {scrollProgress < 0.95
              ? `SCROLL PROGRESS • ${Math.round(scrollProgress * 100)}%`
              : "SEMUA ARSIP TERBUKA • PILIH FOLDER DI ATAS"}
          </span>
        </div>
      </div>
    </div>
  );
}