import "dotenv/config";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";

/**
 * Each description follows: [what it does] + [specific outcome].
 * No description that could apply to any generic project.
 * Category enum: AUTOMATION replaces RPA throughout (model, seed, and front-end tags).
 */
const sampleProjects = [
  {
    title: "Invoice Reconciliation Bot",
    slug: "invoice-reconciliation-bot",
    category: "AUTOMATION",
    description:
      "Reads supplier PDF invoices with OCR, matches line items to POs across three ERPs via fuzzy logic, and flags exceptions — eliminating 20 hours of manual AP work per week.",
    stack: ["Node.js", "Python", "Tesseract OCR", "PostgreSQL"],
    featured: true,
    problem:
      "A manufacturing firm's accounts payable team spent 22 hours per week manually matching 600+ supplier invoices to purchase orders across three ERP systems, causing payment delays and supplier disputes.",
    approach:
      "Built a Python OCR pipeline (Tesseract + OpenCV pre-processing) to extract line items from PDF invoices. A Node.js orchestrator matched them against PO data via fuzzy string matching and amount tolerance rules, flagging exceptions for human review.",
    outcome:
      "95% of invoices now reconcile without human input. AP team time on reconciliation dropped from 22 hours/week to under 2. Supplier dispute rate fell by 67% in the first quarter.",
  },
  {
    title: "Support Ticket Triage Bot",
    slug: "support-ticket-triage-bot",
    category: "AUTOMATION",
    description:
      "Classifies incoming support tickets by type and urgency using a fine-tuned classifier, routes them to the correct queue, and cuts first-response time by 40%.",
    stack: ["Python", "OpenAI API", "Node.js", "MongoDB"],
    featured: true,
    problem:
      "A SaaS company's support team was manually reading and routing 1,200+ tickets per day across 6 queues. Misrouted tickets caused a 3-day average resolution lag and burnt out L1 staff.",
    approach:
      "Fine-tuned an OpenAI classifier on 18 months of historical tickets with human-reviewed labels. Built a Node.js webhook to intercept Zendesk tickets, run inference, and set the assignee group — all under 400ms end-to-end.",
    outcome:
      "40% faster first response, 28% reduction in misroutes in the first month, and L1 headcount stabilised without adding staff during a 60% ticket-volume increase.",
  },
  // ── ML ───────────────────────────────────────────────────────────
  {
    title: "Card Fraud Scoring Engine",
    slug: "card-fraud-scoring-engine",
    category: "ML",
    description:
      "Scores payment transactions in real time using a gradient-boosted model, dropping false positives from 8% to 1.9% and reducing fraud losses by $220k in the first quarter.",
    stack: ["Python", "scikit-learn", "FastAPI", "Redis", "PostgreSQL"],
    featured: false,
    problem:
      "A fintech startup's rule-based fraud system had an 8% false-positive rate — blocking legitimate customers — and missed novel fraud patterns that didn't match existing rules.",
    approach:
      "Built a gradient-boosted model on 2 years of transaction history with engineered velocity and geo-anomaly features. Deployed via FastAPI with Redis caching for repeated merchant lookups, achieving P99 < 12ms.",
    outcome:
      "False positives dropped to 1.9%. Fraud losses reduced by $220k in Q1 after deployment. Model served 200 req/s at peak without added infrastructure cost.",
  },
  // ── Deep Learning ────────────────────────────────────────────────
  {
    title: "Shelf Inventory Vision System",
    slug: "shelf-inventory-vision-system",
    category: "DL",
    description:
      "Detects out-of-stock shelf positions from store camera feeds using YOLOv8, cutting stockout detection time from 4 hours to 8 minutes across a 12-store pilot.",
    stack: ["PyTorch", "OpenCV", "YOLOv8", "FastAPI", "React"],
    featured: false,
    problem:
      "A grocery chain was conducting manual shelf audits twice daily — 45 minutes per store per round. Stockouts were only caught after a customer reported them.",
    approach:
      "Trained a YOLOv8 object detector on a custom dataset of 4,000 labelled shelf images across 120 SKU classes. Deployed on edge hardware at each store; a FastAPI service aggregated counts and triggered restock alerts.",
    outcome:
      "Stockout detection time fell from 4-hour average to under 8 minutes. Audit labour reduced by 90%. Pilot across 12 stores showed a 6% uplift in shelf availability score.",
  },
  // ── Web ──────────────────────────────────────────────────────────
  {
    title: "Multi-vendor Marketplace",
    slug: "multi-vendor-marketplace",
    category: "WEB",
    description:
      "MERN platform for 14 vendors with role-based dashboards, real-time order tracking, and Stripe Connect payouts — processing $180k GMV in its first 90 days.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Tailwind CSS"],
    featured: false,
    problem:
      "A retail aggregator needed a platform where independent vendors could list products, manage orders, and receive automatic payouts — without the team running manual bank transfers.",
    approach:
      "Designed a MERN platform with role-based access (admin / vendor / buyer). Stripe Connect handled KYC and automatic split payouts per order. Built a real-time order dashboard with Socket.io and a CI/CD pipeline via GitHub Actions → Render.",
    outcome:
      "Launched with 14 vendors and 380 SKUs. Platform processed $180k GMV in its first 90 days. Payout reconciliation went from 3 hours per week to zero manual effort.",
  },
  // ── Mobile ───────────────────────────────────────────────────────
  {
    title: "Offline-First Habit Tracking App",
    slug: "habit-tracking-app",
    category: "APP",
    description:
      "React Native app with local SQLite queue and background sync to MongoDB — 7-day retention up 34% over the mobile web baseline, rated 4.6 on the App Store.",
    stack: ["React Native", "Node.js", "MongoDB", "Expo"],
    featured: false,
    problem:
      "Users of a wellness platform were abandoning the web experience on mobile because it required a live connection — unreliable on commutes, which is when habits are logged.",
    approach:
      "Built a React Native app with an offline-first local SQLite store that queues mutations and syncs to MongoDB via a Node.js API on reconnect. Conflict resolution used a last-write-wins strategy with a server-side timestamp authority.",
    outcome:
      "7-day retention rose 34% vs. the mobile web baseline. App Store rating: 4.6 / 5. Sync conflicts in the first 30 days: zero reported.",
  },
];

async function seed() {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
  console.log(`Seeded ${sampleProjects.length} projects (${sampleProjects.filter(p => p.featured).length} featured).`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
