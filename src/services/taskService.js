import {
  getProjects,
  getTasks,
  addTask,
  updateTaskState,
  removeTaskState,
} from "../state/appState.js";

import { storageService } from "../storage/storageService.js";
import { taskApi } from "../api/taskApi.js";

function persistCurrentState() {
  storageService.saveWorkspace({
    projects: getProjects(),
    tasks: getTasks(),
  });
}

// ==================== Queries ====================

export function getAllTasks() {
  return getTasks();
}

export function getTasksByProjectId(projectId) {
  return getTasks().filter(
    (task) => task.project_id === projectId
  );
}

export function getTaskById(taskId) {
  return getTasks().find(
    (task) => task.id === taskId
  );
}

// ==================== CRUD ====================

export async function createTask(taskData) {
  if (!taskData.title?.trim()) {
    throw new Error("Task title is required.");
  }

  const createdTask =
    await taskApi.createTask({
      ...taskData,
      title: taskData.title.trim(),
      created_at: Date.now(),
      updated_at: Date.now(),
    });

  addTask(createdTask);

  persistCurrentState();

  return createdTask;
}

export async function updateExistingTask(
  taskId,
  taskData
) {
  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  const updatedTask =
    await taskApi.updateTask(taskId, {
      ...existingTask,
      ...taskData,
      title:
        taskData.title?.trim() ??
        existingTask.title,
      created_at: existingTask.created_at,
    updated_at: new Date().toISOString(),
    });

  updateTaskState(updatedTask);

  persistCurrentState();

  return updatedTask;
}

export async function deleteExistingTask(taskId) {
  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  await taskApi.deleteTask(taskId);

  removeTaskState(taskId);

  persistCurrentState();

  return existingTask;
}