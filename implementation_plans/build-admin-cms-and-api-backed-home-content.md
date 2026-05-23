# Implementation Plan: Build Admin CMS Frontend and API-Backed Home Content

## Goal

Create a new admin frontend website using the same stack as `momentoclient-fe`, connected to the same `momento-be` API, so the team can manage CMS content.

Initial scope:

- Build a new admin frontend project.
- Add CMS API support in `momento-be`.
- Make `momentoclient-fe` home page content come from `momento-be`.
- Admin can edit home page texts and image URLs.
- Default content must match the current hardcoded home page.

Out of scope for this first phase:

- Order management.
- Pricing CMS editing.
- Full media upload pipeline.
- Invitation admin dashboard.
- Complex roles/permissions beyond a basic admin user.

Future-ready requirement:

- The data model should allow pricing content, images, and other pages to be managed later without rewriting the entire CMS foundation.

## Repositories Involved

### Existing Public Frontend

Path:

```text
/Users/apple/Documents/Codes/NextJS/momentoclient-fe
```

Stack:

- Next.js `16.2.3`
- React `19.2.4`
- Tailwind CSS v4
- App Router
- `next/font`
- `lucide-react`

### Existing Backend API

Path:

```text
/Users/apple/Documents/Codes/Laravel/momento-be
```

Stack:

- Laravel `^13.8`
- PHP `^8.3`
- Sanctum `^4.0`
- API routes in `routes/api.php`
- API Resources and Form Requests are already used for invitation endpoints.

### New Admin Frontend

Recommended path:

```text
/Users/apple/Documents/Codes/NextJS/momento-admin-fe
```

Recommended project name:

```text
momento-admin-fe
```

Use the same frontend stack and conventions as `momentoclient-fe`.

## Current Public Home Page Content Surface

Home page:

```text
app/(site)/page.js
```

It renders:

```jsx
<Navbar />
<OpeningSection />
<WhySection />
<SeserahanSection />
<MaharSection />
<InvitationSection />
<HighlightSection />
<TestimonySection />
<ExtraBanner />
<Footer />
```

Current hardcoded home sections:

1. `components/features/landing/OpeningSection.js`
   - Hero typing headline.
   - Service list text.
   - CTA text and href.
   - Bottom decoration image.

2. `components/features/landing/WhySection.js`
   - Five feature cards.
   - Each card has icon, title, description.

3. `components/features/landing/SeserahanSection.js`
   - Heading.
   - Paragraph.
   - Marquee images.
   - CTA text/href.

4. `components/features/landing/MaharSection.js`
   - Heading.
   - Paragraph.
   - Collage images.
   - CTA text/href.

5. `components/features/landing/InvitationSection.js`
   - Heading.
   - Paragraph.
   - Left/right phone image lists.
   - CTA text/href.

6. `components/features/landing/HighlightSection.js`
   - Heading.
   - Paragraph.
   - Extra service cards.
   - CTA text/href.

7. `components/features/landing/TestimonySection.js`
   - Heading.
   - Subtitle.
   - Stats.
   - Testimonials.
   - Decoration images.

8. `components/ui/ExtraBanner.js`
   - Banner text.
   - CTA text/href.
   - Optional decoration.

## High-Level Architecture

Use `momento-be` as the single source of truth for CMS content.

Public frontend flow:

```text
momentoclient-fe home page
  -> GET /api/site-pages/home
  -> normalize/merge with default content
  -> render existing landing components with props
```

Admin frontend flow:

```text
momento-admin-fe
  -> login
  -> GET /api/admin/site-pages/home
  -> edit fields
  -> PUT /api/admin/site-pages/home
  -> public home reflects changes
```

Backend flow:

```text
site_pages table
  slug = home
  content = JSON
  published_content = JSON
  status = published/draft
```

For phase 1, keep the CMS content as structured JSON. This avoids overbuilding dozens of relational tables before the CMS model is stable.

## Backend Implementation Plan (`momento-be`)

### 1. Add `site_pages` table

Create migration:

```text
database/migrations/YYYY_MM_DD_HHMMSS_create_site_pages_table.php
```

Suggested columns:

```php
$table->id();
$table->string('slug')->unique();
$table->string('title');
$table->string('status')->default('published');
$table->json('content')->nullable();
$table->json('published_content')->nullable();
$table->timestamp('published_at')->nullable();
$table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
$table->timestamps();

$table->index('status');
$table->index('published_at');
```

Rationale:

