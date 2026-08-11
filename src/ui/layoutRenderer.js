import {
  getTaskStatusFilter,
  getTaskPriorityFilter,
} from "../state/appState.js";
import { escapeHtml, formatDate, formatLabel } from "../utils/helpers.js";

export function renderProjectDetails(project) {
  const container = document.getElementById("dashboard-main");

  if (!container) return;

  /*
   * No selected project
   */

  if (!project) {
    container.innerHTML = `
      <section
        class="dashboard-empty-state"
        aria-labelledby="dashboard-empty-title"
      >
        <div
          class="dashboard-empty-icon"
          aria-hidden="true"
        >
          ↖
        </div>

        <p class="dashboard-empty-eyebrow">
          Project Workspace
        </p>

        <h2 id="dashboard-empty-title">
          Select a project
        </h2>

        <p>
          Choose a project from the sidebar to
          view its details and tasks.
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
    <section
      class="project-overview"
      aria-labelledby="project-title"
    >
      <header class="project-overview-header">

        <div class="project-overview-heading">

          <p class="project-overview-category">
            ${escapeHtml(formatLabel(project.category))}
          </p>

          <h2 id="project-title">
            ${escapeHtml(project.name)}
          </h2>

          <p class="project-overview-description">
            ${escapeHtml(project.description || "No description provided.")}
          </p>

        </div>

        <div
          class="project-overview-actions"
          aria-label="Project actions"
        >

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

      </header>

      <div
        class="project-overview-badges"
        aria-label="Project status"
      >

        <span class="badge badge-status">
          ${escapeHtml(formatLabel(project.status))}
        </span>

        <span
          class="
            badge
            badge-priority
            priority-${escapeHtml(priority)}
          "
        >
          ${escapeHtml(formatLabel(priority))}
          Priority
        </span>

      </div>

      <dl class="project-details-grid">

        <div class="project-detail-item">

          <dt class="meta-label">
            Start Date
          </dt>

          <dd>
            ${formatDate(project.start_date)}
          </dd>

        </div>

        <div class="project-detail-item">

          <dt class="meta-label">
            Due Date
          </dt>

          <dd>
            ${formatDate(project.due_date)}
          </dd>

        </div>

        <div class="project-detail-item">

          <dt class="meta-label">
            Created
          </dt>

          <dd>
            ${formatDate(project.created_at)}
          </dd>

        </div>

        <div class="project-detail-item">

          <dt class="meta-label">
            Last Updated
          </dt>

          <dd>
            ${formatDate(project.updated_at)}
          </dd>

        </div>

      </dl>
    </section>

    <section
      class="tasks-section"
      aria-labelledby="tasks-heading"
    >

      <header class="tasks-section-heading">

        <div>

          <p class="section-eyebrow">
            Project Work
          </p>

          <h2 id="tasks-heading">
            Tasks
          </h2>

        </div>

        <div
          class="tasks-section-actions"
          aria-label="Task actions"
        >

          <button
            type="button"
            class="primary-btn add-task-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            + Add Task
          </button>

        </div>

      </header>

      <div
        class="task-filters"
        role="group"
        aria-labelledby="task-filter-heading"
      >

        <div class="task-filter-group">

          <label for="task-status-filter">
            Status
          </label>

          <select
            id="task-status-filter"
            aria-label="Filter tasks by status"
          >
            <option value="">
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

          <select
            id="task-priority-filter"
            aria-label="Filter tasks by priority"
          >
            <option value="">
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
        aria-live="polite"
      ></div>

    </section>
  `;
}
