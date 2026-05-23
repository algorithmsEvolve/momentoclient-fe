# Implementation Plan: Add Vercel Blob Uploads and Lock Home Decoration Images

## Goal

Refine the CMS/admin implementation after the first CMS rollout:

1. On the Home CMS editor, decoration images must not be editable.
2. For editable icons/images, admin must support both:
   - manual URL/path input
   - file upload to Vercel Blob
3. Update `momentoclient-fe` if needed so uploaded Blob image/icon URLs render correctly.

Initial scope remains Home content only. Pricing CMS and orders are still out of scope.

## Important User Action Required

Vercel Blob requires a read-write token exposed to the app that performs uploads.

You need to do this in Vercel:

1. Open Vercel Dashboard.
2. Open the admin frontend project, likely:

```text
momento-admin-fe
```

3. Go to:

```text
Storage -> Create Database/Store -> Blob
```

4. Create a Blob store. Public Blob store is recommended for CMS images/icons that must render publicly.
5. Confirm the project has this environment variable:

```env
BLOB_READ_WRITE_TOKEN=...
```

If the Blob store is created under a different Vercel project or scope, manually copy the read-write token from Blob store settings into the admin frontend project's Environment Variables.

Official Vercel docs say the SDK defaults to `process.env.BLOB_READ_WRITE_TOKEN` when deployed on Vercel, and this variable is created automatically when the Blob store is connected to the same project. Sources:

- https://vercel.com/docs/storage/vercel-blob/using-blob-sdk
- https://vercel.com/docs/vercel-blob
- https://vercel.com/docs/cli/blob

For local development, pull env values:

```bash
vercel env pull .env.local
```

or manually add:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

Do not commit `.env.local`.

## Repositories Involved

### Admin Frontend

Likely path:

```text
/Users/apple/Documents/Codes/NextJS/momento-admin-fe
```

This app owns the upload UI and upload route.

### Public Frontend

Path:

```text
/Users/apple/Documents/Codes/NextJS/momentoclient-fe
```

This app reads the saved CMS image URLs and displays them.

### Backend

Path:

```text
/Users/apple/Documents/Codes/Laravel/momento-be
```

This app stores CMS JSON in `site_pages`. It should not store uploaded binary files.

## Architecture Decision

Use Vercel Blob from the admin frontend, not from Laravel.

Reason:

- `momento-be` currently deploys Laravel through `vercel-php`, and adding Vercel Blob SDK there would be awkward.
- Vercel Blob has first-class Next.js SDK support.
- Uploaded images only need their public URL saved into `momento-be` CMS JSON.

Flow:

```text
Admin picks file
  -> momento-admin-fe route handler uploads file to Vercel Blob
  -> route returns { url, pathname, contentType, size }
  -> admin form writes returned url into the image/icon field
  -> admin saves/publishes CMS JSON to momento-be
  -> momentoclient-fe reads CMS JSON and renders Blob URL
```

## Decoration Image Rule

Home decoration images must be locked and not editable.

Do not show editable controls for:

- `opening.decorationImage`
- `testimony.bottomDecoration`
- `testimony.quoteImage` if treated as decorative quote mark
- `extraBanner` wave decoration, if represented in CMS
- any purely structural/section blend decoration images

These images should remain hardcoded defaults in the public frontend or present as read-only metadata in CMS.

Recommended CMS rule:

- Remove decoration image fields from the admin edit form.
- Keep decoration defaults in frontend components.
- If existing backend CMS JSON already contains decoration fields, ignore them in admin UI and avoid overwriting them from form state.

This avoids accidental layout breakage from decorative assets.

## Editable Image/Icon Fields

Keep upload support for content images/icons:

### Opening

- no editable decoration image
- no other upload field unless service icons are added later

### Why Section

Editable:

- `why.items[].icon.src`
- `why.items[].icon.alt`

### Seserahan Section

Editable:

- `seserahan.images[].src`
- `seserahan.images[].alt`

### Mahar Section

Editable:

- `mahar.images[].src`
- `mahar.images[].alt`

### Invitation Section

Editable:

- `invitation.leftImages[].src`
- `invitation.leftImages[].alt`
- `invitation.rightImages[].src`
- `invitation.rightImages[].alt`

