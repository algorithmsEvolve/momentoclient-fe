# Final Implementation Status

Dokumen ini merangkum status akhir implementasi migrasi undangan digital dari `momentoprojects-website` ke `momentoclient-fe`.

## Ringkasan Eksekusi

Target MVP Botan sudah selesai secara fungsional:

- Backend Laravel 13 + PostgreSQL sudah berjalan di repo terpisah `momento-be`.
- Frontend Next.js sudah render undangan Botan dari API Laravel.
- Dummy data `aira-bima` sudah tersedia dan bisa di-seed ulang.
- Playwright e2e untuk desktop dan mobile sudah aktif.
- Lint frontend dan test backend sudah lulus.

## Status Per Plan

### 01 Backend Laravel Plan

Status: selesai.

Yang sudah diterapkan:

- Laravel 13 + Sanctum/API scaffold.
- Schema relational untuk theme, invitation, people, events, guests, RSVP, wishes, stories, galleries, gifts.
- API Resources, Form Requests, route model binding, dan public routes.
- Seeder Botan `aira-bima`.
- Feature tests untuk endpoint publik.

Verifikasi:

- `php artisan migrate:fresh --seed`
- `php artisan test`

### 02 Frontend Next.js Botan Plan

Status: selesai untuk MVP Botan.

Yang sudah diterapkan:

- Route invitation publik dengan guard reserved slugs.
- Data layer API Laravel.
- Theme registry dan fallback unsupported theme.
- Cover open flow, guest personalization, RSVP, wishes, gift copy, music button, floating menu.
- Botan styling yang diisolasi di `.botan-theme`.
- Route group pemisahan site vs invitation.
- Playwright e2e desktop dan mobile.

Status visual terkini per 17 Mei 2026:

- Botan cover section sudah approved untuk desktop dan mobile.
- Botan opening section sudah approved untuk desktop dan mobile.
- Preloader Botan sudah disesuaikan, termasuk progress bar yang lebih tebal agar mendekati referensi legacy.
- Cover/opening sekarang menjadi baseline stabil. Jangan ubah `BotanCover.js`, `BotanOpening.js`, atau selector/keyframe cover/opening di `botan.css` ketika mengerjakan section berikutnya, kecuali ada instruksi eksplisit.

Verifikasi:

- `npm run lint`
- `pnpm test:e2e`

### 03 Dummy Data and Testing Plan

Status: selesai.

Yang sudah diterapkan:

- Dummy invitation `aira-bima`.
- Guests `keluarga-pratama` dan `dina`.
- Stories, galleries, gifts, wishes.
- Dummy asset lokal Botan di `public/themes/botan/dummy`.
- Payload testing RSVP dan wish.
- Test cases manual dan e2e.

Verifikasi:

- API invitation detail dan guest detail.
- RSVP create/update.
- Wish create/list.
- E2E flow untuk desktop dan mobile.

## Current Production Shape

Frontend invitation:

- Route: `app/(invitation)/[slug]/page.js`
- Fallback: `app/(invitation)/[slug]/not-found.js`

Frontend site:

- Route group: `app/(site)/...`
- `FloatingWhatsApp` hanya muncul di route site, bukan invitation.

Backend:

- Repo: `/Users/apple/Documents/Codes/Laravel/momento-be`
- API base: `http://localhost:8000/api`

Dummy URLs:

- `http://localhost:3000/aira-bima`
- `http://localhost:3000/aira-bima?tamu=keluarga-pratama`
- `http://localhost:3000/aira-bima?tamu=dina`

## Known Deviations

Ini bukan gap fungsional, tetapi penyesuaian implementasi:

- Mobile Playwright memakai Chromium + viewport mobile untuk stabilitas environment ini.
- Pixel-perfect dilakukan dengan referensi legacy Nuxt Botan, bukan Figma formal.
- Struktur Botan sudah modular, tetapi tetap disesuaikan agar blast radius kecil dan maintainable.
- Cover dan opening Botan sudah terkunci sebagai baseline visual. Pekerjaan lanjutan harus dimulai dari section berikutnya dan menjaga agar perubahan CSS/animasi tidak merusak dua section tersebut.

## Commands Final yang Lulus

Backend:

- `php artisan migrate:fresh --seed`
- `php artisan test`

Frontend:

- `npm run lint`
- `pnpm test:e2e`

## Kesimpulan

MVP Botan sudah selesai dan siap dipakai sebagai blueprint tema berikutnya.
Fokus berikutnya adalah migrasi tema kedua dengan pola modular yang sama, tanpa mengulang struktur lama yang berantakan.
