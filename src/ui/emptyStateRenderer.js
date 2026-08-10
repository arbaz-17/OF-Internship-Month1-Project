export function renderNoProjectsState() {
  const container = document.getElementById("project-list");

  container.innerHTML = `
    <section class="empty-state">
      <h2>No Projects Yet</h2>

      <p>
        Create your first project to start managing your work.
      </p>
    </section>
  `;
}