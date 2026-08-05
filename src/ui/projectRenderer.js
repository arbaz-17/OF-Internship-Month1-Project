export function renderProjects(projects, selectedProjectId, onProjectSelect) {
  const container = document.getElementById("project-list");

  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-projects">
        <h2>No Projects Found</h2>
        <p>Create your first project to get started.</p>
      </div>
    `;
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("article");

    card.className = "project-card";

    if (project.id === selectedProjectId) {
      card.classList.add("active");
    }

    card.innerHTML = `
    <div
        class="project-card-header"
        data-project-id="${project.id}">

        <div class="project-heading">

            <span class="expand-icon">
                ▼
            </span>

            <div>

                <h2 class="project-title">
                    ${project.name}
                </h2>

                <p class="project-category">
                    ${project.category || "Uncategorized"}
                </p>

            </div>

        </div>

        <div class="project-badges">

            <span class="badge badge-status">
                ${project.status}
            </span>

            <span class="badge badge-priority">
                ${project.priority}
            </span>

        </div>

    </div>

    <div class="project-content">

        <div class="project-card-body">

            <p class="project-description">
                ${
                    project.description ||
                    "No description provided."
                }
            </p>

        </div>

        <div class="project-card-meta">

            <span>
                Created:
                ${
                    project.created_at
                        ? new Date(project.created_at).toLocaleDateString()
                        : "N/A"
                }
            </span>

            <span>
                Updated:
                ${
                    project.updated_at
                        ? new Date(project.updated_at).toLocaleDateString()
                        : "N/A"
                }
            </span>

        </div>

        <div class="project-card-actions">

            <div class="project-actions-left">

                <button
                    type="button"
                    class="add-task-btn"
                    data-project-id="${project.id}">
                    + Add Task
                </button>

            </div>

            <div class="project-actions-right">

                <button
                    type="button"
                    id="edit-project-btn"
                    data-project-id="${project.id}">
                    Edit
                </button>

                <button
                    type="button"
                    id="delete-project-btn"
                    data-project-id="${project.id}">
                    Delete
                </button>

            </div>

        </div>

        <div
            class="project-tasks-container"
            id="tasks-${project.id}">
        </div>

    </div>
`;

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      onProjectSelect(project.id);
    });

    container.appendChild(card);
  });
}