### Highlight Section

Editable:

- `highlight.items[].image.src`
- `highlight.items[].image.alt`

### Testimony Section

Editable:

- `testimony.stats[].icon.src`
- `testimony.stats[].icon.alt`
- `testimony.items[].image.src`
- `testimony.items[].image.alt`

Locked:

- `testimony.quoteImage`
- `testimony.bottomDecoration`

### Extra Banner

No editable image fields in phase 1.

## Admin Frontend Implementation Plan (`momento-admin-fe`)

### 1. Install Vercel Blob SDK

In admin frontend:

```bash
npm install @vercel/blob
```

This is required for upload support.

### 2. Add upload route handler

Create:

```text
app/api/admin/uploads/route.js
```

Use server-side upload with `put()` for the simplest implementation.

Expected shape:

```js
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

function safeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder") || "home";

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File is required." }, { status: 422 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ message: "Unsupported file type." }, { status: 422 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ message: "File must be 4MB or smaller." }, { status: 422 });
  }

  const timestamp = Date.now();
  const filename = safeFilename(file.name || "upload");
  const pathname = `cms/${folder}/${timestamp}-${filename}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({
    data: {
      url: blob.url,
      pathname: blob.pathname,
      contentType: file.type,
      size: file.size,
    },
  });
}
```

Important:

- This route uses `BLOB_READ_WRITE_TOKEN` server-side only.
- Never expose `BLOB_READ_WRITE_TOKEN` to the browser.
- Do not prefix it with `NEXT_PUBLIC_`.

### 3. Protect upload route

The upload route must require admin authentication.

Because the admin token currently lives client-side and Laravel owns auth, implement a server-side verification call before upload:

1. Read `Authorization` header from upload request.
2. Call backend:

```text
GET /api/admin/me
```

with the same bearer token.
3. If backend returns non-200, reject upload with `401`.

Expected helper:

```js
async function assertAdmin(request) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return false;
  }

  const response = await fetch(`${process.env.MOMENTO_API_URL}/admin/me`, {
    headers: {
      Accept: "application/json",
      Authorization: authorization,
    },
    cache: "no-store",
  });

  return response.ok;
}
```

Then inside `POST`:

```js
if (!(await assertAdmin(request))) {
  return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
}
```

### 4. Add upload API client

Create:

```text
lib/api/uploads.js
```

Expected:

```js
export async function uploadCmsImage({ file, folder, token, onProgress }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder || "home");

  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Upload failed.");
  }

  return payload.data;
}
```

Note:

- Native `fetch` does not expose upload progress.
- Progress can be added later using `XMLHttpRequest` or Vercel Blob client uploads.
- For phase 1, show loading state instead of true progress.

### 5. Upgrade image field component

If the admin project already has `ImageUrlField`, upgrade it.

Expected component:

```text
components/ui/ImageField.js
```

Feature requirements:

- Text input for URL/path.
- File input for upload.
- Upload button/state.
- Preview thumbnail.
- Error message.
- Accept only image files.
- Support disabled/read-only state for locked decoration fields if shown.

Suggested props:

```js
function ImageField({
  label,
  value,
  altValue,
  onChange,
  onAltChange,
  folder = "home",
  token,
  locked = false,
  helpText,
})
```

Behavior:

- If `locked === true`, do not show upload or URL input. Show a read-only note instead.
- If file upload succeeds, call:

```js
onChange(blob.url)
```

- Keep alt text editable only for content images/icons.

### 6. Remove decoration image edit controls

In the Home CMS editor:

Remove fields for:

```text
opening.decorationImage
testimony.quoteImage
testimony.bottomDecoration
```

If the current admin UI has those fields:

- delete the controls, or
- render read-only "Managed by design system" text.

Recommended text:

```text
Decoration images are locked to preserve the approved page layout.
```

Do not include these fields in the editable form sections.

### 7. Update editable image/icon fields to use `ImageField`

Replace plain URL-only controls for the following paths:

```text
why.items[].icon.src
seserahan.images[].src
mahar.images[].src
invitation.leftImages[].src
invitation.rightImages[].src
highlight.items[].image.src
testimony.stats[].icon.src
testimony.items[].image.src
```

Use folder names to keep Blob storage organized:

```text
cms/home/why
cms/home/seserahan
cms/home/mahar
cms/home/invitation
cms/home/highlight
cms/home/testimony
```

The upload route can receive `folder = "home/why"` and prepend `cms/`.

### 8. Validate image fields before save

Allow:

- relative paths beginning with `/`
- absolute URLs beginning with `https://`

