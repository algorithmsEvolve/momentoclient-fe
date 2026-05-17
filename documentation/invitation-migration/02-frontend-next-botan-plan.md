# 02 Frontend Next.js Botan Implementation Plan

Dokumen ini adalah implementation plan frontend untuk menerapkan fitur undangan digital di `momentoclient-fe` dengan target awal tema `botan`.

## 1. Scope Frontend MVP

Target MVP:

- Route publik membaca slug undangan.
- Fetch data dari Laravel API.
- Render theme `botan` melalui registry.
- Query `?tamu=` mengambil guest dan mempersonalisasi cover.
- Cover open interaction membuka seluruh section.
- RSVP, wishes, gift copy, music button, dan floating menu bekerja sebagai Client Components.
- Styling Botan tidak merusak landing page Momento.

Out of scope MVP:

- Admin panel.
- Semua tema selain Botan.
- Payment/order flow.
- Upload asset.
- Full pixel-perfect seluruh tema lama.

## 2. Route Strategy

Ada dua opsi route:

### Opsi A - Root Slug Compatibility

Route:

```txt
app/[slug]/page.js
```

Kelebihan:

- Paling kompatibel dengan legacy `/{slug}`.
- Link undangan lama lebih mudah dipertahankan.

Risiko:

- Bisa konflik dengan route marketing seperti `/harga`, `/customer`, `/estimasi`, `/info-produk`.
- Next.js static routes biasanya lebih spesifik, tetapi tetap perlu guard agar slug unknown tidak bentrok mental model.

### Opsi B - Namespaced Invitation

Route:

```txt
app/undangan/[slug]/page.js
```

Kelebihan:

- Lebih aman untuk routing baru.
- Lebih jelas secara produk.

Risiko:

- Perlu redirect dari legacy slug jika ingin kompatibel.

Rekomendasi:

- Untuk migrasi production dari legacy, gunakan Opsi A agar `/{slug}` tetap bekerja.
- Buat reserved slugs di frontend/backend: `harga`, `customer`, `estimasi`, `info-produk`, `api`, `admin`.
- Jika takut konflik selama development, mulai dengan Opsi B lalu pindah ke Opsi A setelah stabil.

Plan dokumen ini menggunakan Opsi A: `app/[slug]/page.js`.

## 3. Environment Variables

Tambahkan ke `.env.local` frontend:

```env
NEXT_PUBLIC_MOMENTO_API_URL=http://localhost:8000/api
MOMENTO_API_URL=http://localhost:8000/api
```

Rules:

- Server Components gunakan `MOMENTO_API_URL`.
- Client Components yang perlu mutation bisa gunakan API route proxy Next atau `NEXT_PUBLIC_MOMENTO_API_URL`.
- Untuk MVP sederhana, client boleh direct ke Laravel API jika CORS sudah benar.
- Untuk production, prefer Next server action/API proxy jika butuh hide internal URL atau auth.

## 4. Proposed File Structure

Tambahkan struktur berikut:

```txt
app/[slug]/page.js
app/[slug]/not-found.js

components/features/invitations/InvitationPageShell.js
components/features/invitations/UnsupportedTheme.js
components/features/invitations/theme-registry.js

components/features/invitations/themes/botan/BotanTheme.js
components/features/invitations/themes/botan/BotanCover.js
components/features/invitations/themes/botan/BotanOpening.js
components/features/invitations/themes/botan/BotanDateSection.js
components/features/invitations/themes/botan/BotanCountdown.js
components/features/invitations/themes/botan/BotanLocation.js
components/features/invitations/themes/botan/BotanRsvpForm.js
components/features/invitations/themes/botan/BotanStory.js
components/features/invitations/themes/botan/BotanGallery.js
components/features/invitations/themes/botan/BotanWishSection.js
components/features/invitations/themes/botan/BotanGift.js
components/features/invitations/themes/botan/BotanFooter.js
components/features/invitations/themes/botan/BotanFloatingMenu.js
components/features/invitations/themes/botan/BotanMusicButton.js
components/features/invitations/themes/botan/botan.css

lib/api/invitations.js
lib/invitations/normalizeInvitation.js
lib/invitations/date.js
lib/invitations/routes.js
```

Asset target:

