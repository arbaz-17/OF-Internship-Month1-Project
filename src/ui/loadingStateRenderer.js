export function renderLoadingState() {
  const container = document.getElementById("project-list");

  if (!container) return;

  container.innerHTML = `
    <div
      class="loading-state"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <h2>
        Loading workspace
      </h2>

      <p>
        Please wait while we fetch your
        projects.
      </p>
    </div>
  `;
}
