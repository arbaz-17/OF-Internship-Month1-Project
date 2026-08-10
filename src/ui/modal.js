import { setCurrentProject } from "../controllers/projectController.js";

import { resetProjectForm } from "../forms/projectForm.js";

const modalFocusState = new Map();

const focusableSelector = `
  button:not([disabled]),
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  a[href],
  [tabindex]:not([tabindex="-1"])
`;

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  const activeElement = document.activeElement;

  if (activeElement instanceof HTMLElement) {
    modalFocusState.set(modalId, activeElement);
  }

  modal.hidden = false;
  modal.classList.add("open");

  document.body.classList.add("modal-open");

  requestAnimationFrame(() => {
    const firstFocusable = modal.querySelector(focusableSelector);

    firstFocusable?.focus({
      preventScroll: true,
    });
  });
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.classList.remove("open");
  modal.hidden = true;

  document.body.classList.remove("modal-open");

  const previousElement = modalFocusState.get(modalId);

  modalFocusState.delete(modalId);

  if (
    previousElement instanceof HTMLElement &&
    document.contains(previousElement)
  ) {
    requestAnimationFrame(() => {
      previousElement.focus({
        preventScroll: true,
      });
    });
  }
}

export function initializeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modalId);
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal(modalId);
      return;
    }

    if (event.key !== "Tab") return;

    trapFocus(event, modal);
  });
}

function trapFocus(event, modal) {
  const focusableElements = [...modal.querySelectorAll(focusableSelector)];

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();

    lastElement.focus();
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();

    firstElement.focus();
  }
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

  // Task Modal

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
