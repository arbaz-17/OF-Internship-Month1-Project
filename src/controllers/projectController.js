import {
  setSelectedProjectId,
} from "../state/appState.js";

import eventBus from "../events/eventBus.js";

import { EVENTS } from "../events/eventNames.js";

import { createProject } from "../services/projectService.js";

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