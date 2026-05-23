import { homeDefaults } from "@/lib/site-content/homeDefaults";
import { pricingDefaults } from "@/lib/site-content/pricingDefaults";

const API_BASE =
  process.env.MOMENTO_API_URL || process.env.NEXT_PUBLIC_MOMENTO_API_URL;
const HOME_CONTENT_REVALIDATE_SECONDS = 60;
const DEFAULT_SITE_PAGE_REVALIDATE_SECONDS = 300;

async function requestJson(path, options = {}) {
  const { headers, ...fetchOptions } = options;

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      headers: {
        Accept: "application/json",
        ...headers,
      },
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

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeContent(defaults, apiContent) {
  if (!isPlainObject(defaults)) {
    return apiContent ?? defaults;
  }

  if (!isPlainObject(apiContent)) {
    return defaults;
  }

  const merged = { ...defaults };

  for (const key of Object.keys(apiContent)) {
    const defaultValue = defaults[key];
    const apiValue = apiContent[key];

    if (isPlainObject(defaultValue) && isPlainObject(apiValue)) {
      merged[key] = mergeContent(defaultValue, apiValue);
      continue;
    }

    merged[key] = apiValue;
  }

  return merged;
}

export async function getSitePageBySlug(slug) {
  const encodedSlug = encodeURIComponent(slug);
  const revalidateSeconds =
    slug === "home"
      ? HOME_CONTENT_REVALIDATE_SECONDS
      : DEFAULT_SITE_PAGE_REVALIDATE_SECONDS;

  return requestJson(`/site-pages/${encodedSlug}`, {
    next: {
      revalidate: revalidateSeconds,
      tags: [`site-page:${slug}`, "site-pages"],
    },
  });
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
    content: mergeContent(homeDefaults, response.data.content),
    source: "api",
    error: null,
  };
}

export async function getPricingContent() {
  const response = await getSitePageBySlug("pricing");

  if (!response.ok || !response.data?.content) {
    return {
      content: pricingDefaults,
      source: "fallback",
      error: response.error,
    };
  }

  return {
    content: mergeContent(pricingDefaults, response.data.content),
    source: "api",
    error: null,
  };
}
