import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar.jsx";
import Portfolio from "./Portfolio.jsx";
import Pricing from "./Pricing.jsx";
import Faq from "./Faq.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import Reveal from "./Reveal.jsx";

export default function ServiceLanding({
  title,
  description,
  heroHeadline,
  heroSubheadline,
  useCases,
  portfolioCategories,
}) {
  return (
    <div className="min-h-screen bg-paper text-slate-900 font-sans">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Navbar />
      
      {/* Service-specific Hero */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <Reveal>
          <h1 className="font-mono text-4xl sm:text-5xl text-slate-900 tracking-tight max-w-3xl leading-tight">
            {heroHeadline}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
            {heroSubheadline}
          </p>
        </Reveal>
        
        {useCases && useCases.length > 0 && (
          <div className="mt-16 grid sm:grid-cols-3 gap-8 border-t border-slate-200 pt-16">
            {useCases.map((uc, i) => (
              <Reveal key={i} delay={i * 100}>
                <h3 className="font-mono text-lg text-slate-900">{uc.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{uc.description}</p>
                {uc.metric && (
                  <p className="mt-4 text-xs font-mono text-rust-700 bg-rust-50 inline-block px-2 py-1 rounded">
                    {uc.metric}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Filtered Portfolio */}
      <Portfolio categories={portfolioCategories} />
      
      {/* Existing Sections */}
      <Pricing />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
