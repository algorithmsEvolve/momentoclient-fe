# 03 Dummy Data and Testing Plan

Dokumen ini menyediakan data dummy untuk MVP undangan digital tema `botan`. Data ini harus digunakan oleh backend seeder dan frontend testing.

## 1. Dummy Identity

Invitation:

- Slug: `aira-bima`
- Theme: `botan`
- Event type: `wedding`
- Status: `published`
- Title: `Aira & Bima Wedding Invitation`
- Primary date: `2026-12-12`
- Cover date: `2026-12-12`

People:

- Bride display name: `Aira`
- Bride full name: `Aira Maheswari`
- Groom display name: `Bima`
- Groom full name: `Bima Pradipta`

Guests:

- Group guest slug: `keluarga-pratama`
- Group guest name: `Keluarga Pratama`
- Group max attendees: `2`
- Single guest slug: `dina`
- Single guest name: `Dina Larasati`
- Single max attendees: `1`

## 2. Backend Seeder Data Shape

Use this data in `BotanDummyInvitationSeeder`.

### 2.1 Theme

```php
$theme = InvitationTheme::query()->updateOrCreate(
    ['slug' => 'botan'],
    [
        'name' => 'Botan',
        'component_key' => 'botan',
        'is_active' => true,
        'sort_order' => 10,
        'metadata' => [
            'legacy_component' => 'Botan',
            'legacy_path' => 'components/themes/botan',
        ],
    ]
);
```

### 2.2 Invitation

```php
$invitation = Invitation::query()->updateOrCreate(
    ['slug' => 'aira-bima'],
    [
        'theme_id' => $theme->id,
        'title' => 'Aira & Bima Wedding Invitation',
        'event_type' => 'wedding',
        'status' => 'published',
        'primary_date' => '2026-12-12',
        'cover_date' => '2026-12-12',
        'music_url' => '/themes/botan/dummy/botan-music.mp3',
        'og_image_url' => '/themes/botan/dummy/og-aira-bima.jpg',
        'quote_title' => 'QS. Ar-Rum: 21',
        'quote_text' => 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan agar kamu merasa tenteram kepadanya.',
        'settings' => [
            'galleryType' => '4P1L',
            'hideCoverDate' => false,
            'withoutNotAttendReason' => false,
            'rsvpCaptionType' => 1,
            'onProgress' => false,
        ],
        'published_at' => now(),
    ]
);
```

### 2.3 People

```php
$invitation->people()->updateOrCreate(
    ['role' => 'bride'],
    [
        'display_name' => 'Aira',
        'full_name' => 'Aira Maheswari',
        'child_order' => 1,
        'children_count' => 3,
        'father_name' => 'Bapak Arman Wijaya',
        'mother_name' => 'Ibu Ratna Sari',
        'instagram' => 'airamaheswari',
        'photo_url' => '/themes/botan/dummy/bride-aira.jpg',
        'illustration_url' => '/themes/botan/dummy/bride-illustration.png',
        'sort_order' => 1,
    ]
);

$invitation->people()->updateOrCreate(
    ['role' => 'groom'],
    [
        'display_name' => 'Bima',
        'full_name' => 'Bima Pradipta',
        'child_order' => 2,
        'children_count' => 2,
        'father_name' => 'Bapak Surya Pradipta',
        'mother_name' => 'Ibu Melati Anggraeni',
        'instagram' => 'bimapradipta',
        'photo_url' => '/themes/botan/dummy/groom-bima.jpg',
        'illustration_url' => '/themes/botan/dummy/groom-illustration.png',
        'sort_order' => 2,
    ]
);
```

### 2.4 Events

