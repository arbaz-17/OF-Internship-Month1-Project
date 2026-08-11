# Forms

## Overview

The `forms` module handles user input and form-related interactions for projects and tasks.

## Module Structure

```text
forms/
├── projectForm.js
├── projectFilterForm.js
├── projectSearchForm.js
├── taskForm.js
└── taskFilterForm.js
```

## How It Connects

```text
HTML Forms / User Interaction
            ↓
          Forms
            ↓
       Controllers
            ↓
         Services
            ↓
      API / State / Storage
```

Filter and search forms update application state and trigger the appropriate UI refresh flow.

## Key Responsibilities

- Collect project and task form values.
- Handle create and edit modes.
- Populate existing project/task data into forms.
- Reset forms after successful operations.
- Connect delete actions to confirmation dialogs.
- Show loading states during asynchronous submissions.
- Handle project search with debouncing.
- Handle project status and priority filters.
- Handle task status and priority filters.
- Synchronize task filter controls with application state.

---

## `projectForm.js`

Handles project creation, editing, and deletion.

### `initializeProjectForm()`

Registers project form submission and delegates edit/delete button interactions.

### `populateProjectForm(projectId)`

Loads an existing project into the project form, switches the form into edit mode, and opens the project modal.

### `resetProjectForm()`

Resets the project form and editing state to the default create-project configuration.

---

## `projectFilterForm.js`

Connects project filter controls to `projectFilterController`.

### `initializeProjectFilterForm()`

Registers change handlers for:

- Project status
- Project priority

It also resets the visible search/filter controls when the Reset button is used.

---

## `projectSearchForm.js`

Handles project search input.

### `initializeProjectSearchForm()`

Registers the project search input and clear button.

Search input is passed through the shared `debounce()` helper with a 300ms delay before calling `searchProjects()`.

---

## `taskForm.js`

Handles task creation, editing, deletion, and task field updates.

### `initializeTaskForm()`

Registers task form submission and task action handlers.

### `populateTaskForm(taskId)`

Loads an existing task into the task modal and switches the form into edit mode.

### `formReset()`

Resets the task form and returns it to create-task mode.

### Supported Task Actions

- Create task
- Edit task
- Delete task
- Update task status
- Update task priority

Task mutations are delegated to `taskController.js`.

---

## `taskFilterForm.js`

Handles task status and priority filtering.

### `initializeTaskFilterForm(onFilterChange)`

Registers delegated event listeners for task filter controls.

When a filter changes, the selected value is stored in application state and `onFilterChange()` is called to refresh the task display.

### `syncTaskFilterControls()`

Reads the current task filter state and synchronizes the visible dropdown values.

---

## Important Dependencies

### State

Forms read or update application state for:

- Selected project
- Project edit mode
- Project search
- Project filters
- Task filters

### Controllers

Forms delegate mutations to:

- `projectController.js`
- `projectFilterController.js`
- `projectSearchController.js`
- `taskController.js`

### Services

Forms query existing records through:

- `projectService.js`
- `taskService.js`

### UI

Forms interact with:

- Modal management
- Confirmation dialogs
- Button loading states

### Utilities

Project search uses:

- `utils/debounce.js`

---

## Design Notes

The form layer intentionally does not perform API requests directly.

Its responsibility is to translate user interaction into application actions:

```text
User Input
   ↓
Form
   ↓
Controller / State
   ↓
Service
   ↓
API
```

## Current Implementation Notes

- Project and task forms use the same create/edit pattern.
- Async submissions expose loading feedback through button state.
- Project search is debounced to avoid processing every keystroke immediately.
- Task filters are state-driven and can be synchronized after rendering.
