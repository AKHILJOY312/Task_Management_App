import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/di/types";
import { AuthController } from "@/interface-adapters/controllers/auth/AuthController";
import { createProtectMiddleware } from "@/infra/web/express/middleware/protect";
import passport from "passport";
import { API_ROUTES } from "@/config/routes.config";
import { asyncHandler } from "../handler/asyncHandler";

export function getAuthRoutes(container: Container): Router {
  const router = Router();

  const authController = container.get<AuthController>(TYPES.AuthController);

  const protect = container.get<ReturnType<typeof createProtectMiddleware>>(
    TYPES.ProtectMiddleware,
  );

  router.post(
    API_ROUTES.AUTH.REGISTER,
    asyncHandler(authController.register.bind(authController)),
  );

  router.post(
    API_ROUTES.AUTH.LOGIN,
    asyncHandler(authController.login.bind(authController)),
  );
  router.post(
    API_ROUTES.AUTH.REFRESH,
    asyncHandler(authController.refreshToken.bind(authController)),
  );
  router.post(
    API_ROUTES.AUTH.LOGOUT,
    authController.logout.bind(authController),
  );
  router.get(
    API_ROUTES.AUTH.ME,
    protect,
    asyncHandler(authController.me.bind(authController)),
  );

  router.get(
    API_ROUTES.AUTH.GOOGLE.PASSPORT,
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );

  return router;
}
