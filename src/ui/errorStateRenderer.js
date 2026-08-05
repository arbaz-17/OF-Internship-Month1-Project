export function renderErrorState(errorMessage) {
  const projectDetailsContainer = document.getElementById(
    "project-details"
  );

  const taskListContainer = document.getElementById(
    "task-list"
  );

  projectDetailsContainer.innerHTML = `
    <div class="error-state">
      <h2>Something went wrong</h2>
      <p>${errorMessage}</p>
    </div>
  `;

  taskListContainer.innerHTML = "";
}