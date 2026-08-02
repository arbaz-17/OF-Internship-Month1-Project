export function renderNoProjectsState() {
  document.getElementById("project-list").innerHTML = `
    <p>No projects available.</p>
  `;

  document.getElementById("project-details").innerHTML = `
    <h2>No Project Selected</h2>

    <p>Create your first project to get started.</p>
  `;

  document.getElementById("task-list").innerHTML = `
    <p>No tasks to display.</p>
  `;
}