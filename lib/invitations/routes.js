export const RESERVED_INVITATION_SLUGS = [
  "harga",
  "customer",
  "estimasi",
  "info-produk",
  "api",
  "admin",
];

export function isReservedInvitationSlug(slug) {
  return RESERVED_INVITATION_SLUGS.includes(slug);
}
