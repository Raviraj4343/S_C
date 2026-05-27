import { Router } from "express";
import volunteerRouter from "./volunteerRoutes.js";
import contactRouter from "./contactRoutes.js";
import authRouter from "./authRoutes.js";
import adminRouter from "./adminRoutes.js";
import galleryRouter from "./galleryRoutes.js";

const apiRouter = Router();

apiRouter.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API healthy" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/volunteers", volunteerRouter);
apiRouter.use("/contacts", contactRouter);
apiRouter.use("/gallery", galleryRouter);
apiRouter.use("/admin", adminRouter);

export default apiRouter;
