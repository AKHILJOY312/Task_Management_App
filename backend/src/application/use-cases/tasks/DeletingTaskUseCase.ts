import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";

import { NotFoundError } from "@/application/error/AppError";
import { IDeleteTaskUseCase } from "@/application/ports/use-cases/task/interfaces";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private taskRepo: ITaskRepository,
  ) {}

  async execute(taskId: string, managerId: string): Promise<void> {
    // 1. Load task
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundError("Task not found");

    // 3. Soft delete
    await this.taskRepo.softDelete(taskId);
  }
}
