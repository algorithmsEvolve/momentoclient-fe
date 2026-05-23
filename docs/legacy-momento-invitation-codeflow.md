# Legacy Momento Digital Invitation Codeflow

Dokumen ini merangkum hasil pembacaan awal project lama:

- Source lama: `/Users/apple/Documents/Codes/NuxtJS/momentoprojects-website`
- Target migrasi: `/Users/apple/Documents/Codes/NextJS/momentoclient-fe`
- Fokus: flow undangan digital multi-tema, kontrak data, dan pegangan migrasi bertahap ke Next.js + Laravel + PostgreSQL.

Catatan: folder `.documentation` tidak ditemukan di root `momentoclient-fe` saat analisis ini dibuat. Dokumentasi ini ditempatkan di folder repo yang sudah ada, yaitu `documentation/`.

## 1. Ringkasan Arsitektur Lama

Project lama adalah Nuxt 2 static target dengan Vue 2, Vuex, SCSS per tema, dan aset statis di `static/themes/*`.

Komponen penting:

- `pages/_slug/index.vue`: route publik undangan, mengambil data undangan berdasarkan slug, mengambil guest bila query `?tamu=` tersedia, lalu memilih komponen tema secara dinamis.
- `store/invitation.js`: Vuex module untuk state undangan, guest, RSVP, wishes, dan API calls.
- `composables/themes_init.js`: registry komponen tema. Nilai `invitation_data.theme` harus sama dengan nama komponen yang diregistrasi.
- `layouts/invitation.vue`: layout khusus undangan, menginisialisasi AOS dan mengunci scroll berdasarkan event global.
- `plugins/display.js`: memasang `vue-mq` dengan breakpoint `mobile <= 600`, `desktop = Infinity`.
- `components/themes/[theme]`: implementasi tiap tema. Tiap tema memiliki file root `.vue`, script root, SCSS root, `sections/*`, dan `components/*`.
- `static/themes/[theme]`: aset visual tiap tema, dipanggil langsung lewat path string seperti `/themes/ren/component/...`.

Walaupun `package.json` masih memuat `firebase`, flow data utama yang terlihat saat ini sudah memakai Axios ke API Laravel-like. Sisa konsep Firebase masih terlihat di URL asset Firebase Storage dan shim response wishes yang dibuat menyerupai Firestore `docs.map(doc => doc.data())`.

## 2. Flow Runtime Halaman Undangan

Entry point undangan ada di `pages/_slug/index.vue`.

Flow utama:

1. User membuka `/{slug}`.
2. `mounted()` memanggil `__init()`.
3. `__init()` menjalankan `getInvitationData()`.
4. `getInvitationData()` dispatch `invitation/fetchInvitationData(user_slug)`.
5. Store melakukan `GET /invitations/{user_slug}`.
6. Jika sukses, store menyimpan `user_slug` dan `invitation_data`.
7. Jika query `?tamu={guest_slug}` ada, page dispatch `fetchGuest(guest_slug)`.
8. Store melakukan `GET /invitations/{user_slug}/guests/{guest_slug}` dan menyimpan `guest`.
9. Jika `invitation_data.custom.on_progress` true, page menampilkan `OnBuilding`.
10. Jika data tersedia, page render `<component :is="invitation_data.theme" />`.

Implikasi migrasi:

- Di Next.js, route natural adalah `app/[slug]/page.{js,jsx,ts,tsx}`.
- Fetch invitation sebaiknya dilakukan di Server Component agar metadata dan payload awal SEO-ready.
- Query guest `?tamu=` bisa dibaca dari `searchParams`.
- Theme rendering sebaiknya lewat explicit registry map, bukan dynamic arbitrary component name dari database tanpa validasi.

## 3. Registry Tema Lama

Tema diregistrasi di `composables/themes_init.js`:

- `Yuugure`
- `Botan`
- `Kage`
- `AizenMidgreen`
- `Aozora`
- `AozoraSakura`
- `Bara`
- `BaraSimple`
- `Yamato`
- `Ren`
- `Yonaka`

Nilai `invitation_data.theme` dari API harus cocok dengan key di registry. Contoh jika `theme = "Ren"`, Nuxt akan merender komponen `Ren`.

Rekomendasi target:

- Simpan theme key canonical di database sebagai slug stabil, misalnya `ren`, `botan`, `aizen-midgreen`.
- Di frontend baru, buat registry eksplisit:

```js
const invitationThemeRegistry = {
  ren: RenTheme,
  botan: BotanTheme,
}
```

- Jangan gunakan nama komponen PascalCase sebagai kontrak database jangka panjang.
- Tambahkan fallback `UnsupportedTheme` atau 404 terkontrol bila theme belum dimigrasikan.

