import {
  getTasks,
  addTask,
  updateTaskState,
  removeTaskState,
} from "../state/appState.js";

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

export function createTask(taskData) {
  if (!taskData.title?.trim()) {
    throw new Error("Task title is required.");
  }

  const tasks = getTasks();

  const nextTaskId =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((task) => task.id)) + 1;

  const today = new Date().toISOString().split("T")[0];

  const newTask = {
    id: nextTaskId,
    project_id: taskData.project_id,
    title: taskData.title.trim(),
    description: taskData.description ?? "",
    status: taskData.status ?? "todo",
    priority: taskData.priority ?? "medium",
    due_date: taskData.due_date ?? "",
    created_at: today,
    updated_at: today,
  };

  addTask(newTask);

  return newTask;
}

export function updateExistingTask(taskId, taskData) {
  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  const updatedTask = {
    ...existingTask,
    ...taskData,
    title: taskData.title?.trim() ?? existingTask.title,
    updated_at: new Date().toISOString().split("T")[0],
  };

  updateTaskState(updatedTask);

  return updatedTask;
}

export function deleteExistingTask(taskId) {
  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  removeTaskState(taskId);

  return existingTask;
}