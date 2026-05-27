import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { Contact } from "../models/Contact.js";

export const createContactMessage = asyncHandler(async (req, res) => {
  const entry = await Contact.create({
    fullName: req.body.fullName.trim(),
    email: req.body.email.trim().toLowerCase(),
    subject: req.body.subject.trim(),
    message: req.body.message.trim()
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Message received. We will get back to you soon.",
    data: { id: entry._id, createdAt: entry.createdAt }
  });
});