## 4. Pola Internal Tiap Tema

Mayoritas root tema memiliki pola yang sama:

1. Tampilkan `Preloader` selama `preloading`.
2. Tampilkan `Cover`.
3. Saat user membuka cover, event `openInvitation` mengubah `cover_opened = true`.
4. Setelah cover terbuka, render section utama.
5. Tampilkan `FloatingMenu` hanya mobile.
6. Tampilkan `MusicButton`.

Contoh urutan umum:

- `Cover`
- `Opening`
- `Date`
- `CountDown` atau `CountDownAndDisplayPicture`
- `Location`
- `RSVP` hanya jika `guest_exist`
- `OurStory` jika `invitation_data.stories`
- `Gallery` jika `invitation_data.galleries`
- `FilterInstagram`
- `Wish`
- `Gift` jika gift tersedia dan tidak dinonaktifkan
- `Footer`
- `FloatingMenu` di mobile
- `MusicButton`

State root tema yang sering muncul:

- `cover_opened`: mengontrol render section setelah cover dibuka.
- `preloading`: mengontrol preloader awal.
- `guest_exist`: dari Vuex getter `getGuestExist`.
- `invitation_data`: dari Vuex getter `getInvitationData`.
- `is_desktop`: dari `$mq == 'desktop'`.
- `without_gift`: true jika query `req` ada atau data `gift/gifts` kosong.

Global side effects lama:

- `Vue.prototype.$alertSuccess` dan `$alertFail` diset per tema memakai SweetAlert.
- `Vue.prototype.$offset` diset per tema untuk AOS.
- Event bus `$nuxt.$emit`/`$nuxt.$on` dipakai untuk cover, scroll lock, dan active menu.
- Audio dibuat langsung dengan `new Audio(invitation_data.music)`.

Implikasi migrasi:

- Pisahkan state interaktif ke Client Components kecil: cover, audio button, RSVP form, wish form, gallery interactions.
- Section statis seperti opening/date/location/story bisa menjadi Server Components atau pure presentational components.
- Hindari global prototype/event bus. Ganti dengan React context kecil atau prop callbacks bila benar-benar perlu.

## 5. Peta Tema dan Section

Peta section yang ditemukan:

| Tema | Section khusus / variasi | Gallery type |
| --- | --- | --- |
| `aizen-midgreen` | standard sections | `4P1L`, `5P0L` |
| `aozora-sakura` | `notes`, `video-section` | `3P2L`, `4P1L`, `5P0L` |
| `aozora` | `notes` | `3P2L`, `4P1L` |
| `bara-simple` | `display-picture` | `4P1L` |
| `bara` | `count-down-and-display-picture` | `4P1L`, `5P0L` |
| `botan` | standard sections | `4P1L` |
| `kage` | `adab`, `doa-pengantin` | tidak memakai folder `gallery_type` terpisah |
| `ren` | `count-down-and-display-picture` | `4P1L`, `5P0L` |
| `yamato` | `custom-message`, `gif-image`, `our-story-static`, `count-down-and-display-picture` | `3P2L`, `4P1L`, `5P0L` |
| `yonaka` | `our-story-static`, `count-down-and-display-picture` | `4P1L`, `5P0L` |
| `yuugure` | `closing`, `our-story-static`, `count-down-and-display-picture` | `4P1L`, `5P0L` |

Tema dengan struktur paling representatif untuk migrasi awal:

- `botan`: cukup standar dan sederhana, bagus untuk membangun foundation.
- `ren`: standar tetapi punya variasi `display_picture` dan gallery type lebih banyak.
- `aozora-sakura`: bagus untuk menguji optional `video` dan `notes`.
- `yamato` atau `yuugure`: bagus untuk menguji section khusus setelah foundation stabil.

## 6. Kontrak Data Lama yang Dipakai Tema

Field `invitation_data` yang ditemukan dipakai langsung:

- Identitas dan theme: `theme`, `date`, `cover_date`, `married`
- Mempelai: `bride`, `bride_fullname`, `bride_child_order`, `bride_all_child`, `bride_father`, `bride_mother`, `bride_instagram`, `bride_photo`, `bride_illustration`
- Mempelai: `groom`, `groom_fullname`, `groom_child_order`, `groom_all_child`, `groom_father`, `groom_mother`, `groom_instagram`, `groom_photo`, `groom_illustration`
- Cover: `cover_bride_name`, `cover_groom_name`, `cover_image_desktop`, `cover_image_mobile`
- Quote/opening: `quote_text`, `quote_title`, `nick_logo`
- Event: `akad`, `reception`, `location`
- Media: `music`, `galleries`, `gallery_type`, `display_picture`, `video`, `gif_image`
- Story: `stories`
- Gift: `gift`, `gifts`, `without_gift`
- Extra sections: `filter_instagram`, `filter_url`, `livestream_url`, `with_notes`, `custom_message`, `closing`
- Footer: `with_footer_illustration`
- RSVP: `without_not_attend_reason`
- Custom flags: `custom`

