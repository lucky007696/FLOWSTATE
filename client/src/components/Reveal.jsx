import { useReveal } from "../hooks.js";

/**
 * Reveal — scroll-fade wrapper.
 * Accepts an optional `delay` prop (ms) for staggered grid reveals (item 10).
 * The delay is applied via inline style so prefers-reduced-motion in index.css
 * still overrides transition-duration to 0.001ms, suppressing the animation.
 */
export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