```php
$invitation->events()->updateOrCreate(
    ['type' => 'akad'],
    [
        'title' => 'Akad Nikah',
        'date' => '2026-12-12',
        'start_time' => '09:00:00',
        'end_time' => '10:00:00',
        'location_name' => 'The Botanica Grand Hall',
        'address' => 'Jl. Kemang Raya No. 27, Jakarta Selatan',
        'map_url' => 'https://maps.google.com/?q=Kemang+Jakarta',
        'sort_order' => 1,
    ]
);

$invitation->events()->updateOrCreate(
    ['type' => 'reception'],
    [
        'title' => 'Resepsi',
        'date' => '2026-12-12',
        'start_time' => '18:30:00',
        'end_time' => '21:00:00',
        'location_name' => 'The Botanica Grand Hall',
        'address' => 'Jl. Kemang Raya No. 27, Jakarta Selatan',
        'map_url' => 'https://maps.google.com/?q=Kemang+Jakarta',
        'sort_order' => 2,
    ]
);
```

### 2.5 Guests

```php
$invitation->guests()->updateOrCreate(
    ['slug' => 'keluarga-pratama'],
    [
        'name' => 'Keluarga Pratama',
        'is_group' => true,
        'max_attendees' => 2,
    ]
);

$invitation->guests()->updateOrCreate(
    ['slug' => 'dina'],
    [
        'name' => 'Dina Larasati',
        'is_group' => false,
        'max_attendees' => 1,
    ]
);
```

### 2.6 Stories

```php
$stories = [
    [
        'title' => 'Pertemuan Pertama',
        'date' => '2022-08-14',
        'description' => 'Kami pertama kali bertemu dalam sebuah acara kecil bersama teman-teman terdekat.',
        'image_url' => '/themes/botan/dummy/story-1.jpg',
        'sort_order' => 1,
    ],
    [
        'title' => 'Lamaran',
        'date' => '2025-02-09',
        'description' => 'Dengan restu keluarga, kami memulai langkah baru menuju hari bahagia.',
        'image_url' => '/themes/botan/dummy/story-2.jpg',
        'sort_order' => 2,
    ],
];
```

Seeder loop:

```php
foreach ($stories as $story) {
    $invitation->stories()->updateOrCreate(
        ['sort_order' => $story['sort_order']],
        $story
    );
}
```

### 2.7 Galleries

For Botan MVP `4P1L`, seed five images.

```php
$galleries = [
    ['image_url' => '/themes/botan/dummy/gallery-1.jpg', 'orientation' => 'portrait', 'sort_order' => 1],
    ['image_url' => '/themes/botan/dummy/gallery-2.jpg', 'orientation' => 'portrait', 'sort_order' => 2],
    ['image_url' => '/themes/botan/dummy/gallery-3.jpg', 'orientation' => 'portrait', 'sort_order' => 3],
    ['image_url' => '/themes/botan/dummy/gallery-4.jpg', 'orientation' => 'portrait', 'sort_order' => 4],
    ['image_url' => '/themes/botan/dummy/gallery-5.jpg', 'orientation' => 'landscape', 'sort_order' => 5],
];
```

### 2.8 Gifts

```php
$invitation->gifts()->updateOrCreate(
    ['type' => 'bank', 'provider_name' => 'BCA'],
    [
        'account_number' => '1234567890',
        'account_name' => 'Aira Maheswari',
        'sort_order' => 1,
    ]
);

$invitation->gifts()->updateOrCreate(
    ['type' => 'address', 'provider_name' => 'Alamat Hadiah'],
    [
        'address' => 'Jl. Kemang Raya No. 27, Jakarta Selatan, 12730',
        'note' => 'Penerima: Aira Maheswari',
        'sort_order' => 2,
    ]
);
```

### 2.9 Wishes

```php
$invitation->wishes()->updateOrCreate(
    ['name' => 'Keluarga Pratama', 'message' => 'Selamat menempuh hidup baru. Semoga selalu berbahagia.'],
    []
);

$invitation->wishes()->updateOrCreate(
    ['name' => 'Dina Larasati', 'message' => 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.'],
    []
);
```

## 3. Expected API Response for Frontend

Frontend should receive this normalized structure from `GET /api/invitations/aira-bima`.

