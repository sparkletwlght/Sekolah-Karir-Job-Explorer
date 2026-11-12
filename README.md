# Sekolah Karir — Interactive Job Portal

Aplikasi web portal karier interaktif berbasis **React.js** dan **Vite** untuk menjelajahi lowongan kerja lintas divisi (**Engineering**, **Design**, **Product**, **Marketing**, dan **Operations**) dengan transparansi gaji, filter instan, mode tema ganda, serta pengalaman eksplorasi arsip interaktif.

---

## Fitur Utama

1. **Interactive Karir Archive Splash Screen (`ArchiveSplashScreen.jsx` & `ArchiveStackCard.jsx`)**
   - Layar pembuka interaktif dengan kartu folder bertumpuk (*stacking cards*) yang merespons progres gulir (`scrollProgress`) berbasis `requestAnimationFrame`.
   - Pengguna dapat memilih folder divisi secara langsung untuk memfilter lowongan atau melewati layar pembuka menuju tampilan utama (*Role Explorer*).

2. **Hero Section & Urgent Hiring Showcase (`HeroSection.jsx`)**
   - Teks judul dinamis yang merotasi posisi populer (*Product Designer*, *Growth Marketer*, *Frontend Engineer*, *Product Manager*).
   - Kolom pencarian langsung berdasarkan posisi, keahlian (*skill*), lokasi, maupun sistem kerja (*Remote/Hybrid/On-site*), dilengkapi *quick tags* populer dan statistik lowongan *real-time*.
   - Kartu sorotan **Urgent Hiring** interaktif dengan *auto-carousel* (jeda otomatis saat kursor diarahkan/*hover*), indikator progres waktu, dan tombol navigasi manual.

3. **Pencarian Cepat / Command Palette (`CommandPaletteModal.jsx`)**
   - Modal navigasi cepat yang dapat diakses melalui tombol di Navbar atau pintasan keyboard **`Ctrl + K`** / **`Cmd + K`** (serta tombol **`/`** untuk langsung fokus ke kolom pencarian).
   - Mendukung navigasi keyboard penuh (`↑`, `↓`, `Enter`, `Esc`) untuk mencari lowongan atau menjalankan aksi cepat (ganti tema, buka daftar tersimpan, filter divisi).

4. **Filter Multi-Kriteria, Pengurutan & Simpan Lowongan (`RoleExplorer.jsx` & `RoleCard.jsx`)**
   - Filter kombinasi berdasarkan **Divisi**, **Tipe Pekerjaan** (*Full-time*, *Part-time*, *Contract*, *Internship*), dan **Kata Kunci Pencarian**, serta pengurutan berdasarkan **Terbaru** atau **Gaji Tertinggi**.
   - Fitur **Simpan Lowongan (Bookmark)**, **Lamar Cepat (Quick Apply)**, dan **Job Alert** yang tersimpan secara persisten menggunakan `localStorage` beserta notifikasi *toast* dengan opsi *Undo*.

5. **Halaman Detail Lowongan (`JobDetailView.jsx`)**
   - Menampilkan informasi lengkap perusahaan, lokasi, estimasi kompensasi bulanan, kualifikasi utama, daftar benefit, fitur lamar instan, serta rekomendasi lowongan serupa dalam divisi yang sama.

6. **Dual Theme (Soft Daylight & Velvet Dark) + Responsif Desktop & Mobile**
   - Mendukung peralihan tema terang dan gelap yang tersimpan otomatis di `localStorage`, serta tata letak responsif untuk tampilan layar desktop maupun perangkat seluler.

---

## Struktur Proyek

```text
├── index.html                        # Entry HTML & optimasi pemuatan font Inter (non-blocking)
├── src/
│   ├── main.jsx                      # Entry point React DOM
│   ├── App.jsx                       # Root wrapper aplikasi
│   ├── index.css                     # Styling global, reset box-sizing, dan media query responsif
│   ├── data/
│   │   ├── mockRoles.js              # Data dummy lowongan kerja & daftar departemen
│   │   └── departmentColors.js       # Token warna tema (Light/Dark) dan aksen tiap divisi
│   ├── components/
│   │   ├── Navbar.jsx                # Floating pill navigation bar (Search, Theme, Saved, Auth)
│   │   ├── ArchiveSplashScreen.jsx   # Layar pembuka interaktif berbasis scroll progress
│   │   ├── ArchiveStackCard.jsx      # Komponen kartu folder divisi bertumpuk
│   │   ├── HeroSection.jsx           # Bagian hero, pencarian utama, statistik, dan kartu Urgent Hiring
│   │   ├── RoleCard.jsx              # Kartu lowongan individual dengan efek spotlight pointer
│   │   ├── JobDetailView.jsx         # Tampilan detail posisi, benefit, dan lowongan terkait
│   │   ├── CommandPaletteModal.jsx   # Modal pencarian cepat dengan keyboard navigation
│   │   ├── EmptyState.jsx            # Tampilan saat hasil pencarian/filter kosong
│   │   └── BookmarkIcon.jsx          # Komponen ikon SVG bookmark dinamis
│   └── pages/
│       └── RoleExplorer.jsx          # Halaman utama pengelola state, filter, modal, dan routing tampilan