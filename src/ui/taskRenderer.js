import { getSelectedProjectId } from "../state/appState.js";

export function renderTasks(tasks) {
  const selectedProjectId = getSelectedProjectId();

  if (!selectedProjectId) return;

  const container = document.getElementById(
    `tasks-${selectedProjectId}`
  );

  if (!container) return;

  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-tasks">
        <p>No tasks yet.</p>
      </div>
    `;
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.className = "task-card";

    card.innerHTML = `
      <div class="task-header">
        <h3>${task.title}</h3>

        <div class="task-actions">
          <button
            class="edit-task"
            data-task-id="${task.id}">
            Edit
          </button>

          <button
            class="delete-task"
            data-task-id="${task.id}">
            Delete
          </button>
        </div>
      </div>

      <p class="task-description">
        ${task.description || ""}
      </p>

      <div class="task-footer">

        <select
          class="task-status"
          data-task-id="${task.id}">

          <option
            value="todo"
            ${task.status === "todo" ? "selected" : ""}>
            Todo
          </option>

          <option
            value="in-progress"
            ${task.status === "in-progress" ? "selected" : ""}>
            In Progress
          </option>

          <option
            value="done"
            ${task.status === "done" ? "selected" : ""}>
            Done
          </option>

        </select>

        <select
          class="task-priority"
          data-task-id="${task.id}">

          <option
            value="low"
            ${task.priority === "low" ? "selected" : ""}>
            Low
          </option>

          <option
            value="medium"
            ${task.priority === "medium" ? "selected" : ""}>
            Medium
          </option>

          <option
            value="high"
            ${task.priority === "high" ? "selected" : ""}>
            High
          </option>

        </select>

      </div>
    `;

    container.appendChild(card);
  });
}