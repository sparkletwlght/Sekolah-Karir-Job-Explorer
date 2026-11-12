import { getVibeTokens } from "../data/departmentColors";

export default function EmptyState({
  selectedDept,
  searchQuery,
  isSavedView,
  isDark,
  onReset
}) {
  const vibe = getVibeTokens(isDark);

  return (
    <div
      style={{
        background: vibe.cardBg,
        border: `1px solid ${vibe.cardBorder}`,
        borderRadius: "18px",
        padding: "56px 24px",
        textAlign: "center"
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "13px",
          background: vibe.chipBg,
          border: `1px solid ${vibe.chipBorder}`,
          color: vibe.textSecondary,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px"
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px 0" }}>
        {isSavedView ? "Belum ada lowongan tersimpan" : "Lowongan tidak ditemukan"}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: vibe.textMuted,
          maxWidth: "380px",
          margin: "0 auto 18px auto",
          lineHeight: 1.6
        }}
      >
        {isSavedView
          ? "Klik ikon bookmark pada kartu lowongan untuk menyimpannya di sini."
          : `Tidak ada posisi yang cocok${
              searchQuery ? ` untuk “${searchQuery}”` : ""
            }${selectedDept !== "All" ? ` di divisi ${selectedDept}` : ""}.`}
      </p>

      <button
        type="button"
        onClick={onReset}
        style={{
          background: vibe.primaryBtnBg,
          color: "#FFFFFF",
          border: "none",
          padding: "9px 18px",
          borderRadius: "9px",
          fontSize: "12.5px",
          fontWeight: "700",
          cursor: "pointer"
        }}
      >
        {isSavedView ? "Jelajahi semua lowongan" : "Reset filter"}
      </button>
    </div>
  );
}