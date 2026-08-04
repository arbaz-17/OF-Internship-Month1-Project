import {
  setProjectStatusFilter,
  setProjectPriorityFilter,
  clearProjectSearchQuery,
  clearProjectStatusFilter,
  clearProjectPriorityFilter,
} from "../state/appState.js";

import eventBus from "../events/eventBus.js";
import { EVENTS } from "../events/eventNames.js";

export function filterProjectsByStatus(status) {
  setProjectStatusFilter(status);

  eventBus.emit(EVENTS.PROJECT_UPDATED);
}

export function filterProjectsByPriority(priority) {
  setProjectPriorityFilter(priority);

  eventBus.emit(EVENTS.PROJECT_UPDATED);
}

export function resetProjectFilters() {
  clearProjectSearchQuery();
  clearProjectStatusFilter();
  clearProjectPriorityFilter();

  eventBus.emit(EVENTS.PROJECT_UPDATED);
}