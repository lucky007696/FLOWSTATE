import { useState } from "react";
import { api } from "../api/client.js";

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || null;
const WHATSAPP_URL = "https://wa.me/919014466834";
const CONTACT_EMAIL = "flowstateteams@gmail.com";

const PROJECT_TYPES = [
  "Web Application",
  "AI Solution",
  "Machine Learning",
  "Deep Learning",
  "Mobile App",
  "Automation",
  "Other",
];

const inputClass =
  "bg-ink-900 border border-ink-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-rust-600 text-white placeholder-slate-600";

/**
 * Items 4, 9:
 *  - Honeypot hidden field `website` (bots fill it; humans don't).
 *  - Booking link alternative CTA.
 * Item 3: Descriptive labels and aria attributes on all form controls.
 */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    budget: "",
    message: "",
    website: "", // Item 4: honeypot — hidden from real users
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setError("");
    try {
      await api.sendContactMessage(form);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink-950 text-white py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 id="contact-heading" className="font-mono text-2xl mb-3">
          Start a project
        </h2>
        <p className="text-slate-400 mb-3">
          Describe the manual process, the volume, and the outcome you want. We'll reply within
          one business day with whether it's a good fit and a rough scope.
        </p>
        {/* Alternative contact options */}
        <p className="text-slate-500 text-sm mb-10">
          Prefer a quicker chat?{" "}
          <a
            href={BOOKING_URL || WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust-600 hover:text-rust-500 underline transition-colors"
            aria-label={BOOKING_URL ? "Book a free 30-minute call" : "Chat on WhatsApp"}
          >
            {BOOKING_URL ? "Book a free 30-min call →" : "Chat on WhatsApp →"}
          </a>
          {" "}or email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-rust-600 hover:text-rust-500 underline transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </p>

        {status === "sent" ? (
          <div
            role="status"
            aria-live="polite"
            className="border border-emerald-700 bg-emerald-950/40 rounded-lg p-6"
          >
            <p className="text-emerald-400 font-medium">Message sent.</p>
            <p className="text-slate-400 text-sm mt-1">
              Thanks, {form.name} — we'll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5" noValidate>
            {/* Item 4: Honeypot field — visually hidden, ignored by screen readers */}
            <div
              className="absolute opacity-0 pointer-events-none h-0 overflow-hidden"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px" }}
            >
              <label htmlFor="contact-website">Website (do not fill this in)</label>
              <input
                id="contact-website"
                type="text"
                name="website"
                value={form.website}
                onChange={update("website")}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-name" className="text-sm text-slate-400">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                required
                className={inputClass}
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
                placeholder="Your full name"
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-email" className="text-sm text-slate-400">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                required
                type="email"
                className={inputClass}
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                placeholder="you@company.com"
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-project-type" className="text-sm text-slate-400">
                Project type
              </label>
              <select
                id="contact-project-type"
                className={inputClass}
                value={form.projectType}
                onChange={update("projectType")}
                aria-label="Select the type of project you want to build"
              >
                {PROJECT_TYPES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-budget" className="text-sm text-slate-400">
                Budget{" "}
                <span className="text-slate-600 text-xs">(optional)</span>
              </label>
              <input
                id="contact-budget"
                placeholder="e.g. Under $10k / $10k–$50k / No budget set yet"
                className={inputClass}
                value={form.budget}
                onChange={update("budget")}
                aria-label="Approximate budget for this project (optional)"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="contact-message" className="text-sm text-slate-400">
                Project details <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                className={inputClass}
                value={form.message}
                onChange={update("message")}
                placeholder="What are you trying to build? What problem does it solve? What does success look like?"
                aria-required="true"
                aria-describedby="contact-message-hint"
              />
              <p id="contact-message-hint" className="text-xs text-slate-600">
                The more detail the better — it helps us give you an accurate scope and timeline.
              </p>
            </div>

            {status === "error" && (
              <p
                role="alert"
                aria-live="assertive"
                className="sm:col-span-2 text-sm text-red-400"
              >
                {error}
              </p>
            )}

            <div className="sm:col-span-2 flex flex-wrap gap-4 items-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 bg-rust-600 hover:bg-rust-700 active:scale-95 disabled:opacity-60 text-white rounded-md px-5 py-3 text-sm font-medium transition-all duration-150"
                aria-label={status === "sending" ? "Sending your message…" : "Send your project enquiry"}
              >
                {status === "sending" ? (
                  <>
                    {/* Item 16: SVG spinner visible while sending */}
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
              <a
                href={BOOKING_URL || WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink-700 hover:border-slate-500 text-slate-300 rounded-md px-5 py-3 text-sm font-medium transition-colors"
                aria-label={BOOKING_URL ? "Book a free 30-minute intro call" : "Chat on WhatsApp instead"}
              >
                {BOOKING_URL ? "Book a call instead" : "WhatsApp instead ↗"}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
