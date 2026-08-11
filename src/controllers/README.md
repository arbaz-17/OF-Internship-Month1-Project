# Controllers

## Overview

The `controllers` module coordinates user-driven actions between the UI, services, application state, and event system.

## Module Structure

```text
controllers/
├── projectController.js
├── projectFilterController.js
├── projectSearchController.js
└── taskController.js
```

## How It Connects

```text
UI / Forms
    ↓
Controllers
    ↓
Services ──→ API
    ↓
State
    ↓
Event Bus
    ↓
Application Re-render
```

## Key Responsibilities

- Select the active project.
- Coordinate project creation, editing, and deletion.
- Coordinate task creation, editing, and deletion.
- Update project search state.
- Update project filter state.
- Emit application events after actions complete.
- Keep UI event handlers separated from business/data logic.

---

## `projectController.js`

Coordinates project-level actions.

### `selectProject(projectId)`

Sets the selected project ID and emits `PROJECT_SELECTED`.

### `createNewProject(projectData)`

Creates a project through `projectService`, selects the newly created project, emits `PROJECT_CREATED`, and returns the created project.

### `updateProject(projectId, projectData)`

Delegates the update to the service and emits `PROJECT_UPDATED` after success.

### `deleteProject(projectId)`

Deletes the project through the service, selects the first remaining project when available, clears the selection when no projects remain, and emits `PROJECT_DELETED`.

### `setCurrentProject(projectId)`

Sets the current project and emits `PROJECT_SELECTED`. This is used when another UI action, such as opening the task form, needs to establish the active project.

---

## `projectFilterController.js`

Handles project filter state.

### `filterProjectsByStatus(status)`

Updates the project status filter and emits `PROJECT_UPDATED` to trigger a UI refresh.

### `filterProjectsByPriority(priority)`

Updates the project priority filter and emits `PROJECT_UPDATED`.

### `resetProjectFilters()`

Clears the project search query, status filter, and priority filter, then emits `PROJECT_UPDATED`.

---

## `projectSearchController.js`

Handles project search state.

### `searchProjects(query)`

Stores the current project search query and emits `PROJECT_UPDATED`.

The actual filtering logic remains in `projectService.js`, keeping the controller focused on coordination.

---

## `taskController.js`

Coordinates task CRUD operations.

### `createNewTask(taskData)`

Delegates task creation to `taskService`, emits `TASK_CREATED`, and returns the created task.

### `updateTask(taskId, taskData)`

Delegates the update to `taskService` and emits `TASK_UPDATED` after success.

### `deleteTask(taskId)`

Delegates deletion to `taskService` and emits `TASK_DELETED`.

---

## Basic Execution Flow

### Project CRUD

```text
User Action
    ↓
Project Form
    ↓
projectController
    ↓
projectService
    ↓
projectApi
    ↓
State + Local Storage
    ↓
Event Bus
    ↓
renderApplication()
```

### Search / Filter

```text
User changes search/filter
    ↓
Controller
    ↓
Application State
    ↓
Event Bus
    ↓
renderApplication()
    ↓
Service applies filters
    ↓
Renderer displays results
```

### Task CRUD

```text
User Action
    ↓
Task Form
    ↓
taskController
    ↓
taskService
    ↓
taskApi
    ↓
State + Local Storage
    ↓
Event Bus
    ↓
renderApplication()
```

## Design Notes

The controller layer acts as an orchestration layer.

- **Forms/UI** detect user interactions.
- **Controllers** coordinate the action and event flow.
- **Services** perform validation, API operations, state updates, and persistence.
- **Event Bus** notifies the application that something changed.
- **Renderers** update the interface.

