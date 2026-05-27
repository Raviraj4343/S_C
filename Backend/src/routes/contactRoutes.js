import { Router } from "express";
import { createContactMessage } from "../controllers/contactController.js";
import { validateRequest } from "../middleware/requestValidationMiddleware.js";
import { contactValidation } from "../validators/index.js";

const contactRouter = Router();

contactRouter.post("/", contactValidation, validateRequest, createContactMessage);

export default contactRouter;
