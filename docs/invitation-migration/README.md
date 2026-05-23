# Digital Invitation Migration Implementation Plan

Scope dokumen ini adalah menerapkan fitur undangan digital dari `momentoprojects-website` ke `momentoclient-fe` secara bertahap, dengan target MVP satu tema terlebih dahulu: `botan`.

Dokumen ini sengaja dibagi menjadi beberapa bagian agar bisa dieksekusi bertahap oleh AI model yang lebih kecil seperti GPT-5.4 Mini tanpa kehilangan konteks.

## Dokumen Terkait

- [Legacy Codeflow](../legacy-momento-invitation-codeflow.md): hasil pembacaan flow project Nuxt lama.
- [01 Backend Laravel Plan](./01-backend-laravel-plan.md): rencana backend Laravel 13 + PostgreSQL.
- [02 Frontend Next Plan](./02-frontend-next-botan-plan.md): rencana integrasi Next.js untuk tema Botan.
- [03 Dummy Data and Testing](./03-dummy-data-and-testing.md): data dummy, seed plan, dan test cases.
- [04 Final Implementation Status](./04-final-implementation-status.md): ringkasan status akhir implementasi nyata.
- [05 Theme Second Operational Map](./05-theme-second-operational-map.md): peta kerja operasional untuk tema berikutnya.

## Target Akhir MVP Botan

MVP dianggap selesai jika:

- User bisa membuka halaman undangan publik di `/{slug}` atau route final yang dipilih.
- Slug dummy `aira-bima` menampilkan tema Botan.
- Query `?tamu=keluarga-pratama` memunculkan nama tamu di cover dan membuka RSVP.
- Cover bisa dibuka, halaman unlock, dan section utama tampil berurutan.
- Section yang tersedia: cover, opening/couple, date, countdown, location, RSVP, story, gallery, wishes, gift, footer, floating menu mobile, music button.
- API Laravel menyediakan data normalized dari PostgreSQL, bukan Firebase.
- Wishes dan RSVP bisa dibuat melalui API.
- Data dummy bisa di-seed ulang dengan command Laravel.

## Prinsip Arsitektur

- Jangan memindahkan struktur lama mentah-mentah. Project lama menjadi referensi visual dan behavior, bukan referensi arsitektur.
- Backend menjadi sumber kebenaran data. Frontend hanya menerima payload terstruktur yang siap render.
- Frontend memiliki adapter tipis untuk menjaga kompatibilitas selama transisi, tetapi domain utama tetap rapi.
- Tema Botan harus dibuat sebagai pola foundation untuk tema berikutnya.
- Shared components dibuat dari pola yang benar-benar dipakai, bukan abstraksi prematur.
- Data theme-specific boleh disimpan di JSONB `settings`, tetapi data inti seperti couple, event, guest, RSVP, wish, story, gallery, dan gift harus relational.

## Stack Target

Frontend saat ini:

- Next.js `16.2.3`
- React `19.2.4`
- Tailwind CSS 4
- App Router
- Server Components default

Backend target:

- Laravel 13.x
- PHP 8.3 minimum
- PostgreSQL
- Eloquent ORM
- API Resources
- Form Request validation
- Database migrations, factories, and seeders

Sumber resmi Laravel yang digunakan saat menyusun plan:

- Laravel 13 release notes: https://laravel.com/docs/13.x/releases
- Laravel 13 installation docs: https://laravel.com/docs/13.x/installation
- Laravel 13 database docs: https://laravel.com/docs/13.x/database

## Pembagian Fase Eksekusi

### Phase 0 - Preparation and Contracts

Tujuan: memastikan struktur repo, route, dan kontrak data disepakati sebelum coding besar.

Deliverables:

- Backend Laravel project dibuat di repo terpisah, misalnya `/Users/apple/Documents/Codes/Laravel/momento-be`.
- Environment PostgreSQL siap.
- API contract untuk invitation detail, guest, RSVP, dan wishes disetujui.
- Dummy data Botan disiapkan.

Output yang harus diberikan agent:

- Daftar command yang dijalankan.
- File backend yang dibuat.
- File frontend yang dibuat.
- Catatan env variable yang harus diisi manual.

### Phase 1 - Backend Foundation