```json
{
  "data": {
    "slug": "aira-bima",
    "title": "Aira & Bima Wedding Invitation",
    "eventType": "wedding",
    "status": "published",
    "primaryDate": "2026-12-12",
    "coverDate": "2026-12-12",
    "musicUrl": "/themes/botan/dummy/botan-music.mp3",
    "ogImageUrl": "/themes/botan/dummy/og-aira-bima.jpg",
    "theme": {
      "slug": "botan",
      "name": "Botan",
      "componentKey": "botan"
    },
    "quote": {
      "title": "QS. Ar-Rum: 21",
      "text": "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan agar kamu merasa tenteram kepadanya."
    },
    "settings": {
      "galleryType": "4P1L",
      "hideCoverDate": false,
      "withoutNotAttendReason": false,
      "rsvpCaptionType": 1,
      "onProgress": false
    },
    "couple": {
      "bride": {
        "role": "bride",
        "displayName": "Aira",
        "fullName": "Aira Maheswari",
        "childOrder": 1,
        "childrenCount": 3,
        "fatherName": "Bapak Arman Wijaya",
        "motherName": "Ibu Ratna Sari",
        "instagram": "airamaheswari",
        "photoUrl": "/themes/botan/dummy/bride-aira.jpg",
        "illustrationUrl": "/themes/botan/dummy/bride-illustration.png"
      },
      "groom": {
        "role": "groom",
        "displayName": "Bima",
        "fullName": "Bima Pradipta",
        "childOrder": 2,
        "childrenCount": 2,
        "fatherName": "Bapak Surya Pradipta",
        "motherName": "Ibu Melati Anggraeni",
        "instagram": "bimapradipta",
        "photoUrl": "/themes/botan/dummy/groom-bima.jpg",
        "illustrationUrl": "/themes/botan/dummy/groom-illustration.png"
      }
    },
    "events": [
      {
        "type": "akad",
        "title": "Akad Nikah",
        "date": "2026-12-12",
        "startTime": "09:00:00",
        "endTime": "10:00:00",
        "locationName": "The Botanica Grand Hall",
        "address": "Jl. Kemang Raya No. 27, Jakarta Selatan",
        "mapUrl": "https://maps.google.com/?q=Kemang+Jakarta"
      },
      {
        "type": "reception",
        "title": "Resepsi",
        "date": "2026-12-12",
        "startTime": "18:30:00",
        "endTime": "21:00:00",
        "locationName": "The Botanica Grand Hall",
        "address": "Jl. Kemang Raya No. 27, Jakarta Selatan",
        "mapUrl": "https://maps.google.com/?q=Kemang+Jakarta"
      }
    ],
    "stories": [
      {
        "title": "Pertemuan Pertama",
        "date": "2022-08-14",
        "description": "Kami pertama kali bertemu dalam sebuah acara kecil bersama teman-teman terdekat.",
        "imageUrl": "/themes/botan/dummy/story-1.jpg"
      },
      {
        "title": "Lamaran",
        "date": "2025-02-09",
        "description": "Dengan restu keluarga, kami memulai langkah baru menuju hari bahagia.",
        "imageUrl": "/themes/botan/dummy/story-2.jpg"
      }
    ],
    "galleries": [
      { "imageUrl": "/themes/botan/dummy/gallery-1.jpg", "orientation": "portrait" },
      { "imageUrl": "/themes/botan/dummy/gallery-2.jpg", "orientation": "portrait" },
      { "imageUrl": "/themes/botan/dummy/gallery-3.jpg", "orientation": "portrait" },
      { "imageUrl": "/themes/botan/dummy/gallery-4.jpg", "orientation": "portrait" },
      { "imageUrl": "/themes/botan/dummy/gallery-5.jpg", "orientation": "landscape" }
    ],
    "gifts": [
      {
        "type": "bank",
        "providerName": "BCA",
        "accountNumber": "1234567890",
        "accountName": "Aira Maheswari",
        "address": null,
        "note": null
      },
      {
        "type": "address",
        "providerName": "Alamat Hadiah",
        "accountNumber": null,
        "accountName": null,
        "address": "Jl. Kemang Raya No. 27, Jakarta Selatan, 12730",
        "note": "Penerima: Aira Maheswari"
      }
    ]
  }
}
```

## 4. Testing URLs

Backend:

