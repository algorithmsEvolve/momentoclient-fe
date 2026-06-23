# Theme Second Operational Map

Dokumen ini merangkum file penting dan alur eksekusi yang harus dipakai saat memindahkan tema undangan berikutnya setelah Botan.

Tujuan dokumen ini bukan menjelaskan semua detail teknis lagi, tetapi memberi peta kerja yang cepat dan aman untuk eksekusi tema kedua tanpa mengulang kekacauan struktur lama.

## 1. Prinsip Kerja

- Botan adalah blueprint.
- Untuk Botan saat ini, cover section dan opening section sudah menjadi baseline approved untuk desktop dan mobile per 17 Mei 2026.
- Backend tetap sumber kebenaran data.
- Frontend hanya menerima payload normalized dari API.
- Tema baru harus menambah sedikit surface area, bukan menyalin seluruh pola lama.
- Shared logic hanya diekstrak jika benar-benar dipakai tema kedua.
- Jangan mengubah baseline cover/opening Botan saat mengerjakan section Botan berikutnya atau tema baru, kecuali ada instruksi eksplisit.

## 2. File Backend Penting

Repo backend:

- `/Users/apple/Documents/Codes/momento/momento-new/momento-be`

File yang perlu dipahami sebelum memindahkan tema kedua:

- `routes/api.php`
- `app/Http/Controllers/Api/PublicInvitationController.php`
- `app/Http/Controllers/Api/PublicInvitationGuestController.php`
- `app/Http/Controllers/Api/PublicInvitationRsvpController.php`
- `app/Http/Controllers/Api/PublicInvitationWishController.php`
- `app/Http/Resources/InvitationResource.php`
- `app/Http/Resources/InvitationGuestResource.php`
- `app/Http/Resources/InvitationRsvpResource.php`
- `app/Http/Resources/InvitationWishResource.php`
- `app/Models/Invitation.php`
- `app/Models/InvitationTheme.php`
- `database/seeders/InvitationThemeSeeder.php`
- `database/seeders/BotanDummyInvitationSeeder.php`

Titik yang biasanya berubah untuk tema baru:

- `InvitationThemeSeeder` untuk menambah theme registry.
- Seeder dummy untuk invitation baru.
- Resource mapping jika ada field theme-specific baru.
- API contract bila tema baru punya section tambahan yang belum ada di Botan.

## 3. File Frontend Penting

Repo frontend:

- `/Users/apple/Documents/Codes/momento/momento-new/momentoclient-fe`

Routing dan shell:

- `app/(invitation)/[slug]/page.js`
- `app/(invitation)/[slug]/not-found.js`
- `components/features/invitations/InvitationPageShell.js`
- `components/features/invitations/UnsupportedTheme.js`
- `components/features/invitations/theme-registry.js`

Data layer:

- `lib/api/invitations.js`
- `lib/invitations/normalizeInvitation.js`
- `lib/invitations/date.js`
- `lib/invitations/routes.js`

Botan blueprint:

- `components/features/invitations/themes/botan/BotanTheme.js`
- `components/features/invitations/themes/botan/BotanCover.js`
- `components/features/invitations/themes/botan/BotanOpening.js`
- `components/features/invitations/themes/botan/BotanDateSection.js`
- `components/features/invitations/themes/botan/BotanCountdown.js`
- `components/features/invitations/themes/botan/BotanLocation.js`
- `components/features/invitations/themes/botan/BotanRsvpForm.js`
- `components/features/invitations/themes/botan/BotanStory.js`
- `components/features/invitations/themes/botan/BotanGallery.js`
- `components/features/invitations/themes/botan/BotanWishSection.js`
- `components/features/invitations/themes/botan/BotanGift.js`
- `components/features/invitations/themes/botan/BotanFooter.js`
- `components/features/invitations/themes/botan/BotanFloatingMenu.js`
- `components/features/invitations/themes/botan/BotanMusicButton.js`
- `components/features/invitations/themes/botan/BotanSectionShell.js`
- `components/features/invitations/themes/botan/botan.css`

Protected Botan baseline:

- `BotanCover.js`
- `BotanOpening.js`
- Rule `cover-section` dan `opening-section` di `botan.css`
- Keyframe atau utility animation yang sedang dipakai cover/opening

Jika section berikutnya butuh animasi baru, buat class/keyframe baru yang scoped ke section tersebut.

Shared route isolation:

- `app/(site)/layout.js`
- `app/layout.js`

## 4. Eksekusi Tema Kedua

