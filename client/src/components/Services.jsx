import Reveal from "./Reveal.jsx";

/**
 * Services listed in alphabetical order — no single discipline leads.
 * Plain-language labels replace acronyms a non-technical buyer won't parse.
 * Each description names a concrete outcome, not a feature list.
 */
const SERVICES = [
  {
    tag: "AI",
    title: "AI Solutions",
    desc: "We embed AI into existing products: classification, extraction, summarisation, and copilot features that reduce the work a human has to do per task.",
  },
  {
    tag: "AUTOMATION",
    title: "Automation",
    desc: "We replace manual, rule-based work with scripts and bots that run without intervention — document processing, ticket routing, invoice matching.",
  },
  {
    tag: "WEB3",
    title: "Blockchain & Web3",
    desc: "We write and audit smart contracts and build the front-end interfaces that connect to them — Ethereum, Solana, and EVM-compatible chains.",
  },
  {
    tag: "DEVOPS",
    title: "Cloud & DevOps",
    desc: "We containerise, automate CI/CD, and set up monitoring so new code reaches production without manual steps or guesswork.",
  },
  {
    tag: "DL",
    title: "Deep Learning",
    desc: "We build neural networks for vision (object detection, OCR), speech, and language tasks where rule-based systems have already hit their ceiling.",
  },
  {
    tag: "ML",
    title: "Machine Learning",
    desc: "We train prediction and scoring models on your own data — fraud detection, churn forecasting, demand planning — and deploy them as APIs your app calls.",
  },
  {
    tag: "APP",
    title: "Mobile Apps",
    desc: "We ship iOS and Android apps in React Native, sharing auth, API, and data layer with your existing web platform so you maintain one codebase.",
  },
  {
    tag: "WEB",
    title: "Web Applications",
    desc: "We build full-stack MERN apps from schema to deployment — admin dashboards, customer portals, marketplaces, internal tools.",
  },
];

export default function Services() {
  return (
    <section id="work" aria-labelledby="services-heading" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal className="max-w-xl mb-12">
        <h2 id="services-heading" className="font-mono text-2xl text-slate-900">
          What we build
        </h2>
        <p className="mt-3 text-slate-600">
          AI, ML, web, mobile, automation, and blockchain — all scoped against
          real outcomes, built by one team, and handed over with documentation.
          No category is treated as an afterthought.
        </p>
      </Reveal>
      <div className="grid sm:grid-cols-2 divide-y divide-slate-200 sm:divide-y-0 border-t border-slate-200">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 80}
            className={`py-6 px-1 sm:px-6 sm:border-b border-slate-200 ${i % 2 === 0 ? "sm:border-r" : ""}`}
          >
            <p className="font-mono text-xs text-rust-700">{s.tag}</p>
            <h3 className="mt-2 text-lg font-medium text-slate-900">{s.title}</h3>
            <p className="mt-1 text-slate-600 text-sm">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
