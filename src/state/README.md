# State

## Overview

The `state` module is the central in-memory store for the application's current workspace state.

It keeps projects, tasks, selected project information, editing state, loading/error state, search input, and project/task filters available to other modules through getter and setter functions.

The module does not perform API requests, persistence, or UI rendering. It only manages application state.

## Key Responsibilities

- Store the current list of projects and tasks.
- Track the currently selected project.
- Track project edit mode.
- Maintain loading and error state.
- Maintain the project search query.
- Maintain project status and priority filters.
- Maintain task status and priority filters.
- Provide controlled functions for reading and updating state.

## State Categories

### Projects

Project state is managed through:

- `getProjects()`
- `setProjects(newProjects)`
- `addProject(project)`
- `updateProjectState(updatedProject)`
- `removeProjectState(projectId)`

### Tasks

Task state is managed through:

- `getTasks()`
- `setTasks(newTasks)`
- `addTask(task)`
- `updateTaskState(updatedTask)`
- `removeTaskState(taskId)`
- `removeTasksByProjectId(projectId)`

### Selected Project

The selected project is tracked with:

- `getSelectedProjectId()`
- `setSelectedProjectId(projectId)`

### Project Edit Mode

Project form editing state is managed with:

- `getEditingProjectId()`
- `setEditingProjectId(projectId)`
- `clearEditingProjectId()`

### UI State

Loading and error information is managed with:

- `getLoading()`
- `setLoading(loading)`
- `getError()`
- `setError(errorMessage)`
- `clearError()`

### Project Search

The current project search query is managed with:

- `getProjectSearchQuery()`
- `setProjectSearchQuery(query)`
- `clearProjectSearchQuery()`

### Project Filters

Project status and priority filters are managed with:

- `getProjectStatusFilter()`
- `setProjectStatusFilter(status)`
- `clearProjectStatusFilter()`
- `getProjectPriorityFilter()`
- `setProjectPriorityFilter(priority)`
- `clearProjectPriorityFilter()`

### Task Filters

Task status and priority filters are managed with:

- `getTaskStatusFilter()`
- `setTaskStatusFilter(status)`
- `clearTaskStatusFilter()`
- `getTaskPriorityFilter()`
- `setTaskPriorityFilter(priority)`
- `clearTaskPriorityFilter()`
- `clearTaskFilters()`

## Basic Data Flow

State is updated by application modules such as services, controllers, and forms.

A typical flow is:

```text
User Action
    ↓
Form / Controller
    ↓
Service or State Setter
    ↓
Application State
    ↓
Event / Re-render
    ↓
UI reflects current state
```

Initial workspace data is loaded into this module, while other modules are responsible for fetching data from the API and persisting it to storage.

## Design Notes

The state module is intentionally separated from API, storage, business logic, and UI concerns.

Modules interact with the state through exported getter/setter functions rather than directly accessing the internal variables.

Projects and tasks are replaced with new arrays when using `setProjects()` and `setTasks()`, while individual add/update/remove operations modify the corresponding in-memory collections.

The current implementation uses simple module-level variables and functions rather than a framework-specific state-management library, which is appropriate for the application's vanilla JavaScript architecture.
