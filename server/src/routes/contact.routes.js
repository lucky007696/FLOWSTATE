import { Router } from "express";
import { body } from "express-validator";
import { createContactMessage, listContactMessages } from "../controllers/contact.controller.js";
import adminAuth from "../middleware/adminAuth.js";

/**
 * Item 6: express-validator chain on POST /api/contact.
 * The honeypot field `website` is intentionally NOT validated here —
 * it is checked inside the controller (item 4).
 */
const contactValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ max: 120 }).withMessage("Name must be 120 characters or fewer."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("projectType")
    .optional()
    .isIn(["Web Application", "AI Solution", "Machine Learning", "Deep Learning", "Mobile App", "Automation", "Other"])
    .withMessage("Invalid project type."),

  body("budget")
    .optional()
    .isLength({ max: 60 }).withMessage("Budget field must be 60 characters or fewer."),

  body("message")
    .trim()
    .notEmpty().withMessage("Project details are required.")
    .isLength({ min: 10, max: 4000 }).withMessage("Message must be between 10 and 4000 characters."),
];

const router = Router();

router.post("/", contactValidation, createContactMessage);
router.get("/", adminAuth, listContactMessages); // protected with adminAuth

export default router;
