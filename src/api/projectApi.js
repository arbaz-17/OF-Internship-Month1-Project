import { httpClient } from "./httpClient.js";

const PROJECTS_ENDPOINT = "/projects";

export const projectApi = {
  async getProjects(options = {}) {
    return await httpClient.get(
      PROJECTS_ENDPOINT,
      options
    );
  },

  async createProject(projectData, options = {}) {
    return await httpClient.post(
      PROJECTS_ENDPOINT,
      projectData,
      options
    );
  },

  async updateProject(
    projectId,
    projectData,
    options = {}
  ) {
    return await httpClient.put(
      `${PROJECTS_ENDPOINT}/${projectId}`,
      projectData,
      options
    );
  },

  async deleteProject(projectId, options = {}) {
    return await httpClient.delete(
      `${PROJECTS_ENDPOINT}/${projectId}`,
      options
    );
  },
};