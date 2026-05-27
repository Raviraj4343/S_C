import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { GalleryImage } from "../models/GalleryImage.js";

export const listGalleryImages = asyncHandler(async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
  return sendSuccess(res, { data: images });
});
