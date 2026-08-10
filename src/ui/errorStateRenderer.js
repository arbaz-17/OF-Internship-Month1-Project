export function renderErrorState(errorMessage) {
  const container = document.getElementById("project-list");

  container.innerHTML = `
    <section class="error-state">

      <h2>Unable to load workspace</h2>

      <p>${errorMessage}</p>

    </section>
  `;
}