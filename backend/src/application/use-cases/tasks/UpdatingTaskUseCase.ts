import {
  UpdateTaskRequestDTO,
  TaskResponseDTO,
} from "@/application/dto/task/taskDto";
import { NotFoundError } from "@/application/error/AppError";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { IUpdateTaskUseCase } from "@/application/ports/use-cases/task/interfaces";
import { TYPES } from "@/config/di/types";
import { Task } from "@/entities/task/Task";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepo: ITaskRepository,
    @inject(TYPES.UserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(
    taskId: string,
    input: UpdateTaskRequestDTO,
    managerId: string,
  ): Promise<TaskResponseDTO> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundError("Task");
    //1.Manger authorization

    //2. Reassignment validation
    if (input.assignedTo) {
      task.assignTo(input.assignedTo);
    }

    //3. Metadata updates
    if (input.title) task.updateTitle(input.title);
    if (input.description !== undefined)
      task.updateDescription(input.description);
    if (input.priority) task.changePriority(input.priority);
    if (input.dueDate !== undefined)
      task.setDueDate(input.dueDate ? new Date(input.dueDate) : null);
    task.setUpdatedAt(new Date());

    await this.taskRepo.update(task);
    return this.mapToResponse(task!);
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
