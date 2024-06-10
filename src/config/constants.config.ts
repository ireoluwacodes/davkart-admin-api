import { config } from "dotenv";

config();

export const PORT = process.env.PORT || "3000";
export const secret = process.env.JWT_SECRET;
export const localMUrl = process.env.LOCAL_MONGO_URL;
export const webMUrl = process.env.MONGO_URL;
export const nodeEnv = process.env.NODE_ENV;
export const mailHost = process.env.MAIL_HOST;
export const mailPass = process.env.PASS;
export const mailUser = process.env.USER;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
export const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const googleClientRedirect = process.env.CLIENT_REDIRECT;
export const sessionSecret = process.env.SESSION_SECRET