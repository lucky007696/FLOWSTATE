import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api/client.js";

// ⚠️  TODO before launch: set VITE_BOOKING_URL in client/.env.
const BOOKING_URL =
  import.meta.env.VITE_BOOKING_URL || "https://calendly.com/flowstate/intro";

/**
 * Item 2: Case study page at /work/:slug.
 * Lazy-loaded via React.lazy in App.jsx (item 12).
 * Fetches full project data from /api/projects/:slug and displays
 * problem, approach, stack, and outcome metrics.
 */

const STATIC_PROJECTS = {
  "support-ticket-triage-bot": {
    title: "Support Ticket Triage Bot",
    category: "AI",
    stack: ["Python", "OpenAI API", "Node.js", "MongoDB"],
    description: "Classifies and routes incoming tickets, cutting response time by 40%.",
    problem:
      "A SaaS company's support team was manually reading and routing 1,200+ tickets per day across 6 queues. Misrouted tickets caused a 3-day average resolution lag and burnt out L1 staff.",
    approach:
      "Fine-tuned an OpenAI classifier on 18 months of historical tickets with human-reviewed labels. Built a Node.js webhook to intercept Zendesk tickets, run inference, and set the assignee group — all under 400ms end-to-end.",
    outcome:
      "40% faster first response, 28% reduction in misroutes in the first month, and L1 headcount stabilised without adding staff during a 60% ticket-volume increase.",
  },
  "card-fraud-scoring-engine": {
    title: "Card Fraud Scoring Engine",
    category: "ML",
    stack: ["Python", "scikit-learn", "FastAPI", "Redis", "PostgreSQL"],
    description: "Real-time transaction scoring model serving 200 req/s.",
    problem:
      "A fintech startup's rule-based fraud system had an 8% false-positive rate — blocking legitimate customers — and missed novel fraud patterns that didn't match existing rules.",
    approach:
      "Built a gradient-boosted model on 2 years of transaction history with engineered velocity and geo-anomaly features. Deployed via FastAPI with Redis caching for repeated merchant lookups, achieving P99 < 12ms.",
    outcome:
      "False positives dropped to 1.9%. Fraud losses reduced by $220k in Q1 after deployment. Model served 200 req/s at peak without added infrastructure cost.",
  },
  "multi-vendor-marketplace": {
    title: "Multi-vendor Marketplace",
    category: "WEB",
    stack: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Tailwind CSS"],
    description: "MERN storefront with vendor dashboards and Stripe payouts.",
    problem:
      "A retail aggregator needed a platform where independent vendors could list products, manage orders, and receive automatic payouts — without the team running manual bank transfers.",
    approach:
      "Designed a MERN platform with role-based access (admin / vendor / buyer). Stripe Connect handled KYC and automatic split payouts per order. Built a real-time order dashboard with Socket.io and a CI/CD pipeline via GitHub Actions → Render.",
    outcome:
      "Launched with 14 vendors and 380 SKUs. Platform processed $180k GMV in its first 90 days. Payout reconciliation went from 3 hours per week to zero manual effort.",
  },
  "shelf-inventory-vision-system": {
    title: "Shelf Inventory Vision System",
    category: "DL",
    stack: ["PyTorch", "OpenCV", "YOLOv8", "FastAPI", "React"],
    description: "Camera-based stock counting for retail shelves.",
    problem:
      "A grocery chain was conducting manual shelf audits twice daily — 45 minutes per store per round. Stockouts were only caught after a customer reported them.",
    approach:
      "Trained a YOLOv8 object detector on a custom dataset of 4,000 labelled shelf images across 120 SKU classes. Deployed on edge hardware at each store; a FastAPI service aggregated counts and triggered restock alerts.",
    outcome:
      "Stockout detection time fell from 4-hour average to under 8 minutes. Audit labour reduced by 90%. Pilot across 12 stores showed a 6% uplift in shelf availability score.",
  },
  "habit-tracking-app": {
    title: "Habit Tracking App",
    category: "APP",
    stack: ["React Native", "Node.js", "MongoDB", "Expo"],
    description: "Cross-platform mobile app with offline-first sync.",
    problem:
      "Users of a wellness platform were abandoning the web experience on mobile because it required a live connection — unreliable on commutes, which is when habits are logged.",
    approach:
      "Built a React Native app with an offline-first local SQLite store that queues mutations and syncs to MongoDB via a Node.js API on reconnect. Conflict resolution used a last-write-wins strategy with a server-side timestamp authority.",
    outcome:
      "7-day retention rose 34% vs. the mobile web baseline. App Store rating: 4.6 / 5. Sync conflicts in the first 30 days: zero reported.",
  },
  "invoice-reconciliation-bot": {
    title: "Invoice Reconciliation Bot",
    category: "RPA",
    stack: ["Node.js", "Python", "Tesseract OCR", "PostgreSQL"],
    description: "Automated matching of invoices to purchase orders.",
    problem:
      "A manufacturing firm's accounts payable team spent 22 hours per week manually matching 600+ supplier invoices to purchase orders across three ERP systems.",
    approach:
      "Built a Python OCR pipeline (Tesseract + OpenCV pre-processing) to extract line items from PDF invoices. A Node.js orchestrator matched them against PO data via fuzzy string matching and amount tolerance rules.",
    outcome:
      "95% of invoices now reconcile without human input. AP team time on reconciliation dropped from 22 hours/week to under 2. Supplier dispute rate fell by 67%.",
  },
};

