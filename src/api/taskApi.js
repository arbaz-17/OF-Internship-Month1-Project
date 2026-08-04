import { httpClient } from "./httpClient.js";

const TASKS_ENDPOINT = "/tasks";

export const taskApi = {
  async getTasks(options = {}) {
    const tasks = await httpClient.get(TASKS_ENDPOINT, options);

    return tasks;
  },
};