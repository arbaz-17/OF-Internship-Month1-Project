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

let editingTaskId = null;

export function initializeTaskForm() {
  const form = document.getElementById("task-form");

  form.addEventListener("submit", handleSubmit);

  document.addEventListener("click", handleTaskActions);
}

function handleSubmit(event) {
  event.preventDefault();

  const taskData = {
    project_id: getSelectedProjectId(),
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-description").value,
    priority: document.getElementById("task-priority").value,
    status: document.getElementById("task-status").value,
  };

  if (editingTaskId) {
    updateTask(editingTaskId, taskData);

    editingTaskId = null;

    formReset();
  } else {
    createNewTask(taskData);

    formReset();
  }
}

function handleTaskActions(event) {

  const editButton = event.target.closest(".edit-task");

  if (editButton) {
    populateTaskForm(Number(editButton.dataset.taskId));
    return;
  }

  const deleteButton = event.target.closest(".delete-task");

  if (deleteButton) {

    if (confirm("Delete this task?")) {
      deleteTask(Number(deleteButton.dataset.taskId));
    }

    return;
  }

  const statusSelect = event.target.closest(".task-status");

  if (statusSelect) {

    const task = getTaskById(
      Number(statusSelect.dataset.taskId)
    );

    updateTask(task.id, {
      ...task,
      status: statusSelect.value,
    });

    return;
  }

  const prioritySelect = event.target.closest(".task-priority");

  if (prioritySelect) {

    const task = getTaskById(
      Number(prioritySelect.dataset.taskId)
    );

    updateTask(task.id, {
      ...task,
      priority: prioritySelect.value,
    });

  }

}

function populateTaskForm(taskId) {
  const task = getTaskById(taskId);

  editingTaskId = taskId;

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
  document.getElementById("task-form").reset();

  document.querySelector(
    "#task-form button"
  ).textContent = "Create Task";
}