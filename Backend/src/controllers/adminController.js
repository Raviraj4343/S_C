import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { getCloudinaryClient } from "../config/cloudinary.js";
import { Volunteer } from "../models/Volunteer.js";
import { Contact } from "../models/Contact.js";
import { GalleryImage } from "../models/GalleryImage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/apiResponse.js";

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const cloudinary = getCloudinaryClient();
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "shecan/gallery",
        resource_type: "image"
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    stream.end(buffer);
  });

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [volunteerCount, contactCount, galleryCount, recentVolunteers, recentContacts] = await Promise.all([
    Volunteer.countDocuments(),
    Contact.countDocuments(),
    GalleryImage.countDocuments(),
    Volunteer.find().sort({ createdAt: -1 }).limit(6).lean(),
    Contact.find().sort({ createdAt: -1 }).limit(6).lean()
  ]);

  return sendSuccess(res, {
    data: { volunteerCount, contactCount, galleryCount, recentVolunteers, recentContacts }
  });
});

export const listVolunteersForAdmin = asyncHandler(async (req, res) => {
  const search = req.query.search?.trim();
  const filter = search
    ? {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const volunteers = await Volunteer.find(filter).sort({ createdAt: -1 }).lean();
  return sendSuccess(res, { data: volunteers });
});

export const listContactsForAdmin = asyncHandler(async (req, res) => {
  const search = req.query.search?.trim();
  const filter = search
    ? {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
  return sendSuccess(res, { data: contacts });
});

export const listGalleryImagesForAdmin = asyncHandler(async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
  return sendSuccess(res, { data: images });
});

export const createGalleryImage = asyncHandler(async (req, res) => {
  if (!req.file?.buffer) {
    throw new ApiError(400, "Image file is required.");
  }

  const title = String(req.body.title || "Community Moment").trim();
  const uploaded = await uploadToCloudinary(req.file.buffer);

  const image = await GalleryImage.create({
    title: title || "Community Moment",
    imageUrl: uploaded.secure_url,
    publicId: uploaded.public_id
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Gallery image uploaded.",
    data: image
  });
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid gallery image id.");
  }

  const image = await GalleryImage.findByIdAndDelete(id);

  if (!image) {
    throw new ApiError(404, "Gallery image not found.");
  }

  if (image.publicId) {
    const cloudinary = getCloudinaryClient();
    await cloudinary.uploader.destroy(image.publicId, { resource_type: "image" });
  } else if (image.imageUrl?.startsWith("/uploads/")) {
    const fileName = path.basename(image.imageUrl);
    const filePath = path.join(process.cwd(), "uploads", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return sendSuccess(res, { message: "Gallery image deleted." });
});

export const deleteVolunteer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid volunteer id.");
  }

  const deleted = await Volunteer.findByIdAndDelete(id);

  if (!deleted) {
    throw new ApiError(404, "Volunteer not found.");
  }

  return sendSuccess(res, { message: "Volunteer deleted." });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid contact id.");
  }

  const deleted = await Contact.findByIdAndDelete(id);

  if (!deleted) {
    throw new ApiError(404, "Contact message not found.");
  }

  return sendSuccess(res, { message: "Contact message deleted." });
});
