import React from "react";
import ServiceLanding from "../components/ServiceLanding.jsx";

export default function AiMlPage() {
  return (
    <ServiceLanding
      title="AI & Machine Learning Solutions — FlowState"
      description="Train prediction and scoring models on your own data. We build deep learning vision systems and classification models to solve complex business problems."
      heroHeadline="Solve problems rules can't fix."
      heroSubheadline="When rule-based systems hit their ceiling, we build neural networks and machine learning models on your own data. From fraud detection to computer vision, we deploy models as APIs your app can call."
      useCases={[
        {
          title: "Predictive Scoring",
          description: "Train models on historical data to predict churn, forecast demand, or score transactions in real-time.",
          metric: "High accuracy",
        },
        {
          title: "Computer Vision",
          description: "Camera-based object detection, OCR, and spatial analysis for retail, manufacturing, and logistics.",
          metric: "Automated inspection",
        },
        {
          title: "LLM & GenAI Integration",
          description: "Embed natural language capabilities into your products for smarter search, summarization, and copilot features.",
          metric: "Context-aware AI",
        },
      ]}
      portfolioCategories={["AI", "ML", "DL"]}
    />
  );
}
