import eventBus from "../events/eventBus.js";
import { EVENTS } from "../events/eventNames.js";

import {
  createTask,
  updateExistingTask,
  deleteExistingTask,
} from "../services/taskService.js";

export async function createNewTask(taskData) {
  const task = await createTask(taskData);

  eventBus.emit(EVENTS.TASK_CREATED, {
    task,
  });

  return task;
}

export async function updateTask(
  taskId,
  taskData
) {
  const task = await updateExistingTask(
    taskId,
    taskData
  );

  eventBus.emit(EVENTS.TASK_UPDATED, {
    task,
  });

  return task;
}

export async function deleteTask(taskId) {
  await deleteExistingTask(taskId);

  eventBus.emit(EVENTS.TASK_DELETED, {
    taskId,
  });
}