function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderProjects(projects, selectedProjectId, onProjectSelect) {
  const container = document.getElementById("project-list");

  const count = document.getElementById("project-count");

  if (!container) return;

  container.innerHTML = "";

  if (count) {
    count.textContent = projects.length;
  }

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-projects-sidebar">

        <p>
          No projects found.
        </p>

      </div>
    `;

    return;
  }

  projects.forEach((project) => {
    const item = document.createElement("button");

    item.type = "button";

    item.className = "project-nav-item";

    item.dataset.projectId = project.id;

    if (project.id === selectedProjectId) {
      item.classList.add("active");

      item.setAttribute("aria-current", "page");
    }

    item.innerHTML = `
      <span
        class="project-nav-indicator"
        aria-hidden="true"
      ></span>

      <span class="project-nav-name">
        ${escapeHtml(project.name)}
      </span>
    `;

    item.addEventListener("click", () => {
      onProjectSelect(project.id);
    });

    container.appendChild(item);
  });
}
