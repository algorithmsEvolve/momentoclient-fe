# 01 Backend Laravel 13 + PostgreSQL Plan

Dokumen ini adalah implementation plan backend untuk fitur undangan digital. Target awal hanya mendukung satu tema, `botan`, tetapi schema dan API harus siap untuk semua tema berikutnya.

## 1. Target Backend

Backend baru harus menggantikan Firebase/struktur lama dengan API Laravel yang rapi.

Target teknis:

- Laravel 13.x.
- PHP 8.3 minimum.
- PostgreSQL.
- Public API untuk undangan.
- Admin CRUD belum masuk MVP ini, tetapi schema harus siap diisi dari admin panel nanti.
- No Firebase dependency.
- Storage URL boleh berupa seeded URL statis dulu, tetapi model asset tetap disiapkan.

Asumsi lokasi repo backend:

```bash
/Users/apple/Documents/Codes/Laravel/momento-be
```

Jika user memilih path lain, sesuaikan seluruh command.

## 2. Setup Project

Command awal:

```bash
composer create-project laravel/laravel momento-be "^13.0"
cd momento-be
cp .env.example .env
php artisan key:generate
```

Konfigurasi `.env` minimal:

```env
APP_NAME="Momento API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=momento
DB_USERNAME=postgres
DB_PASSWORD=postgres

FRONTEND_URL=http://localhost:3000
```

Install tooling yang disarankan:

```bash
composer require laravel/sanctum
php artisan install:api
```

Sanctum belum wajib untuk public endpoints, tetapi akan berguna untuk admin/auth nanti. Jika `install:api` menambahkan route/api bootstrap, ikuti struktur Laravel 13 default.

## 3. Domain Model

Gunakan model relational untuk data inti, dan JSONB hanya untuk variasi theme-specific.

### 3.1 `invitation_themes`

Tujuan: registry tema yang tersedia.

Kolom:

- `id`
- `slug` unique, contoh `botan`
- `name`, contoh `Botan`
- `component_key`, contoh `botan`
- `is_active` boolean default true
- `sort_order` integer default 0
- `metadata` jsonb nullable
- timestamps

Index:

- unique `slug`
- index `is_active`

### 3.2 `invitations`

Tujuan: root aggregate undangan.

Kolom:

- `id`
- `theme_id` foreign id ke `invitation_themes`
- `slug` unique, contoh `aira-bima`
- `title`, contoh `Aira & Bima Wedding Invitation`
- `event_type`, enum-like string: `wedding`, `engagement`, `birthday`, etc.
- `status`, enum-like string: `draft`, `published`, `archived`
- `primary_date` date nullable
- `cover_date` date nullable
- `music_url` text nullable
- `og_image_url` text nullable
- `quote_title` string nullable
- `quote_text` text nullable
- `settings` jsonb nullable
- `published_at` timestamp nullable
- timestamps
- soft deletes optional

Index:

- unique `slug`
- index `status`
- index `primary_date`
- index `theme_id`

Rules:

- Public endpoint hanya mengembalikan `published`.
- `settings` menyimpan flag seperti `on_progress`, `hide_cover_date`, `rsvp_caption_type`.

### 3.3 `invitation_people`

Tujuan: menggantikan field flat `bride_*` dan `groom_*`.

Kolom:

- `id`
- `invitation_id`
- `role`, string: `bride`, `groom`, atau role lain nanti
- `display_name`
- `full_name`
- `child_order` integer nullable
- `children_count` integer nullable
- `father_name` nullable
- `mother_name` nullable
- `instagram` nullable
- `photo_url` text nullable
- `illustration_url` text nullable
- `sort_order` integer default 0
- `metadata` jsonb nullable
- timestamps

Index:

- unique composite `invitation_id + role`
- index `invitation_id + sort_order`

Migration note:

- Legacy `custom.reverse_bride_groom` jangan ditiru. Gunakan `sort_order` untuk urutan tampil.

### 3.4 `invitation_events`

Tujuan: akad, reception, dan event lain.

Kolom:

- `id`
- `invitation_id`
- `type`, contoh `akad`, `reception`
- `title`
- `date` date nullable
- `start_time` time nullable
- `end_time` time nullable
- `location_name` nullable
- `address` text nullable
- `map_url` text nullable
- `livestream_url` text nullable
- `sort_order` integer default 0
- `settings` jsonb nullable
- timestamps

Index:

- index `invitation_id + type`
- index `invitation_id + sort_order`

### 3.5 `invitation_guests`

Tujuan: personalisasi query `?tamu=`.

Kolom:

- `id`
- `invitation_id`
- `slug`
- `name`
- `is_group` boolean default false
- `max_attendees` integer nullable
- `phone` nullable
- `metadata` jsonb nullable
- timestamps

Index:

- unique composite `invitation_id + slug`
- index `invitation_id`

### 3.6 `invitation_rsvps`

Tujuan: RSVP per guest atau public fallback.

Kolom:

- `id`
- `invitation_id`
- `guest_id` nullable foreign id
- `guest_slug` nullable snapshot
- `name`
- `attendance` boolean
- `attendee_count` integer nullable
- `not_attend_reason` text nullable
- `group_name` nullable
- `metadata` jsonb nullable
- timestamps

