import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

/**
 * Item 14: Scrollspy nav.
 * One IntersectionObserver per nav section watches which section is currently
 * in view. The matching nav link gets an `active` visual treatment
 * (underline + white color). Only the topmost visible section wins.
 * Works for both desktop and mobile nav.
 */
const NAV_SECTIONS = [
  { id: "how-we-work", label: "How we work" },
  { id: "work",        label: "Services" },
  { id: "process",     label: "Process" },
  { id: "portfolio",   label: "Work" },
  { id: "pricing",     label: "Engagement" },
  { id: "faq",         label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const close = () => setOpen(false);

  // Sections that exist on all landing pages
  const sharedSections = ["portfolio", "pricing", "faq", "contact"];
  
  const getHref = (id) => {
    if (isHome || sharedSections.includes(id)) {
      return `#${id}`;
    }
    return `/#${id}`;
  };

  useEffect(() => {
    // Map section id → whether it's intersecting
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        // Pick the first section (in DOM order) that is currently visible
        const firstVisible = NAV_SECTIONS.find((s) => visible.get(s.id));
        setActiveId(firstVisible ? firstVisible.id : "");
      },
      {
        // Fire when section enters/leaves the middle band of the viewport
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        visible.set(id, false);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  /** Returns class string for a given section id. */
  const linkClass = (id) =>
    `text-sm transition-colors ${
      activeId === id
        ? "text-white underline underline-offset-4 decoration-rust-600"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-30 bg-ink-950/95 backdrop-blur border-b border-ink-700">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-mono text-white text-sm tracking-tight" aria-label="FlowState — home">
          FLOWSTATE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a key={id} href={getHref(id)} className={linkClass(id)}>
              {label}
            </a>
          ))}
        </nav>

        <a
          href={getHref("contact")}
          className="hidden md:inline-block bg-rust-600 hover:bg-rust-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
        >
          Start a project
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="w-5 h-0.5 bg-white mb-1.5" aria-hidden="true" />
          <div className="w-5 h-0.5 bg-white" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-ink-700 px-6 py-4 flex flex-col gap-4">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a key={id} href={getHref(id)} className={linkClass(id)} onClick={close}>
              {label}
            </a>
          ))}
          <a href={getHref("contact")} className={linkClass("contact")} onClick={close}>Contact</a>
        </div>
      )}
    </header>
  );
}
