# Services

## Overview

The `services` module contains the application's core project and task business logic.

It sits between controllers and lower-level data sources such as the API, application state, and browser storage. Services perform validation, coordinate CRUD operations, apply filtering, update state, and persist the current workspace.

## Key Responsibilities

- Provide project and task query operations.
- Validate required project and task data.
- Coordinate project and task CRUD operations.
- Communicate with the API layer.
- Update the central application state after successful operations.
- Persist the updated workspace to local storage.
- Apply project search and filters locally.
- Apply task filters locally.
- Handle cascading task deletion when a project is deleted.

## Module Structure

```text
services/
├── projectService.js
└── taskService.js
```

## `projectService.js`

Handles project-related business logic.

### Query Functions

#### `getAllProjects()`

Returns all projects currently stored in application state.

#### `getFirstProject()`

Returns the first project in the current project collection.

#### `getProjectById(projectId)`

Finds a project by its ID.

#### `projectExists(projectId)`

Checks whether a project with the specified ID exists.

### CRUD Functions

#### `createProject(projectData)`

Validates the project name, creates the project through the API, adds the returned project to application state, and persists the workspace.

#### `updateExistingProject(projectId, projectData)`

Validates the existing project and updated name, sends the update to the API, updates application state, and persists the workspace.

#### `deleteExistingProject(projectId)`

Deletes all tasks belonging to the project from the API, deletes the project, removes the project and its tasks from application state, and persists the resulting workspace.

### Filtering

#### `getFilteredProjects()`

Filters projects using the locally stored:

- Search query
- Status filter
- Priority filter

Filtering happens against the in-memory application state rather than making a new network request.

## `taskService.js`

Handles task-related business logic.

### Query Functions

#### `getAllTasks()`

Returns all tasks currently stored in application state.

#### `getTasksByProjectId(projectId)`

Returns tasks belonging to a specific project.

#### `getFilteredTasksByProjectId(projectId)`

Returns tasks for a project after applying the current task status and priority filters.

#### `getTaskById(taskId)`

Finds a task by its ID.

### CRUD Functions

#### `createTask(taskData)`

Validates the task title, creates the task through the API, updates application state, and persists the workspace.

#### `updateExistingTask(taskId, taskData)`

Validates that the task exists and that its title is not empty, updates the task through the API, updates application state, and persists the workspace.

#### `deleteExistingTask(taskId)`

Deletes the task through the API, removes it from application state, and persists the workspace.

## Basic Execution Flow

A typical write operation follows:

```text
Form
  ↓
Controller
  ↓
Service
  ├── Validate data
  ├── Call API
  ├── Update application state
  └── Persist workspace
  ↓
Controller emits event
  ↓
UI re-renders
```

A typical local filtering operation follows:

```text
Application State
  ↓
Service query
  ↓
Search / filter conditions
  ↓
Filtered data
  ↓
Renderer
```

## Design Notes

The service layer keeps business logic out of UI and controller modules.

- Controllers coordinate user actions and events.
- Services perform application/business operations.
- API modules handle network communication.
- State stores the current in-memory data.
- Storage provides browser persistence.

