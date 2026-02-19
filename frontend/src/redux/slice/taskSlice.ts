// src/redux/slices/taskSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/types";

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    // PRO WAY: Encapsulate the "Assigned Member Only" logic here
    updateTaskStatus: (
      state,
      action: PayloadAction<{
        taskId: string;
        newStatus: string;
        userId: string;
      }>,
    ) => {
      const { taskId, newStatus, userId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);

      if (task) {
        if (task.assignedTo === userId) {
          task.status = newStatus;
        } else {
          console.error("PERMISSION_DENIED: ONLY_ASSIGNEE_CAN_MOVE_PHASE");
          // In a real app, trigger a Toast notification here
        }
      }
    },
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTasks, updateTaskStatus, createTask, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
