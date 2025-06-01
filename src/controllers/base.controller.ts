import { Response } from "express";
import { ApiError } from "../utils/errors/api_errors";
import { HttpBadResponse, HttpResponse } from "../utils/http_response";
import logger from "../utils/logger";

class BaseController {
  protected handleResponse(
    res: Response,
    statusCode: number,
    message: string,
    data: unknown = null
  ) {
    if (statusCode >= 400) {
      logger.error(message);
      HttpBadResponse(res, statusCode, message, data);
    } else {
      HttpResponse(res, statusCode, message, data);
    }
  }

  protected async executeAction(res: Response, action: () => Promise<unknown>) {
    try {
      await action();
    } catch (error) {
      if (error instanceof ApiError) {
        this.handleResponse(res, error.statusCode, error.message);
      } else {
        this.handleResponse(res, 500, "Internal server error");
      }
    }
  }
}

export default BaseController;