- `content` can hold current editable draft.
- `published_content` can hold the public version.
- For phase 1, admin save can update both immediately if draft/publish workflow is not needed.
- Later, pricing CMS can use `slug = pricing`.

### 2. Add `SitePage` model

Create:

```text
app/Models/SitePage.php
```

Model expectations:

```php
class SitePage extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'published_content' => 'array',
            'published_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function publicContent(): array
    {
        return $this->published_content ?? $this->content ?? [];
    }
}
```

### 3. Add Resource

Create:

```text
app/Http/Resources/SitePageResource.php
```

Public response should be stable:

```php
return [
    'slug' => $this->slug,
    'title' => $this->title,
    'status' => $this->status,
    'content' => $public ? $this->publicContent() : ($this->content ?? []),
    'publishedAt' => $this->published_at?->toISOString(),
    'updatedAt' => $this->updated_at?->toISOString(),
];
```

Use camelCase for public JSON fields, matching existing API contract style.

### 4. Add default home content file

Create a PHP config or data file so seeders and tests can reuse it:

Recommended:

```text
database/seeders/data/home_content.php
```

It should return an array representing the current hardcoded home content.

Top-level content shape:

```php
return [
    'version' => 1,
    'seo' => [
        'title' => 'Momento - Undangan Digital, Mahar & Seserahan',
        'description' => 'Ciptakan momen pernikahan yang autentik dan kreatif 🪄',
        'ogImageUrl' => 'https://...',
    ],
    'opening' => [
        'headline' => "Everything For\nYour Special Moments",
        'services' => [
            'Sewa Seserahan',
            'Frame Mahar',
            'Undangan Digital',
            'Flower Bouquet',
            'Wedding Keepsake',
            'Wedding Content Creator',
        ],
        'cta' => [
            'desktopLabel' => 'LIHAT HARGA',
            'mobileLabel' => 'HITUNG ESTIMASI HARGA',
            'href' => '/harga',
        ],
        'decorationImage' => [
            'src' => '/images/home-decoration.png',
            'alt' => 'Decoration',
        ],
    ],
    'why' => [
        'items' => [
            [
                'title' => 'Authentic',
                'description' => 'Momento memberikan sentuhan original ...',
                'icon' => [
                    'src' => '/icons/why/authentic.svg',
                    'alt' => 'Authentic',
                ],
            ],
        ],
    ],
    'seserahan' => [
        'title' => 'Sewa seserahan',
        'description' => 'Momento melayani sewa seserahan ...',
        'images' => [
            ['src' => '/images/seserahan-items/seserahan-1.png', 'alt' => 'Seserahan 1'],
        ],
        'cta' => [
            'label' => 'Selengkapnya',
            'href' => '/harga?category=seserahan',
        ],
    ],
    'mahar' => [
        'title' => 'Frame Mahar',
        'description' => 'Menghadirkan mahar pernikahan ...',
        'images' => [
            ['src' => '/images/mahar-items/mahar-1.png', 'alt' => 'Mahar 1'],
        ],
        'cta' => [
            'label' => 'Selengkapnya',
            'href' => '/harga?category=mahar',
        ],
    ],
    'invitation' => [
        'title' => 'Undangan Digital',
        'description' => 'Hadir dengan desain responsif ...',
        'leftImages' => [...],
        'rightImages' => [...],
        'cta' => [
            'label' => 'Selengkapnya',
            'href' => '/harga?category=undangan',
        ],
    ],
    'highlight' => [
        'title' => 'More Extras!',
        'description' => 'Selain layanan dan produk utama ...',
        'items' => [
            [
                'title' => 'Wedding Keepsake',
                'description' => 'Properti pernikahan ...',
                'image' => [
                    'src' => '/images/extras/keepsake.png',
                    'alt' => 'Wedding Keepsake',
                ],
            ],
        ],
        'cta' => [
            'label' => 'Selengkapnya',
            'href' => '/harga?category=keepsake',
        ],
    ],
    'testimony' => [
        'title' => 'Apa Kata Mereka?',
        'description' => 'Dari mereka yang telah menggunakan jasa Momento sejak 2023.',
        'quoteImage' => [
            'src' => '/images/testimonies/quote-mark.svg',
            'alt' => 'Quote Icon',
        ],
        'stats' => [...],
        'items' => [...],
        'bottomDecoration' => [
            'src' => '/images/testimonies/testimony-bottom-decoration.png',
            'alt' => 'Wave Decoration',
        ],
    ],
    'extraBanner' => [
        'title' => 'Kalau kamu masih bingung ...',
        'buttonText' => 'HUBUNGI KAMI',
        'buttonHref' => 'https://wa.me/6285117797966',
    ],
];
```

