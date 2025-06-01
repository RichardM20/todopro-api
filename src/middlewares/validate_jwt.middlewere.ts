import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import ENV from "../config/env.config";
import User from "../models/user.model";
import { AuthRequest } from "../types/auth.type";
import { HttpBadResponse } from "../utils/http_response";
import logger from "../utils/logger";

const validateJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.SECRET_JWT as string);

    if (typeof decoded !== "object" || !("uid" in decoded)) {
      return HttpBadResponse(
        res,
        401,
        "Access token invalid - Missing uid",
        null
      );
    }

    const { uid } = decoded as JwtPayload;

    req.uid = uid;

    const user = await User.findById(uid);
    if (!user) {
      return HttpBadResponse(
        res,
        401,
        "Access token invalid - Incorrect user",
        null
      );
    }

    next();
  } catch (error) {
    logger.error(error);
    return HttpBadResponse(res, 401, "Access token invalid", null);
  }
};

export default validateJWT;
