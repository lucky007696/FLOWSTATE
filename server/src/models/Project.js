import mongoose from "mongoose";

/**
 * Project schema.
 * Item 2:  Added slug, problem, approach, outcome fields for case study pages.
 * Item 18: Added indexes on category and createdAt for query performance.
 */
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      // Standardised label: "AUTOMATION" used in seed data, Services.jsx, and Portfolio cards.
      // "RPA" was retired to remove the inconsistency between the model and the front-end tag.
      enum: ["AI", "ML", "DL", "WEB", "APP", "AUTOMATION", "WEB3", "OPS"],
      required: true,
    },
    description: { type: String, required: true },
    stack: [{ type: String }],
    link: { type: String },
    featured: { type: Boolean, default: false },
    // Case study fields (item 2)
    problem:  { type: String, default: "" },
    approach: { type: String, default: "" },
    outcome:  { type: String, default: "" },
  },
  { timestamps: true }
);

// Item 18: Indexes on frequently queried / sorted fields
projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });
// Note: slug has unique:true which auto-creates an index; no explicit schema.index needed.

export default mongoose.model("Project", projectSchema);
