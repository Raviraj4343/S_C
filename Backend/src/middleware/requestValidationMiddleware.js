import { validationResult } from "express-validator";
import { sendError } from "../utils/apiResponse.js";

export const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return sendError(res, {
    statusCode: 422,
    message: "Validation failed.",
    errors: result.array().map((item) => ({ field: item.path, message: item.msg }))
  });
};
