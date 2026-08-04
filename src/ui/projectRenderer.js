export function renderProjects(
  projects,
  selectedProjectId,
  onProjectSelect
) {
  const container = document.getElementById("project-list");

  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p>No projects available.</p>";
    return;
  }

  projects.forEach((project) => {
    const button = document.createElement("button");

    button.className = "project-item";
    button.textContent = project.name;
    button.dataset.projectId = project.id;

    if (project.id === selectedProjectId) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      onProjectSelect(project.id);
    });

    container.appendChild(button);
  });
}