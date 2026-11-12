import { getDepartmentTheme, getVibeTokens } from "../data/departmentColors";

const BENEFITS = [
  {
    title: "Asuransi Kesehatan",
    desc: "Perlindungan rawat jalan & inap",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 7v6M9 10h6" />
      </svg>
    )
  },
  {
    title: "Perangkat Kerja",
    desc: "Laptop & tunjangan setup",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    )
  },
  {
    title: "Budget Belajar",
    desc: "Akses kursus & sertifikasi",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    title: "Cuti Fleksibel",
    desc: "Work-life balance terjaga",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    )
  }
];

export default function JobDetailView({
  role,
  relatedRoles = [],
  isDark,
  onBack,
  onSelectRole,
  onSave,
  isSaved,
  isApplied,
  onApply
}) {
  const vibe = getVibeTokens(isDark);
  const deptTheme = getDepartmentTheme(role.department);

  return (
    <div style={{ paddingTop: "22px", paddingBottom: "72px" }}>
      {/* Breadcrumb Strip */}
      <div
        style={{
          borderTop: `1px solid ${vibe.cardBorder}`,
          borderBottom: `1px solid ${vibe.cardBorder}`,
          padding: "16px 32px",
          background: vibe.cardBg
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: vibe.textSecondary,
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: 0
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Kembali ke daftar lowongan</span>
          </button>

          <span style={{ fontSize: "12px", color: vibe.textMuted }}>
            {role.department} / {role.title}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div
        style={{
          borderBottom: `1px solid ${vibe.cardBorder}`,
          padding: "36px 32px",
          backgroundImage: vibe.heroBg
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap"
          }}
        >
          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                backgroundColor: role.avatarBg,
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              {role.companyInitial}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: vibe.textSecondary }}>
                  {role.company}
                </span>
                <span style={{ color: vibe.textMuted }}>•</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    color: vibe.textSecondary
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
                  {role.location}
                </span>
                <span style={{ color: vibe.textMuted }}>•</span>
                <span style={{ fontSize: "12px", color: vibe.textMuted }}>{role.postedLabel}</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                  fontWeight: "850",
                  color: vibe.textPrimary,
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.025em"
                }}
              >
                {role.title}
              </h1>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isDark ? "rgba(59, 130, 246, 0.14)" : deptTheme.bg,
                    color: isDark ? "#7DD3FC" : deptTheme.text,
                    padding: "4px 11px",
                    borderRadius: "7px",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: deptTheme.dot
                    }}
                  />
                  {role.department}
                </span>
                <span
                  style={{
                    background: vibe.chipBg,
                    color: vibe.chipText,
                    padding: "4px 11px",
                    borderRadius: "7px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {role.type}
                </span>
                <span
                  style={{
                    background: vibe.chipBg,
                    color: vibe.chipText,
                    padding: "4px 11px",
                    borderRadius: "7px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {role.workMode}
                </span>
                <span
                  style={{
                    background: vibe.chipBg,
                    color: vibe.chipText,
                    padding: "4px 11px",
                    borderRadius: "7px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  Min. {role.workingPeriod}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onSave}
            style={{
              background: isSaved ? vibe.activePillBg : vibe.cardBg,
              color: isSaved ? vibe.activePillText : vibe.textPrimary,
              border: `1px solid ${isSaved ? vibe.activePillBorder : vibe.cardBorder}`,
              padding: "9px 15px",
              borderRadius: "10px",
              fontSize: "12.5px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px"
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span>{isSaved ? "Tersimpan" : "Simpan lowongan"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "36px 32px 0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
          alignItems: "start"
        }}
      >
        {/* Left Details */}
        <div style={{ gridColumn: "span 2", minWidth: 0 }}>
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 12px 0" }}>
              Tentang Peran Ini
            </h2>
            <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: vibe.textSecondary, margin: 0 }}>
              {role.description}
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 12px 0" }}>
              Kualifikasi & Skill Utama
            </h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {role.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: vibe.cardBg,
                    border: `1px solid ${vibe.cardBorder}`,
                    color: vibe.textPrimary,
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: "600"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                color: vibe.textSecondary,
                fontSize: "14px",
                lineHeight: 1.9
              }}
            >
              <li>Memiliki pengalaman relevan atau portofolio proyek nyata di bidang terkait.</li>
              <li>Komunikatif, proaktif, dan nyaman bekerja dalam lingkungan {role.workMode}.</li>
              <li>Terbiasa menggunakan tools kolaborasi modern dan berorientasi pada detail.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "17px", fontWeight: "800", margin: "0 0 14px 0" }}>
              Benefit & Fasilitas
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "12px"
              }}
            >
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    background: vibe.cardBg,
                    border: `1px solid ${vibe.cardBorder}`,
                    borderRadius: "14px",
                    padding: "16px"
                  }}
                >
                  <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    {b.icon}
                  </div>
                  <strong style={{ display: "block", fontSize: "13.5px", marginBottom: "4px" }}>
                    {b.title}
                  </strong>
                  <span style={{ fontSize: "12px", color: vibe.textMuted }}>{b.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Apply Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              background: vibe.cardBg,
              border: `1px solid ${vibe.cardBorder}`,
              borderRadius: "18px",
              padding: "22px"
            }}
          >
            <span style={{ fontSize: "12px", color: vibe.textMuted, display: "block", marginBottom: "4px" }}>
              Estimasi kompensasi / bulan
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "18px" }}>
              <strong style={{ fontSize: "1.45rem", fontWeight: "850", color: vibe.textPrimary }}>
                {role.salary}
              </strong>
              {role.salaryStatus === "Nego" && (
                <span style={{ fontSize: "12.5px", color: vibe.textMuted }}>· Nego</span>
              )}
            </div>

            <button
              type="button"
              disabled={isApplied}
              onClick={onApply}
              style={{
                width: "100%",
                background: isApplied ? "rgba(16, 185, 129, 0.16)" : vibe.primaryBtnBg,
                color: isApplied ? (isDark ? "#6EE7B7" : "#059669") : "#FFFFFF",
                border: isApplied ? "1px solid rgba(16, 185, 129, 0.35)" : "none",
                padding: "12px 18px",
                borderRadius: "11px",
                fontSize: "13.5px",
                fontWeight: "700",
                cursor: isApplied ? "default" : "pointer",
                marginBottom: "10px"
              }}
            >
              {isApplied ? "Lamaran Terkirim" : "Lamar Posisi Ini"}
            </button>

            <p style={{ fontSize: "11.5px", color: vibe.textMuted, textAlign: "center", margin: 0 }}>
              Proses lamaran cepat kurang dari 30 detik.
            </p>
          </div>

          {relatedRoles.length > 0 && (
            <div
              style={{
                background: vibe.cardBg,
                border: `1px solid ${vibe.cardBorder}`,
                borderRadius: "18px",
                padding: "18px"
              }}
            >
              <h3 style={{ fontSize: "13.5px", fontWeight: "800", margin: "0 0 12px 0" }}>
                Lowongan Serupa
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {relatedRoles.map((rel) => (
                  <div
                    key={rel.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectRole(rel)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectRole(rel);
                      }
                    }}
                    style={{
                      padding: "11px 12px",
                      borderRadius: "11px",
                      background: vibe.chipBg,
                      cursor: "pointer"
                    }}
                  >
                    <strong style={{ display: "block", fontSize: "13px", marginBottom: "2px" }}>
                      {rel.title}
                    </strong>
                    <span style={{ fontSize: "11.5px", color: vibe.textMuted }}>
                      {rel.company} • {rel.salary}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}