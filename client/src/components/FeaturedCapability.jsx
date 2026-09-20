import Reveal from "./Reveal.jsx";

/**
 * HowWeWork — replaces the automation-only FeaturedCapability section.
 *
 * Three process pillars apply regardless of whether the project is
 * AI, ML, web, mobile, automation, or blockchain.  No single category
 * is presented as the lead or "core specialty."
 *
 * Section id kept as "how-we-work" so the Navbar link can point here
 * if needed.  App.jsx import alias is unchanged (still exported default).
 */

const PILLARS = [
  {
    n: "01",
    title: "Scope against a real outcome",
    desc:
      "Before a line of code is written we agree on what success looks like — hours saved, error rate, revenue unlocked, or product shipped. Every decision during the build traces back to that outcome.",
    note: "Paid discovery sprint · typically 1–3 days",
  },
  {
    n: "02",
    title: "Ship working software every week",
    desc:
      "You see running code — not slide decks — at the end of every week. Scope changes get re-priced and slotted into the next sprint without contract amendments or timeline blow-ups.",
    note: "Weekly increments · async-friendly",
  },
  {
    n: "03",
    title: "Hand over code you own completely",
    desc:
      "Source code, model weights, pipeline configs, and documentation are yours at every milestone — not held until final payment. You can run it, modify it, or pass it to an internal team without restriction.",
    note: "Full transfer · no lock-in",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="bg-ink-950 text-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <Reveal className="max-w-2xl mb-14">
          <p className="font-mono text-xs text-rust-600 mb-3 tracking-wider uppercase">
            How we work
          </p>
          <h2
            id="how-we-work-heading"
            className="font-mono text-2xl sm:text-3xl leading-snug mb-5"
          >
            The same discipline, whatever the stack.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Whether the project is an ML model, a full-stack web product, a
            mobile app, or an automation pipeline — the process is the same:
            define the outcome first, ship iteratively, hand over everything
            you need to run it independently.
          </p>
        </Reveal>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p) => (
            <Reveal
              key={p.n}
              className="bg-ink-900 border border-ink-700 rounded-lg p-6 flex flex-col"
            >
              <p className="font-mono text-xs text-rust-600 mb-3">{p.n}</p>
              <h3 className="font-medium text-white text-base mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{p.desc}</p>
              {/* Process note */}
              <div className="mt-5 pt-4 border-t border-ink-700">
                <p className="font-mono text-xs text-slate-500">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Breadth reminder */}
        <Reveal>
          <p className="text-slate-500 text-sm border-t border-ink-800 pt-8 max-w-2xl">
            We take on AI/ML, deep learning, full-stack web, React Native
            mobile, automation, and blockchain projects — always as a single
            team accountable from kickoff to handoff, never subcontracted.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
