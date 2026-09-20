import { useState, useEffect, useRef } from "react";

/**
 * Item 13: Each category now has a matching stack line displayed while the
 * build type is fully visible. The "building X" text types in char-by-char
 * as before, then the stack line briefly changes to the category's stack
 * before the text is deleted and the next category starts.
 *
 * Total cycle breakdown per category (well under 3 s):
 *  - type in   : ~55 ms × chars (max ~35 chars ≈ 1.9 s)
 *  - stack show : 650 ms pause after full type
 *  - delete    : ~30 ms × chars ≈ 1.0 s
 *  - gap       : 120 ms before next
 * Longest category ("deep learning vision pipeline" = 30 chars):
 *  ≈ 1.65 s type + 0.65 s pause + 0.90 s delete = ~3.2 s — kept tight by
 *  fast delete speed (30 ms).
 */
const BUILD_TYPES = [
  {
    label: "AI chatbot integration",
    stack: "python · openai · node",
  },
  {
    label: "ML churn prediction model",
    stack: "python · scikit-learn · fastapi",
  },
  {
    label: "deep learning vision pipeline",
    stack: "python · pytorch · opencv",
  },
  {
    label: "MERN web platform",
    stack: "mongo · express · react · node",
  },
  {
    label: "React Native mobile app",
    stack: "react native · expo · firebase",
  },
  {
    label: "automation bot",
    stack: "python · playwright · n8n",
  },
  {
    label: "blockchain smart contract",
    stack: "solidity · hardhat · react",
  },
];

const DEFAULT_STACK = "python · node · mongodb · react";

export default function Terminal() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  // showStack: whether we're in the "stack reveal" pause after full type
  const [showStack, setShowStack] = useState(false);
  const pauseRef = useRef(null);

  useEffect(() => {
    // Clear any pending pause timer when deps change
    if (pauseRef.current) clearTimeout(pauseRef.current);

    const current = BUILD_TYPES[idx];
    const speed = deleting ? 30 : 55;

    if (!deleting && !showStack) {
      // Still typing
      if (sub < current.label.length) {
        const t = setTimeout(() => setSub((s) => s + 1), speed);
        return () => clearTimeout(t);
      } else {
        // Fully typed — show stack for 650 ms, then start deleting
        pauseRef.current = setTimeout(() => {
          setShowStack(true);
          pauseRef.current = setTimeout(() => {
            setShowStack(false);
            setDeleting(true);
          }, 650);
        }, 0);
        return () => clearTimeout(pauseRef.current);
      }
    }

    if (deleting) {
      if (sub > 0) {
        const t = setTimeout(() => setSub((s) => s - 1), speed);
        return () => clearTimeout(t);
      } else {
        // Deleted — short gap then advance to next category
        pauseRef.current = setTimeout(() => {
          setDeleting(false);
          setIdx((i) => (i + 1) % BUILD_TYPES.length);
        }, 120);
        return () => clearTimeout(pauseRef.current);
      }
    }
  }, [sub, deleting, showStack, idx]);

  const current = BUILD_TYPES[idx];
  const stackLine = showStack ? current.stack : DEFAULT_STACK;

  return (
    <div
      className="rounded-lg border border-ink-700 bg-ink-950 shadow-2xl w-full max-w-md"
      aria-label="Terminal animation showing types of software FlowState builds"
    >
      <div className="flex items-center gap-1.5 border-b border-ink-800 px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
        <span className="ml-3 text-xs text-slate-500 font-mono">flowstate.build</span>
      </div>
      <div className="p-5 font-mono text-sm text-slate-300 min-h-[160px]" aria-live="polite" aria-atomic="true">
        <p className="text-slate-500">$ flowstate --build</p>
        <p className="mt-2">
          <span className="text-rust-600">building</span>{" "}
          <span className="text-slate-100">{current.label.slice(0, sub)}</span>
          <span
            className="inline-block w-2 h-4 align-middle bg-rust-600 ml-0.5 animate-pulse"
            aria-hidden="true"
          />
        </p>
        {/* Item 13: stack line transitions to category-specific stack while fully visible */}
        <p
          className="mt-4 text-slate-500 transition-opacity duration-300"
          style={{ opacity: showStack ? 1 : 0.55 }}
        >
          stack: {stackLine}
        </p>
        <p className="mt-1 text-emerald-500">status: shipped ✓</p>
      </div>
    </div>
  );
}
