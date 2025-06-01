import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { HttpBadResponse } from "../utils/http_response";
import logger from "../utils/logger";

export const validateRequest = (schema: any, source?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (source && Object.keys(req.body).length == 0) {
        return HttpBadResponse(
          res,
          400,
          "Bad Request",
          "Body no must be empty"
        );
      }
      schema.parse(req.body);
      next();
    } catch (error) {
      logger.error(error);
      if (error instanceof ZodError) {
        const errorData = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        }));
        return HttpBadResponse(res, 400, "Bad Request", errorData);
      }
      return HttpBadResponse(res, 500, "Server error", null);
    }
  };
};
