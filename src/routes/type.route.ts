import { Router } from "express";

import TypeController from "../controllers/type.controller";
import validateJWT from "../middlewares/validate_jwt.middlewere";
import { validateRequest } from "../middlewares/validate_req.middlewere";
import { typeSchema } from "../schemas/type.schema";

const TypeRoutes = (typeController: TypeController) => {
  const router = Router();

  router.get("/", validateJWT, (req, res) => typeController.getTypes(req, res));

  router.post(
    "/",
    [validateJWT, validateRequest(typeSchema, "body")],
    (req, res) => typeController.addType(req, res)
  );

  return router;
};

export default TypeRoutes;
