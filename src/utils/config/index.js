import dotenv from "dotenv";
import path from "path";

const root = path.join.bind(this, __dirname, "../../../");

dotenv.config({ path: root(".env") });

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = !isProduction;

export const mongo_uri = process.env.MONGO_URI;
export const port = process.env.PORT;
