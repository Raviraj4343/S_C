import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    publicId: {
      type: String,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
