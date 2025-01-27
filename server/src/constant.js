// backend comment connection
export const db_name = process.env.DB_NAME || "cartify";
export const mongodb_uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
export const port = process.env.PORT || 4000;
export const cor = process.env.CORS || "*";
export const redirect_url = process.env.ECOMMERCE_REDIRECT_URL || "";

// payment gateway manage
export const stripe_webhook_secret = process.env.STRIPE_WEBHOOK_SECRET || "";
export const stripe_api_key = process.env.STRIPE_API_KEY || "";

// authentication token manage
export const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || "";
export const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "";

// cloudinary with files manage
export const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME || "";
export const cloudinary_api_key = process.env.CLOUDINARY_API_KEY || "";
export const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET || "";
