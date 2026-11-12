# Sekolah Karir - Job Portal Assignment

Simple role filtering component untuk eksplorasi lowongan kerja berdasarkan department.

## Features

- ✅ Filter role berdasarkan department (All, Engineering, Design, Product, Marketing)
- ✅ Responsive design (mobile-first)
- ✅ Empty state dengan reset filter
- ✅ Card hover effects
- ✅ Role counter di header

## Tech Stack

- **React** - Component library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (optional, untuk smooth transitions)

## Setup

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`

## Structure

```
src/
├── components/
│   ├── RoleCard.jsx       # Card untuk setiap role
│   ├── EmptyState.jsx     # State kalau filter kosong
│   └── ...
├── data/
│   └── mockRoles.js       # Mock data roles
├── pages/
│   └── RoleExplorer.jsx   # Main component
└── App.jsx
```

## Design Decisions

### 1. State Management
Pakai `useState` + `useMemo` karena scope kecil dan nggak butuh kompleksitas Redux/Zustand. Filter logic simple banget — cuma array.filter based on department.

### 2. Styling Approach
Tailwind utility-first biar cepat iterate. Nggak pakai component library kayak MUI/Chakra karena mau kontrol penuh dan avoid bloat.

### 3. Layout
Grid responsive 1-2-3 columns tergantung screen size. Mobile horizontal scroll di filter tabs biar semua department bisa diakses tanpa wrap yang berantakan.

### 4. Empty State
Pakai emoji + casual copy ("Waduh, kosong nih") biar feel-nya friendly. Button reset langsung set filter ke "All" tanpa perlu manual click.

## Tools Used

Disclaimer: Assignment ini dikerjakan dengan bantuan **Claude (Kiro IDE)** untuk:
- Setup initial Vite + Tailwind boilerplate
- Debugging Tailwind config issues (CSS nggak ke-load awalnya)
- Refactoring component structure yang awalnya over-engineered

Yang gw kerjakan sendiri:
- Mock data structure
- Filter logic & state handling
- Design decisions (layout, colors, card design)
- Copy & microcopy (text di UI)
- Responsive behavior testing

## What I'd Add Next

Kalau scope-nya lebih besar:
- Search bar untuk filter by keyword
- Sorting (gaji, terbaru, dll)
- Detail page per role dengan CTA "Apply"
- Saved/bookmarked roles (local storage)
- Skeleton loading state
- Lazy load kalau roles banyak

## Live Demo

[Masukkan link deploy kalau ada — Vercel/Netlify gratis]

---

Dibuat untuk Sekolah Karir Assignment 2024
