import React from "react";
import ServiceLanding from "../components/ServiceLanding.jsx";

export default function AutomationPage() {
  return (
    <ServiceLanding
      title="Automation & Bot Development — FlowState"
      description="Replace manual, rule-based work with custom scripts and bots that run without intervention. Stop wasting hours on document processing, ticket routing, and invoice matching."
      heroHeadline="Stop doing work a script could do."
      heroSubheadline="We build custom automation pipelines and bots that eliminate manual data entry, streamline ticket routing, and automate invoice matching — so your team can focus on high-value work."
      useCases={[
        {
          title: "Invoice Reconciliation",
          description: "Automatically extract data from incoming PDFs and match it against purchase orders in your ERP.",
          metric: "Saves 15+ hours/week",
        },
        {
          title: "Support Ticket Triage",
          description: "Classify, tag, and route incoming customer support tickets to the right team instantly using AI.",
          metric: "40% faster resolution",
        },
        {
          title: "Data Sync Pipelines",
          description: "Connect legacy systems that don't natively talk to each other, ensuring data consistency across your stack.",
          metric: "Zero manual entry",
        },
      ]}
      portfolioCategories={["AUTOMATION", "RPA"]}
    />
  );
}
