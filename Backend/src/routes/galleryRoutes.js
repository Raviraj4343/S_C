import { Router } from "express";
import { listGalleryImages } from "../controllers/galleryController.js";

const galleryRouter = Router();

galleryRouter.get("/", listGalleryImages);

export default galleryRouter;
