import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { Volunteer } from "../models/Volunteer.js";

const normalizeArray = (value) => {
  const list = Array.isArray(value) ? value : [];
  return list.map((item) => String(item).trim()).filter(Boolean).slice(0, 12);
};

export const createVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.create({
    fullName: req.body.fullName.trim(),
    email: req.body.email.trim().toLowerCase(),
    phone: req.body.phone.trim(),
    skills: normalizeArray(req.body.skills),
    interests: normalizeArray(req.body.interests),
    message: req.body.message.trim()
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Volunteer application submitted successfully.",
    data: { id: volunteer._id, createdAt: volunteer.createdAt }
  });
});
