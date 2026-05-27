import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next(new ApiError(401, "Authentication token is required."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token."));
  }
};
