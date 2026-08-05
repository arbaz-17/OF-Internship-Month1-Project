export function renderLoadingState() {
  const projectDetailsContainer = document.getElementById(
    "project-details"
  );

  const taskListContainer = document.getElementById(
    "task-list"
  );

  projectDetailsContainer.innerHTML = `
    <div class="loading-state">
      <h2>Loading...</h2>
      <p>Please wait while the application loads your workspace.</p>
    </div>
  `;

  taskListContainer.innerHTML = "";
}