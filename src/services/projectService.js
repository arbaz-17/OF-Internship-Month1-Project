import {
  getProjects,
  addProject,
  updateProjectState,
  removeProjectState,
  removeTasksByProjectId,
    getProjectSearchQuery,
  getProjectStatusFilter,
  getProjectPriorityFilter,
} from "../state/appState.js";

export function getAllProjects() {
  return getProjects();
}

export function getFirstProject() {
  return getProjects()[0];
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
      : Math.max(...projects.map((project) => project.id)) + 1;

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

export function updateExistingProject(projectId, projectData) {
  const existingProject = getProjectById(projectId);

  if (!existingProject) {
    throw new Error("Project not found.");
  }

  if (!projectData.name?.trim()) {
    throw new Error("Project name is required.");
  }

  const updatedProject = {
    ...existingProject,
    ...projectData,
    name: projectData.name.trim(),
    updated_at: new Date().toISOString().split("T")[0],
  };

  updateProjectState(updatedProject);

  return updatedProject;
}

export function deleteExistingProject(projectId) {
  const project = getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  removeProjectState(projectId);

  removeTasksByProjectId(projectId);

  return project;
}

export function getFilteredProjects() {
  const searchQuery = getProjectSearchQuery()
    .trim()
    .toLowerCase();

  const statusFilter =
    getProjectStatusFilter();

  const priorityFilter =
    getProjectPriorityFilter();

  return getAllProjects().filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.name
        .toLowerCase()
        .includes(searchQuery);

    const matchesStatus =
      !statusFilter ||
      project.status === statusFilter;

    const matchesPriority =
      !priorityFilter ||
      project.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
}