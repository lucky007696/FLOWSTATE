import React from "react";
import ServiceLanding from "../components/ServiceLanding.jsx";

export default function WebDevelopmentPage() {
  return (
    <ServiceLanding
      title="Web Application Development — FlowState"
      description="Full-stack MERN applications built from schema to deployment. We build admin dashboards, customer portals, marketplaces, and internal tools."
      heroHeadline="Custom web apps, built to scale."
      heroSubheadline="We help founders and product teams build robust full-stack applications. From database schema to deployment, we handle the entire MERN stack to deliver performant dashboards, portals, and marketplaces."
      useCases={[
        {
          title: "Multi-vendor Marketplaces",
          description: "Complex platforms with secure vendor dashboards, inventory management, and automated Stripe payouts.",
          metric: "Full-stack MERN",
        },
        {
          title: "Internal Admin Dashboards",
          description: "Secure, role-based portals to manage your operations, view analytics, and control your business logic.",
          metric: "Role-based Auth",
        },
        {
          title: "Customer Portals",
          description: "Self-serve platforms where your users can manage their accounts, subscriptions, and data securely.",
          metric: "High performance",
        },
      ]}
      portfolioCategories={["WEB"]}
    />
  );
}
