export function renderProjectDetails(project) {
  const container = document.getElementById("project-details");

  container.innerHTML = `
    <h2>${project.name}</h2>
    <p>${project.description}</p>

    <p><strong>Category:</strong> ${project.category}</p>
    <p><strong>Status:</strong> ${project.status}</p>
    <p><strong>Priority:</strong> ${project.priority}</p>
  `;
}