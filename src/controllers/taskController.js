import eventBus from "../events/eventBus.js";
import { EVENTS } from "../events/eventNames.js";

import {
  createTask,
  updateExistingTask,
  deleteExistingTask,
} from "../services/taskService.js";

export function createNewTask(taskData) {
  const task = createTask(taskData);

  eventBus.emit(EVENTS.TASK_CREATED, {
    task,
  });

  return task;
}

export function updateTask(taskId, taskData) {
  const task = updateExistingTask(
    taskId,
    taskData
  );

  eventBus.emit(EVENTS.TASK_UPDATED, {
    task,
  });

  return task;
}

export function deleteTask(taskId) {
  deleteExistingTask(taskId);

  eventBus.emit(EVENTS.TASK_DELETED, {
    taskId,
  });
}