import { httpClient } from "./httpClient.js";

const PROJECTS_ENDPOINT = "/projects";

export const projectApi = {
  async getProjects(options = {}) {
    const projects = await httpClient.get(PROJECTS_ENDPOINT, options);

    return projects;
  },
};