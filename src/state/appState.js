let projects = [];
let tasks = [];

let selectedProjectId = null;
let editingProjectId = null;
let isLoading = false;
let error = null;

// ==================== Projects ====================

export function getProjects() {
  return projects;
}

export function setProjects(newProjects) {
  projects = [...newProjects];
}

export function addProject(project) {
  projects.push(project);
}

export function updateProjectState(updatedProject) {
  projects = projects.map((project) =>
    project.id === updatedProject.id
      ? updatedProject
      : project
  );
}

export function removeProjectState(projectId) {
  projects = projects.filter(
    (project) => project.id !== projectId
  );
}

// ==================== Tasks ====================

export function getTasks() {
  return tasks;
}

export function setTasks(newTasks) {
  tasks = [...newTasks];
}

export function addTask(task) {
  tasks.push(task);
}

export function updateTaskState(updatedTask) {
  tasks = tasks.map((task) =>
    task.id === updatedTask.id
      ? updatedTask
      : task
  );
}

export function removeTaskState(taskId) {
  tasks = tasks.filter(
    (task) => task.id !== taskId
  );
}

export function removeTasksByProjectId(projectId) {
  tasks = tasks.filter(
    (task) => task.project_id !== projectId
  );
}

// ==================== Selected Project ====================

export function getSelectedProjectId() {
  return selectedProjectId;
}

export function setSelectedProjectId(projectId) {
  selectedProjectId = projectId;
}

// ==================== Project Edit Mode ====================

export function getEditingProjectId() {
  return editingProjectId;
}

export function setEditingProjectId(projectId) {
  editingProjectId = projectId;
}

export function clearEditingProjectId() {
  editingProjectId = null;
}


// ==================== UI States ====================

export function getLoading() {
  return isLoading;
}

export function setLoading(loading) {
  isLoading = loading;
}

export function getError() {
  return error;
}

export function setError(errorMessage) {
  error = errorMessage;
}

export function clearError() {
  error = null;
}