Important:

- Preserve all current text and asset paths exactly as defaults.
- Use image objects with `src` and `alt`.
- For phase 1, image editing means changing image URLs/paths. Binary upload is deferred.

### 5. Add seeder

Create:

```text
database/seeders/SitePageSeeder.php
```

Seeder behavior:

```php
$content = require database_path('seeders/data/home_content.php');

SitePage::query()->updateOrCreate(
    ['slug' => 'home'],
    [
        'title' => 'Home',
        'status' => 'published',
        'content' => $content,
        'published_content' => $content,
        'published_at' => now(),
    ]
);
```

Add it to `DatabaseSeeder`.

### 6. Add public endpoint

Create controller:

```text
app/Http/Controllers/Api/PublicSitePageController.php
```

Routes:

```php
Route::prefix('site-pages')->group(function () {
    Route::get('/{sitePage:slug}', [PublicSitePageController::class, 'show']);
});
```

Controller:

```php
public function show(SitePage $sitePage): SitePageResource
{
    abort_unless($sitePage->status === 'published', 404);

    return new SitePageResource($sitePage);
}
```

Public endpoint:

```text
GET /api/site-pages/home
```

### 7. Add admin auth endpoints

Use Sanctum token auth for phase 1.

Create:

```text
app/Http/Controllers/Api/Admin/AuthController.php
app/Http/Requests/Admin/LoginRequest.php
```

Routes:

```php
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:10,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
```

Login response:

```json
{
  "data": {
    "token": "...",
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@momento..."
    }
  }
}
```

### 8. Add admin CMS endpoints

Create:

```text
app/Http/Controllers/Api/Admin/SitePageController.php
app/Http/Requests/Admin/UpdateSitePageRequest.php
```

Routes:

```php
Route::middleware('auth:sanctum')
    ->prefix('admin/site-pages')
    ->group(function () {
        Route::get('/{sitePage:slug}', [AdminSitePageController::class, 'show']);
        Route::put('/{sitePage:slug}', [AdminSitePageController::class, 'update']);
        Route::post('/{sitePage:slug}/publish', [AdminSitePageController::class, 'publish']);
    });
```

For phase 1, `PUT` can update both `content` and `published_content` immediately to keep workflow simple, or update draft only and require `publish`. Choose one and keep it consistent.

Recommended simple phase 1:

- `PUT /api/admin/site-pages/home` saves draft only.
- `POST /api/admin/site-pages/home/publish` copies `content` to `published_content`.
- Admin UI has explicit `Save Draft` and `Publish` buttons.

Validation:

- `content` required array.
- Validate high-level keys exist for home: `opening`, `why`, `seserahan`, `mahar`, `invitation`, `highlight`, `testimony`, `extraBanner`.
- Validate image objects have `src` and optional `alt`.
- Validate strings have sane max lengths.

### 9. Backend tests

Add feature tests:

```text
tests/Feature/PublicSitePageApiTest.php
tests/Feature/AdminSitePageApiTest.php
```

Test cases:

- Public home page is returned.
- Public 404 for missing page.
- Admin login succeeds with valid credentials.
- Admin login rejects invalid credentials.
- Unauthenticated admin CMS request returns 401.
- Authenticated admin can read home page draft.
- Authenticated admin can update home content.
- Publish copies draft content to public content.

Run:

```bash
php artisan test
```

## Public Frontend Implementation Plan (`momentoclient-fe`)

### 1. Add home content default data

Create:

```text
lib/site-content/homeDefaults.js
```

This JS object must match the backend default content shape and current hardcoded page content.

Why duplicate defaults in frontend:

- Public site should still render if backend is temporarily unavailable.
- Current design remains unchanged before CMS data exists.
- Safer rollout.

### 2. Add CMS API client

Create:

```text
lib/api/siteContent.js
```

Use same pattern as `lib/api/invitations.js`.

Expected functions:

```js
export async function getSitePageBySlug(slug) {
  return requestJson(`/site-pages/${encodeURIComponent(slug)}`);
}

export async function getHomeContent() {
  const response = await getSitePageBySlug("home");

  if (!response.ok || !response.data?.content) {
    return {
      content: homeDefaults,
      source: "fallback",
      error: response.error,
    };
  }

  return {
    content: mergeHomeContent(homeDefaults, response.data.content),
    source: "api",
    error: null,
  };
}
```

