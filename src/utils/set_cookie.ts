import { Response } from "express";
import ENV from "../config/env.config";

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600000,
  });
};

export function clearTokenCookie(res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}
