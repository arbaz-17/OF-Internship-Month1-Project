import {
  getAllProjects,
  getProjectById,
  getFirstProject,
} from "./services/projectService.js";

import {
  getTasksByProjectId,
} from "./services/taskService.js";

import { projects, tasks } from "./data/sampleData.js";

import {
  setProjects,
  setTasks,
  getSelectedProjectId,
  setSelectedProjectId,
} from "./state/appState.js";

import { renderProjects } from "./ui/projectRenderer.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { renderProjectDetails } from "./ui/layoutRenderer.js";
import { renderNoProjectsState } from "./ui/emptyStateRenderer.js";

function renderApplication() {
  const projects = getAllProjects();

  const selectedProject = getProjectById(
    getSelectedProjectId()
  );

  if (!selectedProject) {
    renderNoProjectsState();
    return;
  }

  const tasks = getTasksByProjectId(selectedProject.id);

  renderProjects(
    projects,
    selectedProject.id,
    handleProjectSelection
  );

  renderProjectDetails(selectedProject);

  renderTasks(tasks);
}

function handleProjectSelection(projectId) {
  setSelectedProjectId(projectId);

  renderApplication();
}

function initializeApplication() {
  setProjects(projects);
  setTasks(tasks);

  const firstProject = getFirstProject();

  if (!firstProject) {
    renderNoProjectsState();
    return;
  }

  setSelectedProjectId(firstProject.id);

  renderApplication();
}

initializeApplication();