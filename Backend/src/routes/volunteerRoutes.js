import { Router } from "express";
import { createVolunteer } from "../controllers/volunteerController.js";
import { validateRequest } from "../middleware/requestValidationMiddleware.js";
import { volunteerValidation } from "../validators/index.js";

const volunteerRouter = Router();

volunteerRouter.post("/", volunteerValidation, validateRequest, createVolunteer);

export default volunteerRouter;