Validation helper:

```js
function isValidImageReference(value) {
  return typeof value === "string" && (
    value.startsWith("/") ||
    value.startsWith("https://")
  );
}
```

Show warnings for empty image fields, but do not block saving if the section intentionally has no image and frontend has defaults.

### 9. Keep upload URL persistence in CMS JSON

After upload, the form state should store only:

```json
{
  "src": "https://xxxxx.public.blob.vercel-storage.com/cms/home/...",
  "alt": "..."
}
```

Do not store Blob token or internal secret values.

## Public Frontend Implementation Plan (`momentoclient-fe`)

### 1. Confirm image rendering supports Blob URLs

`momentoclient-fe` uses `next/image`. Remote images from Vercel Blob require `next.config.mjs` `images.remotePatterns`.

Update:

```text
next.config.mjs
```

Add Vercel Blob public host support:

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "*.public.blob.vercel-storage.com",
    },
  ],
},
```

If Next/Vercel rejects wildcard hostname in your version, replace it with the exact Blob store hostname after the first upload, for example:

```js
{
  protocol: "https",
  hostname: "abc123xyz.public.blob.vercel-storage.com",
}
```

### 2. Add safe image source helper

Create:

```text
lib/site-content/image.js
```

Expected:

```js
export function getImageSrc(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const src = value.trim();

  if (src.startsWith("/") || src.startsWith("https://")) {
    return src;
  }

  return fallback;
}
```

Use this in home components before passing `src` to `Image`.

### 3. Ensure all dynamic images use `src` safely

Update home components that now read CMS content:

```text
components/features/landing/WhySection.js
components/features/landing/SeserahanSection.js
components/features/landing/MaharSection.js
components/features/landing/InvitationSection.js
components/features/landing/HighlightSection.js
components/features/landing/TestimonySection.js
```

For each dynamic image/icon:

```jsx
<Image
  src={getImageSrc(item.image?.src, fallback.image.src)}
  alt={item.image?.alt || fallback.image.alt}
  ...
