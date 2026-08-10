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
import { openModal } from "../ui/modal.js";
import { closeModal } from "../ui/modal.js";
import { showConfirmation } from "../ui/confirmModal.js";

import {
  setButtonLoading,
  resetButton,
} from "../ui/buttonLoading.js";

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
  document.getElementById("project-start-date").value =
  project.start_date
    ? project.start_date.split("T")[0]
    : "";

document.getElementById("project-due-date").value =
  project.due_date
    ? project.due_date.split("T")[0]
    : "";
    

  setEditingProjectId(projectId);
  openModal("project-modal");

  document.querySelector(
    "#project-form button"
  ).textContent = "Update Project";
}

export function resetProjectForm() {
  const form = document.getElementById("project-form");

  form.reset();

  clearEditingProjectId();

  document.getElementById("project-status").value = "active";

  document.getElementById("project-priority").value = "medium";
  document.getElementById("project-start-date").value = "";
document.getElementById("project-due-date").value = "";

  document.getElementById(
    "project-submit-btn"
  ).textContent = "Create Project";
}

function handleEditProject(event) {
const button = event.target.closest(
  ".edit-project-btn"
);

  if (!button) return;

  populateProjectForm(
    button.dataset.projectId
  );
}

function handleDeleteProject(event) {
  const button = event.target.closest(".delete-project-btn");

  if (!button) return;

  const projectId = button.dataset.projectId;

  const project = getProjectById(projectId);

  showConfirmation({
    title: "Delete Project",
    message: `Are you sure you want to delete "${project.name}"?\n\nAll associated tasks will also be deleted.`,
    confirmText: "Delete Project",

    onConfirm: async () => {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
  });
}

async function handleSubmit(event) {
  event.preventDefault();

const submitButton = document.getElementById(
  "project-submit-btn"
);  

const projectData = {
  name: document.getElementById("project-name").value,
  category: document.getElementById("project-category").value,
  description: document.getElementById("project-description").value,
  status: document.getElementById("project-status").value,
  priority: document.getElementById("project-priority").value,
  start_date: document.getElementById("project-start-date").value,
  due_date: document.getElementById("project-due-date").value,
};

  const editingProjectId =
    getEditingProjectId();

setButtonLoading(
  submitButton,
  editingProjectId
    ? "Updating..."
    : "Creating..."
);

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

resetProjectForm();

closeModal("project-modal");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
  finally {

    resetButton(submitButton);

}
}