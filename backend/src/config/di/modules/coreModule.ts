import { ContainerModule } from "inversify";
import { TYPES } from "../types"; // Adjust path if needed

// Repositories
import { UserRepository } from "@/infra/db/mongoose/repositories/UserRepository";

import { EmailChangeOtpRepository } from "@/infra/db/mongoose/repositories/EmailChangeOtpRepository";

// Services
import { JwtAuthService } from "@/infra/auth/JwtAuthService";
import { NodemailerEmailService } from "@/infra/email/NodemailerEmailService";
import { UserService } from "@/application/services/UserService";

// Ports
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { IEmailChangeOtpRepository } from "@/application/ports/repositories/IEmailChangeOtpRepository";

import { IUserService } from "@/application/ports/services/IUserService";
import { IAuthService } from "@/application/ports/services/IAuthService";
import { IEmailService } from "@/application/ports/services/IEmailService";
import { ITokenBlacklistService } from "@/application/ports/services/ITokenBlacklistService";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { TaskRepository } from "@/infra/db/mongoose/repositories/TaskRepository";
import { MongoTokenBlacklistService } from "@/infra/services/MongoTokenBlacklistService";

export const coreModule = new ContainerModule((options) => {
  // Repositories (singletons)
  options
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();

  options
    .bind<IEmailChangeOtpRepository>(TYPES.EmailChangeOtpRepository)
    .to(EmailChangeOtpRepository)
    .inSingletonScope();

  options.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
  options
    .bind<ITokenBlacklistService>(TYPES.TokenBlacklistService)
    .to(MongoTokenBlacklistService)
    .inSingletonScope();
  // Services (singletons)
  options
    .bind<IUserService>(TYPES.UserService)
    .to(UserService)
    .inSingletonScope();
  options
    .bind<IAuthService>(TYPES.AuthService)
    .to(JwtAuthService)
    .inSingletonScope();
  options
    .bind<IEmailService>(TYPES.EmailService)
    .to(NodemailerEmailService)
    .inSingletonScope();
});
