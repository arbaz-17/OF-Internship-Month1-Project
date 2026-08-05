export function renderLoadingState() {
  const container = document.getElementById("project-list");

  container.innerHTML = `
    <section class="loading-state">
      <h2>Loading workspace...</h2>

      <p>Please wait while we fetch your projects.</p>
    </section>
  `;
}