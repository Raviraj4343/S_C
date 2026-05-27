import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { signAdminToken } from "../services/tokenService.js";

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedEmail || !expectedPasswordHash) {
    throw new ApiError(500, "Admin credentials are not configured.");
  }

  const isEmailValid = email.toLowerCase() === expectedEmail.toLowerCase();
  const isPasswordValid = await bcrypt.compare(password, expectedPasswordHash);

  if (!isEmailValid || !isPasswordValid) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const token = signAdminToken({ role: "admin", email: expectedEmail });

  return sendSuccess(res, {
    statusCode: 200,
    message: "Login successful.",
    data: { token, admin: { email: expectedEmail, role: "admin" } }
  });
});

export const getAdminSession = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Session valid.",
    data: { admin: { email: req.admin.email, role: req.admin.role } }
  });
});
