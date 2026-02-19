import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/di/types";
import { AuthController } from "@/interface-adapters/controllers/auth/AuthController";
import { asyncHandler } from "../handler/asyncHandler";
import { createProtectMiddleware } from "../middleware/protect";

export function getAuthRoutes(container: Container): Router {
  const router = Router();

  const authController = container.get<AuthController>(TYPES.AuthController);

  const protect = container.get<ReturnType<typeof createProtectMiddleware>>(
    TYPES.ProtectMiddleware,
  );
  // --- Public Routes ---

  router.post("/register", asyncHandler(authController.register));

  router.post("/verify-email", asyncHandler(authController.verifyEmail));

  router.post("/login", asyncHandler(authController.login));

  router.post("/refresh", asyncHandler(authController.refreshToken));

  router.post("/logout", asyncHandler(authController.logout));

  // --- Protected Routes ---

  router.get("/me", protect, asyncHandler(authController.me));

  return router;
}
