export function renderProjects(
  projects,
  selectedProjectId,
  onProjectSelect
) {
  const container = document.getElementById("project-list");

  container.innerHTML = "";

  projects.forEach((project) => {
    const button = document.createElement("button");

    button.textContent = project.name;

    button.classList.add("project-item");

    if (project.id === selectedProjectId) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      onProjectSelect(project.id);
    });

    container.appendChild(button);
  });
}