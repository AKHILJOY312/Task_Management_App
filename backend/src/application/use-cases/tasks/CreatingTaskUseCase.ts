import {
  CreateTaskRequestDTO,
  TaskResponseDTO,
} from "@/application/dto/task/taskDto";

import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { ICreateTaskUseCase } from "@/application/ports/use-cases/task/interfaces";
import { TYPES } from "@/config/di/types";
import { Task } from "@/entities/task/Task";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepo: ITaskRepository,

    @inject(TYPES.UserRepository) private userRepo: IUserRepository,
  ) {}
  async execute(
    input: CreateTaskRequestDTO,
    managerId: string,
  ): Promise<TaskResponseDTO> {
    const { projectId, assignedTo, title, description, priority, dueDate } =
      input;

    //3.Create Task entity
    const task = new Task({
      projectId,
      assignedBy: managerId,
      assignedTo,
      title: title.trim(),
      description,
      status: "todo",

      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTask = await this.taskRepo.create(task);

    return this.mapToResponse(savedTask);
  }
  private async mapToResponse(task: Task): Promise<TaskResponseDTO> {
    // Fetch user and attachments concurrently
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
