import {
  setSelectedProjectId,
  getSelectedProjectId,
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
  const currentSelectedProjectId = getSelectedProjectId();

  if (currentSelectedProjectId === projectId) {
    setSelectedProjectId(null);
  } else {
    setSelectedProjectId(projectId);
  }

  eventBus.emit(EVENTS.PROJECT_SELECTED);
}
export async function createNewProject(projectData) {
  const project = await createProject(projectData);

  selectProject(project.id);

  eventBus.emit(EVENTS.PROJECT_CREATED, {
    project,
  });

  return project;
}

export async function updateProject(
  projectId,
  projectData
) {
  const updatedProject =
    await updateExistingProject(
      projectId,
      projectData
    );

  eventBus.emit(EVENTS.PROJECT_UPDATED, {
    project: updatedProject,
  });

  return updatedProject;
}

export async function deleteProject(projectId) {
  await deleteExistingProject(projectId);

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