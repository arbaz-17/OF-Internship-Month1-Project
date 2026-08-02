import {
  getProjects,
  addProject,
} from "../state/appState.js";

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

export function createProject(projectData) {
  if (!projectData.name?.trim()) {
    throw new Error("Project name is required.");
  }

  const projects = getProjects();

  const nextProjectId =
    projects.length === 0
      ? 1
      : Math.max(...projects.map(project => project.id)) + 1;

  const today = new Date().toISOString().split("T")[0];

  const newProject = {
    id: nextProjectId,
    name: projectData.name.trim(),
    category: projectData.category ?? "",
    description: projectData.description ?? "",
    status: projectData.status ?? "active",
    priority: projectData.priority ?? "medium",
    start_date: projectData.start_date ?? today,
    due_date: projectData.due_date ?? "",
    created_at: today,
    updated_at: today,
  };

  addProject(newProject);

  return newProject;
}