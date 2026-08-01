export function renderTasks(tasks) {
  const container = document.getElementById("task-list");

  container.innerHTML = "";

  if (tasks.length === 0) {
    container.textContent = "No tasks found.";
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.classList.add("task-card");

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
      <p>Priority: ${task.priority}</p>
      <p>Due: ${task.due_date}</p>
    `;

    container.appendChild(card);
  });
}