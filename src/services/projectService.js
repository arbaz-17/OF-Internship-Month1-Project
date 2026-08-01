import { projects } from "../data/sampleData.js";

export function getAllProjects() {
  return projects;
}

export function getFirstProject() {
  return projects[0];
}

export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

export function projectExists(projectId) {
  return projects.some((project) => project.id === projectId);
}