import mongoose from "mongoose";
import logger from "../utils/logger";
import ENV from "./env.config";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_CNN as string).then((event) => {
      logger.info("DB Connected successfully");
    });
  } catch (error) {
    logger.error("Error connecting to DB:", error);
    throw error;
  }
};

export default connectDB;
