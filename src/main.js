import {
  setProjects,
  setTasks,
  getSelectedProjectId,
  getLoading,
  getError,
  getTaskStatusFilter,
  getTaskPriorityFilter,
  setLoading,
  setError,
  clearError,
} from "./state/appState.js";

import { getFilteredProjects } from "./services/projectService.js";

import {
  getTasksByProjectId,
  getFilteredTasksByProjectId,
} from "./services/taskService.js";

import { renderProjects } from "./ui/projectRenderer.js";
import { renderProjectDetails } from "./ui/layoutRenderer.js";
import { renderTasks, initializeTaskAccordion } from "./ui/taskRenderer.js";
import { renderNoProjectsState } from "./ui/emptyStateRenderer.js";
import { renderLoadingState } from "./ui/loadingStateRenderer.js";
import { renderErrorState } from "./ui/errorStateRenderer.js";
import { initializeProjectForm } from "./forms/projectForm.js";
import { initializeTaskForm } from "./forms/taskForm.js";
import { initializeProjectSearchForm } from "./forms/projectSearchForm.js";
import { initializeProjectFilterForm } from "./forms/projectFilterForm.js";
import { initializeTaskFilterForm } from "./forms/taskFilterForm.js";
import { initializeModal, bindModalButtons } from "./ui/modal.js";
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
    renderProjectDetails(null);

    return;
  }

  if (getError()) {
    renderErrorState(getError());
    renderProjectDetails(null);

    return;
  }

  const projects = getFilteredProjects();

  if (projects.length === 0) {
    renderNoProjectsState();
    renderProjectDetails(null);

    return;
  }

  const selectedProject =
    projects.find((project) => project.id === getSelectedProjectId()) ?? null;
  renderProjects(projects, selectedProject?.id ?? null, selectProject);
  renderProjectDetails(selectedProject);

  if (selectedProject) {
    const tasks = getFilteredTasksByProjectId(selectedProject.id);

    const hasTaskFilters = Boolean(
      getTaskStatusFilter() || getTaskPriorityFilter(),
    );
    renderTasks(tasks, {
      isFiltered: hasTaskFilters,
    });
  }
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
    renderApplication();
  } else {
    setLoading(true);
    renderApplication();
  }

  try {
    await fetchLatestWorkspace();
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
  initializeTaskFilterForm(renderApplication);
  initializeTaskAccordion();
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
