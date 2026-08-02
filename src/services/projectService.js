import { getProjects } from "../state/appState.js";

export function getAllProjects() {
  return getProjects;
}

export function getFirstProject() {
  return getProjects[0];
}

export function getProjectById(projectId) {
  return getProjects().find(
    (project) => project.id === projectId
  );
}
export function projectExists(projectId) {
  return getProjects().some(
    (project) => project.id === projectId
  );
}