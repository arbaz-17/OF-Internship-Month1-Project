export function renderTasks(tasks) {
  const container = document.getElementById("task-list");

  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.className = "task-card";

    card.innerHTML = `
      <h3>${task.title}</h3>

      <p>${task.description}</p>

      <label>Status</label>

      <select
        class="task-status"
        data-task-id="${task.id}">

        <option value="todo"
          ${task.status === "todo" ? "selected" : ""}>
          Todo
        </option>

        <option value="in-progress"
          ${task.status === "in-progress" ? "selected" : ""}>
          In Progress
        </option>

        <option value="done"
          ${task.status === "done" ? "selected" : ""}>
          Done
        </option>

      </select>

      <label>Priority</label>

      <select
        class="task-priority"
        data-task-id="${task.id}">

        <option value="low"
          ${task.priority === "low" ? "selected" : ""}>
          Low
        </option>

        <option value="medium"
          ${task.priority === "medium" ? "selected" : ""}>
          Medium
        </option>

        <option value="high"
          ${task.priority === "high" ? "selected" : ""}>
          High
        </option>

      </select>

      <button
        class="edit-task"
        data-task-id="${task.id}">
        Edit
      </button>

      <button
        class="delete-task"
        data-task-id="${task.id}">
        Delete
      </button>
    `;

    container.appendChild(card);
  });
}