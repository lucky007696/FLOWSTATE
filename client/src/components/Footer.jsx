/**
 * Footer — real contact details for G. Lakshmi Narayana / FlowState.
 * WhatsApp link only (no raw phone number on page to reduce spam).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-slate-500 border-t border-ink-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="font-mono text-white text-sm tracking-tight">FLOWSTATE</span>
            <p className="mt-2 text-xs text-slate-500 max-w-xs">
              AI · ML · Web · Mobile · Automation · Blockchain<br />
              Built end-to-end by one engineer. No agency layer.
            </p>
          </div>

          {/* Contact & social links */}
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="mailto:flowstateteams@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Email FlowState"
            >
              flowstateteams@gmail.com
            </a>
            <a
              href="https://wa.me/919014466834"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="WhatsApp G. Lakshmi Narayana"
            >
              WhatsApp ↗
            </a>
            <a
              href="https://www.linkedin.com/in/lakshmi-narayana-gudi-494940396"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="G. Lakshmi Narayana on LinkedIn"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-800 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-600">
          <span>© {year} FlowState · G. Lakshmi Narayana. All rights reserved.</span>
          <span className="font-mono">Built on MERN · Deployed with ♥</span>
        </div>
      </div>
    </footer>
  );
}
