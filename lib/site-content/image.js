/**
 * Resolve the best image source for a CMS-driven image field.
 *
 * CMS images stored via Vercel Blob will have full HTTPS URLs.
 * Local/fallback images use relative paths like "/images/...".
 *
 * @param {object|null|undefined} field - CMS image object with at least { src }.
 * @param {string} fallback - Local fallback path (e.g. "/images/home-decoration.png").
 * @returns {string} The resolved image URL.
 */
export function getImageSrc(field, fallback = "") {
  if (!field) return fallback;
  if (typeof field === "string") return field || fallback;
  return field.src || fallback;
}
