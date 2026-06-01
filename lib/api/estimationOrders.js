const API_BASE =
  process.env.NEXT_PUBLIC_MOMENTO_API_URL || process.env.MOMENTO_API_URL;

export async function createEstimationOrder(payload) {
  if (!API_BASE) {
    throw new Error("Missing NEXT_PUBLIC_MOMENTO_API_URL environment variable.");
  }

  const response = await fetch(`${API_BASE}/estimation-orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `HTTP ${response.status}`);
  }

  const json = await response.json();
  return json.data ?? json;
}
