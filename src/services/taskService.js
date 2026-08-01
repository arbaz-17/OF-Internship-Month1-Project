import { tasks } from "../data/sampleData.js";

export function getAllTasks() {
  return tasks;
}

export function getTasksByProjectId(projectId) {
  return tasks.filter((task) => task.project_id === projectId);
}


export function getTaskCountByProjectId(projectId) {
  return getTasksByProjectId(projectId).length;
}


export function getTasksByStatus(status) {
  return tasks.filter((task) => task.status === status);
}