import React from "react";

/**
 * Item 16: ErrorBoundary wraps the entire app.
 * Catches render-time errors in any child component and shows a friendly
 * fallback instead of a blank screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Unknown error" };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen bg-ink-950 text-white flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-rust-600 text-sm mb-4">// runtime error</p>
          <h1 className="font-mono text-2xl mb-3">Something went wrong.</h1>
          <p className="text-slate-400 max-w-md mb-8">
            An unexpected error occurred while rendering this page. The issue
            has been logged. Please refresh — if it persists, email{" "}
            <a
              href="mailto:hello@flowstate.dev"
              className="text-white underline"
            >
              hello@flowstate.dev
            </a>
            .
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-rust-600 hover:bg-rust-700 text-white px-5 py-3 rounded-md text-sm font-medium transition-colors"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
