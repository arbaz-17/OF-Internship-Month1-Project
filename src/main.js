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
import { renderProjectDetails } from "./ui/layoutRenderer.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { renderNoProjectsState } from "./ui/emptyStateRenderer.js";
import { renderLoadingState } from "./ui/loadingStateRenderer.js";
import { renderErrorState } from "./ui/errorStateRenderer.js";
import { initializeProjectForm } from "./forms/projectForm.js";
import { initializeTaskForm } from "./forms/taskForm.js";
import { initializeProjectSearchForm } from "./forms/projectSearchForm.js";
import { initializeProjectFilterForm } from "./forms/projectFilterForm.js";
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

  renderProjects(projects, selectedProject.id, selectProject);

  renderProjectDetails(selectedProject);

  renderTasks(tasks);
}

async function loadInitialWorkspace() {
  setLoading(true);
  clearError();

  try {
    const workspace = storageService.loadWorkspace();

    if (workspace) {
      setProjects(workspace.projects);
      setTasks(workspace.tasks);

      return;
    }

    const [projects, tasks] = await Promise.all([
      projectApi.getProjects(),
      taskApi.getTasks(),
    ]);

    storageService.saveWorkspace({
      projects,
      tasks,
    });

    setProjects(projects);
    setTasks(tasks);
  } catch (error) {
    console.error(error);

    setError("Unable to load application data.");
  } finally {
    setLoading(false);
  }
}

async function initializeApplication() {
  await loadInitialWorkspace();

  initializeProjectForm();
  initializeTaskForm();
  initializeProjectSearchForm();
  initializeProjectSearchForm();
initializeProjectFilterForm();

  eventBus.subscribe(EVENTS.PROJECT_SELECTED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_UPDATED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_DELETED, renderApplication);

  eventBus.subscribe(EVENTS.PROJECT_CREATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_CREATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_UPDATED, renderApplication);

  eventBus.subscribe(EVENTS.TASK_DELETED, renderApplication);

  const firstProject = getFirstProject();

  if (!firstProject) {
    renderNoProjectsState();
    return;
  }

  selectProject(firstProject.id);
}

initializeApplication();
