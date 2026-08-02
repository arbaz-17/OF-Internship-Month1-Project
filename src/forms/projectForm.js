import {
  getEditingProjectId,
  setEditingProjectId,
  clearEditingProjectId,
} from "../state/appState.js";

import {
  createNewProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  getProjectById,
} from "../services/projectService.js";

export function initializeProjectForm() {
  const form = document.getElementById("project-form");

  document.addEventListener("click", handleEditProject);
  document.addEventListener("click", handleDeleteProject);

  form.addEventListener("submit", handleSubmit);
}

export function populateProjectForm(projectId) {
  const project = getProjectById(projectId);

  if (!project) return;

  document.getElementById("project-name").value =
    project.name;

  document.getElementById("project-category").value =
    project.category;

  document.getElementById("project-description").value =
    project.description;

  setEditingProjectId(projectId);

  document.querySelector(
    "#project-form button"
  ).textContent = "Update Project";
}

function handleEditProject(event) {
  const button = event.target.closest(
    "#edit-project-btn"
  );

  if (!button) return;

  populateProjectForm(
    Number(button.dataset.projectId)
  );
}

function handleDeleteProject(event) {
  const button = event.target.closest(
    "#delete-project-btn"
  );

  if (!button) return;

  const confirmed = confirm(
    "Delete this project and all its tasks?"
  );

  if (!confirmed) return;

  deleteProject(
    Number(button.dataset.projectId)
  );
}

function handleSubmit(event) {
  event.preventDefault();

  const projectData = {
    name: document.getElementById("project-name").value,
    category: document.getElementById("project-category").value,
    description: document.getElementById("project-description").value,
  };

  const editingProjectId = getEditingProjectId();

  if (editingProjectId) {
    updateProject(
      editingProjectId,
      projectData
    );

    clearEditingProjectId();

    document.querySelector(
      "#project-form button"
    ).textContent = "Create Project";
  } else {
    createNewProject(projectData);
  }

  event.target.reset();
}