import Reveal from "./Reveal.jsx";

/**
 * About / Founder — G. Lakshmi Narayana.
 * Real differentiator: direct access to the person building it.
 * TODO before launch: replace the photo placeholder with a real headshot.
 */
export default function Founder() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ink-950 text-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Photo placeholder — swap src for a real headshot before launch */}
          <Reveal>
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              <div
                className="absolute -top-3 -left-3 w-full h-full border border-rust-600 rounded-lg pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="relative bg-ink-900 border border-ink-700 rounded-lg overflow-hidden aspect-[4/5] flex items-end"
                role="img"
                aria-label="G. Lakshmi Narayana — founder of FlowState. Replace this placeholder with a real headshot before launch."
              >
                {/* Silhouette placeholder */}
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 200 250" className="w-full h-full opacity-20" focusable="false">
                    <ellipse cx="100" cy="80" rx="38" ry="38" fill="#C2410C" />
                    <path d="M30 250 Q30 160 100 160 Q170 160 170 250Z" fill="#1E3A56" />
                  </svg>
                </div>
                {/* Name card overlay */}
                <div className="relative w-full bg-ink-950/90 backdrop-blur px-5 py-4">
                  <p className="font-mono text-xs text-rust-600">Founder</p>
                  <p className="font-mono text-sm text-white mt-0.5">G. Lakshmi Narayana</p>
                  {/* Dev-only banner — invisible in production */}
                  {import.meta.env.DEV ? (
                    <p
                      className="font-mono text-amber-400 text-xs mt-0.5 border border-amber-700 rounded px-1"
                      title="Development only — replace with a real headshot before launch"
                    >
                      [🚧 Replace with real headshot]
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal>
            <p className="font-mono text-xs text-rust-600 mb-3 tracking-wider uppercase">About</p>
            <h2
              id="about-heading"
              className="font-mono text-2xl sm:text-3xl leading-snug mb-6"
            >
              You work directly with<br />
              the person building it.
            </h2>

            <p className="text-slate-300 leading-relaxed mb-4">
              I'm <strong className="text-white">Lakshmi Narayana</strong>, an independent
              software engineer. With <strong className="text-white">2 years fully freelance</strong>, I am hands-on on every project, with no agency layer in between. I build AI/ML pipelines, full-stack MERN products, automation systems, and mobile apps
              for businesses across fintech, healthtech, and B2B SaaS. Every engagement I take
              on ships production-ready code — not a prototype that needs a second team to finish it.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              There is no account manager between you and me. No junior developer interpreting
              the brief. No agency markup. You get the person who scoped it, designed it, and
              wrote it — accountable for the outcome from kickoff to handoff.
            </p>
            <p className="text-slate-400 text-sm">
              60+ projects shipped · AI / ML · MERN · automation · blockchain ·
              clients across fintech, retail, and SaaS
            </p>

            {/* Quick contact in the about section */}
            <div className="mt-6 flex gap-4 flex-wrap text-sm">
              <a
                href="mailto:flowstateteams@gmail.com"
                className="text-rust-600 hover:text-rust-500 transition-colors font-mono"
              >
                flowstateteams@gmail.com
              </a>
              <a
                href="https://wa.me/919014466834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust-600 hover:text-rust-500 transition-colors font-mono"
                aria-label="Chat on WhatsApp"
              >
                WhatsApp ↗
              </a>
              <a
                href="https://www.linkedin.com/in/lakshmi-narayana-gudi-494940396"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust-600 hover:text-rust-500 transition-colors font-mono"
                aria-label="LinkedIn profile"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-8 flex gap-10 text-sm border-t border-ink-700 pt-8">
              <div>
                <p className="font-mono text-2xl text-white">2</p>
                <p className="text-slate-500 mt-0.5">Years freelancing</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-white">60+</p>
                <p className="text-slate-500 mt-0.5">Projects shipped</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-white">1</p>
                <p className="text-slate-500 mt-0.5">Builder you talk to</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
