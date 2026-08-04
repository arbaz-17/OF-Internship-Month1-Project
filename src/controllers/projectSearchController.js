import { setProjectSearchQuery } from "../state/appState.js";
import eventBus from "../events/eventBus.js";
import { EVENTS } from "../events/eventNames.js";

export function searchProjects(query) {
  setProjectSearchQuery(query);

  eventBus.emit(EVENTS.PROJECT_UPDATED);
}