```txt
public/themes/botan/
public/themes/botan/component/
public/themes/botan/cover/
public/themes/botan/opening/
public/themes/botan/gallery/
public/themes/botan/dummy/
```

## 5. Data Flow

Server flow:

1. `app/[slug]/page.js` receives `params.slug` and `searchParams.tamu`.
2. Guard reserved slugs. If reserved slug matches existing marketing route, let static route handle it. If dynamic route receives unsupported reserved slug, call `notFound()`.
3. Fetch invitation by slug using `getInvitationBySlug(slug)`.
4. If `searchParams.tamu` exists, fetch guest using `getInvitationGuest(slug, guestSlug)`.
5. Normalize response into frontend shape.
6. Resolve theme via `theme-registry`.
7. Render `<InvitationPageShell invitation={...} guest={...} />`.

Client flow:

1. `BotanTheme` owns interactive state `isOpened`.
2. Before open, show `BotanCover`.
3. On open, set `isOpened = true`, unlock sections, trigger music if allowed.
4. Render all Botan sections.
5. Forms call Laravel API.

## 6. API Client Plan

File: `lib/api/invitations.js`

Functions:

```js
export async function getInvitationBySlug(slug) {}
export async function getInvitationGuest(slug, guestSlug) {}
export async function getInvitationWishes(slug) {}
export async function createInvitationWish(slug, payload) {}
export async function getInvitationGuestRsvp(slug, guestSlug) {}
export async function createInvitationRsvp(slug, payload) {}
```

Implementation rules:

- Use `fetch`.
- Server reads `process.env.MOMENTO_API_URL`.
- Client reads `process.env.NEXT_PUBLIC_MOMENTO_API_URL`.
- Always encode slug with `encodeURIComponent`.
- Throw typed errors or return `{ ok, data, error }` consistently.
- For `getInvitationBySlug`, use `cache: "no-store"` during development. Later can use `next: { revalidate: 60 }` for published invitations.

Example response handling:

```js
async function requestJson(path, options = {}) {
  const baseUrl = process.env.MOMENTO_API_URL || process.env.NEXT_PUBLIC_MOMENTO_API_URL;
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    return { ok: false, status: response.status, data: null };
  }

  const json = await response.json();
  return { ok: true, status: response.status, data: json.data };
}
```

## 7. Theme Registry

File: `components/features/invitations/theme-registry.js`

Shape:

```js
import BotanTheme from "./themes/botan/BotanTheme";

export const invitationThemeRegistry = {
  botan: BotanTheme,
};

export function resolveInvitationTheme(themeSlug) {
  return invitationThemeRegistry[themeSlug] || null;
}
```

Rules:

- Theme key comes from backend `data.theme.componentKey` or `data.theme.slug`.
- Do not execute arbitrary imports from backend values.
- New themes must register manually.

## 8. Page Implementation

File: `app/[slug]/page.js`

Responsibilities:

- Server Component.
- Fetch invitation and optional guest.
- Generate metadata.
- Call `notFound()` when missing.
- Do not contain Botan-specific layout.

Pseudo structure:

```jsx
import { notFound } from "next/navigation";
import InvitationPageShell from "@/components/features/invitations/InvitationPageShell";
import { getInvitationBySlug, getInvitationGuest } from "@/lib/api/invitations";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getInvitationBySlug(slug);

  if (!result.ok) {
    return { title: "Undangan tidak ditemukan | Momento" };
  }

  return {
    title: result.data.title,
    description: "Yuk cek undanganmu sekarang!",
    openGraph: {
      title: result.data.title,
      description: "Yuk cek undanganmu sekarang!",
      images: result.data.ogImageUrl ? [result.data.ogImageUrl] : [],
    },
  };
}

export default async function InvitationPage({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;
  const invitationResult = await getInvitationBySlug(slug);

  if (!invitationResult.ok) notFound();

  let guest = null;
  if (query?.tamu) {
    const guestResult = await getInvitationGuest(slug, query.tamu);
    guest = guestResult.ok ? guestResult.data : null;
  }

  return <InvitationPageShell invitation={invitationResult.data} guest={guest} />;
}
```

Adjust for actual Next version behavior in the repo.

## 9. Layout and Global UI Isolation

Current `app/layout.js` always renders `FloatingWhatsApp`. For invitation pages, this may interfere with theme UI.

