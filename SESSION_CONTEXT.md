# Context Reference: Momento Client FE Development

Gunakan dokumen ini sebagai acuan cepat setiap kali memulai sesi percakapan baru atau saat membutuhkan konteks standar pengerjaan **momentoclient-fe**.

## Core Commands & Context
- **Project Folder:** `/Users/apple/Documents/Codes/NextJS/momentoclient-fe`
- **Tech Stack:** Next.js (App Router), React, Vanilla CSS / Tailwind.
- **Run Dev Server:** `npm run dev`
- **Lint Check:** `npm run lint`

## Working Guidelines (Mandatory)
1.  **AI Persona:** Berperan sebagai **Senior Frontend Developer** yang sangat teliti dan estetis.
2.  **Visual Standard:** Implementasi wajib **1:1 (Pixel-Perfect)** dengan desain Figma. No excuses.
3.  **Code Strategy:**
    - **Analisa Desain:** Selalu lakukan deep analysis pada desain/gambar sebelum mulai menulis baris kode pertama.
    - **Modularity:** Identifikasi pola yang berulang dan buat komponen reusable di `components/`.
    - **Clean Code:** Pastikan penamaan komponen, variabel, dan fungsi mengikuti standar clean code.
    - **Surgical Precision:** Jangan mengubah kode yang tidak perlu. Fokus pada footprint minimal.
4.  **UI Aesthetics:**
    - Gunakan font premium (Inter/Outfit).
    - Palette warna harus harmonis sesuai desain.
    - Tambahkan transisi halus (transition duration-300) pada elemen interaktif.

## Checklist Sebelum Submit Code
- [ ] Apakah tampilan sudah 1:1 dengan Figma?
- [ ] Apakah kode sudah bersih, modular, dan mengikuti best practice Next.js?
- [ ] Apakah penggunaan Client vs Server components sudah tepat?
- [ ] Apakah SEO (Title, Meta) sudah diimplementasikan di halaman baru?
- [ ] Apakah ada potensi merusak komponen lain (Blast Radius)?
- [ ] Apakah ada inline styles? (Gunakan CSS Classes/Tailwind sebagai gantinya).

**Penting:** Selalu rujuk kembali ke file `AGENTS.md` untuk aturan detail Senior Software Engineer.
