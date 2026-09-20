import { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal.jsx";
import { useReveal } from "../hooks.js";

// Use booking URL from env if configured, otherwise fall back to the contact form.
const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || null;

function GridBackdrop() {
  return (
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

/**
 * Item 11: Animated stat counter — counts from 0 to `target` over `duration`ms
 * using requestAnimationFrame. Fires once when the stat row scrolls into view
 * (via useReveal). Respects prefers-reduced-motion via the global CSS rule that
 * sets animation-duration to 0.001ms, but since rAF bypasses CSS we also check
 * the media query directly and skip animation if reduced-motion is preferred.
 */
function useCountUp(target, duration = 1200, enabled = false) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    // Respect prefers-reduced-motion — show final value immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValue(target);
      hasRun.current = true;
      return;
    }
    hasRun.current = true;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, duration]);

  return value;
}

/** Single stat item with animated counter. */
function StatItem({ srLabel, value, suffix = "", label }) {
  const [ref, visible] = useReveal();
  const count = useCountUp(value, 1200, visible);
  return (
    <div ref={ref}>
      <dt className="sr-only">{srLabel}</dt>
      <dd>
        <span className="font-mono text-2xl text-white">
          {count}{suffix}
        </span>
        <p className="text-slate-500 mt-0.5">{label}</p>
      </dd>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative bg-ink-950 text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <GridBackdrop />
      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          {/* Neutral positioning badge — no single category */}
          <p className="font-mono text-xs text-rust-600 mb-4 tracking-wider uppercase">
            AI · ML · Web · Mobile · Automation · Blockchain
          </p>

          <h1
            id="hero-heading"
            className="font-mono text-4xl sm:text-5xl leading-[1.1] tracking-tight"
          >
            From idea to production, without breaking flow.
          </h1>

          <p className="mt-6 text-slate-400 text-lg max-w-md">
            AI systems, machine learning pipelines, deep learning models, and full-stack web and mobile apps — one freelance team, shipped end to end on the MERN stack.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-rust-600 hover:bg-rust-700 text-white px-5 py-3 rounded-md text-sm font-medium transition-colors"
              aria-label="Start a project — go to contact form"
            >
              Start a project
            </a>
            {BOOKING_URL ? (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink-700 hover:border-slate-500 text-slate-200 px-5 py-3 rounded-md text-sm font-medium transition-colors"
                aria-label="Book a free 30-minute intro call (opens scheduling link in a new tab)"
              >
                Book a free call
              </a>
            ) : (
              <a
                href="#contact"
                className="border border-ink-700 hover:border-slate-500 text-slate-200 px-5 py-3 rounded-md text-sm font-medium transition-colors"
                aria-label="Get in touch via the contact form"
              >
                Get in touch
              </a>
            )}
            <a
              href="#portfolio"
              className="text-slate-400 hover:text-white px-5 py-3 text-sm font-medium transition-colors underline underline-offset-4"
              aria-label="Jump to selected work / portfolio section"
            >
              See our work
            </a>
          </div>

          {/* Item 11: Animated stat counters — count up on first scroll into view */}
          <dl className="mt-12 flex gap-10 text-sm">
            <StatItem
              srLabel="Projects shipped across all categories"
              value={60}
              suffix="+"
              label="Projects shipped"
            />
            <StatItem
              srLabel="Years of freelancing experience"
              value={2}
              label="Years freelancing"
            />
            <StatItem
              srLabel="Categories of software we build"
              value={7}
              label="Disciplines"
            />
          </dl>
        </div>

        <div className="flex justify-center md:justify-end">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
