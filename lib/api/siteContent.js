import { homeDefaults } from "@/lib/site-content/homeDefaults";

const API_BASE =
  process.env.MOMENTO_API_URL || process.env.NEXT_PUBLIC_MOMENTO_API_URL;

async function requestJson(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      return { ok: false, data: null, error: `HTTP ${res.status}` };
    }

    const json = await res.json();
    return { ok: true, data: json.data ?? json, error: null };
  } catch (err) {
    return { ok: false, data: null, error: err.message };
  }
}

function mergeHomeContent(defaults, apiContent) {
  if (!apiContent || typeof apiContent !== "object") return defaults;

  const merged = { ...defaults };

  for (const key of Object.keys(apiContent)) {
    if (
      apiContent[key] !== null &&
      typeof apiContent[key] === "object" &&
      !Array.isArray(apiContent[key]) &&
      typeof defaults[key] === "object" &&
      defaults[key] !== null &&
      !Array.isArray(defaults[key])
    ) {
      merged[key] = { ...defaults[key], ...apiContent[key] };
    } else {
      merged[key] = apiContent[key];
    }
  }

  return merged;
}

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
