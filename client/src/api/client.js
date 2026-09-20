const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export const api = {
  sendContactMessage: (payload) =>
    request("/contact", { method: "POST", body: JSON.stringify(payload) }),

  getProjects: (category) =>
    request(category ? `/projects?category=${category}` : "/projects"),

  /** Item 2: Fetch a single project by slug for the case study page. */
  getProjectBySlug: (slug) => request(`/projects/${encodeURIComponent(slug)}`),
};
