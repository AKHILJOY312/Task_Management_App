// src/redux/slices/taskSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "@/types";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: "",
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
        newStatus: TaskStatus;
        userId: string;
      }>,
    ) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);

      if (task) {
        task.status = newStatus;
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