Urutan yang disarankan:

1. Tambah theme baru di backend `invitation_themes`.
2. Tambah dummy invitation baru beserta asset.
3. Pastikan API invitation detail mengeluarkan field normalized yang sama.
4. Tambah theme key baru di frontend registry.
5. Buat shell theme baru dengan meniru pola Botan, bukan menyalin seluruh isi mentah.
6. Pecah section hanya jika tema baru memang punya kebutuhan visual atau interaksi yang berbeda.
7. Tambahkan e2e test untuk slug dummy baru.
8. Jalankan lint dan test backend.

## 5. Pola Implementasi Yang Aman

### 5.1 Route

- Tetap pakai `app/(invitation)/[slug]/page.js`.
- Jangan buat route invitation baru untuk tiap tema.
- Tema dipilih dari payload backend, bukan dari route.

### 5.2 Registry

- Tambahkan key baru di `components/features/invitations/theme-registry.js`.
- Jangan dynamic import berdasarkan input backend tanpa whitelist.

### 5.3 Normalisasi Data

- Jika backend mengeluarkan field baru, tambahkan di `lib/invitations/normalizeInvitation.js`.
- Jangan tambahkan field theme-specific langsung ke component tanpa lewat normalizer.

### 5.4 Styling

- Buat stylesheet tema baru yang diprefix nama temanya.
- Jangan ubah `botan.css` kecuali ada shared rule yang benar-benar dipakai dua tema.
- Untuk pekerjaan lanjutan di Botan, jangan menyentuh rule cover/opening yang sudah approved. Tambahkan selector section-specific untuk date/countdown/location/RSVP/story/gallery/wish/gift/footer.

### 5.5 Interaksi

- Cover open, music button, RSVP, wish, gift copy, floating menu tetap menjadi client-side behavior.
- Section statis tetap di server-friendly component jika memungkinkan.

## 6. Dummy Data Checklist Untuk Tema Baru

Minimal yang harus ada:

- `theme` baru di registry backend.
- Satu invitation published.
- Couple atau person root sesuai struktur tema.
- Minimal dua event bila tema membutuhkan akad dan resepsi.
- Satu guest group dan satu guest single.
- Story minimal dua item jika tema menampilkan story.
- Gallery sesuai layout tema.
- Gift minimal satu item.
- Wish minimal dua item.
- Asset dummy lokal untuk cover, opening, gallery, og image, dan music bila dipakai.

## 7. Verification Checklist

Setiap tema baru dianggap siap jika:

- `php artisan migrate:fresh --seed` lulus di backend.
- `php artisan test` lulus di backend.
- `npm run lint` lulus di frontend.
- `pnpm test:e2e` lulus untuk slug dummy tema baru.
- Route publik menampilkan cover, section, RSVP, wishes, dan gift tanpa crash.

## 8. Anti-Patterns

- Jangan copy struktur legacy Nuxt mentah-mentah.
- Jangan menambah global CSS baru tanpa prefix tema.
- Jangan hardcode tema berdasarkan slug route.
- Jangan menaruh logika fetch di banyak komponen jika bisa dipusatkan di shell atau API layer.
- Jangan membuat tema kedua bergantung pada hack Botan yang sifatnya sementara.

## 9. Output Yang Diharapkan Dari Tema Kedua

Saat tema kedua selesai, kita harus punya:

- 1 theme key baru di backend.
- 1 invitation dummy baru.
- 1 theme component baru di frontend.
- 1 set e2e tests baru.
- 1 dokumentasi singkat cara menambah theme berikutnya.

---

## 10. Status Implementasi Tema Kedua (Yuugure)

Tema kedua, **Yuugure**, telah selesai diimplementasikan secara penuh dengan detail sebagai berikut:
- **Registry & Config**: Tema terdaftar dengan key `"yuugure"` di frontend dan database backend.
- **Komponen Frontend**: Tersedia 19 file pendukung di [components/features/invitations/themes/yuugure/](file:///Users/apple/Documents/Codes/momento/momento-new/momentoclient-fe/components/features/invitations/themes/yuugure/).
- **Aset Statis**: Aset tema telah diorganisasi di bawah [public/themes/yuugure/](file:///Users/apple/Documents/Codes/momento/momento-new/momentoclient-fe/public/themes/yuugure/).
- **E2E Test**: Test skenario lengkap untuk verifikasi visual dan alur tema Yuugure tersedia di `tests/e2e/yuugure.spec.js`.

