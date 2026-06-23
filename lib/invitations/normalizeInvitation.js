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
    filterUrl: settings.filterUrl || null,
    quote: invitation.quote || { title: null, text: null },
    settings: {
      galleryType: settings.galleryType || "4P1L",
      hideCoverDate: Boolean(settings.hideCoverDate || settings.custom?.hide_cover_date),
      withoutNotAttendReason: Boolean(settings.withoutNotAttendReason),
      rsvpCaptionType: settings.rsvpCaptionType || 1,
      onProgress: Boolean(settings.onProgress),
      displayPicture: settings.displayPicture || null,
      hideDisplayPicture: Boolean(settings.hideDisplayPicture || settings.custom?.hide_display_picture),
      staticOurStory: Boolean(settings.staticOurStory || settings.static_our_story || settings.custom?.static_our_story || settings.custom?.staticOurStory),
      coverTitle: settings.coverTitle !== false && settings.custom?.cover_title !== false,
      middleCoverDate: Boolean(settings.middleCoverDate || settings.custom?.middle_cover_date),
      customGiftCaption: settings.customGiftCaption || settings.custom?.custom_gift_caption || null,
      openedGift: Boolean(settings.openedGift || settings.custom?.opened_gift),
      openingBasmalah: settings.openingBasmalah === true || settings.custom?.opening_basmalah === true,
      openingInfoText: settings.openingInfoText || settings.custom?.opening_info_text || null,
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