Add a merge helper:

```text
lib/site-content/mergeHomeContent.js
```

It should deep-merge backend content over defaults so missing fields do not break the UI.

### 3. Convert home page to fetch content

`app/(site)/page.js` currently starts with `"use client"`, but the page itself only composes components. Prefer making it a Server Component and keep client behavior inside child components.

Remove:

```js
"use client";
```

Then:

```js
import { getHomeContent } from "@/lib/api/siteContent";

export default async function Home() {
  const { content } = await getHomeContent();

  return (
    ...
    <OpeningSection content={content.opening} />
    <WhySection content={content.why} />
    ...
  );
}
```

Keep child components as client only when required:

- `OpeningSection` should remain client because it has typing animation state.
- Most other sections can stay server components unless they use hooks.

### 4. Update each home section to accept content props

For every section:

- Accept `content` prop.
- Use prop values with local fallback to defaults.
- Preserve class names and layout.
- Do not change visual structure unless required for dynamic arrays.

Example:

```js
export default function SeserahanSection({ content = homeDefaults.seserahan }) {
  const images = content.images?.length ? content.images : homeDefaults.seserahan.images;
  ...
}
```

Sections to update:

```text
components/features/landing/OpeningSection.js
components/features/landing/WhySection.js
components/features/landing/SeserahanSection.js
components/features/landing/MaharSection.js
components/features/landing/InvitationSection.js
components/features/landing/HighlightSection.js
components/features/landing/TestimonySection.js
components/ui/ExtraBanner.js
```

### 5. Image rendering rules

Current images are local public paths.

For phase 1:

- Allow local paths like `/images/...`.
- Allow remote URLs if they are added to `next.config.mjs` `images.remotePatterns`.
- Admin should store image paths/URLs in CMS JSON.

If using remote images from admin:

Update `next.config.mjs`:

```js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "api.momento.web.id" },
    { protocol: "https", hostname: "momento-be.vercel.app" },
    { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
  ],
}
```

Use exact hostnames where possible. Avoid overbroad patterns for production.

### 6. SEO metadata

Because CMS content includes `seo`, update `app/(site)/page.js` metadata strategy.

Option A for phase 1:

- Keep existing static metadata in `app/layout.js`.
- Do not introduce dynamic metadata yet.

Option B if required:

- Add `generateMetadata` in `app/(site)/page.js`.
- Fetch home content and map `seo.title`, `seo.description`, `seo.ogImageUrl`.

Recommended for phase 1:

- Keep static metadata to reduce scope.
- Add dynamic metadata later after CMS basics work.

### 7. Public frontend verification

Run:

```bash
npm run lint
npm run build
npm run start
```

Verify:

- Home renders with backend content when API is available.
- Home renders default content when API is unavailable.
- Layout is visually unchanged with default content.
- Opening typing animation still works.
- Marquee images still animate.
- CTA links still work.
- Pricing page remains unaffected.

## New Admin Frontend Implementation Plan (`momento-admin-fe`)

### 1. Scaffold new project

Create project at:

```text
/Users/apple/Documents/Codes/NextJS/momento-admin-fe
```

Use same versions as `momentoclient-fe` where practical.

Suggested scaffold:

```bash
npx create-next-app@latest momento-admin-fe
```

Choose:

- App Router: yes
- JavaScript or TypeScript: JavaScript is acceptable to match `momentoclient-fe`; TypeScript is also acceptable if the team prefers.
- Tailwind: yes
- ESLint: yes
- `src/` directory: no, to match `momentoclient-fe`

After scaffold, align dependencies:

```json
"next": "16.2.3",
"react": "19.2.4",
"react-dom": "19.2.4",
"lucide-react": "^1.8.0",
"tailwindcss": "^4",
"@tailwindcss/postcss": "^4",
"eslint-config-next": "16.2.3"
```

### 2. Admin frontend environment

Add:

```text
.env.local
```

Expected:

```env
NEXT_PUBLIC_MOMENTO_API_URL=https://api.momento.web.id/api
MOMENTO_API_URL=https://api.momento.web.id/api
```

Use local backend for development if needed:

```env
NEXT_PUBLIC_MOMENTO_API_URL=http://127.0.0.1:8000/api
MOMENTO_API_URL=http://127.0.0.1:8000/api
```

### 3. Admin app routes

Recommended routes:

