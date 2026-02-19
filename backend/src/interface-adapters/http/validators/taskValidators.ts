// src/interface-adapters/http/validators/taskValidators.ts
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5),
  assignedTo: z.string().uuid("Invalid User ID format"),
});

export const updateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
});

export const moveTaskSchema = z.object({
  id: z.string().uuid(),
  newStatus: z.enum(["todo", "in-progress", "done"] as const, {
    message: "INVALID_PHASE_SIGNAL",
  }),
});
