import { getSelectedProjectId } from "../state/appState.js";

function formatDate(date) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatLabel(value) {
  if (!value) return "N/A";

  return String(value)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderTasks(tasks, { isFiltered = false } = {}) {
  const selectedProjectId = getSelectedProjectId();

  if (!selectedProjectId) return;

  const container = document.getElementById(`tasks-${selectedProjectId}`);

  if (!container) return;

  container.innerHTML = "";

  if (tasks.length === 0) {
    if (isFiltered) {
      container.innerHTML = `
        <div class="empty-tasks">

          <div
            class="empty-tasks-icon"
            aria-hidden="true"
          >
            ◌
          </div>

          <h3>
            No matching tasks
          </h3>

          <p>
            No tasks match the selected filters.
            Try adjusting or resetting your filters.
          </p>

        </div>
      `;

      return;
    }

    container.innerHTML = `
      <div class="empty-tasks">

        <div
          class="empty-tasks-icon"
          aria-hidden="true"
        >
          ✓
        </div>

        <h3>
          No tasks yet
        </h3>

        <p>
          Add a task to start organizing
          the work for this project.
        </p>

      </div>
    `;

    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");

    card.className = "task-card";

    card.dataset.taskId = task.id;

    const priority = task.priority || "medium";

    card.innerHTML = `
      <div class="task-card-header">

        <button
          type="button"
          class="task-toggle"
          aria-expanded="false"
          aria-controls="task-details-${escapeHtml(task.id)}"
          data-task-toggle="${escapeHtml(task.id)}"
        >

          <span class="task-toggle-content">

            <span class="task-title">
              ${escapeHtml(task.title)}
            </span>

            <span class="task-summary">

              <span
                class="
                  badge
                  badge-status
                  task-status-badge
                "
              >
                ${escapeHtml(formatLabel(task.status))}
              </span>

              <span
                class="
                  badge
                  badge-priority
                  priority-${escapeHtml(priority)}
                  priority-badge
                "
              >
                ${escapeHtml(formatLabel(priority))}
              </span>

            </span>

          </span>

          <span
            class="task-chevron"
            aria-hidden="true"
          >
            ⌄
          </span>

        </button>

      </div>

      <div
        id="task-details-${escapeHtml(task.id)}"
        class="task-details"
        hidden
      >

        <div class="task-details-body">

          <div class="task-description-block">

            <span class="task-detail-label">
              Description
            </span>

            <p class="task-description">
              ${escapeHtml(task.description || "No description provided.")}
            </p>

          </div>

          <div class="task-meta-grid">

            <div class="task-meta-item">

              <span class="task-detail-label">
                Status
              </span>

              <strong>
                ${escapeHtml(formatLabel(task.status))}
              </strong>

            </div>

            <div class="task-meta-item">

              <span class="task-detail-label">
                Priority
              </span>

              <strong>
                ${escapeHtml(formatLabel(priority))}
              </strong>

            </div>

            <div class="task-meta-item">

              <span class="task-detail-label">
                Start Date
              </span>

              <strong>
                ${formatDate(task.start_date)}
              </strong>

            </div>

            <div class="task-meta-item">

              <span class="task-detail-label">
                Due Date
              </span>

              <strong>
                ${formatDate(task.due_date)}
              </strong>

            </div>

            <div class="task-meta-item">

              <span class="task-detail-label">
                Created
              </span>

              <strong>
                ${formatDate(task.created_at)}
              </strong>

            </div>

          </div>

        </div>

        <div class="task-card-actions">

          <button
            type="button"
            class="secondary-btn edit-task"
            data-task-id="${escapeHtml(task.id)}"
          >
            Edit Task
          </button>

          <button
            type="button"
            class="danger-btn delete-task"
            data-task-id="${escapeHtml(task.id)}"
          >
            Delete
          </button>

        </div>

      </div>
    `;

    container.appendChild(card);
  });
}

export function initializeTaskAccordion() {
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-task-toggle]");

    if (!toggle) return;

    const taskId = toggle.dataset.taskToggle;

    const details = document.getElementById(`task-details-${taskId}`);

    const card = toggle.closest(".task-card");

    if (!details || !card) return;

    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    const nextExpanded = !isExpanded;

    toggle.setAttribute("aria-expanded", String(nextExpanded));

    details.hidden = !nextExpanded;

    card.classList.toggle("expanded", nextExpanded);
  });
}
