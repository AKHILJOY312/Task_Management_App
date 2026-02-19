import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";

import { TaskResponseDTO } from "@/application/dto/task/taskDto";
import { Task } from "@/entities/task/Task";
import {
  IGetProjectTasksUseCase,
  ProjectTasksResponse,
} from "@/application/ports/use-cases/task/interfaces";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";

@injectable()
export class GetProjectTasksUseCase implements IGetProjectTasksUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private taskRepo: ITaskRepository,

    @inject(TYPES.UserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(
    projectId: string,
    requesterId: string,
  ): Promise<ProjectTasksResponse> {
    // 1. Must be project member

    // 2. Load tasks
    const tasks = await this.taskRepo.findByProjectId(projectId);

    // 3. Map to response DTO
    const dtos = await Promise.all(
      tasks.map((task) => this.mapToResponse(task)),
    );
    return { tasks: dtos };
  }

  private async mapToResponse(task: Task): Promise<TaskResponseDTO> {
    const [user] = await Promise.all([this.userRepo.findById(task.assignedTo)]);

    return {
      id: task.id!,
      projectId: task.projectId,
      assignedTo: {
        id: task.assignedTo.toString(),
        name: user?.name || "Unknown User",
        email: user?.email,
      },
      title: task.title,
      description: task.description ?? null,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate?.toISOString() ?? null,

      createdAt: task.createdAt.toISOString(),
    };
  }
}