```text
app/login/page.js
app/(admin)/layout.js
app/(admin)/dashboard/page.js
app/(admin)/home/page.js
```

Initial navigation:

- Dashboard
- Home CMS
- Logout

Do not build orders/pricing menus yet unless placeholders are useful.

### 4. Admin API client

Create:

```text
lib/api/client.js
lib/api/auth.js
lib/api/sitePages.js
```

Functions:

```js
login(email, password)
logout(token)
getMe(token)
getAdminSitePage(slug, token)
updateAdminSitePage(slug, content, token)
publishAdminSitePage(slug, token)
```

Token handling:

Phase 1 simple approach:

- Store token in `localStorage`.
- Add `Authorization: Bearer ${token}` to admin API calls.

Security note:

- This is acceptable only for first internal admin iteration.
- Later improve with HTTP-only cookie/session proxy if needed.

### 5. Admin UI design direction

Admin UI should be operational, dense, and work-focused:

- Dark UI can match Momento brand.
- Avoid marketing hero layouts.
- Use clear forms and preview panels.
- Keep cards at `8px` radius or less unless matching existing design system.
- Use `lucide-react` icons for navigation/actions.

Suggested layout:

```text
Top bar: Momento Admin + user/logout
Sidebar: Dashboard, Home Content
Main area: form editor
Right panel or bottom panel: live JSON/content preview
```

### 6. Home CMS editor scope

For phase 1, build form sections:

1. SEO
   - title
   - description
   - og image URL

2. Opening
   - headline textarea
   - services repeatable list
   - desktop CTA label
   - mobile CTA label
   - CTA href
   - decoration image src/alt

3. Why
   - repeatable cards
   - title
   - description
   - icon src/alt

4. Seserahan
   - title
   - description
   - images repeatable list
   - CTA label/href

5. Mahar
   - title
   - description
   - images repeatable list
   - CTA label/href

6. Invitation
   - title
   - description
   - left images repeatable list
   - right images repeatable list
   - CTA label/href

7. Highlight
   - title
   - description
   - cards repeatable list
   - CTA label/href

8. Testimony
   - title
   - description
   - stats repeatable list
   - testimonials repeatable list
   - quote image src/alt
   - bottom decoration src/alt

9. Extra Banner
   - title
   - button text
   - button href

### 7. Repeatable field components

Create reusable admin components:

```text
components/ui/TextField.js
components/ui/TextAreaField.js
components/ui/ImageUrlField.js
components/ui/RepeatableList.js
components/ui/FormSection.js
components/ui/Button.js
```

Keep simple:

- Add item
- Remove item
- Move up/down
- Input validation message
- Image preview from URL/path

### 8. Save and publish workflow

Admin page buttons:

- `Save Draft`
- `Publish`
- `Reset Changes`

Behavior:

- On load, fetch `/api/admin/site-pages/home`.
- Form edits local state.
- `Save Draft` calls `PUT /api/admin/site-pages/home`.
- `Publish` calls `POST /api/admin/site-pages/home/publish`.
- Show toast/status message after each action.

### 9. Preview

Phase 1 preview options:

Simple preview:

- Show JSON summary and image thumbnails inside admin.

Better preview:

- Link to public frontend:

```text
https://momentoproject.com
```

or local:

```text
http://localhost:3000
```

Do not attempt to embed the full public home page inside the admin app in phase 1.

### 10. Admin frontend validation

Client-side validation:

- Required section keys.
- Required image `src`.
- Required key text fields.
- URL-like fields must be either:
  - relative path starting with `/`
  - absolute `https://...`

Do not block saving for every minor content issue. Use warnings where appropriate.

### 11. Admin frontend verification

Run:

```bash
npm run lint
npm run build
npm run start
```

Verify:

- Login works.
- Invalid login shows error.
- Home CMS loads existing content.
- Editing text and saving draft works.
- Publishing updates public home endpoint.
- Public frontend reflects published changes.
- Reset/discard returns form to last loaded content.
- Image preview handles invalid image URLs gracefully.

## Image Management Decision

For phase 1, use URL/path-based image editing.

Reason:

- `momento-be` is deployed to Vercel/serverless.
- Local filesystem uploads are not durable in Vercel.
- A proper upload pipeline requires external storage.

Allowed phase 1 image values:

- Existing local public paths:

```text
/images/...
/icons/...
```

- External hosted image URLs:

```text
https://...
```

Future upload options:

- Vercel Blob
- Cloudflare R2
- AWS S3
- Supabase Storage

