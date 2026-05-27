import { Router } from "express";
import { adminLogin, getAdminSession } from "../controllers/authController.js";
import { requireAdminAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/requestValidationMiddleware.js";
import { adminLoginValidation } from "../validators/index.js";

const authRouter = Router();

authRouter.post("/login", adminLoginValidation, validateRequest, adminLogin);
authRouter.get("/session", requireAdminAuth, getAdminSession);

export default authRouter;