const CATEGORY_LABEL = {
  AI: "Artificial Intelligence",
  ML: "Machine Learning",
  DL: "Deep Learning",
  WEB: "Web Application",
  APP: "Mobile App",
  RPA: "Automation / RPA",
  WEB3: "Blockchain",
  OPS: "Cloud & DevOps",
};

function SkeletonCase() {
  return (
    <div className="animate-pulse" aria-label="Loading case study…" role="status">
      <div className="h-4 bg-ink-800 rounded w-24 mb-6" />
      <div className="h-10 bg-ink-800 rounded w-2/3 mb-4" />
      <div className="h-4 bg-ink-800 rounded w-full mb-2" />
      <div className="h-4 bg-ink-800 rounded w-5/6 mb-10" />
      <div className="grid md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-ink-900 rounded-lg p-6">
            <div className="h-3 bg-ink-800 rounded w-16 mb-4" />
            <div className="h-4 bg-ink-800 rounded w-full mb-2" />
            <div className="h-4 bg-ink-800 rounded w-5/6 mb-2" />
            <div className="h-4 bg-ink-800 rounded w-4/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .getProjectBySlug(slug)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        // API not running — fall back to static data
        const fallback = STATIC_PROJECTS[slug];
        if (fallback) {
          setProject(fallback);
        } else {
          setError("Project not found.");
        }
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      {/* Back navigation */}
      <div className="border-b border-ink-700 bg-ink-950/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="font-mono text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            aria-label="Back to previous page"
          >
            ← Back
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {loading && <SkeletonCase />}

        {!loading && error && (
          <div role="alert" className="text-center py-20">
            <p className="font-mono text-rust-600 mb-4">// 404</p>
            <h1 className="font-mono text-2xl mb-4">{error}</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-white underline text-sm transition-colors"
            >
              Go back →
            </button>
          </div>
        )}

        {!loading && project && (
          <article>
            {/* Header */}
            <header className="mb-12">
              <p className="font-mono text-xs text-rust-600 mb-3" aria-label={`Category: ${CATEGORY_LABEL[project.category] || project.category}`}>
                {project.category} · {CATEGORY_LABEL[project.category] || project.category}
              </p>
              <h1 className="font-mono text-3xl sm:text-4xl leading-tight mb-4">
                {project.title}
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">{project.description}</p>

              {/* Stack chips */}
              {project.stack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6" aria-label="Technology stack">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs bg-ink-800 border border-ink-700 text-slate-300 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Case study body */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Problem */}
              <section className="bg-ink-900 border border-ink-700 rounded-lg p-6">
                <h2 className="font-mono text-xs text-rust-600 mb-3 uppercase tracking-wider">
                  Problem
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.problem || "Problem description coming soon."}
                </p>
              </section>

              {/* Approach */}
              <section className="bg-ink-900 border border-ink-700 rounded-lg p-6">
                <h2 className="font-mono text-xs text-rust-600 mb-3 uppercase tracking-wider">
                  Approach
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.approach || "Approach description coming soon."}
                </p>
              </section>

              {/* Outcome */}
              <section className="bg-ink-900 border border-ink-700 rounded-lg p-6">
                <h2 className="font-mono text-xs text-rust-600 mb-3 uppercase tracking-wider">
                  Outcome
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.outcome || "Outcome metrics coming soon."}
                </p>
              </section>
            </div>

            {/* CTA */}
            <div className="border-t border-ink-700 pt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <p className="text-slate-400 text-sm">
                Want a similar result for your team?
              </p>
              <a
                href="/#contact"
                className="bg-rust-600 hover:bg-rust-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                Start a project
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink-700 hover:border-slate-500 text-slate-300 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                Book a free call
              </a>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
