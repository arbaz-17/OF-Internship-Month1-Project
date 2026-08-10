import { getSelectedProjectId } from "../state/appState.js";

export function renderTasks(tasks) {
  const selectedProjectId = getSelectedProjectId();
  if (!selectedProjectId) return;

  const container = document.getElementById(`tasks-${selectedProjectId}`);
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
        
        <div class="task-title-group">
            <h3>${task.title}</h3>
<div class="task-badges">
                <span class="badge badge-status">${task.status}</span>
                <span class="badge badge-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
        </div>

        <div class="task-actions">
          <button class="edit-task" data-task-id="${task.id}">Edit</button>
          <button class="delete-task" data-task-id="${task.id}">Delete</button>
        </div>

      </div>

      ${task.description ? `<p class="task-description">${task.description}</p>` : ""}
    `;

    container.appendChild(card);
  });
}