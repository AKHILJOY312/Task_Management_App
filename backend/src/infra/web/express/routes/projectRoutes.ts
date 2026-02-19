import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/di/types";

import { createProtectMiddleware } from "@/infra/web/express/middleware/protect";
import { API_ROUTES } from "@/config/routes.config";
import { asyncHandler } from "../handler/asyncHandler";
import { TaskController } from "@/interface-adapters/controllers/task/TaskController";
// import { MemberSearchController } from "@/interface-adapters/controllers/task/MemberSearchController";

export function getProjectRoutes(container: Container): Router {
  const router = Router();

  const taskController = container.get<TaskController>(TYPES.TaskController);
  // const searchController = container.get<MemberSearchController>(
  //   TYPES.MemberSearchController,
  // );

  const protect = container.get<ReturnType<typeof createProtectMiddleware>>(
    TYPES.ProtectMiddleware,
  );

  router.use(protect);

  //Tasks
  router
    .route(API_ROUTES.PROJECTS.TASKS.ROOT)
    .post(asyncHandler(taskController.createTask))
    .get(asyncHandler(taskController.listTasks));

  // router
  //   .route(API_ROUTES.PROJECTS.TASKS.MEMBERS_SEARCH)
  //   .get(asyncHandler(searchController.searchMembers));

  router
    .route(API_ROUTES.PROJECTS.TASKS.BY_ID)
    .patch(asyncHandler(taskController.updateTask))
    .delete(asyncHandler(taskController.deleteTask));
  router
    .route(API_ROUTES.PROJECTS.TASKS.STATUS)
    .patch(asyncHandler(taskController.updateTaskStatus));
  return router;
}
