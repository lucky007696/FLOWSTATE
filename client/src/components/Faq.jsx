import { useState, useRef, useLayoutEffect } from "react";
import Reveal from "./Reveal.jsx";

export const FAQS = [
  {
    q: "You mention a lot of categories — how do you actually decide scope and pricing for something this different each time?",
    a: "Every project starts with a short discovery call where we define the outcome you need and the constraints around it — data available, timeline, integration points. We scope and price against that specific outcome, not a generic day rate, regardless of which category the work falls into.",
  },
  {
    q: "How do you scope a project before we commit budget?",
    a: "We start with a short paid discovery sprint: map the current manual process, identify where automation breaks down or needs a human decision, and set a specific success metric (hours saved, error rate, throughput). Then I quote the build against that, not a general estimate.",
  },
  {
    q: "Who owns the code when the project ends?",
    a: "You do, fully. Source code, model weights, pipeline configs, and documentation are handed over at every milestone — not held until final payment. You can run it, modify it, or hand it to an internal team without restriction.",
  },
  {
    q: "What if requirements change halfway through?",
    a: "Expected on most builds. We work in weekly increments, so scope changes get a quick re-price and slot into the next week's work without derailing the timeline or requiring a contract amendment for every tweak.",
  },
  {
    q: "Do you work with our existing engineering team or take the whole thing?",
    a: "Both. I regularly drop into an existing Python or MERN codebase, match the conventions already in place, and hand back a PR — I don't rewrite what's already working just to put my fingerprints on it. I also take greenfield builds from zero to deployed.",
  },
];

/**
 * Item 15: Smooth accordion transition via measured max-height.
 * On open we measure the real content height and animate to it;
 * on close we animate back to 0. Uses a ref so we never hard-code
 * a magic max-height value.
 * The global prefers-reduced-motion rule in index.css sets
 * transition-duration to 0.001ms, suppressing the animation for users
 * who prefer it.
 */
function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  const id = `faq-answer-${idx}`;

  // Measure natural content height whenever open state changes
  useLayoutEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div className="border-b border-slate-200 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="font-medium text-slate-900">{q}</span>
        <span
          className="font-mono text-rust-700 shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Animated container — height transitions between 0 and measured scrollHeight */}
      <div
        id={id}
        ref={bodyRef}
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 350ms ease-out",
        }}
        role="region"
        aria-labelledby={`faq-btn-${idx}`}
      >
        <p className="mt-3 pb-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-slate-100 py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 id="faq-heading" className="font-mono text-2xl text-slate-900 mb-8">
            Questions clients actually ask
          </h2>
        </Reveal>
        <Reveal>
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} idx={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
