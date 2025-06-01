import { Response } from "express";


import TypeService from "../services/type.service";
import { AuthRequest } from "../types/auth.type";
import { IType } from "../types/type.types";
import BaseController from "./base.controller";

class TypeController extends BaseController {
  private typeService: TypeService;

  constructor(typeService: TypeService) {
    super();
    this.typeService = typeService;
  }

  async getTypes(req: AuthRequest, res: Response) {
    const uid = req.uid;

    await this.executeAction(res, async () => {
      const types = await this.typeService.getTypes(uid!);
      this.handleResponse(res, 200, "success", types);
    });
  }

  async addType(req: AuthRequest, res: Response) {
    const type: IType = req.body;

    const userId = req.uid ?? "";

    await this.executeAction(res, async () => {
      await this.typeService.addType(userId, type);
      this.handleResponse(res, 200, "sucess", true);
    });
  }
}

export default TypeController;
