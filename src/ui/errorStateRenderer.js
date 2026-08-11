import { escapeHtml } from "../utils/helpers.js";

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