Field `custom` yang ditemukan:

- `on_progress`
- `reverse_bride_groom`
- `is_engagement`
- `rsvp_caption_type`
- `cover_title`
- `hide_cover_date`
- `akad_title`
- `reception_title`
- `countdown_title`
- `hide_akad_time`
- `static_our_story`
- `gift_without_modal`
- `gender_nick`
- `groom_name_fullwidth`
- `doa_pengantin`
- `adab`
- `hide_display_picture`

Catatan penting:

- Store lama melakukan mutasi data bila `custom.reverse_bride_groom` true dengan menukar seluruh field bride/groom. Di sistem baru, lebih baik simpan urutan/person role secara eksplisit agar frontend tidak perlu mutasi payload mentah.
- Banyak field bersifat opsional dan dipakai dengan `v-if`. Target schema harus membedakan data inti, konfigurasi theme, dan optional sections.

## 7. Guest, RSVP, dan Wishes

Guest:

- Query param lama: `?tamu={guest_slug}`.
- Store: `fetchGuest(guest_slug)` memanggil `GET /invitations/{user_slug}/guests/{guest_slug}`.
- Guest dipakai untuk personalisasi cover dan mengaktifkan RSVP.
- Field guest yang terlihat dipakai: `slug`, `name`, `is_group`.

RSVP:

- Section RSVP hanya dirender jika guest ada.
- Form dasar: `attendance`, `how`, `not_attend_reason`.
- Jika guest group, form menambahkan nama member dan membuat id `${guest.slug}-${random}`.
- Store lama memanggil `POST /invitations/{user_slug}/rsvp`.
- Beberapa script masih memetakan action `fetchRsvp`, tetapi action tersebut tidak ada di `store/invitation.js` versi yang dibaca. Ini perlu diperbaiki saat migrasi agar edit RSVP existing tidak rusak.

Wishes:

- Form dasar: `name`, `message`.
- Jika guest ada, nama default diisi dari guest.
- Store memanggil `POST /invitations/{user_slug}/wishes`.
- Fetch wishes memanggil `GET /invitations/{user_slug}/wishes`.
- Response Laravel saat ini di-wrap menjadi bentuk Firestore-like: `{ docs: res.data.map(w => ({ data: () => w })) }`.
- Komponen lalu melakukan `docs.map(wish => wish.data()).filter(wish => !wish.deleted_at).sort((a, b) => b.id - a.id)`.

Target Laravel sebaiknya menyediakan response bersih berbentuk array, dan komponen Next baru tidak perlu mempertahankan shim Firestore.

## 8. Endpoint API yang Terlihat

Endpoint lama/current yang dipakai:

- `GET /invitations`
- `GET /invitations/{slug}`
- `GET /invitations/{slug}/guests/{guestSlug}`
- `POST /invitations/{slug}/rsvp`
- `POST /invitations/{slug}/wishes`
- `GET /invitations/{slug}/wishes`

Endpoint yang dibutuhkan tetapi belum terlihat implementasinya di store:

- `GET /invitations/{slug}/rsvp/{guestSlug}` atau equivalent untuk mengambil RSVP existing per guest.

Rekomendasi response envelope:

```json
{
  "status": "success",
  "data": {}
}
```

Untuk target baru, lebih baik standar Laravel API dibuat konsisten:

```json
{
  "data": {},
  "meta": {}
}
```

atau tetap `status/data` selama masa transisi, tetapi dokumentasikan sebagai kontrak.

## 9. Rekomendasi Struktur Data PostgreSQL

Struktur lama terlihat flat dan banyak optional key. Untuk Laravel + PostgreSQL, pisahkan domain agar rapi:

- `invitations`: slug, theme_id/theme_slug, event_type, status, published_at, title, music_url, primary_date, metadata.
- `invitation_couples`: invitation_id, role (`bride`/`groom`), display_name, full_name, child_order, all_child, father_name, mother_name, instagram, photo_asset_id, illustration_asset_id, sort_order.
- `invitation_events`: invitation_id, type (`akad`/`reception`/custom), title, date, start_time, end_time, location_name, address, map_url, sort_order.
- `invitation_guests`: invitation_id, name, slug, is_group, max_attendees, metadata.
- `invitation_rsvps`: invitation_id, guest_id nullable, guest_slug snapshot, name, attendance, attendee_count, not_attend_reason, group_name, metadata.
- `invitation_wishes`: invitation_id, guest_id nullable, name, message, deleted_at.
- `invitation_stories`: invitation_id, title, description, date, image_asset_id, sort_order.
- `invitation_galleries`: invitation_id, image_asset_id, caption, orientation, sort_order.
- `invitation_gifts`: invitation_id, type, provider_name, account_number, account_name, address, sort_order.
- `invitation_assets`: path/url, disk, mime_type, width, height, alt_text.
- `invitation_theme_settings`: invitation_id, theme_slug, gallery_type, settings JSONB.

