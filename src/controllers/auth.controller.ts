import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { AuthRequest } from "../types/auth.type";
import { clearTokenCookie, setTokenCookie } from "../utils/set_cookie";
import BaseController from "./base.controller";

class AuthController extends BaseController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    await this.executeAction(res, async () => {
      const { email, password } = req.body;
      const { user, accessToken } = await this.authService.login(
        email,
        password
      );
      setTokenCookie(res, accessToken);
      this.handleResponse(res, 200, "success", user);
    });
  }

  async register(req: Request, res: Response) {
    await this.executeAction(res, async () => {
      const { name, email, password } = req.body;
      const { accessToken, user } = await this.authService.register(
        name,
        email,
        password
      );
      setTokenCookie(res, accessToken);
      this.handleResponse(res, 200, "success", user);
    });
  }

  async refreshMe(req: AuthRequest, res: Response) {
    await this.executeAction(res, async () => {
      const userId = req.uid ?? "";
      const user = await this.authService.refreshMe(userId);
      this.handleResponse(res, 200, "success", user);
    });
  }

  async logout(req: Request, res: Response) {
    try {
      clearTokenCookie(res);
      this.handleResponse(res, 200, "success");
    } catch (error) {
      this.handleResponse(res, 500, "Internal server error");
    }
  }
}

export default AuthController;
