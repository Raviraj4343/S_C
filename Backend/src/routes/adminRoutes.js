import { Router } from "express";
import {
  createGalleryImage,
  deleteContact,
  deleteGalleryImage,
  deleteVolunteer,
  getDashboardSummary,
  listContactsForAdmin,
  listGalleryImagesForAdmin,
  listVolunteersForAdmin
} from "../controllers/adminController.js";
import { requireAdminAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/requestValidationMiddleware.js";
import { uploadGalleryImage } from "../middleware/uploadMiddleware.js";
import { adminQueryValidation } from "../validators/index.js";

const adminRouter = Router();

adminRouter.use(requireAdminAuth);

adminRouter.get("/summary", getDashboardSummary);
adminRouter.get("/volunteers", adminQueryValidation, validateRequest, listVolunteersForAdmin);
adminRouter.get("/contacts", adminQueryValidation, validateRequest, listContactsForAdmin);
adminRouter.get("/gallery", listGalleryImagesForAdmin);
adminRouter.post("/gallery", uploadGalleryImage.single("image"), createGalleryImage);
adminRouter.delete("/gallery/:id", deleteGalleryImage);
adminRouter.delete("/volunteers/:id", deleteVolunteer);
adminRouter.delete("/contacts/:id", deleteContact);

export default adminRouter;
