import {
  getTaskStatusFilter,
  getTaskPriorityFilter,
  setTaskStatusFilter,
  setTaskPriorityFilter,
  clearTaskFilters,
} from "../state/appState.js";

export function initializeTaskFilterForm(onFilterChange) {
  document.addEventListener("change", (event) => {
    const statusFilter = event.target.closest("#task-status-filter");

    if (statusFilter) {
      setTaskStatusFilter(statusFilter.value);

      onFilterChange();

      return;
    }

    const priorityFilter = event.target.closest("#task-priority-filter");

    if (priorityFilter) {
      setTaskPriorityFilter(priorityFilter.value);

      onFilterChange();
    }
  });

  document.addEventListener("click", (event) => {
    const resetButton = event.target.closest("#reset-task-filters");

    if (!resetButton) return;

    clearTaskFilters();

    onFilterChange();
  });
}

export function syncTaskFilterControls() {
  const statusFilter = document.getElementById("task-status-filter");

  const priorityFilter = document.getElementById("task-priority-filter");

  if (statusFilter) {
    statusFilter.value = getTaskStatusFilter();
  }

  if (priorityFilter) {
    priorityFilter.value = getTaskPriorityFilter();
  }
}