Options:

### Option A - Keep Existing Root Layout

Pros:

- Minimal changes.

Cons:

- FloatingWhatsApp may overlap invitation floating menu/music button.

### Option B - Route Group Layout

Use route groups:

```txt
app/(site)/page.js
app/(site)/harga/page.js
app/(site)/customer/page.js
app/(site)/estimasi/page.js
app/(site)/info-produk/page.js
app/(invitation)/[slug]/page.js
app/(invitation)/[slug]/layout.js
```

Pros:

- Clean separation.
- Invitation layout can omit global WhatsApp and use different body styling.

Cons:

- Requires moving current site pages into `(site)`, higher blast radius.

MVP recommendation:

- Start with Option A for minimum footprint.
- If overlap occurs, update `FloatingWhatsApp` to hide on invitation route via pathname, or move to route groups in a separate phase.

Because `FloatingWhatsApp` is a shared component, any change must be scoped and regression-checked against landing pages.

## 10. Botan Component Plan

### 10.1 `BotanTheme.js`

Client Component.

Responsibilities:

- Import `botan.css`.
- Own `opened` state.
- Render root with class `.botan-theme`.
- Pass `invitation` and `guest` to sections.
- Determine `hasGuest`, `withoutGift`, `galleryType`.

State:

```js
const [opened, setOpened] = useState(false);
const [musicRequested, setMusicRequested] = useState(false);
```

Open behavior:

- `BotanCover` calls `onOpen`.
- `onOpen` sets opened true and music requested true.
- Body scroll lock is not needed after cover is hidden unless design requires it.

### 10.2 `BotanCover.js`

Client Component.

Props:

- `invitation`
- `guest`
- `onOpen`

Behavior:

- Display bride/groom display names.
- Display cover date unless `settings.hideCoverDate`.
- Display guest name if available.
- Button label: `Buka Undangan`.
- On click, animate cover out and call `onOpen`.

Legacy references:

- Uses `invitation_data.bride`, `invitation_data.groom`.
- Uses `cover_date || date`.
- Uses `guest.name`.

Target fields:

- `invitation.couple.bride.displayName`
- `invitation.couple.groom.displayName`
- `invitation.coverDate || invitation.primaryDate`
- `guest.name`

### 10.3 `BotanOpening.js`

Can be Server-compatible if no hooks.

Render:

- Quote title and text.
- Bride block.
- Groom block.
- Parent names.
- Instagram links.

Rules:

- Use `next/image` for local/public image URLs when possible.
- If remote URLs are used, configure `next.config.mjs` domains later.
- For MVP dummy, use public local images or CSS placeholders only if actual asset not available. AGENTS says no generic placeholders, so prefer copied legacy assets or existing images.

### 10.4 `BotanDateSection.js`

Render:

- Akad event.
- Reception event.
- Date formatted Indonesian.
- Time start/end.

Use utility:

```txt
lib/invitations/date.js
```

Functions:

- `formatInvitationDate(date)`
- `formatInvitationDay(date)`
- `formatInvitationTime(time)`

Avoid adding Moment.js unless necessary. Use `Intl.DateTimeFormat`.

### 10.5 `BotanCountdown.js`

Client Component because countdown updates over time.

Props:

- `targetDate`

Behavior:

- Update every second.
- Cleanup interval on unmount.
- Show days, hours, minutes, seconds.

### 10.6 `BotanLocation.js`

Render:

- Location name.
- Address.
- Button to map URL.

Use `target="_blank"` and `rel="noreferrer"`.

### 10.7 `BotanRsvpForm.js`

Client Component.

Render only when guest exists.

State:

- `attendance`
- `attendeeCount`
- `name`
- `notAttendReason`
- `loading`
- `submitted`
- `error`

Behavior:

- If guest is group, name input is editable.
- If guest is not group, default name is guest name.
- Validate before submit.
- POST to `/invitations/{slug}/rsvp`.
- Show success state.

Payload:

```js
{
  guestSlug: guest.slug,
  name,
  attendance,
  attendeeCount,
  notAttendReason
}
```

### 10.8 `BotanStory.js`

Render only when `invitation.stories.length > 0`.

Sort should already come from backend.

### 10.9 `BotanGallery.js`

Initial MVP:

