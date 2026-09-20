import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import Reveal from "./Reveal.jsx";

/**
 * Fallback projects used if the API is unreachable.
 * Each has a slug so the "View case study" link works with the static data in CaseStudy.jsx.
 */
const FALLBACK_PROJECTS = [
  { slug: "support-ticket-triage-bot",   title: "Support Ticket Triage Bot",    category: "AI",  description: "Classifies and routes incoming tickets, cutting response time by 40%." },
  { slug: "card-fraud-scoring-engine",   title: "Card Fraud Scoring Engine",    category: "ML",  description: "Real-time transaction scoring model serving 200 req/s." },
  { slug: "multi-vendor-marketplace",    title: "Multi-vendor Marketplace",     category: "WEB", description: "MERN storefront with vendor dashboards and Stripe payouts." },
  { slug: "shelf-inventory-vision-system", title: "Shelf Inventory Vision System", category: "DL", description: "Camera-based stock counting for retail shelves." },
  { slug: "habit-tracking-app",          title: "Habit Tracking App",           category: "APP", description: "Cross-platform mobile app with offline-first sync." },
  { slug: "invoice-reconciliation-bot",  title: "Invoice Reconciliation Bot",   category: "RPA", description: "Automated matching of invoices to purchase orders." },
];

/**
 * Item 8: Skeleton card shown while fetching projects from the API.
 */
function SkeletonCard() {
  return (
    <div
      className="bg-white border border-slate-200 rounded-lg p-6 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-3 bg-slate-200 rounded w-10 mb-3" />
      <div className="h-4 bg-slate-200 rounded w-4/5 mb-2" />
      <div className="h-3 bg-slate-200 rounded w-full mb-1" />
      <div className="h-3 bg-slate-200 rounded w-3/4" />
    </div>
  );
}

/**
 * Item 2: Each project card is a Link to /work/:slug (case study detail).
 * Item 3: Descriptive aria-labels on interactive elements.
 * Item 8: Loading skeleton cards + empty state.
 */
export default function Portfolio({ categories }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  useEffect(() => {
    api
      .getProjects()
      .then((data) => {
        let projectsList = Array.isArray(data) && data.length > 0 ? data : FALLBACK_PROJECTS;
        
        if (categories && categories.length > 0) {
          projectsList = projectsList.filter(p => categories.includes(p.category));
        }

        if (Array.isArray(data) && data.length > 0) {
          setLoadedFromApi(true);
        }

        setProjects(projectsList);
        setLoading(false);
      })
      .catch(() => {
        // API not running yet — fall back to sample data silently.
        let projectsList = FALLBACK_PROJECTS;
        if (categories && categories.length > 0) {
          projectsList = projectsList.filter(p => categories.includes(p.category));
        }
        setProjects(projectsList);
        setLoading(false);
      });
  }, [categories]);

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="bg-slate-100 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-2">
          <h2 id="portfolio-heading" className="font-mono text-2xl text-slate-900">
            Selected work
          </h2>
          <span className="text-sm text-slate-500">
            {loadedFromApi
              ? "Live projects from the API"
              : "Sample case studies — seed the DB or replace with real projects"}
          </span>
        </Reveal>

        {/* Item 8: Loading state */}
        {loading && (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="status"
            aria-label="Loading projects…"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Item 8: Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-slate-400 mb-3">// no projects found</p>
            <p className="text-slate-600 text-sm">
              Run{" "}
              <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">
                npm run seed
              </code>{" "}
              in the server directory to populate projects.
            </p>
          </div>
        )}

        {/* Project cards */}
        {!loading && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug || p.title} delay={i * 80}>
                {/* Item 2: Link to case study */}
                <Link
                  to={`/work/${p.slug || encodeURIComponent(p.title.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="portfolio-card group block bg-white border border-slate-200 hover:border-rust-600 rounded-lg p-6 transition-colors h-full"
                  aria-label={`View case study: ${p.title} — ${p.category} project`}
                >
                  <p className="font-mono text-xs text-rust-700">{p.category}</p>
                  <h3 className="mt-2 font-medium text-slate-900 group-hover:text-rust-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                  <p className="mt-4 text-xs font-mono text-rust-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View case study →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
