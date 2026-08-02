import { createNewProject } from "../controllers/projectController.js";

export function initializeProjectForm() {
  const form = document.getElementById("project-form");

  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();

  const projectData = {
    name: document.getElementById("project-name").value,
    category: document.getElementById("project-category").value,
    description: document.getElementById("project-description").value,
  };

  createNewProject(projectData);

  event.target.reset();
}