const DEFAULT_THEME = {
  slug: "botan",
  name: "Botan",
  componentKey: "botan",
};

export function normalizeInvitationResponse(invitation) {
  if (!invitation) return null;

  const theme = invitation.theme || DEFAULT_THEME;
  const couple = invitation.couple || {};
  const settings = invitation.settings || {};

  return {
    slug: invitation.slug,
    title: invitation.title,
    eventType: invitation.eventType,
    status: invitation.status,
    primaryDate: invitation.primaryDate,
    coverDate: invitation.coverDate,
    musicUrl: invitation.musicUrl,
    ogImageUrl: invitation.ogImageUrl,
    quote: invitation.quote || { title: null, text: null },
    settings: {
      galleryType: settings.galleryType || "4P1L",
      hideCoverDate: Boolean(settings.hideCoverDate),
      withoutNotAttendReason: Boolean(settings.withoutNotAttendReason),
      rsvpCaptionType: settings.rsvpCaptionType || 1,
      onProgress: Boolean(settings.onProgress),
    },
    theme: {
      slug: theme.slug || DEFAULT_THEME.slug,
      name: theme.name || DEFAULT_THEME.name,
      componentKey: theme.componentKey || DEFAULT_THEME.componentKey,
    },
    couple: {
      bride: couple.bride || null,
      groom: couple.groom || null,
    },
    events: Array.isArray(invitation.events) ? invitation.events : [],
    stories: Array.isArray(invitation.stories) ? invitation.stories : [],
    galleries: Array.isArray(invitation.galleries) ? invitation.galleries : [],
    gifts: Array.isArray(invitation.gifts) ? invitation.gifts : [],
    opening: invitation.opening || { akad: null, reception: null },
  };
}
