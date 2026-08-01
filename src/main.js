import {
  getAllProjects,
  getProjectById,
  getFirstProject,
} from "./services/projectService.js";

import {
  getTasksByProjectId,
} from "./services/taskService.js";

import {
  getSelectedProjectId,
  setSelectedProjectId,
} from "./state/appState.js";

import { renderProjects } from "./ui/projectRenderer.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { renderProjectDetails } from "./ui/layoutRenderer.js";

function renderApplication() {
  const projects = getAllProjects();

  const selectedProject = getProjectById(
    getSelectedProjectId()
  );

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
  const firstProject = getFirstProject();

  if (!firstProject) {
    return;
  }

  setSelectedProjectId(firstProject.id);

  renderApplication();
}

initializeApplication();