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
  getSelectedProjectId,
  setProjects,
  setTasks,
} from "./state/appState.js";

import eventBus from "./events/eventBus.js";

import { EVENTS } from "./events/eventNames.js";

import { selectProject } from "./controllers/projectController.js";

import { renderProjects } from "./ui/projectRenderer.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { renderProjectDetails } from "./ui/layoutRenderer.js";
import { renderNoProjectsState } from "./ui/emptyStateRenderer.js";

function renderApplication() {
  const allProjects = getAllProjects();

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
    selectProject
);

  renderProjectDetails(selectedProject);

  renderTasks(tasks);
}



function initializeApplication() {
  setProjects(projects);
  setTasks(tasks);

  const firstProject = getFirstProject();

  if (!firstProject) {
    renderNoProjectsState();
    return;
  }

  selectProject(firstProject.id);
}

eventBus.subscribe(
  EVENTS.PROJECT_SELECTED,
  () => {
    renderApplication();
  }
);

initializeApplication();