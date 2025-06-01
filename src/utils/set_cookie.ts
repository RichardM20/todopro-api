import { Response } from "express";
import ENV from "../config/env.config";

export const setTokenCookie = (res: Response, token: string) => {
  const isProd = ENV.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 3600000,
  });
};

export function clearTokenCookie(res: Response) {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
    path: "/",
  });
}
