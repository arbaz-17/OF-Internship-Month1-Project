import {
  getTaskStatusFilter,
  getTaskPriorityFilter,
} from "../state/appState.js";


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
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
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

export function renderProjectDetails(project) {
  const container =
    document.getElementById("dashboard-main");

  if (!container) return;

  /*
   * No selected project
   */

  if (!project) {
    container.innerHTML = `
      <section class="dashboard-empty-state">

        <div
          class="dashboard-empty-icon"
          aria-hidden="true"
        >
          ↖
        </div>

        <p class="dashboard-empty-eyebrow">
          Project Workspace
        </p>

        <h2>
          Select a project
        </h2>

        <p>
          Choose a project from the sidebar to view
          its details and tasks.
        </p>

      </section>
    `;

    return;
  }

  /*
   * Selected project
   */

  const priority = project.priority || "medium";

const taskStatusFilter = getTaskStatusFilter();
const taskPriorityFilter = getTaskPriorityFilter();

container.innerHTML = `
    <section class="project-overview">

      <div class="project-overview-header">

        <div class="project-overview-heading">

          <p class="project-overview-category">
            ${escapeHtml(
              formatLabel(project.category)
            )}
          </p>

          <h2>
            ${escapeHtml(project.name)}
          </h2>

          <p class="project-overview-description">
            ${escapeHtml(
              project.description ||
                "No description provided."
            )}
          </p>

        </div>

        <div class="project-overview-actions">

          <button
            type="button"
            class="secondary-btn edit-project-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            Edit Project
          </button>

          <button
            type="button"
            class="danger-btn delete-project-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            Delete
          </button>

        </div>

      </div>

      <div class="project-overview-badges">

        <span class="badge badge-status">
          ${escapeHtml(
            formatLabel(project.status)
          )}
        </span>

        <span
          class="
            badge
            badge-priority
            priority-${escapeHtml(priority)}
          "
        >
          ${escapeHtml(
            formatLabel(priority)
          )}
          Priority
        </span>

      </div>

      <div class="project-details-grid">

        <div class="project-detail-item">

          <span class="meta-label">
            Start Date
          </span>

          <strong>
            ${formatDate(project.start_date)}
          </strong>

        </div>

        <div class="project-detail-item">

          <span class="meta-label">
            Due Date
          </span>

          <strong>
            ${formatDate(project.due_date)}
          </strong>

        </div>

        <div class="project-detail-item">

          <span class="meta-label">
            Created
          </span>

          <strong>
            ${formatDate(project.created_at)}
          </strong>

        </div>

        <div class="project-detail-item">

          <span class="meta-label">
            Last Updated
          </span>

          <strong>
            ${formatDate(project.updated_at)}
          </strong>

        </div>

      </div>

    </section>

    <section class="tasks-section">

      <div class="tasks-section-heading">

        <div>

          <p class="section-eyebrow">
            Project Work
          </p>

          <h2>
            Tasks
          </h2>

        </div>

        <div class="tasks-section-actions">

          <button
            type="button"
            class="primary-btn add-task-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            + Add Task
          </button>

        </div>

      </div>

      <div class="task-filters">

        <div class="task-filter-group">

          <label for="task-status-filter">
            Status
          </label>

<select id="task-status-filter">
  <option
    value=""
    ${taskStatusFilter === "" ? "selected" : ""}
  >
    All Statuses
  </option>

  <option
    value="todo"
    ${taskStatusFilter === "todo" ? "selected" : ""}
  >
    Todo
  </option>

  <option
    value="in-progress"
    ${taskStatusFilter === "in-progress" ? "selected" : ""}
  >
    In Progress
  </option>

  <option
    value="done"
    ${taskStatusFilter === "done" ? "selected" : ""}
  >
    Done
  </option>
</select>

        </div>

        <div class="task-filter-group">

          <label for="task-priority-filter">
            Priority
          </label>

<select id="task-priority-filter">
  <option
    value=""
    ${taskPriorityFilter === "" ? "selected" : ""}
  >
    All Priorities
  </option>

  <option
    value="low"
    ${taskPriorityFilter === "low" ? "selected" : ""}
  >
    Low
  </option>

  <option
    value="medium"
    ${taskPriorityFilter === "medium" ? "selected" : ""}
  >
    Medium
  </option>

  <option
    value="high"
    ${taskPriorityFilter === "high" ? "selected" : ""}
  >
    High
  </option>
</select>

        </div>

        <button
          type="button"
          id="reset-task-filters"
          class="secondary-btn"
        >
          Reset Filters
        </button>

      </div>

      <div
        class="project-tasks-container"
        id="tasks-${escapeHtml(project.id)}"
      ></div>

    </section>
  `;
}