import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedCapability from "./components/FeaturedCapability.jsx";
import TrustBar from "./components/TrustBar.jsx";
import Services from "./components/Services.jsx";
import TechStack from "./components/TechStack.jsx";
import Process from "./components/Process.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Pricing from "./components/Pricing.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * React.lazy code splitting — CaseStudy is only fetched on /work/:slug navigation.
 */
const CaseStudy = lazy(() => import("./pages/CaseStudy.jsx"));

/** Landing page — all sections in order. */
function Home() {
  return (
    <div className="min-h-screen bg-paper text-slate-900 font-sans">
      <Navbar />
      <Hero />
      <FeaturedCapability />
      <TrustBar />
      <Services />
      <TechStack />
      <Process />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

// Item 16: ErrorBoundary wraps all routes
export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/* Item 2 + 12: Case study route, lazily loaded */}
        <Route
          path="/work/:slug"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-ink-950 flex items-center justify-center">
                  <span className="font-mono text-slate-500 text-sm animate-pulse">
                    Loading case study…
                  </span>
                </div>
              }
            >
              <CaseStudy />
            </Suspense>
          }
        />
        {/* Item 7: 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
    </ErrorBoundary>
  );
}