```txt
GET http://localhost:8000/api/invitations/aira-bima
GET http://localhost:8000/api/invitations/aira-bima/guests/keluarga-pratama
GET http://localhost:8000/api/invitations/aira-bima/guests/dina
GET http://localhost:8000/api/invitations/aira-bima/wishes
```

Frontend:

```txt
http://localhost:3000/aira-bima
http://localhost:3000/aira-bima?tamu=keluarga-pratama
http://localhost:3000/aira-bima?tamu=dina
```

## 5. Manual Test Cases

### Case 1 - Public invitation without guest

URL:

```txt
/aira-bima
```

Expected:

- Page renders Botan.
- Cover shows Aira and Bima.
- Guest name area is hidden or uses generic label.
- RSVP section is hidden.
- Wishes and gift remain visible after opening.

### Case 2 - Group guest

URL:

```txt
/aira-bima?tamu=keluarga-pratama
```

Expected:

- Cover says invited guest is `Keluarga Pratama`.
- RSVP section appears.
- RSVP name can be edited for group member.
- Max attendee count is 2.
- Submit with attendance true and attendee count 2 succeeds.

### Case 3 - Single guest

URL:

```txt
/aira-bima?tamu=dina
```

Expected:

- Cover says invited guest is `Dina Larasati`.
- RSVP section appears.
- RSVP name defaults to `Dina Larasati`.
- Max attendee count is 1.
- Submit with attendee count 2 fails validation.

### Case 4 - Wish

Action:

- Open invitation.
- Submit wish as `Tester`.

Expected:

- POST succeeds.
- Wish list refreshes.
- New wish appears at top.

### Case 5 - Unknown invitation

URL:

```txt
/not-existing-slug
```

Expected:

- 404 page.
- No runtime crash.

### Case 6 - Unsupported theme

Backend condition:

- Temporarily seed invitation with `theme.componentKey = "not-migrated"`.

Expected:

- Frontend shows unsupported theme message.
- No runtime crash.

## 6. API Testing Payloads

Create group RSVP:

```json
{
  "guestSlug": "keluarga-pratama",
  "name": "Raka Pratama",
  "attendance": true,
  "attendeeCount": 2,
  "notAttendReason": null
}
```

Create declined RSVP:

```json
{
  "guestSlug": "dina",
  "name": "Dina Larasati",
  "attendance": false,
  "attendeeCount": null,
  "notAttendReason": "Maaf belum bisa hadir karena ada agenda keluarga."
}
```

Create wish:

```json
{
  "guestSlug": "keluarga-pratama",
  "name": "Keluarga Pratama",
  "message": "Selamat berbahagia untuk Aira dan Bima."
}
```

Invalid wish:

```json
{
  "guestSlug": "keluarga-pratama",
  "name": "",
  "message": ""
}
```

Expected:

- Returns HTTP 422.
- Response contains validation errors for `name` and `message`.

## 7. Asset Requirement for Dummy

Minimum asset files expected by dummy data:

```txt
public/themes/botan/dummy/botan-music.mp3
public/themes/botan/dummy/og-aira-bima.jpg
public/themes/botan/dummy/bride-aira.jpg
public/themes/botan/dummy/groom-bima.jpg
public/themes/botan/dummy/bride-illustration.png
public/themes/botan/dummy/groom-illustration.png
public/themes/botan/dummy/story-1.jpg
public/themes/botan/dummy/story-2.jpg
public/themes/botan/dummy/gallery-1.jpg
public/themes/botan/dummy/gallery-2.jpg
public/themes/botan/dummy/gallery-3.jpg
public/themes/botan/dummy/gallery-4.jpg
public/themes/botan/dummy/gallery-5.jpg
```

If actual files are not ready:

- Prefer copying safe Botan legacy assets from old project.
- For couple/gallery images, use real temporary assets stored in `public/themes/botan/dummy`.
- Do not leave generic broken image placeholders.

## 8. Verification Commands

Backend:

```bash
php artisan migrate:fresh --seed
php artisan test
php artisan serve
```

Frontend:

```bash
npm run lint
npm run dev
```

Manual:

- Open testing URLs.
- Check desktop and mobile widths.
- Verify no console errors.

