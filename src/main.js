import { setProjects, setTasks } from "./state/appState.js";

import {
  getFilteredProjects,
  getFirstProject,
  getProjectById,
} from "./services/projectService.js";

import { getTasksByProjectId } from "./services/taskService.js";

import {
  getSelectedProjectId,
  getLoading,
  getError,
  setLoading,
  setError,
  clearError,
} from "./state/appState.js";

import { renderProjects } from "./ui/projectRenderer.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { renderNoProjectsState } from "./ui/emptyStateRenderer.js";
import { renderLoadingState } from "./ui/loadingStateRenderer.js";
import { renderErrorState } from "./ui/errorStateRenderer.js";

import { initializeProjectForm } from "./forms/projectForm.js";
import { initializeTaskForm } from "./forms/taskForm.js";
import { initializeProjectSearchForm } from "./forms/projectSearchForm.js";
import { initializeProjectFilterForm } from "./forms/projectFilterForm.js";
import { initializeModal,bindModalButtons } from "./ui/modal.js";
import { initializeConfirmModal } from "./ui/confirmModal.js";

import { selectProject } from "./controllers/projectController.js";

import eventBus from "./events/eventBus.js";
import { EVENTS } from "./events/eventNames.js";

import { storageService } from "./storage/storageService.js";

import { projectApi } from "./api/projectApi.js";
import { taskApi } from "./api/taskApi.js";

function renderApplication() {
  if (getLoading()) {
    renderLoadingState();
    return;
  }

  if (getError()) {
    renderErrorState(getError());
    return;
  }

  const projects = getFilteredProjects();

  const selectedProject = getProjectById(getSelectedProjectId());

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

renderTasks(tasks);
}

function loadCachedWorkspace() {
  const workspace = storageService.loadWorkspace();

  if (!workspace) {
    return false;
  }

  setProjects(workspace.projects);
  setTasks(workspace.tasks);

  return true;
}

async function fetchLatestWorkspace() {
  const [projects, tasks] = await Promise.all([
    projectApi.getProjects(),
    taskApi.getTasks(),
  ]);

  setProjects(projects);
  setTasks(tasks);

  storageService.saveWorkspace({
    projects,
    tasks,
  });
}

async function initializeWorkspace() {
  clearError();

  const hasCache = loadCachedWorkspace();

  if (hasCache) {
    const firstProject = getFirstProject();

    if (firstProject) {
      selectProject(firstProject.id);
    }

    renderApplication();
  } else {
    setLoading(true);
    renderApplication();
  }

  try {
    await fetchLatestWorkspace();

    const firstProject = getFirstProject();

    if (firstProject) {
      selectProject(firstProject.id);
    } else {
      renderNoProjectsState();
    }
  } catch (error) {
    console.error(error);

    if (!hasCache) {
      setError("Unable to load application data.");

      renderApplication();
    }
  } finally {
    setLoading(false);

    renderApplication();
  }
}

async function initializeApplication() {
  await initializeWorkspace();

  initializeProjectForm();

  initializeTaskForm();

  initializeProjectSearchForm();

  initializeProjectFilterForm();
initializeModal("project-modal");
initializeModal("task-modal");

bindModalButtons();

initializeConfirmModal();

  eventBus.subscribe(EVENTS.PROJECT_SELECTED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_UPDATED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_DELETED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_CREATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_CREATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_UPDATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_DELETED, renderApplication);
}

initializeApplication();
