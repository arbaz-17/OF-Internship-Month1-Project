import { httpClient } from "./httpClient.js";

const TASKS_ENDPOINT = "/tasks";

export const taskApi = {
  async getTasks(options = {}) {
    return await httpClient.get(
      TASKS_ENDPOINT,
      options
    );
  },

  async createTask(taskData, options = {}) {
    return await httpClient.post(
      TASKS_ENDPOINT,
      taskData,
      options
    );
  },

  async updateTask(
    taskId,
    taskData,
    options = {}
  ) {
    return await httpClient.put(
      `${TASKS_ENDPOINT}/${taskId}`,
      taskData,
      options
    );
  },

  async deleteTask(taskId, options = {}) {
    return await httpClient.delete(
      `${TASKS_ENDPOINT}/${taskId}`,
      options
    );
  },
};