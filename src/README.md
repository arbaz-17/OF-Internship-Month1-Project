# Main Application Entry

## Overview

`main.js` is the application bootstrap and orchestration layer.

It connects the major modules of the Project Management System and coordinates:

- Workspace initialization
- Local cache loading
- API synchronization
- Loading and error states
- Project and task rendering
- Form and modal initialization
- Event-driven re-rendering

It acts as the central composition layer without containing the application's CRUD business logic itself.

## How It Connects

```text
API + Storage
     ↓
   main.js
     ↓
State ←→ Services
     ↓
Controllers / Forms
     ↓
Event Bus
     ↓
   main.js
     ↓
    UI
```

`main.js` therefore coordinates the application but delegates responsibilities to the appropriate modules.

## Key Responsibilities

### Application Rendering

#### `renderApplication()`

The main UI orchestration function.

It determines which application state should be displayed:

1. Loading state
2. Error state
3. Empty-project state
4. Project sidebar and selected project
5. Selected project's tasks
6. Filtered task results


### Cached Workspace Loading

#### `loadCachedWorkspace()`

Loads the previously persisted workspace from `localStorage` through `storageService`.

If cached data exists, projects and tasks are placed into application state so the UI can render immediately.

### Latest Workspace Synchronization

#### `fetchLatestWorkspace()`

Fetches projects and tasks from the API concurrently using `Promise.all()`.

After successful retrieval:

- Application state is updated.
- The latest workspace is persisted to local storage.

This provides the application with both cached startup behavior and fresh server data.

### Workspace Initialization

#### `initializeWorkspace()`

Coordinates the startup sequence:

```text
Clear previous error
      ↓
Load cached workspace
      ↓
Render cache immediately (if available)
      ↓
Fetch latest API data
      ↓
Update state + cache
      ↓
Render latest workspace
```

If no cache exists and the API request fails, an application error state is displayed.

If cached data exists but the subsequent API refresh fails, the cached workspace remains available instead of replacing it with an error screen.

## Application Initialization

### `initializeApplication()`

Initializes the application's interactive modules:

- Project form
- Task form
- Project search
- Project filters
- Task filters
- Task accordion
- Project/task modals
- Confirmation modal

It also subscribes `renderApplication()` to relevant application events.

### Event-Driven Re-rendering

The event bus connects state-changing operations back to the UI.

Relevant events include:

- `PROJECT_SELECTED`
- `PROJECT_UPDATED`
- `PROJECT_DELETED`
- `PROJECT_CREATED`
- `TASK_CREATED`
- `TASK_UPDATED`
- `TASK_DELETED`

The general flow is:

```text
User Action
    ↓
Form / Controller
    ↓
Service
    ↓
State Update
    ↓
Event Bus
    ↓
renderApplication()
    ↓
Updated UI
```

This keeps rendering separate from CRUD and state mutation logic.

## Important Dependencies

### State

Provides:

- Projects and tasks
- Selected project
- Loading state
- Error state
- Active task filters

### Services

Provides:

- Project filtering
- Task filtering
- Project/task data access

### API

Provides:

- Remote project data
- Remote task data

### Storage

Provides:

- Local workspace persistence
- Cached startup data

### UI

Provides all DOM rendering and reusable interface behavior.

### Forms

Connects user input to controllers and application operations.

### Event Bus

Provides event-based communication between application operations and the rendering layer.

## Basic Execution Flow

```text
initializeApplication()
        ↓
initializeWorkspace()
        ↓
load cache
        ↓
render cached data
        ↓
fetch latest API data
        ↓
update state + localStorage
        ↓
render latest data
        ↓
initialize UI/form modules
        ↓
subscribe to application events
        ↓
User interacts with application
        ↓
Controllers / Services / State
        ↓
Event Bus
        ↓
renderApplication()
```
