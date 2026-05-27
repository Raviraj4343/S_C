import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 120
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1200
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Contact = mongoose.model("Contact", contactSchema);