Index:

- index `invitation_id`
- index `guest_id`
- index `guest_slug`

Constraint:

- Jika `attendance = true`, `attendee_count` minimal 1.
- Jika guest bukan group, endpoint update harus upsert berdasarkan `guest_id`.
- Jika guest group, boleh membuat banyak rows dengan `group_name`.

### 3.7 `invitation_wishes`

Tujuan: ucapan publik.

Kolom:

- `id`
- `invitation_id`
- `guest_id` nullable
- `name`
- `message`
- `metadata` jsonb nullable
- timestamps
- soft deletes

Index:

- index `invitation_id + created_at`

### 3.8 `invitation_stories`

Tujuan: timeline cerita.

Kolom:

- `id`
- `invitation_id`
- `title`
- `description` text nullable
- `date` date nullable
- `image_url` text nullable
- `sort_order` integer default 0
- `metadata` jsonb nullable
- timestamps

### 3.9 `invitation_galleries`

Tujuan: galeri foto.

Kolom:

- `id`
- `invitation_id`
- `image_url`
- `caption` nullable
- `orientation`, nullable string: `portrait`, `landscape`, `square`
- `sort_order` integer default 0
- `metadata` jsonb nullable
- timestamps

### 3.10 `invitation_gifts`

Tujuan: rekening, e-wallet, atau alamat hadiah.

Kolom:

- `id`
- `invitation_id`
- `type`, contoh `bank`, `ewallet`, `address`
- `provider_name`, contoh `BCA`
- `account_number` nullable
- `account_name` nullable
- `address` text nullable
- `note` text nullable
- `sort_order` integer default 0
- `metadata` jsonb nullable
- timestamps

## 4. Laravel File Plan

Buat model:

```bash
php artisan make:model InvitationTheme -m
php artisan make:model Invitation -m
php artisan make:model InvitationPerson -m
php artisan make:model InvitationEvent -m
php artisan make:model InvitationGuest -m
php artisan make:model InvitationRsvp -m
php artisan make:model InvitationWish -m
php artisan make:model InvitationStory -m
php artisan make:model InvitationGallery -m
php artisan make:model InvitationGift -m
```

Buat controller:

```bash
php artisan make:controller Api/PublicInvitationController
php artisan make:controller Api/PublicInvitationGuestController
php artisan make:controller Api/PublicInvitationRsvpController
php artisan make:controller Api/PublicInvitationWishController
```

Buat resources:

```bash
php artisan make:resource InvitationResource
php artisan make:resource InvitationGuestResource
php artisan make:resource InvitationRsvpResource
php artisan make:resource InvitationWishResource
```

Buat form requests:

```bash
php artisan make:request StoreInvitationRsvpRequest
php artisan make:request StoreInvitationWishRequest
```

Buat seeders:

```bash
php artisan make:seeder InvitationThemeSeeder
php artisan make:seeder BotanDummyInvitationSeeder
```

## 5. Model Relationships

`InvitationTheme`:

```php
public function invitations(): HasMany
```

`Invitation`:

```php
public function theme(): BelongsTo
public function people(): HasMany
public function events(): HasMany
public function guests(): HasMany
public function rsvps(): HasMany
public function wishes(): HasMany
public function stories(): HasMany
public function galleries(): HasMany
public function gifts(): HasMany
```

Convenience accessors:

```php
public function bride(): ?InvitationPerson
public function groom(): ?InvitationPerson
public function akad(): ?InvitationEvent
public function reception(): ?InvitationEvent
```

Do not make these accessors run repeated queries inside API Resource. Always eager load.

## 6. API Routes

File: `routes/api.php`

Routes:

```php
Route::prefix('invitations')->group(function () {
    Route::get('/', [PublicInvitationController::class, 'index']);
    Route::get('/{invitation:slug}', [PublicInvitationController::class, 'show']);
    Route::get('/{invitation:slug}/guests/{guest:slug}', [PublicInvitationGuestController::class, 'show'])
        ->scopeBindings();
    Route::get('/{invitation:slug}/guests/{guest:slug}/rsvp', [PublicInvitationRsvpController::class, 'show'])
        ->scopeBindings();
    Route::post('/{invitation:slug}/rsvp', [PublicInvitationRsvpController::class, 'store']);
    Route::get('/{invitation:slug}/wishes', [PublicInvitationWishController::class, 'index']);
    Route::post('/{invitation:slug}/wishes', [PublicInvitationWishController::class, 'store']);
});
```

Important:

- `show` invitation must reject non-published invitations with 404.
- Guest route must ensure guest belongs to invitation.
- Public write routes should have throttle middleware.

Suggested throttle:

```php
Route::middleware('throttle:20,1')->group(function () {
    Route::post('/{invitation:slug}/rsvp', ...);
    Route::post('/{invitation:slug}/wishes', ...);
});
```

## 7. API Response Contract

Use Laravel API Resources. Standard shape:

```json
{
  "data": {}
}
```

### 7.1 `GET /api/invitations/{slug}`

