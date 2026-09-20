import mongoose from "mongoose";

/**
 * ContactMessage schema.
 * Item 18: Added indexes on createdAt and status for query performance.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 120 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    projectType: {
      type: String,
      enum: ["Web Application", "AI Solution", "Machine Learning", "Deep Learning", "Mobile App", "Automation", "Other"],
      default: "Other",
    },
    budget:  { type: String, trim: true, maxlength: 60 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status:  { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

// Item 18: Indexes on fields used in listing / filtering
contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ status: 1 });

export default mongoose.model("ContactMessage", contactMessageSchema);
