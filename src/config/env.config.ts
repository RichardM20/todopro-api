import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "dev";

export const ENV = {
  NODE_ENV,
  PORT: process.env.PORT || 3000,
  MONGODB_CNN: process.env.MONGODB_CNN,
  SECRET_JWT: process.env.SECRET_JWT,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  FRONT_END: process.env.FRONT_END,
};

if (!ENV.MONGODB_CNN) {
  console.error('❌ MONGODB_CNN environment variable is required');
  process.exit(1);
}

export default ENV;