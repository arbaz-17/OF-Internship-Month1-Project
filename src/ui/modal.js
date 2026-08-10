import {  setCurrentProject } from "../controllers/projectController.js";
import { resetProjectForm } from "../forms/projectForm.js";

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

export function initializeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modalId);
    }
  });
}

export function bindModalButtons() {
  // Project Modal

  const projectOpen = document.getElementById("open-project-modal");
  const projectClose = document.getElementById("close-project-modal");

projectOpen?.addEventListener("click", () => {
  resetProjectForm();

  openModal("project-modal");
});

  projectClose?.addEventListener("click", () => {
    closeModal("project-modal");
  });

  const taskClose = document.getElementById("close-task-modal");

  taskClose?.addEventListener("click", () => {
    closeModal("task-modal");
  });

  document.addEventListener("click", handleAddTaskClick);
}

function handleAddTaskClick(event) {
  const addTaskButton = event.target.closest(".add-task-btn");

  if (!addTaskButton) return;

  const projectId = addTaskButton.dataset.projectId;

  setCurrentProject(projectId);

  openModal("task-modal");
}