- Render CSS grid for `galleryType = 4P1L`.
- Do not implement flip animation first unless needed.

Later:

- Add gallery renderer registry:

```js
const galleryRenderers = {
  "4P1L": BotanGallery4P1L,
  "5P0L": BotanGallery5P0L,
};
```

### 10.10 `BotanWishSection.js`

Client Component.

Responsibilities:

- Fetch initial wishes passed from server or fetch client on mount.
- Submit new wish.
- Update list after submit.

MVP recommended:

- Server page does not fetch wishes.
- Wish section fetches wishes client-side after invitation opens.

Reason:

- Wishes are dynamic and non-critical for initial SEO.

### 10.11 `BotanGift.js`

Client Component only if copy-to-clipboard is included.

Render:

- Bank/e-wallet gift cards.
- Address gift card.
- Copy button.

Use:

```js
navigator.clipboard.writeText(value)
```

Fallback:

- If clipboard unavailable, select text or show value.

### 10.12 `BotanFloatingMenu.js`

Client Component.

Mobile only via CSS.

Items:

- Opening
- Date
- Location
- RSVP
- Wishes
- Gift

Behavior:

- Use section IDs and `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`.
- Do not use global event bus.

### 10.13 `BotanMusicButton.js`

Client Component.

Props:

- `musicUrl`
- `enabled`

Behavior:

- Create audio after user opens invitation, not before.
- Loop audio.
- Pause/resume button.
- Pause when document hidden.
- Cleanup on unmount.

Browser policy:

- Do not assume autoplay works before user gesture.
- Cover open click should be the first safe trigger.

## 11. CSS Strategy

Use a single CSS file for Botan first:

```txt
components/features/invitations/themes/botan/botan.css
```

Rules:

- Prefix every selector with `.botan-theme`.
- Do not write generic `h1`, `button`, `img` styles without prefix.
- Use CSS variables inside `.botan-theme`.
- Keep viewport-specific behavior scoped with media queries.
- Respect old breakpoint: mobile <= 600px, desktop > 600px, but implement with CSS media queries rather than JS viewport state where possible.

Example:

```css
.botan-theme {
  --botan-bg: #efeae4;
  --botan-rose: #d0b6b5;
  --botan-text: #473734;
  min-height: 100svh;
  background: var(--botan-bg);
  color: var(--botan-text);
}

@media (max-width: 600px) {
  .botan-theme .botan-cover {
    min-height: 100svh;
  }
}
```

## 12. Asset Migration Plan

Source:

```txt
/Users/apple/Documents/Codes/NuxtJS/momentoprojects-website/static/themes/botan
```

Target:

```txt
/Users/apple/Documents/Codes/NextJS/momentoclient-fe/public/themes/botan
```

Copy only Botan assets needed for MVP first:

- `component/smile-face.png`
- `component/sad-face.png`
- copy icons if used
- cover decorations
- opening decorations
- date decorations
- gallery/gift decorations

Do not copy all themes yet.

After copy, update paths:

Legacy:

```txt
/themes/botan/component/smile-face.png
```

Target remains valid if copied to:

```txt
public/themes/botan/component/smile-face.png
```

## 13. Frontend Testing Plan

Manual test matrix:

- `/aira-bima` without guest query.
- `/aira-bima?tamu=keluarga-pratama`.
- `/aira-bima?tamu=dina`.
- Unknown slug.
- Unsupported theme slug from backend.
- Mobile width <= 600px.
- Desktop width >= 1024px.

Expected:

- Without guest: no RSVP section.
- With guest: RSVP section appears.
- Group guest: name input editable and attendee count max 2.
- Single guest: name defaults to guest name.
- Cover open reveals sections.
- Music starts only after cover open or user toggles.
- Wish submit updates list.
- Gift copy shows feedback.

Automated minimum:

- `npm run lint`.

Optional later:

- Add Playwright once UI stabilizes.

## 14. Frontend Done Criteria

Frontend phase is done when:

- Route renders Botan from Laravel dummy data.
- No Firebase URL required for MVP dummy.
- No global style regression on `/`, `/harga`, `/estimasi`, `/customer`, `/info-produk`.
- `npm run lint` passes.
- Mobile and desktop are checked separately.
- Implementation can become template for second theme.

