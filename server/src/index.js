import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Item 17: Security headers
app.use(helmet());

// Item 17: HTTP request logging
app.use(morgan("combined"));

// Item 19: CORS allowlist read from env; falls back to localhost for development.
// Set CORS_ORIGINS as a comma-separated list of allowed origins in production.
const rawOrigins = process.env.CORS_ORIGINS || "http://localhost:5173";
const allowedOrigins = rawOrigins.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy does not allow origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

// Rate limiter on contact form (unchanged)
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

// Routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/projects", projectRoutes);

// Item 7: Catch-all 404 for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Item 7: Global JSON error handler — must have 4 params for Express to use it as error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "An unexpected error occurred."
      : err.message || "An unexpected error occurred.";
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} → ${status}: ${err.message}`);
  res.status(status).json({ error: message });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
