import { Router } from "express";
import { container } from "@/config/di/container";

import { getAuthRoutes } from "./authRoutes";

import { getProjectRoutes } from "./projectRoutes";

import { API_ROUTES } from "@/config/routes.config";

const router = Router();

router.use((req, res, next) => {
  console.log("req.body:", req.body);
  next();
});

router.use(API_ROUTES.AUTH.ROOT, getAuthRoutes(container));

router.use(API_ROUTES.PROJECTS.ROOT, getProjectRoutes(container));

export default router;
