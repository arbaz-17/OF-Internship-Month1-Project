import {
  createNewTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { getSelectedProjectId } from "../state/appState.js";

import { getTaskById } from "../services/taskService.js";

import { closeModal } from "../ui/modal.js";
import { openModal } from "../ui/modal.js";
import { showConfirmation } from "../ui/confirmModal.js";

import { setButtonLoading, resetButton } from "../ui/buttonLoading.js";

let editingTaskId = null;

export function initializeTaskForm() {
  const form = document.getElementById("task-form");

  form.addEventListener("submit", handleSubmit);

  document.addEventListener("click", handleTaskActions);
}

async function handleSubmit(event) {
  event.preventDefault();
  const submitButton = document.getElementById("task-submit-btn");

  const taskData = {
    project_id: getSelectedProjectId(),
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-description").value,
    priority: document.getElementById("task-priority").value,
    status: document.getElementById("task-status").value,
    start_date: document.getElementById("task-start-date").value,
    due_date: document.getElementById("task-due-date").value,
  };

  setButtonLoading(submitButton, editingTaskId ? "Updating..." : "Creating...");

  try {
    if (editingTaskId) {
      await updateTask(editingTaskId, taskData);

      editingTaskId = null;
    } else {
      await createNewTask(taskData);
    }

    formReset();
    closeModal("task-modal");
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    resetButton(submitButton);
  }
}

async function handleTaskActions(event) {
  const editButton = event.target.closest(".edit-task");

  if (editButton) {
    populateTaskForm(editButton.dataset.taskId);
    return;
  }

  const deleteButton = event.target.closest(".delete-task");

  if (deleteButton) {
    const taskId = deleteButton.dataset.taskId;

    const task = getTaskById(taskId);

    showConfirmation({
      title: "Delete Task",
      message: `Are you sure you want to delete "${task.title}"?\n\nThis action cannot be undone.`,
      confirmText: "Delete Task",

      onConfirm: async () => {
        try {
          await deleteTask(taskId);
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      },
    });

    return;
  }

  const statusSelect = event.target.closest(".task-status");

  if (statusSelect) {
    try {
      const task = getTaskById(statusSelect.dataset.taskId);

      await updateTask(task.id, {
        ...task,
        status: statusSelect.value,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    return;
  }

  const prioritySelect = event.target.closest(".task-priority");

  if (prioritySelect) {
    try {
      const task = getTaskById(prioritySelect.dataset.taskId);

      await updateTask(task.id, {
        ...task,
        priority: prioritySelect.value,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}

function populateTaskForm(taskId) {
  const task = getTaskById(taskId);

  if (!task) return;

  editingTaskId = taskId;
  openModal("task-modal");

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-start-date").value = task.start_date
    ? task.start_date.split("T")[0]
    : "";

  document.getElementById("task-due-date").value = task.due_date
    ? task.due_date.split("T")[0]
    : "";

  document.getElementById("task-submit-btn").textContent = "Save Changes";
}

function formReset() {
  editingTaskId = null;
  document.getElementById("task-form").reset();
  document.getElementById("task-submit-btn").textContent = "Create Task";
}
