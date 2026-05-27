const requiredKeys = [
  "PORT",
  "MONGODB_URI",
  "CORS_ORIGIN",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET"
];

export const validateEnv = () => {
  const missing = requiredKeys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};
