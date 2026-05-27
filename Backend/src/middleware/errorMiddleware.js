import { ApiError } from "../utils/ApiError.js";
import { sendError } from "../utils/apiResponse.js";

export const notFoundHandler = (req, res) => {
  return sendError(res, {
    statusCode: 404,
    message: "Requested resource was not found."
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : err.statusCode || 500;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  return sendError(res, {
    statusCode,
    message: err.message || "Something went wrong. Please try again later."
  });
};
