import { Link } from "react-router-dom";

/**
 * Item 7: Client-side 404 page shown for unmatched routes.
 * On-brand styling, back-to-home link.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-rust-600 text-sm mb-4">// 404</p>
      <h1 className="font-mono text-4xl sm:text-5xl mb-4">Page not found.</h1>
      <p className="text-slate-400 max-w-md mb-8 text-lg">
        That URL doesn't exist in this codebase. The project you're looking for
        may have been moved, renamed, or never deployed.
      </p>
      <Link
        to="/"
        className="bg-rust-600 hover:bg-rust-700 text-white px-5 py-3 rounded-md text-sm font-medium transition-colors"
      >
        ← Back to FlowState
      </Link>
    </div>
  );
}
