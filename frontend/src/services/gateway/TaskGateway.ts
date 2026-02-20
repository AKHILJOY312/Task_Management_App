// src/services/gateway/TaskGateway.ts

import { io, Socket } from "socket.io-client";
import type { Task, TaskStatus } from "@/types/index";

type ServerToClientEvents = {
  "task:created": (task: Task) => void;
  "task:updated": (task: Task) => void;
  "task:deleted": (taskId: string) => void;
  "task:moved": (payload: { taskId: string; status: TaskStatus }) => void;
  "task:status": (payload: { taskId: string; status: TaskStatus }) => void;
};

type ClientToServerEvents = {
  "task:create": (payload: Partial<Task>) => void;
  "task:update": (payload: Task) => void;
  "task:delete": (taskId: string) => void;
  "task:move": (payload: { taskId: string; status: TaskStatus }) => void;
  "board:join": (boardId: string) => void;
  "board:leave": (boardId: string) => void;
};

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

class TaskGateway {
  private socket: SocketType | null = null;

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      withCredentials: true,
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }

  updateToken(token: string) {
    if (!this.socket) return this.connect(token);

    this.socket.auth = { token };
    this.socket.connect();
  }

  /* ======================
        Rooms
  ====================== */

  joinBoard(boardId: string) {
    this.socket?.emit("board:join", boardId);
  }

  leaveBoard(boardId: string) {
    this.socket?.emit("board:leave", boardId);
  }

  /* ======================
        Emitters
  ====================== */

  createTask(data: Partial<Task>) {
    this.socket?.emit("task:create", data);
  }

  updateTask(task: Task) {
    this.socket?.emit("task:update", task);
  }

  deleteTask(taskId: string) {
    this.socket?.emit("task:delete", taskId);
  }

  moveTask(taskId: string, status: TaskStatus) {
    this.socket?.emit("task:move", { taskId, status });
  }

  /* ======================
        Subscriptions
  ====================== */

  subscribe(handlers: TaskHandlers) {
    if (!this.socket) return;

    const { onCreated, onUpdated, onDeleted, onStatus } = handlers;

    this.socket.on("task:created", onCreated);
    this.socket.on("task:updated", onUpdated);
    this.socket.on("task:deleted", onDeleted);
    this.socket.on("task:status", onStatus);

    return () => {
      this.socket?.off("task:created", onCreated);
      this.socket?.off("task:updated", onUpdated);
      this.socket?.off("task:deleted", onDeleted);
      this.socket?.off("task:status", onStatus);
    };
  }
}

export const taskGateway = new TaskGateway();