Do not implement binary upload in phase 1 unless storage provider is chosen.

## Rollout Order

Recommended execution order:

### Phase 1: Backend CMS foundation

1. Add `site_pages` migration/model/resource.
2. Add default home content data file.
3. Add `SitePageSeeder`.
4. Add public `GET /api/site-pages/home`.
5. Add backend tests.
6. Run `php artisan test`.

### Phase 2: Public frontend reads CMS

1. Add frontend home defaults.
2. Add site content API client.
3. Convert `app/(site)/page.js` to fetch CMS content.
4. Update home sections to accept content props.
5. Verify fallback behavior.
6. Run `npm run lint` and `npm run build`.

### Phase 3: Admin auth and CMS endpoints

1. Add admin login/logout/me.
2. Add admin site page show/update/publish.
3. Add tests for auth and CMS write flow.
4. Run `php artisan test`.

### Phase 4: New admin frontend

1. Scaffold `momento-admin-fe`.
2. Align package versions and styling setup.
3. Build login page.
4. Build admin layout.
5. Build Home CMS editor.
6. Connect save/publish endpoints.
7. Verify full flow.

### Phase 5: Production deployment

1. Deploy backend migration and seed.
2. Deploy updated `momentoclient-fe`.
3. Deploy `momento-admin-fe`.
4. Add environment variables.
5. Verify production API and public home.

## API Contract Summary

Public:

```text
GET /api/site-pages/home
```

Admin:

```text
POST /api/admin/login
GET /api/admin/me
POST /api/admin/logout
GET /api/admin/site-pages/home
PUT /api/admin/site-pages/home
POST /api/admin/site-pages/home/publish
```

## Environment Variables

### `momentoclient-fe`

```env
MOMENTO_API_URL=https://api.momento.web.id/api
NEXT_PUBLIC_MOMENTO_API_URL=https://api.momento.web.id/api
```

### `momento-admin-fe`

```env
MOMENTO_API_URL=https://api.momento.web.id/api
NEXT_PUBLIC_MOMENTO_API_URL=https://api.momento.web.id/api
```

### `momento-be`

Existing DB/env remains. No new required env for phase 1 unless upload storage is added later.

## Testing Matrix

### Backend

Run:

```bash
php artisan test
```

Must pass:

- existing invitation tests
- new public CMS tests
- new admin auth tests
- new admin CMS tests

### Public frontend

Run:

```bash
npm run lint
npm run build
npm run start
```

Check:

- `/`
- `/harga`
- invitation routes if any

### Admin frontend

Run:

```bash
npm run lint
npm run build
npm run start
```

Check:

- `/login`
- `/dashboard`
- `/home`

## Risks and Mitigations

### Risk: Public home breaks if API unavailable

Mitigation:

- Keep frontend defaults.
- Deep-merge API content over defaults.
- Render fallback content on request failure.

### Risk: JSON CMS shape becomes messy

Mitigation:

- Version the content with `version: 1`.
- Validate top-level section keys.
- Keep a single default schema file.
- Add tests for expected shape.

### Risk: Image upload expectations grow

Mitigation:

- Clearly ship phase 1 as URL/path editing.
- Add external storage only after provider is chosen.

### Risk: Admin token in localStorage is not ideal

Mitigation:

- Accept for internal phase 1 only.
- Later move to HTTP-only cookie or BFF/session pattern.

### Risk: Public frontend and backend defaults drift

Mitigation:

- Keep backend default content and frontend default content intentionally synchronized.
- Add a checklist item when changing defaults.
- Optionally generate frontend defaults from a JSON source later.

## Acceptance Criteria

Backend:

- `GET /api/site-pages/home` returns current home content.
- Admin can login and update home content.
- Admin can publish content.
- Public endpoint returns published content.
- Tests pass.

Public frontend:

- Home page renders default visual design unchanged.
- Home page content is sourced from backend when available.
- If backend is unavailable, home page still renders using defaults.

Admin frontend:

- New `momento-admin-fe` project exists.
- Admin can login.
- Admin can view/edit home CMS fields.
- Admin can save draft and publish.
- Edited text/image URLs appear on the public frontend after publish.

## Cleanup

Do not leave:

- Debug routes.
- Console logs.
- Temporary JSON dumps.
- Test credentials in committed files.
- Broad placeholder pages that imply unsupported order/pricing management.

Keep documentation updated with:

- API endpoints.
- Required environment variables.
- How to seed default CMS content.
