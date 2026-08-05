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

    document.getElementById("project-status").value =
  project.status;

document.getElementById("project-priority").value =
  project.priority;
    

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
    button.dataset.projectId
  );
}

async function handleDeleteProject(event) {
  const button = event.target.closest(
    "#delete-project-btn"
  );

  if (!button) return;

  const confirmed = confirm(
    "Delete this project and all its tasks?"
  );

  if (!confirmed) return;

  try {
    await deleteProject(
      button.dataset.projectId
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

const projectData = {
  name: document.getElementById("project-name").value,
  category: document.getElementById("project-category").value,
  description: document.getElementById("project-description").value,
  status: document.getElementById("project-status").value,
  priority: document.getElementById("project-priority").value,
};

  const editingProjectId =
    getEditingProjectId();

  try {
    if (editingProjectId) {
      await updateProject(
        editingProjectId,
        projectData
      );

      clearEditingProjectId();

      document.querySelector(
        "#project-form button"
      ).textContent = "Create Project";
    } else {
      await createNewProject(projectData);
    }

    event.target.reset();
    document.getElementById("project-status").value =
  "active";

document.getElementById("project-priority").value =
  "medium";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}