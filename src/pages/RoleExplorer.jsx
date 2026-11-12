import { useState, useMemo, useEffect } from "react";
import { mockRoles, departments } from "../data/mockRoles";
import { getDepartmentTheme, getVibeTokens } from "../data/departmentColors";
import Navbar from "../components/Navbar";
import ArchiveSplashScreen from "../components/ArchiveSplashScreen";
import HeroSection from "../components/HeroSection";
import RoleCard from "../components/RoleCard";
import JobDetailView from "../components/JobDetailView";
import EmptyState from "../components/EmptyState";
import CommandPaletteModal from "../components/CommandPaletteModal";

export default function RoleExplorer() {
  const [currentView, setCurrentView] = useState("archive");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = localStorage.getItem("sk-saved-ids");
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [appliedJobIds, setAppliedJobIds] = useState(() => {
    try {
      const applied = localStorage.getItem("sk-applied-ids");
      return applied ? JSON.parse(applied) : [5];
    } catch {
      return [5];
    }
  });

  const [jobAlert, setJobAlert] = useState(() => {
    try {
      const alert = localStorage.getItem("sk-job-alert");
      return alert ? JSON.parse(alert) : null;
    } catch {
      return null;
    }
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("sk-theme-vibe");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("sk-theme-vibe", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("sk-saved-ids", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem("sk-applied-ids", JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    if (jobAlert) localStorage.setItem("sk-job-alert", JSON.stringify(jobAlert));
    else localStorage.removeItem("sk-job-alert");
  }, [jobAlert]);

  const showToast = (message, action = null) => {
    setToast({ message, action });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && !isTyping && !isPaletteOpen && currentView === "explorer") {
        e.preventDefault();
        document.querySelector("input[type='text']")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentView, isPaletteOpen]);

  const vibe = getVibeTokens(isDark);
  const archiveDepts = departments.filter((d) => d !== "All");
  const urgentRoles = useMemo(() => mockRoles.slice(0, 4), []);

  const activeFilterCount = [
    selectedDept !== "All",
    selectedType !== "All",
    searchQuery.trim() !== ""
  ].filter(Boolean).length;

  const filterSummary = useMemo(() => {
    const parts = [
      searchQuery.trim() && `“${searchQuery.trim()}”`,
      selectedDept !== "All" && selectedDept,
      selectedType !== "All" && selectedType
    ].filter(Boolean);
    return parts.length ? parts.join(" · ") : "Semua lowongan baru";
  }, [searchQuery, selectedDept, selectedType]);

  const toggleSaveJob = (id) => {
    const target = mockRoles.find((r) => r.id === id);
    const wasSaved = savedJobIds.includes(id);

    setSavedJobIds((prev) =>
      wasSaved ? prev.filter((item) => item !== id) : [...prev, id]
    );

    if (target) {
      if (wasSaved) {
        showToast(`"${target.title}" dihapus dari tersimpan`, {
          label: "Urungkan",
          onClick: () =>
            setSavedJobIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
        });
      } else {
        showToast(`"${target.title}" disimpan`);
      }
    }
  };

  const resetFilters = () => {
    setSelectedDept("All");
    setSelectedType("All");
    setSortBy("newest");
    setSearchQuery("");
    setCurrentView("explorer");
  };

  const openRoleDetail = (role) => {
    setSelectedRole(role);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredRoles = useMemo(() => {
    const baseList =
      currentView === "saved"
        ? mockRoles.filter((r) => savedJobIds.includes(r.id))
        : mockRoles;

    const filtered = baseList.filter((role) => {
      const matchDept = selectedDept === "All" || role.department === selectedDept;
      const matchType = selectedType === "All" || role.type === selectedType;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        role.title.toLowerCase().includes(q) ||
        role.company.toLowerCase().includes(q) ||
        role.location.toLowerCase().includes(q) ||
        role.workMode.toLowerCase().includes(q) ||
        role.tags.some((t) => t.toLowerCase().includes(q));
      return matchDept && matchType && matchSearch;
    });

    if (sortBy === "salary") {
      return [...filtered].sort((a, b) => b.salaryNumeric - a.salaryNumeric);
    }
    return filtered;
  }, [currentView, savedJobIds, selectedDept, selectedType, sortBy, searchQuery]);

  if (currentView === "archive") {
    return (
      <ArchiveSplashScreen
        archiveDepts={archiveDepts}
        roles={mockRoles}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onSelectDept={(dept) => {
          setSelectedDept(dept);
          setCurrentView("explorer");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSkip={() => {
          setSelectedDept("All");
          setCurrentView("explorer");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <div
      style={{
        background: vibe.pageBg,
        color: vibe.textPrimary,
        minHeight: "100vh",
        transition: "background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease"
      }}
    >
      <style>{`
        .sk-root button,
        .sk-root select,
        .sk-root [role="button"] {
          transition:
            background-color 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sk-root button:hover:not(:disabled) {
          transform: translateY(-1.5px);
        }
        .sk-root button:active:not(:disabled),
        .sk-root [role="button"]:active {
          transform: scale(0.96);
        }
        @keyframes skViewFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .sk-view-fade {
          animation: skViewFade 0.32s ease forwards;
        }
      `}</style>

      <div className="sk-root">
        <Navbar
          currentView={currentView}
          savedCount={savedJobIds.length}
          isLoggedIn={isLoggedIn}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onOpenQuickSearch={() => setIsPaletteOpen(true)}
          onNavigateExplorer={resetFilters}
          onToggleSaved={() => {
            setCurrentView((prev) => (prev === "saved" ? "explorer" : "saved"));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onToggleLogin={() => {
            setIsLoggedIn((prev) => {
              const next = !prev;
              showToast(next ? "Selamat datang, Angie!" : "Kamu telah keluar");
              return next;
            });
          }}
        />

        <CommandPaletteModal
          isOpen={isPaletteOpen}
          roles={mockRoles}
          isDark={isDark}
          onClose={() => setIsPaletteOpen(false)}
          onSelectRole={openRoleDetail}
          actions={[
            {
              id: "saved",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              ),
              label: "Lihat lowongan tersimpan",
              hint: String(savedJobIds.length),
              run: () => {
                setCurrentView("saved");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            },
            {
              id: "theme",
              icon: isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FDE047" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ),
              label: isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap",
              run: () => setIsDark((prev) => !prev)
            },
            ...archiveDepts.map((dept) => ({
              id: `dept-${dept}`,
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              ),
              label: `Tampilkan divisi ${dept}`,
              hint: String(mockRoles.filter((r) => r.department === dept).length),
              run: () => {
                setSelectedDept(dept);
                setCurrentView("explorer");
                document.getElementById("jobs-grid")?.scrollIntoView({ behavior: "smooth" });
              }
            }))
          ]}
        />

        {currentView === "detail" && selectedRole ? (
          <JobDetailView
            key={selectedRole.id}
            role={selectedRole}
            relatedRoles={mockRoles
              .filter((r) => r.department === selectedRole.department && r.id !== selectedRole.id)
              .slice(0, 3)}
            isDark={isDark}
            onBack={() => {
              setCurrentView("explorer");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectRole={openRoleDetail}
            onSave={() => toggleSaveJob(selectedRole.id)}
            isSaved={savedJobIds.includes(selectedRole.id)}
            isLoggedIn={isLoggedIn}
            isApplied={appliedJobIds.includes(selectedRole.id)}
            onApply={() => {
              if (!isLoggedIn) setIsLoggedIn(true);
              setAppliedJobIds((prev) =>
                prev.includes(selectedRole.id) ? prev : [...prev, selectedRole.id]
              );
              showToast(`Lamaran untuk ${selectedRole.title} berhasil dikirim!`);
            }}
          />
        ) : (
          <div key={currentView} className="sk-view-fade">
            {currentView !== "saved" && (
              <HeroSection
                isDark={isDark}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectPopularTag={(tag) => setSearchQuery(tag)}
                onSortBySalary={() => setSortBy("salary")}
                urgentRoles={urgentRoles}
                onOpenRole={openRoleDetail}
                totalRoles={mockRoles.length}
                allRoles={mockRoles}
              />
            )}

            <main
              id="jobs-grid"
              className="sk-main-container"
              style={{ maxWidth: "1080px", margin: "0 auto", padding: "44px 32px 72px 32px" }}
            >
              {currentView === "saved" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "16px",
                    borderBottom: `1px solid ${vibe.cardBorder}`
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "800", margin: "0 0 2px 0" }}>
                      Lowongan Tersimpan ({savedJobIds.length})
                    </h2>
                    <span style={{ fontSize: "12px", color: vibe.textMuted }}>
                      Daftar posisi yang kamu simpan untuk dilamar nanti
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentView("explorer")}
                    style={{
                      background: vibe.cardBg,
                      color: vibe.textPrimary,
                      border: `1px solid ${vibe.cardBorder}`,
                      padding: "7px 14px",
                      borderRadius: "9px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    ← Lihat semua lowongan
                  </button>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                    alignItems: "center"
                  }}
                >
                  {departments.map((dept) => {
                    const isActive = selectedDept === dept;
                    const theme = getDepartmentTheme(dept);
                    const baseSource =
                      currentView === "saved"
                        ? mockRoles.filter((r) => savedJobIds.includes(r.id))
                        : mockRoles;
                    const count =
                      dept === "All"
                        ? baseSource.length
                        : baseSource.filter((r) => r.department === dept).length;

                    return (
                      <button
                        key={dept}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedDept(dept)}
                        style={{
                          background: isActive ? vibe.activePillBg : vibe.cardBg,
                          color: isActive ? vibe.activePillText : vibe.textSecondary,
                          border: `1px solid ${
                            isActive ? vibe.activePillBorder : vibe.cardBorder
                          }`,
                          padding: "6px 11px",
                          borderRadius: "999px",
                          fontSize: "11.5px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        {dept !== "All" && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: theme.dot
                            }}
                          />
                        )}
                        <span>{dept === "All" ? "Semua" : dept}</span>
                        <span
                          style={{
                            background: vibe.chipBg,
                            padding: "1px 6px",
                            borderRadius: "999px",
                            fontSize: "10px",
                            fontWeight: "700",
                            fontVariantNumeric: "tabular-nums"
                          }}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginLeft: "auto" }}>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: isDark ? "#7DD3FC" : "#2563EB",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        padding: "6px 6px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Reset ({activeFilterCount})
                    </button>
                  )}

                  <select
                    aria-label="Filter tipe pekerjaan"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                      background: vibe.cardBg,
                      color: vibe.textPrimary,
                      border: `1px solid ${vibe.cardBorder}`,
                      padding: "6px 11px",
                      borderRadius: "9px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    <option value="All">Semua tipe</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>

                  <select
                    aria-label="Urutkan lowongan"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      background: vibe.cardBg,
                      color: vibe.textPrimary,
                      border: `1px solid ${vibe.cardBorder}`,
                      padding: "6px 11px",
                      borderRadius: "9px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    <option value="newest">Terbaru</option>
                    <option value="salary">Gaji tertinggi</option>
                  </select>
                </div>
              </div>

              {filteredRoles.length > 0 ? (
                <div
                  className="sk-jobs-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                    gap: "18px"
                  }}
                >
                  {filteredRoles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      isDark={isDark}
                      isSaved={savedJobIds.includes(role.id)}
                      isApplied={appliedJobIds.includes(role.id)}
                      onSave={() => toggleSaveJob(role.id)}
                      onClick={() => openRoleDetail(role)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  selectedDept={selectedDept}
                  searchQuery={searchQuery}
                  isSavedView={currentView === "saved"}
                  isDark={isDark}
                  onReset={resetFilters}
                />
              )}

              <section
                style={{
                  marginTop: "52px",
                  borderRadius: "22px",
                  padding: "34px 30px",
                  background: isDark
                    ? "radial-gradient(circle at 85% 30%, rgba(129, 140, 248, 0.2) 0%, transparent 55%), #171C2D"
                    : "radial-gradient(circle at 85% 30%, rgba(167, 139, 250, 0.2) 0%, transparent 55%), #1E2536",
                  border: `1px solid ${vibe.cardBorder}`,
                  color: "#F1F5F9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "24px"
                }}
              >
                <div style={{ maxWidth: "460px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#FBBF24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px"
                    }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "800", margin: "0 0 8px 0" }}>
                    Belum ketemu yang pas?
                  </h2>
                  <p style={{ fontSize: "13px", color: "#A3B0C6", lineHeight: 1.6, margin: 0 }}>
                    Buat job alert dari pencarianmu. Kami kabari begitu ada lowongan baru
                    yang cocok, jadi kamu tidak perlu cek setiap hari.
                  </p>
                </div>

                {jobAlert ? (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      borderRadius: "16px",
                      padding: "16px 20px",
                      minWidth: "260px"
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#6EE7B7",
                        margin: "0 0 6px 0"
                      }}
                    >
                      ● Job alert aktif
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: "600", margin: "0 0 12px 0" }}>
                      {jobAlert.summary}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setJobAlert(null);
                        showToast("Job alert dimatikan");
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#CBD5E1",
                        fontSize: "12px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      Matikan alert
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setJobAlert({ summary: filterSummary });
                        showToast(`Job alert dibuat: ${filterSummary}`);
                      }}
                      style={{
                        background: "#F8FAFC",
                        color: "#1E2536",
                        border: "none",
                        padding: "11px 18px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "700",
                        cursor: "pointer",
                        marginBottom: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
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
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <span>Buat job alert</span>
                    </button>
                    <span style={{ display: "block", fontSize: "11px", color: "#94A3B8" }}>
                      Untuk: {filterSummary}
                    </span>
                  </div>
                )}
              </section>
            </main>
          </div>
        )}

        <footer
          className="sk-footer-container"
          style={{
            borderTop: `1px solid ${vibe.cardBorder}`,
            padding: "20px 32px",
            fontSize: "12px",
            color: vibe.textMuted
          }}
        >
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <span>© 2026 Sekolah Karir · Proyek demo frontend</span>
            <span>Tekan / atau Ctrl K untuk mencari</span>
          </div>
        </footer>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 200,
            background: isDark ? "#1E293B" : "#0F172A",
            color: "#F8FAFC",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "11px 16px",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.28)"
          }}
        >
          <span>{toast.message}</span>
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action.onClick();
                setToast(null);
              }}
              style={{
                background: "rgba(96, 165, 250, 0.2)",
                color: "#93C5FD",
                border: "none",
                borderRadius: "7px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}