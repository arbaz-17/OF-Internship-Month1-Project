import { projects, tasks } from "./data/sampleData.js";

import {
  setProjects,
  setTasks,
} from "./state/appState.js";

import {
  getAllProjects,
  getFirstProject,
  getProjectById,
} from "./services/projectService.js";

import {
  getTasksByProjectId,
} from "./services/taskService.js";

import {
  getSelectedProjectId,
} from "./state/appState.js";

import {
  renderProjects,
} from "./ui/projectRenderer.js";

import {
  renderProjectDetails,
} from "./ui/layoutRenderer.js";

import {
  renderTasks,
} from "./ui/taskRenderer.js";

import {
  renderNoProjectsState,
} from "./ui/emptyStateRenderer.js";

import {
  initializeProjectForm,
} from "./forms/projectForm.js";
import { initializeTaskForm } from "./forms/taskForm.js";

import {
  selectProject,
} from "./controllers/projectController.js";

import eventBus from "./events/eventBus.js";

import { EVENTS } from "./events/eventNames.js";

function renderApplication() {
  const projects = getAllProjects();

  const selectedProject = getProjectById(
    getSelectedProjectId()
  );

  if (!selectedProject) {
    renderNoProjectsState();
    return;
  }

  const tasks = getTasksByProjectId(
    selectedProject.id
  );

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

  initializeProjectForm();
  initializeTaskForm();

  eventBus.subscribe(
    EVENTS.PROJECT_SELECTED,
    renderApplication
  );

  eventBus.subscribe(
    EVENTS.PROJECT_UPDATED,
    renderApplication
  );

  eventBus.subscribe(
    EVENTS.PROJECT_DELETED,
    renderApplication
  );

  eventBus.subscribe(
    EVENTS.PROJECT_CREATED,
    renderApplication
  );

  eventBus.subscribe(
  EVENTS.TASK_CREATED,
  renderApplication
);

eventBus.subscribe(
  EVENTS.TASK_UPDATED,
  renderApplication
);

eventBus.subscribe(
  EVENTS.TASK_DELETED,
  renderApplication
);

  const firstProject = getFirstProject();

  if (!firstProject) {
    renderNoProjectsState();
    return;
  }

  selectProject(firstProject.id);
}

initializeApplication();