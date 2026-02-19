import {
  UpdateTaskStatusRequestDTO,
  // TaskResponseDTO,
} from "@/application/dto/task/taskDto";
import { NotFoundError } from "@/application/error/AppError";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IUpdateTaskStatusUseCase } from "@/application/ports/use-cases/task/interfaces";
import { TYPES } from "@/config/di/types";
import {
  // Task,
  TaskStatus,
} from "@/entities/task/Task";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateTaskStatusUseCase implements IUpdateTaskStatusUseCase {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepo: ITaskRepository,
  ) {}

  async execute(
    taskId: string,
    input: UpdateTaskStatusRequestDTO,
    userId: string,
  ): Promise<void> {
    const task = await this.taskRepo.findById(taskId);

    if (!task) throw new NotFoundError("Task");

    task.changeStatus(input.status);
    task.setUpdatedAt(new Date());

    await this.taskRepo.update(task);
    // const updated = await this.taskRepo.update(task);
    // return this.mapToResponse(updated);
  }
  // private mapToResponse(task: Task): TaskResponseDTO {
  //   return {
  //     id: task.id!,
  //     projectId: task.projectId,
  //     assignedTo: task.assignedTo
  //       ? { id: task.assignedTo, name: "" }
  //       : undefined,
  //     title: task.title,
  //     description: task.description ?? null,
  //     status: task.status,
  //     priority: task.priority,
  //     dueDate: task.dueDate?.toISOString() ?? null,
  //     hasAttachments: task.hasAttachments ?? false,
  //     createdAt: task.createdAt.toISOString(),
  //     // updatedAt: task.updatedAt.toISOString(),   ← add if needed
  //   };
  // }
  private readonly validFlow: Record<TaskStatus, TaskStatus[]> = {
    todo: ["inprogress"],
    inprogress: ["done"],
    done: [],
  };
}
