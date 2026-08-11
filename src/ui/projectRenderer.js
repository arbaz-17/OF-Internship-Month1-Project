import { escapeHtml } from "../utils/helpers.js";

export function renderProjects(projects, selectedProjectId, onProjectSelect) {
  const container = document.getElementById("project-list");

  const count = document.getElementById("project-count");

  if (!container) return;

  container.innerHTML = "";

  if (count) {
    count.textContent = projects.length;

    count.setAttribute(
      "aria-label",
      `${projects.length} visible ${
        projects.length === 1 ? "project" : "projects"
      }`,
    );
  }

  if (projects.length === 0) {
    container.innerHTML = `
      <p
        class="empty-projects-sidebar"
        role="status"
      >
        No projects found.
      </p>
    `;

    return;
  }

  projects.forEach((project) => {
    const item = document.createElement("button");

    item.type = "button";

    item.className = "project-nav-item";

    item.dataset.projectId = project.id;

    const isSelected = project.id === selectedProjectId;

    if (isSelected) {
      item.classList.add("active");

      item.setAttribute("aria-current", "page");

      item.setAttribute("aria-label", `${project.name}, selected project`);
    } else {
      item.setAttribute("aria-label", `Open project ${project.name}`);
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
