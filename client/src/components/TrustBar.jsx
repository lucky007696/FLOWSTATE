/**
 * Keep the confidential-client framing where logos aren't available.
 * Each entry now includes a one-word outcome or project type so the reader
 * understands what was built, not just who the client is.
 *
 * ↓ PLACEHOLDER — replace with real client names/project types as NDA allows.
 * The format "Client — what we built" is more credible than a name alone.
 */
const TRUST = [
  { label: "Fintech startup", detail: "fraud scoring model" },
  { label: "Series A SaaS", detail: "support ticket triage bot" },
  { label: "Manufacturing firm", detail: "invoice reconciliation pipeline" },
  { label: "Grocery chain", detail: "shelf vision system" },
  { label: "DTC retail brand", detail: "multi-vendor marketplace" },
];

export default function TrustBar() {
  return (
    <div className="bg-ink-950 border-t border-ink-800 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs text-slate-500 mb-4 text-center sm:text-left">
          Work shipped for teams across fintech, SaaS, manufacturing, and retail
        </p>
        {/* Mobile: vertical stack. Desktop: horizontal wrap */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-10 gap-y-2 sm:gap-y-3">
          {TRUST.map((t) => (
            <span key={t.label} className="font-mono text-sm text-slate-400 flex items-center gap-1">
              {t.label}
              <span className="hidden sm:inline text-slate-600"> — {t.detail}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
