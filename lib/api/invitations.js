const DEFAULT_API_BASE_URL =
  process.env.MOMENTO_API_URL || process.env.NEXT_PUBLIC_MOMENTO_API_URL;

async function requestJson(path, options = {}) {
  if (!DEFAULT_API_BASE_URL) {
    throw new Error(
      "Missing MOMENTO_API_URL or NEXT_PUBLIC_MOMENTO_API_URL environment variable."
    );
  }

  let response;

  try {
    response = await fetch(`${DEFAULT_API_BASE_URL}${path}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: error instanceof Error ? error.message : "Network request failed.",
    };
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    data: payload?.data ?? null,
    error: response.ok ? null : payload?.message || payload?.error || null,
  };
}

export async function getInvitationBySlug(slug) {
  return requestJson(`/invitations/${encodeURIComponent(slug)}`);
}

export async function getInvitationGuest(slug, guestSlug) {
  return requestJson(
    `/invitations/${encodeURIComponent(slug)}/guests/${encodeURIComponent(
      guestSlug
    )}`
  );
}

export async function getInvitationGuestRsvp(slug, guestSlug) {
  return requestJson(
    `/invitations/${encodeURIComponent(slug)}/guests/${encodeURIComponent(
      guestSlug
    )}/rsvp`
  );
}

export async function createInvitationRsvp(slug, payload) {
  return requestJson(`/invitations/${encodeURIComponent(slug)}/rsvp`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getInvitationWishes(slug) {
  return requestJson(`/invitations/${encodeURIComponent(slug)}/wishes`);
}

export async function createInvitationWish(slug, payload) {
  return requestJson(`/invitations/${encodeURIComponent(slug)}/wishes`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
