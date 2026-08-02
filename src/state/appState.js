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


// ---------- Project Operations ----------

export function addProject(project) {
  projects.push(project);
}

export function updateProject(updatedProject) {
  projects = projects.map((project) =>
    project.id === updatedProject.id
      ? updatedProject
      : project
  );
}

export function removeProject(projectId) {
  projects = projects.filter(
    (project) => project.id !== projectId
  );
}