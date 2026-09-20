import Reveal from "./Reveal.jsx";

const PRICING = [
  {
    name: "Sprint",
    price: "Fixed quote",
    desc: "One scoped automation or feature: an invoice parser, a classifier webhook, a data pipeline, or a single web page with a real backend.",
    items: ["1–3 week delivery", "Fixed scope & price", "One round of revisions", "Full source code handoff"],
  },
  {
    name: "Build",
    price: "Custom scope",
    desc: "An end-to-end system: a full MERN web product, or an automation/ML pipeline taken from raw data to a running API your team calls.",
    items: ["4–12 week delivery", "Working builds every week", "Direct access to the builder", "Deployment & handoff documentation"],
    featured: true,
  },
  {
    name: "Partner",
    price: "Monthly retainer",
    desc: "Ongoing work: new automations each month, model retraining as data grows, feature additions to an existing product.",
    items: ["Monthly retainer", "Priority turnaround", "Roadmap calls included", "Cancel with 30 days notice"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 pt-24 pb-12">
      <Reveal className="max-w-lg mb-12">
        <h2 className="font-mono text-2xl text-slate-900">Engagement models</h2>
        <p className="mt-3 text-slate-600">
          Pick the engagement that matches what you're building and how certain the scope is.
          Every tier includes full code ownership — nothing is held back at handoff.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Every project is scoped and quoted after a short discovery call. Pricing reflects your actual requirements, not a template.
        </p>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {PRICING.map((tier, i) => (
          <Reveal
            key={tier.name}
            delay={i * 80}
            className={`pricing-card rounded-lg p-6 border ${tier.featured ? "border-rust-600 bg-ink-950 text-white" : "border-slate-200 bg-white"}`}
          >
            <h3 className="font-mono text-lg">{tier.name}</h3>
            <p className={`mt-2 text-2xl font-mono ${tier.featured ? "text-rust-600" : "text-rust-700"}`}>{tier.price}</p>
            {tier.note && (
              <p className={`mt-1 text-xs ${tier.featured ? "text-slate-400" : "text-slate-400"}`}>{tier.note}</p>
            )}
            <p className={`mt-3 text-sm ${tier.featured ? "text-slate-300" : "text-slate-600"}`}>{tier.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {tier.items.map((it) => (
                <li key={it} className={tier.featured ? "text-slate-300" : "text-slate-600"}>· {it}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
