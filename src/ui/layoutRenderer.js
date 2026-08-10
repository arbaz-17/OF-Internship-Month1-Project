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

export function renderProjectDetails(project) {
  const container = document.getElementById("dashboard-main");

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
          +
        </div>

        <p class="dashboard-empty-eyebrow">
          Project Workspace
        </p>

        <h2>
          Select a project
        </h2>

        <p>
          Choose a project from the sidebar
          to view its details and tasks.
        </p>

      </section>
    `;

    return;
  }

  /*
   * Selected project
   */
  const priority = project.priority || "medium";

  container.innerHTML = `
    <section class="project-overview">

      <div class="project-overview-header">

        <div class="project-overview-heading">

          <p class="project-overview-category">
            ${escapeHtml(formatLabel(project.category))}
          </p>

          <h2>
            ${escapeHtml(project.name)}
          </h2>

          <p class="project-overview-description">
            ${escapeHtml(project.description || "No description provided.")}
          </p>

        </div>


        <div class="project-overview-actions">

          <button
            type="button"
            class="edit-project-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            Edit Project
          </button>

          <button
            type="button"
            class="delete-project-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            Delete
          </button>

        </div>

      </div>


      <div class="project-overview-badges">

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
            class="secondary-btn"
            disabled
            title="Task filters will be added later"
          >
            Filter
          </button>

          <button
            type="button"
            class="primary-btn add-task-btn"
            data-project-id="${escapeHtml(project.id)}"
          >
            + Add Task
          </button>

        </div>

      </div>


      <div
        class="project-tasks-container"
        id="tasks-${escapeHtml(project.id)}"
      ></div>

    </section>
  `;
}
