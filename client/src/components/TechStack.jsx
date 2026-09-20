/**
 * Item 15: Added id="stack" for Navbar anchor, consistent section padding.
 * Item 3:  Added aria-label on the tech grid.
 */
const STACK = [
  { name: "MongoDB",  role: "Data layer" },
  { name: "Express",  role: "API layer" },
  { name: "React",    role: "Interface" },
  { name: "Node.js",  role: "Runtime" },
  { name: "Python",   role: "AI / ML / DL" },
  { name: "Docker",   role: "Deployment" },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="bg-ink-950 text-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 id="stack-heading" className="font-mono text-2xl mb-10">
          Core stack, extended per project
        </h2>
        <div
          className="flex flex-wrap border border-ink-700 rounded-lg overflow-hidden"
          role="list"
          aria-label="Core technology stack used on every project"
        >
          {STACK.map((t, i) => (
            <div
              key={t.name}
              role="listitem"
              className={`flex-1 min-w-[140px] px-5 py-6 ${
                i !== STACK.length - 1 ? "border-r border-ink-700" : ""
              }`}
            >
              <p className="font-mono text-white">{t.name}</p>
              <p className="text-slate-500 text-xs mt-1">{t.role}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-sm mt-4">
          Plus TensorFlow, PyTorch, React Native, and cloud infrastructure when a project calls for it.
        </p>
      </div>
    </section>
  );
}
