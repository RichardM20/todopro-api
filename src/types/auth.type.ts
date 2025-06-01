import { Request } from "express";
import { IUser } from "./user.type";

interface IAuth {
  accessToken: string;
  user: IUser;
}

interface AuthRequest extends Request {
  uid?: string;
}

export { AuthRequest, IAuth };
