import { Router } from "express";

import AuthController from "../controllers/auth.controller";
import validateJWT from "../middlewares/validate_jwt.middlewere";
import { validateRequest } from "../middlewares/validate_req.middlewere";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const AuthRoutes = (authController: AuthController) => {
  const router = Router();

  router.post("/login", validateRequest(loginSchema), (req, res) =>
    authController.login(req, res)
  );

  router.post("/register", validateRequest(registerSchema), (req, res) =>
    authController.register(req, res)
  );

  router.get("/refreshMe", validateJWT, (req, res) =>
    authController.refreshMe(req, res)
  );

   router.post("/logout", validateJWT, (req, res) =>
     authController.logout(req, res)
   );

  return router;
};

export default AuthRoutes;
