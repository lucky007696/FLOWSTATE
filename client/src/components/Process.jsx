import Reveal from "./Reveal.jsx";

const PROCESS = [
  { n: "01", title: "Discover", desc: "We map the problem, the users, and what success looks like." },
  { n: "02", title: "Design", desc: "Architecture and interface decisions, reviewed before a line of code is final." },
  { n: "03", title: "Develop", desc: "Iterative builds with working software in your hands every week." },
  { n: "04", title: "Deploy", desc: "Shipped to production with monitoring and rollback in place." },
  { n: "05", title: "Support", desc: "Bug fixes, iteration, and scaling help after launch." },
];

export default function Process() {
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <h2 className="font-mono text-2xl text-slate-900 mb-12">How a project runs</h2>
      </Reveal>
      <div className="grid md:grid-cols-5 gap-8">
        {PROCESS.map((p) => (
          <Reveal key={p.n} className="border-t-2 border-rust-600 pt-4">
            <p className="font-mono text-sm text-rust-700">{p.n}</p>
            <h3 className="mt-2 font-medium text-slate-900">{p.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
