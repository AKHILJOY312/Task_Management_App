import { ContainerModule } from "inversify";
import { TYPES } from "../types"; // Adjust path if needed

import { AuthController } from "@/interface-adapters/controllers/auth/AuthController";

import { TaskController } from "@/interface-adapters/controllers/task/TaskController";
// import { MemberSearchController } from "@/interface-adapters/controllers/task/MemberSearchController";

export const controllerModule = new ContainerModule((options) => {
  options.bind<AuthController>(TYPES.AuthController).to(AuthController);

  options.bind<TaskController>(TYPES.TaskController).to(TaskController);
  // options
  //   .bind<MemberSearchController>(TYPES.MemberSearchController)
  //   .to(MemberSearchController);
});
