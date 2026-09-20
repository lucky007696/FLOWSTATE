import { Router } from "express";
import { body, param, query } from "express-validator";
import { listProjects, getProjectBySlug, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const VALID_CATEGORIES = ["AI", "ML", "DL", "WEB", "APP", "RPA", "WEB3", "OPS"];

/**
 * Item 6: express-validator on GET (category filter) and POST (create project).
 * Item 2: GET /:slug for case study detail pages.
 */
const router = Router();

// Validate optional category query param
const listValidation = [
  query("category")
    .optional()
    .isIn(VALID_CATEGORIES)
    .withMessage("Invalid category."),
];

// Validate slug param
const slugValidation = [
  param("slug")
    .trim()
    .notEmpty().withMessage("Slug is required.")
    .isSlug().withMessage("Invalid slug format."),
];

// Validate project creation body
const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required.").isLength({ max: 200 }),
  body("slug").trim().notEmpty().withMessage("Slug is required.").isSlug(),
  body("category").isIn(VALID_CATEGORIES).withMessage("Invalid category."),
  body("description").trim().notEmpty().withMessage("Description is required."),
];

router.get("/", listValidation, listProjects);
router.get("/:slug", slugValidation, getProjectBySlug);        // Item 2
router.post("/", adminAuth, createValidation, createProject);  // protected
router.put("/:id", adminAuth, createValidation, updateProject); // protected
router.delete("/:id", adminAuth, deleteProject);               // protected

export default router;
