import {
  setSelectedProjectId,
} from "../state/appState.js";

import eventBus from "../events/eventBus.js";
import { EVENTS } from "../events/eventNames.js";

import {
  createProject,
  updateExistingProject,
  deleteExistingProject,
  getAllProjects,
} from "../services/projectService.js";

export function selectProject(projectId) {
  setSelectedProjectId(projectId);

  eventBus.emit(EVENTS.PROJECT_SELECTED, {
    projectId,
  });
}

export function createNewProject(projectData) {
  const project = createProject(projectData);

  selectProject(project.id);

  eventBus.emit(EVENTS.PROJECT_CREATED, {
    project,
  });

  return project;
}

export function updateProject(projectId, projectData) {
  const updatedProject = updateExistingProject(
    projectId,
    projectData
  );

  eventBus.emit(EVENTS.PROJECT_UPDATED, {
    project: updatedProject,
  });

  return updatedProject;
}

export function deleteProject(projectId) {
  deleteExistingProject(projectId);

  const remainingProjects = getAllProjects();

  if (remainingProjects.length > 0) {
    selectProject(remainingProjects[0].id);
  } else {
    setSelectedProjectId(null);
  }

  eventBus.emit(EVENTS.PROJECT_DELETED, {
    projectId,
  });
}