/>
```

Do not make decoration images dynamic:

- Opening bottom decoration remains hardcoded.
- Testimony quote mark remains hardcoded.
- Testimony bottom wave decoration remains hardcoded.
- ExtraBanner decoration remains hardcoded.

### 4. Update home defaults and merge logic

If current `homeDefaults` includes decoration image fields:

- Keep them only if components need fallback internally, or
- remove them from editable CMS shape.

Recommended:

- Keep decoration paths as constants inside the components where they are structural.
- Do not expose decoration fields in `homeDefaults` intended for admin editing.

If merge logic currently merges decoration fields from backend:

- It is okay if they remain unused.
- Do not pass them into editable admin form.

### 5. Frontend verification

Run:

```bash
npm run lint
npm run build
npm run start
```

Verify:

- Existing local `/images/...` paths still render.
- Uploaded Blob image URLs render through `next/image`.
- Invalid image values fall back to defaults.
- Decoration images are unchanged even if CMS JSON contains old decoration fields.

## Backend Implementation Plan (`momento-be`)

### 1. No binary upload endpoint required

Do not implement file upload in Laravel for phase 1.

Laravel only stores CMS JSON containing uploaded file URLs.

### 2. Tighten CMS validation

Update `UpdateSitePageRequest` if it exists.

Validation goals:

- Do not require decoration image fields.
- Allow image/icon `src` values that are either:
  - local relative paths beginning with `/`
  - public HTTPS URLs, including Vercel Blob URLs

Suggested validation helper in request:

```php
private function isValidImageReference(?string $value): bool
{
    if (! is_string($value) || $value === '') {
        return true;
    }

    return str_starts_with($value, '/')
        || str_starts_with($value, 'https://');
}
```

If using Laravel validation rules, custom closure rule is acceptable.

### 3. Preserve unknown/locked decoration fields safely

When admin updates CMS JSON:

- Either ignore decoration fields from request,
- or preserve existing stored decoration values,
- or allow them to exist but do not expose them in admin.

Recommended:

- Normalize incoming content before saving.
- Explicitly unset:

```php
unset($content['opening']['decorationImage']);
unset($content['testimony']['quoteImage']);
unset($content['testimony']['bottomDecoration']);
```

Only do this if public frontend no longer relies on those CMS keys.

### 4. Backend tests

Add/update tests:

- Admin can save Blob image URL in editable image field.
- Admin can save local `/images/...` path in editable image field.
- Admin update does not require decoration image fields.
- Public home endpoint returns content with uploaded image URLs.
- Decoration fields are not required.

Run:

```bash
php artisan test
```

## Admin UI Details

### ImageField Layout

Use a compact operational layout:

```text
Label
[ URL/path input                                      ]
[ Upload file ] [ uploading... ]
Preview thumbnail
Alt text input
Help/error text
```

For icons, preview can be small:

```text
48px x 48px
```

For images, preview can be:

```text
160px x 100px
```

### Upload states

Handle:

- idle
- uploading
- success
- error

Disable save button while upload is in progress if possible.

### File constraints

Initial constraints:

- Max file size: `4MB`
- Allowed types:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `image/svg+xml`

SVG is useful for icons, but only allow it for trusted admin users. Since this is admin-only, it is acceptable for phase 1.

### Error messages

Use clear messages:

- `File is required.`
- `Unsupported file type. Use JPG, PNG, WebP, or SVG.`
- `File must be 4MB or smaller.`
- `Upload failed. Please try again.`
- `You must be logged in to upload files.`

## Deployment Steps

### Admin frontend Vercel

1. Add Blob store to admin project.
2. Ensure `BLOB_READ_WRITE_TOKEN` exists.
3. Ensure API env exists:

```env
MOMENTO_API_URL=https://api.momento.web.id/api
NEXT_PUBLIC_MOMENTO_API_URL=https://api.momento.web.id/api
```

4. Redeploy admin frontend.

### Public frontend Vercel

1. Update `next.config.mjs` remote patterns.
2. Redeploy public frontend.

### Backend Vercel

1. Deploy validation/API changes if any.
2. No Blob env needed on backend.

## Verification Checklist

### Admin frontend

Run:

```bash
npm run lint
npm run build
npm run start
```

Manual checks:

- Login as admin.
- Open Home CMS.
- Decoration image fields are not editable.
- Why icon can be uploaded.
- Seserahan image can be uploaded.
- Mahar image can be uploaded.
- Invitation phone image can be uploaded.
- Highlight item image can be uploaded.
- Testimony avatar/stat icon can be uploaded.
- Uploaded preview appears.
- Save Draft works.
- Publish works.

### Backend

Run:

```bash
php artisan test
```

Manual checks:

```bash
curl https://api.momento.web.id/api/site-pages/home
```

Confirm uploaded Blob URLs appear in the correct CMS fields after publish.

### Public frontend

Run:

```bash
npm run lint
npm run build
npm run start
```

Manual checks:

- Public home renders uploaded Blob images.
- Public home renders uploaded SVG icons if used.
- Decoration images remain the original approved design assets.
- If an image URL is invalid, fallback still renders.

## Rollback Plan

If upload breaks admin:

1. Keep URL input working.
2. Hide upload button temporarily.
3. Keep CMS save/publish flow unchanged.

If Blob images do not render on public frontend:

1. Add exact Blob hostname to `next.config.mjs`.
2. Redeploy public frontend.
3. Temporarily replace Blob URL with existing local path in admin CMS field.

If decoration image fields were accidentally removed from saved CMS JSON:

1. Confirm public frontend no longer relies on CMS decoration keys.
2. If it still relies on them, restore defaults in frontend constants, not admin-editable fields.

## Acceptance Criteria

- Admin cannot edit home decoration images.
- Admin can paste image/icon URLs manually.
- Admin can upload image/icon files to Vercel Blob.
- Uploaded Blob URL is saved into CMS JSON.
- Published CMS content updates public home.
- `momentoclient-fe` renders Blob images/icons correctly.
- Existing local image paths still work.
- Backend stores URLs only, not binary files.

