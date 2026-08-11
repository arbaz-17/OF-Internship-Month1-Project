import {
  getProjects,
  getTasks,
  addTask,
  updateTaskState,
  removeTaskState,
  getTaskStatusFilter,
  getTaskPriorityFilter,
} from "../state/appState.js";

import { storageService } from "../storage/storageService.js";
import { taskApi } from "../api/taskApi.js";

function persistCurrentState() {
  storageService.saveWorkspace({
    projects: getProjects(),
    tasks: getTasks(),
  });
}

//Queries

export function getAllTasks() {
  return getTasks();
}

export function getTasksByProjectId(projectId) {
  return getTasks().filter((task) => task.project_id === projectId);
}

export function getFilteredTasksByProjectId(projectId) {
  const statusFilter = getTaskStatusFilter();
  const priorityFilter = getTaskPriorityFilter();

  return getTasks()
    .filter((task) => task.project_id === projectId)
    .filter((task) => {
      if (statusFilter && task.status !== statusFilter) {
        return false;
      }

      if (priorityFilter && task.priority !== priorityFilter) {
        return false;
      }

      return true;
    });
}

export function getTaskById(taskId) {
  return getTasks().find((task) => task.id === taskId);
}

//CRUD

export async function createTask(taskData) {
  if (!taskData.title?.trim()) {
    throw new Error("Task title is required.");
  }

  const now = new Date().toISOString();

  const createdTask = await taskApi.createTask({
    ...taskData,
    title: taskData.title.trim(),
    created_at: now,
    updated_at: now,
  });

  addTask(createdTask);
  persistCurrentState();
  return createdTask;
}

export async function updateExistingTask(taskId, taskData) {
  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  if (!taskData.title?.trim()) {
    throw new Error("Task title is required.");
  }

  const updatedTask = await taskApi.updateTask(taskId, {
    ...existingTask,
    ...taskData,
    title: taskData.title.trim(),
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
