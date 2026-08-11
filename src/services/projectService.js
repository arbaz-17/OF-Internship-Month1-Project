import {
  getProjects,
  getTasks,
  addProject,
  updateProjectState,
  removeProjectState,
  removeTasksByProjectId,
  getProjectSearchQuery,
  getProjectStatusFilter,
  getProjectPriorityFilter,
} from "../state/appState.js";

import { storageService } from "../storage/storageService.js";
import { projectApi } from "../api/projectApi.js";
import { getTasksByProjectId } from "./taskService.js";
import { taskApi } from "../api/taskApi.js";


function persistCurrentState() {
  storageService.saveWorkspace({
    projects: getProjects(),
    tasks: getTasks(),
  });
}

// ==================== Queries ====================

export function getAllProjects() {
  return getProjects();
}

export function getFirstProject() {
  return getProjects()[0];
}

export function getProjectById(projectId) {
  return getProjects().find((project) => project.id === projectId);
}

export function projectExists(projectId) {
  return getProjects().some((project) => project.id === projectId);
}

// ==================== CRUD ====================

export async function createProject(projectData) {
  if (!projectData.name?.trim()) {
    throw new Error("Project name is required.");
  }

  const createdProject = await projectApi.createProject({
    ...projectData,
    name: projectData.name.trim(),
    created_at: now,
    updated_at: now,
  });

  addProject(createdProject);

  persistCurrentState();

  return createdProject;
}

export async function updateExistingProject(projectId, projectData) {
  const existingProject = getProjectById(projectId);

  if (!existingProject) {
    throw new Error("Project not found.");
  }

  if (!projectData.name?.trim()) {
    throw new Error("Project name is required.");
  }

  const updatedProject = await projectApi.updateProject(projectId, {
    ...existingProject,
    ...projectData,
    name: projectData.name.trim(),
    created_at: existingProject.created_at,
    updated_at: new Date().toISOString(),
  });

  updateProjectState(updatedProject);

  persistCurrentState();

  return updatedProject;
}

export async function deleteExistingProject(projectId) {
  const existingProject = getProjectById(projectId);

  if (!existingProject) {
    throw new Error("Project not found.");
  }

  const projectTasks = getTasksByProjectId(projectId);

  for (const task of projectTasks) {
  await taskApi.deleteTask(task.id);
}

  await projectApi.deleteProject(projectId);

  removeTasksByProjectId(projectId);

  removeProjectState(projectId);

  persistCurrentState();

  return existingProject;
}

// ==================== Search & Filters ====================

export function getFilteredProjects() {
  const searchQuery = getProjectSearchQuery().trim().toLowerCase();

  const statusFilter = getProjectStatusFilter();

  const priorityFilter = getProjectPriorityFilter();

  return getAllProjects().filter((project) => {
    const matchesSearch =
      !searchQuery || project.name.toLowerCase().includes(searchQuery);

    const matchesStatus = !statusFilter || project.status === statusFilter;

    const matchesPriority =
      !priorityFilter || project.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}
