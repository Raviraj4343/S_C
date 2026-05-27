import { body, query } from "express-validator";

export const volunteerValidation = [
  body("fullName").trim().isLength({ min: 2, max: 80 }).withMessage("Full name must be 2-80 characters."),
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("phone").trim().isLength({ min: 7, max: 20 }).withMessage("Phone must be 7-20 characters."),
  body("message").trim().isLength({ min: 10, max: 1200 }).withMessage("Message must be 10-1200 characters."),
  body("skills").optional().customSanitizer((value) => (Array.isArray(value) ? value : String(value || "").split(","))).isArray().withMessage("Skills must be an array."),
  body("interests").optional().customSanitizer((value) => (Array.isArray(value) ? value : String(value || "").split(","))).isArray().withMessage("Interests must be an array.")
];

export const contactValidation = [
  body("fullName").trim().isLength({ min: 2, max: 80 }).withMessage("Full name must be 2-80 characters."),
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("subject").trim().isLength({ min: 4, max: 120 }).withMessage("Subject must be 4-120 characters."),
  body("message").trim().isLength({ min: 10, max: 1200 }).withMessage("Message must be 10-1200 characters.")
];

export const adminLoginValidation = [
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password is required.")
];

export const adminQueryValidation = [
  query("search").optional().trim().isLength({ max: 100 }).withMessage("Search text is too long.")
];
