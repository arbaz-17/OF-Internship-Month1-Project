import { getTasks } from "../state/appState.js";

export function getAllTasks() {
  return getTasks ;
}

export function getTasksByProjectId(projectId) {
  return getTasks().filter(
    (task) => task.project_id === projectId
  );
}


export function getTaskCountByProjectId(projectId) {
  return getTasksByProjectId(projectId).length;
}


export function getTasksByStatus(status) {
  return getTasks().filter(
    (task) => task.status === status
  );
}