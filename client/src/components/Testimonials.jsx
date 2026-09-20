import Reveal from "./Reveal.jsx";

/**
 * Item 3: Descriptive blockquote markup with cite element.
 * Item 15: Added Reveal animation (was missing) and consistent py-24 spacing.
 */
const TESTIMONIALS = [
  {
    quote: "They scoped the ML model honestly instead of overselling it, then delivered ahead of schedule.",
    name: "Placeholder Client",
    role: "Head of Product",
    industry: "SaaS",
  },
  {
    quote: "Our MERN rebuild handled launch-day traffic without a single incident.",
    name: "Placeholder Client",
    role: "Founder",
    industry: "Fintech",
  },
  {
    quote: "Clear updates every week. We always knew exactly what was shipping next.",
    name: "Placeholder Client",
    role: "Operations Lead",
    industry: "Retail",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="max-w-6xl mx-auto px-6 pt-12 pb-24"
    >
      <Reveal>
        <h2
          id="testimonials-heading"
          className="font-mono text-2xl text-slate-900 mb-12"
        >
          Clients say
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i}>
            <figure className="border-l-2 border-rust-600 pl-5">
              <blockquote>
                <p className="text-slate-700 leading-relaxed">"{t.quote}"</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <cite className="not-italic">
                  {t.name} — {t.role}
                  {t.industry && `, ${t.industry}`}
                </cite>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-8">
        Replace these with real client quotes before launch.
      </p>
    </section>
  );
}
