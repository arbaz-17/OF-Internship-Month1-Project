let projects = [];
let tasks = [];
let selectedProjectId = null;

// ---------- Projects ----------

export function getProjects() {
  return projects;
}

export function setProjects(newProjects) {
  projects = [...newProjects];
}

// ---------- Tasks ----------

export function getTasks() {
  return tasks;
}

export function setTasks(newTasks) {
  tasks = [...newTasks];
}

// ---------- Selected Project ----------

export function getSelectedProjectId() {
  return selectedProjectId;
}

export function setSelectedProjectId(projectId) {
  selectedProjectId = projectId;
}