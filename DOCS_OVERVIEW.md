# Project Overview: Momento Client FE

Dokumen ini berisi gambaran besar ekosistem aplikasi **Momento** untuk memudahkan pemahaman alur kerja dan integrasi sistem.

## 1. Ekosistem Project
Project Momento dirancang untuk membantu pengguna mengelola dan merayakan "Special Moments" mereka.

1.  **`momentoclient-fe` (Web Frontend - current):**
    - **Tech Stack:** Next.js 15+ (App Router).
    - **Peran:** Client-facing web portal. Berfokus pada pengalaman pengguna yang premium, visual yang memukau, dan kemudahan navigasi untuk layanan Momento.
2.  **`momento-be` (Backend - Reference):**
    - **Peran:** Menyediakan API untuk manajemen data user, pesanan, dan konten.
3.  **Figma Design:**
    - Peran: Sumber kebenaran tunggal untuk UI/UX. Implementasi di frontend wajib 1:1 dengan desain ini.

## 2. Standar Teknis Frontend
Untuk menjaga kualitas kode tetap "Elite", aturan berikut wajib diikuti:

- **Clean & Modular:** Struktur folder harus rapi. Pisahkan antara UI primitives (atoms), complex components, dan page logic.
- **Server Components (RSC):** Maksimalkan penggunaan Server Components untuk performa loading yang optimal dan SEO yang baik.
- **Typography:** Standar menggunakan `Inter` atau `Outfit` untuk kesan modern dan premium.
- **Micro-interactions:** Setiap elemen interaktif (button, link, card) harus memiliki state hover/active yang halus.

## 3. Alur Bisnis (Tentative)
Aplikasi ini berfokus pada:
- **Landing Page & Hero:** Menampilkan value proposition dengan desain yang "WOW".
- **Product/Service Showcase:** Menampilkan berbagai layanan "Special Moments".
- **Booking/Order Flow:** Proses pemilihan dan pemesanan layanan.
- **User Dashboard:** Manajemen profil dan histori pesanan.

## 4. Requirement Prioritas
1.  **Pixel Perfect:** Kesesuaian 1:1 dengan Figma.
2.  **Best Practice Next.js:** Penggunaan `next/image`, `next/font`, dan metadata API secara tepat.
3.  **Maintainability:** Kode yang mudah dipahami oleh developer lain dengan penamaan variabel/fungsi yang deskriptif.

---
*Dokumen ini bersifat referensi teknis bagi AI Assistant.*