Expected response:

```json
{
  "data": {
    "slug": "aira-bima",
    "theme": {
      "slug": "botan",
      "name": "Botan",
      "componentKey": "botan"
    },
    "status": "published",
    "eventType": "wedding",
    "title": "Aira & Bima Wedding Invitation",
    "primaryDate": "2026-12-12",
    "coverDate": "2026-12-12",
    "musicUrl": "/themes/botan/dummy/music.mp3",
    "ogImageUrl": "/themes/botan/dummy/og-aira-bima.jpg",
    "quote": {
      "title": "QS. Ar-Rum: 21",
      "text": "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..."
    },
    "settings": {
      "galleryType": "4P1L",
      "hideCoverDate": false,
      "withoutNotAttendReason": false,
      "rsvpCaptionType": 1
    },
    "couple": {
      "bride": {},
      "groom": {}
    },
    "events": [],
    "stories": [],
    "galleries": [],
    "gifts": []
  }
}
```

### 7.2 `GET /api/invitations/{slug}/guests/{guestSlug}`

Expected response:

```json
{
  "data": {
    "slug": "keluarga-pratama",
    "name": "Keluarga Pratama",
    "isGroup": true,
    "maxAttendees": 2
  }
}
```

### 7.3 `POST /api/invitations/{slug}/rsvp`

Payload:

```json
{
  "guestSlug": "keluarga-pratama",
  "name": "Dina Pratama",
  "attendance": true,
  "attendeeCount": 2,
  "notAttendReason": null
}
```

Response:

```json
{
  "data": {
    "id": 1,
    "guestSlug": "keluarga-pratama",
    "name": "Dina Pratama",
    "attendance": true,
    "attendeeCount": 2,
    "notAttendReason": null,
    "createdAt": "2026-05-14T10:00:00+07:00"
  }
}
```

### 7.4 `GET /api/invitations/{slug}/wishes`

Response:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Keluarga Pratama",
      "message": "Selamat berbahagia.",
      "createdAt": "2026-05-14T10:00:00+07:00"
    }
  ]
}
```

### 7.5 `POST /api/invitations/{slug}/wishes`

Payload:

```json
{
  "guestSlug": "keluarga-pratama",
  "name": "Keluarga Pratama",
  "message": "Selamat menempuh hidup baru."
}
```

## 8. Validation Rules

`StoreInvitationRsvpRequest`:

- `guestSlug`: nullable string max 160
- `name`: required string max 160
- `attendance`: required boolean
- `attendeeCount`: required_if attendance true, nullable integer min 1 max 10
- `notAttendReason`: nullable string max 1000

Additional business rules:

- If `guestSlug` exists, validate guest belongs to invitation.
- If guest `max_attendees` exists, `attendeeCount <= max_attendees`.
- If guest is not group, upsert by `guest_id`.
- If guest is group, create new row unless the API later adds member identifier.

`StoreInvitationWishRequest`:

- `guestSlug`: nullable string max 160
- `name`: required string max 160
- `message`: required string min 2 max 1000

## 9. Query Loading Rules

For `PublicInvitationController@show`, eager load:

```php
$invitation->load([
    'theme',
    'people' => fn ($query) => $query->orderBy('sort_order'),
    'events' => fn ($query) => $query->orderBy('sort_order'),
    'stories' => fn ($query) => $query->orderBy('sort_order'),
    'galleries' => fn ($query) => $query->orderBy('sort_order'),
    'gifts' => fn ($query) => $query->orderBy('sort_order'),
]);
```

Avoid N+1 in API Resources.

## 10. Seeder Requirements

Seeder `InvitationThemeSeeder`:

- Create `botan`.

Seeder `BotanDummyInvitationSeeder`:

- Create invitation `aira-bima`.
- Create bride and groom people.
- Create akad and reception events.
- Create guest `keluarga-pratama`.
- Create guest `dina`.
- Create two stories.
- Create five gallery entries for `4P1L`.
- Create one bank gift.
- Create one address gift.
- Create two wishes.

See [03 Dummy Data and Testing](./03-dummy-data-and-testing.md) for exact dummy content.

## 11. Backend Test Plan

Use Laravel HTTP tests.

Create tests:

```bash
php artisan make:test PublicInvitationApiTest
```

Test cases:

- Published invitation detail returns 200.
- Missing invitation returns 404.
- Draft invitation returns 404.
- Guest detail belongs to invitation.
- RSVP validates required fields.
- RSVP respects max attendees.
- RSVP can create for group guest.
- RSVP upserts for non-group guest.
- Wishes list returns newest first.
- Wish create validates message.

Run:

```bash
php artisan test
```

## 12. Backend Done Criteria

Backend phase is done when:

- `php artisan migrate:fresh --seed` passes.
- `php artisan test` passes.
- `GET /api/invitations/aira-bima` returns normalized Botan data.
- `GET /api/invitations/aira-bima/guests/keluarga-pratama` returns guest.
- `POST /api/invitations/aira-bima/rsvp` works.
- `GET /api/invitations/aira-bima/wishes` works.
- `POST /api/invitations/aira-bima/wishes` works.