Tujuan: membangun Laravel API minimal tapi rapi untuk Botan.

Deliverables:

- Migrations untuk invitations, themes, couples, events, guests, stories, galleries, gifts, wishes, rsvps, assets.
- Eloquent models dan relationships.
- Seeder dummy `aira-bima`.
- Public API endpoints read-only untuk invitation detail dan guest.
- API Resources untuk response normalized.

Exit criteria:

- `php artisan migrate:fresh --seed` berhasil.
- `GET /api/invitations/aira-bima` mengembalikan data lengkap.
- `GET /api/invitations/aira-bima/guests/keluarga-pratama` mengembalikan guest.

### Phase 2 - Backend Interactions

Tujuan: membuat fitur user-submitted data.

Deliverables:

- Endpoint create RSVP.
- Endpoint get RSVP by guest.
- Endpoint list wishes.
- Endpoint create wish.
- Validation via Form Request.
- Rate limit untuk public write endpoints.

Exit criteria:

- RSVP guest single dan group bisa dibuat.
- Wishes bisa dibuat dan list terbaru muncul pertama.
- Invalid payload mendapat `422` dengan error jelas.

### Phase 3 - Frontend Invitation Foundation

Tujuan: menyiapkan route dan data layer Next.js.

Deliverables:

- `app/[slug]/page.js` atau route namespaced yang dipilih.
- `generateMetadata` dari API invitation.
- `lib/api/invitations.js`.
- `components/features/invitations/theme-registry.js`.
- `components/features/invitations/UnsupportedTheme.js`.
- Layout khusus undangan tanpa `Navbar` landing page dan tanpa `FloatingWhatsApp` jika mengganggu visual.

Exit criteria:

- `aira-bima` fetch data dari backend.
- Theme registry memilih Botan.
- Unsupported theme tidak crash.

### Phase 4 - Botan Visual Port

Tujuan: memindahkan visual dan behavior utama Botan dari Nuxt ke React.

Deliverables:

- Aset Botan dipindah ke `public/themes/botan`.
- Komponen root Botan dan section utama dibuat.
- Cover open interaction berjalan.
- Music button berjalan setelah user action.
- Mobile and desktop layout scoped.

Exit criteria:

- Visual Botan mendekati legacy untuk dummy data.
- Tidak ada global CSS leak ke landing page.
- Tidak ada dependency Firebase.

### Phase 5 - Forms and Dynamic Sections

Tujuan: menghubungkan RSVP, wishes, gift copy, gallery, dan floating menu.

Deliverables:

- RSVP form client component.
- Wish form client component.
- Wish list fetch/update.
- Gift copy-to-clipboard feedback.
- Floating menu scroll ke section.

Exit criteria:

- RSVP submit sukses dan menampilkan feedback.
- Wish submit sukses dan list update.
- Floating menu bekerja di mobile.

### Phase 6 - Hardening

Tujuan: menjadikan MVP siap dijadikan pola migrasi tema lain.

Deliverables:

- Error states, loading states, empty states.
- API error normalization.
- Basic tests backend.
- Frontend lint clean.
- Dokumentasi "How to add next theme".

Exit criteria:

- `npm run lint` berhasil di frontend.
- Backend tests untuk endpoint public berhasil.
- Tema Botan bisa dipakai sebagai blueprint tema berikutnya.

## Instruksi Eksekusi untuk GPT-5.4 Mini

Saat mengeksekusi, jangan ambil semua fase sekaligus. Gunakan urutan ini:

1. Kerjakan hanya Phase 0 dan Phase 1 backend.
2. Stop setelah backend read endpoints dan seeder berhasil.
3. Lanjut Phase 2 backend interactions.
4. Stop setelah RSVP dan wishes berhasil.
5. Lanjut Phase 3 frontend foundation.
6. Stop setelah route fetch dan registry berjalan.
7. Lanjut Phase 4 Botan visual.
8. Stop setelah visual dasar tampil.
9. Lanjut Phase 5 forms.
10. Lanjut Phase 6 hardening.

Setiap fase harus menghasilkan ringkasan:

- Files changed.
- Commands run.
- Manual env vars needed.
- Verification result.
- Known gaps.
