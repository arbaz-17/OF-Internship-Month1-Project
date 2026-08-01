export function renderNoProjectsState() {
  const projectList = document.getElementById("project-list");
  const projectDetails = document.getElementById("project-details");
  const taskList = document.getElementById("task-list");

  projectList.innerHTML = `
    <p>No projects available.</p>
  `;

  projectDetails.innerHTML = `
    <h2>No Project Selected</h2>
    <p>Create your first project to get started.</p>
  `;

  taskList.innerHTML = `
    <p>No tasks to display.</p>
  `;
}