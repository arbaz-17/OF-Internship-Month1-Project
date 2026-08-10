function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderErrorState(errorMessage) {
  const container = document.getElementById("project-list");

  if (!container) return;

  container.innerHTML = `
    <div
      class="error-state"
      role="alert"
    >
      <h2>
        Unable to load workspace
      </h2>

      <p>
        ${escapeHtml(errorMessage)}
      </p>
    </div>
  `;
}