Gunakan `settings JSONB` hanya untuk variasi theme-specific yang belum layak jadi kolom formal. Jangan jadikan semua data utama sebagai JSONB karena akan mengulang kekacauan lama.

Mapping dari field lama:

- `custom.*` masuk ke `invitation_theme_settings.settings`.
- `bride_*` dan `groom_*` masuk ke `invitation_couples`.
- `akad` dan `reception` masuk ke `invitation_events`.
- `galleries` masuk ke `invitation_galleries`.
- `gift/gifts` masuk ke `invitation_gifts`.
- `stories` masuk ke `invitation_stories`.
- `music`, `video`, `display_picture`, `gif_image`, cover image masuk ke `invitation_assets` atau URL field terstruktur.

## 10. Strategi Migrasi Frontend Baru

Urutan kerja yang disarankan:

1. Buat domain adapter di `lib/api` atau `services` untuk fetch invitation by slug.
2. Buat normalized TypeScript/JSDoc contract atau plain JS shape terlebih dahulu sebelum memindahkan tema.
3. Buat route `app/[slug]/page.js` dengan metadata server-side.
4. Buat `components/features/invitations/theme-registry.js`.
5. Port satu tema foundation, disarankan `botan`, dengan data fixture hasil adapter.
6. Extract reusable invitation primitives: cover shell, couple block, event date block, location block, gallery renderer, gift card, RSVP form, wish form, music button.
7. Setelah satu tema stabil, port tema berikutnya dengan cara reuse primitives dan hanya beda skin/assets/layout.
8. Jangan port bug/adapter Firestore lama. Targetkan kontrak API bersih sejak awal.

Pembagian Server/Client Component:

- Server Component: route page, metadata, static sections, layout composition, fetch invitation.
- Client Component: cover open interaction, audio/music, RSVP form, wish form, copy-to-clipboard gift, gallery carousel/flip, floating menu scroll.

## 11. Checklist Migrasi Per Tema

Untuk setiap tema yang dipindahkan:

- Validasi nama theme lama dan theme slug target.
- Salin/rapikan aset dari `static/themes/[theme]` ke `public/themes/[theme]` atau pipeline asset baru.
- Buat page fixture minimal dari data lama untuk visual check.
- Port root sequence section sesuai tema lama.
- Port SCSS/CSS secara scoped agar tidak bocor ke tema lain.
- Ganti `$mq` dengan responsive CSS/Tailwind atau hook viewport hanya bila perlu.
- Ganti `$nuxt` event bus dengan local state/context/callback.
- Ganti `Vue.prototype.$alertSuccess/$alertFail` dengan utility toast/modal lokal.
- Ganti `new Audio` lifecycle ke Client Component dengan cleanup.
- Pastikan optional sections tetap mengikuti field lama: `stories`, `galleries`, `video`, `with_notes`, `display_picture`, `custom.*`.
- Pastikan query `?tamu=` tetap bekerja untuk personalized guest.
- Uji mobile dan desktop terpisah karena project lama sangat bergantung pada breakpoint `600px`.

## 12. Risiko dan Temuan Teknis

Risiko utama:

- Kontrak data lama flat dan tidak terdokumentasi, sehingga perpindahan langsung field-by-field rawan bug.
- Banyak tema menduplikasi logic yang sama dengan variasi kecil.
- `fetchRsvp` direferensikan beberapa section RSVP tetapi tidak tersedia di store yang dibaca.
- Aset masih banyak dipanggil lewat string path statis dan sebagian OG image memakai Firebase Storage.
- Audio autoplay bisa gagal di browser modern jika tidak dipicu user gesture; cover open harus menjadi trigger play yang aman.
- Event bus/global prototype lama bisa menyebabkan coupling tersembunyi jika dipindahkan mentah-mentah.

Prinsip migrasi:

- Jangan memindahkan struktur berantakan apa adanya.
- Jadikan satu adapter data sebagai boundary antara Laravel API dan komponen tema.
- Port tema satu per satu, bukan rewrite semua sekaligus.
- Setelah satu tema stabil, ekstrak pola reusable sebelum tema kedua/ketiga agar tidak mengulang duplikasi lama.

