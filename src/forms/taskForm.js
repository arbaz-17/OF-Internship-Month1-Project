import {
  createNewTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  getSelectedProjectId,
} from "../state/appState.js";

import {
  getTaskById,
} from "../services/taskService.js";

import { closeModal } from "../ui/modal.js";
import { openModal } from "../ui/modal.js";

let editingTaskId = null;

export function initializeTaskForm() {
  const form = document.getElementById("task-form");

  form.addEventListener("submit", handleSubmit);

  document.addEventListener(
    "click",
    handleTaskActions
  );
}

async function handleSubmit(event) {
  event.preventDefault();

  const taskData = {
    project_id: getSelectedProjectId(),
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-description").value,
    priority: document.getElementById("task-priority").value,
    status: document.getElementById("task-status").value,
  };

  try {
    if (editingTaskId) {
      await updateTask(
        editingTaskId,
        taskData
      );

      editingTaskId = null;
    } else {
      await createNewTask(taskData);
    }

    formReset();
    closeModal("task-modal");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function handleTaskActions(event) {
  const editButton =
    event.target.closest(".edit-task");

  if (editButton) {
    populateTaskForm(
      editButton.dataset.taskId
    );
    return;
  }

  const deleteButton =
    event.target.closest(".delete-task");

  if (deleteButton) {
    const confirmed = confirm(
      "Delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(
        deleteButton.dataset.taskId
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    return;
  }

  const statusSelect =
    event.target.closest(".task-status");

  if (statusSelect) {
    try {
      const task = getTaskById(
        statusSelect.dataset.taskId
      );

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

  const prioritySelect =
    event.target.closest(".task-priority");

  if (prioritySelect) {
    try {
      const task = getTaskById(
        prioritySelect.dataset.taskId
      );

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

  document.getElementById("task-title").value =
    task.title;

  document.getElementById("task-description").value =
    task.description;

  document.getElementById("task-priority").value =
    task.priority;

  document.getElementById("task-status").value =
    task.status;

  document.querySelector(
    "#task-form button"
  ).textContent = "Update Task";
}

function formReset() {
  editingTaskId = null;

  document.getElementById("task-form").reset();

  document.querySelector(
    "#task-form button"
  ).textContent = "Create Task";
}