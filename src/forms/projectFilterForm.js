import {
  filterProjectsByStatus,
  filterProjectsByPriority,
  resetProjectFilters,
} from "../controllers/projectFilterController.js";

export function initializeProjectFilterForm() {
  const statusFilter =
    document.getElementById("project-status-filter");

  const priorityFilter =
    document.getElementById("project-priority-filter");

  const resetButton =
    document.getElementById("reset-project-filters");

  statusFilter.addEventListener("change", (event) => {
    filterProjectsByStatus(event.target.value);
  });

  priorityFilter.addEventListener("change", (event) => {
    filterProjectsByPriority(event.target.value);
  });

  resetButton.addEventListener("click", () => {
    statusFilter.value = "";
    priorityFilter.value = "";

    const searchInput =
      document.getElementById("project-search");

    searchInput.value = "";

    resetProjectFilters();
  });
}