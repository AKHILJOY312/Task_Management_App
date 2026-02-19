import { ContainerModule } from "inversify";
import { TYPES } from "../types";

// Use Cases (Auth)
import { RegisterUser } from "@/application/use-cases/auth/RegisterUser";

import { LoginUser } from "@/application/use-cases/auth/LoginUser";
import { RefreshToken } from "@/application/use-cases/auth/RefreshToken";
import { LogoutUser } from "@/application/use-cases/auth/LogoutUser";
import { GetMe } from "@/application/use-cases/auth/GetMe";

// Ports (Interfaces)
import { IRegisterUser } from "@/application/ports/use-cases/auth/IRegisterUserUseCase";

import { ILoginUser } from "@/application/ports/use-cases/auth/ILoginUserUseCase";
import { IRefreshToken } from "@/application/ports/use-cases/auth/IRefreshTokenUseCase";
import { ILogoutUser } from "@/application/ports/use-cases/auth/ILogoutUserUseCase";
import { IGetMe } from "@/application/ports/use-cases/auth/IGetMeUseCase";

// Use Cases (Admin User)
import { IListUsersUseCase } from "@/application/ports/use-cases/user/IListUsersUseCase";

import { ListUsersUseCase } from "@/application/use-cases/user/ListUserUseCase";

import {
  ICreateTaskUseCase,
  IDeleteTaskUseCase,
  IGetProjectTasksUseCase,
  ISearchProjectMembersUseCase,
  IUpdateTaskStatusUseCase,
  IUpdateTaskUseCase,
} from "@/application/ports/use-cases/task/interfaces";
import { CreateTaskUseCase } from "@/application/use-cases/tasks/CreatingTaskUseCase";
import { DeleteTaskUseCase } from "@/application/use-cases/tasks/DeletingTaskUseCase";
import { GetProjectTasksUseCase } from "@/application/use-cases/tasks/GetProjectTasksUseCase";
import { UpdateTaskStatusUseCase } from "@/application/use-cases/tasks/UpdateTaskStatusUseCase";
// import { SearchProjectMembersUseCase } from "@/application/use-cases/tasks/SearchProjectMembersUseCase";
import { UpdateTaskUseCase } from "@/application/use-cases/tasks/UpdatingTaskUseCase";

export const useCaseModule = new ContainerModule((options) => {
  // Regular Auth Use Cases
  options.bind<IRegisterUser>(TYPES.RegisterUser).to(RegisterUser);

  options.bind<ILoginUser>(TYPES.LoginUser).to(LoginUser);
  options.bind<IRefreshToken>(TYPES.RefreshToken).to(RefreshToken);
  options.bind<ILogoutUser>(TYPES.LogoutUser).to(LogoutUser);
  options.bind<IGetMe>(TYPES.GetMe).to(GetMe);

  // Admin User Use Cases
  options.bind<IListUsersUseCase>(TYPES.ListUsersUseCase).to(ListUsersUseCase);

  //Tasks
  options
    .bind<ICreateTaskUseCase>(TYPES.CreateTaskUseCase)
    .to(CreateTaskUseCase);
  options
    .bind<IDeleteTaskUseCase>(TYPES.DeleteTaskUseCase)
    .to(DeleteTaskUseCase);
  options
    .bind<IGetProjectTasksUseCase>(TYPES.GetProjectTasksUseCase)
    .to(GetProjectTasksUseCase);
  options
    .bind<IUpdateTaskStatusUseCase>(TYPES.UpdateTaskStatusUseCase)
    .to(UpdateTaskStatusUseCase);

  options
    .bind<IUpdateTaskUseCase>(TYPES.UpdateTaskUseCase)
    .to(UpdateTaskUseCase);

  //search
  // options
  //   .bind<ISearchProjectMembersUseCase>(TYPES.SearchProjectMembersUseCase)
  //   .to(SearchProjectMembersUseCase);
});
