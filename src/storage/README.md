# Storage

## Overview

The `storage` module provides local browser persistence for the application's workspace data.

It uses `localStorage` to cache the current projects and tasks so the application can restore the previously loaded workspace when it starts.

## Key Responsibilities

- Save the current workspace to browser storage.
- Load a previously cached workspace.
- Clear the cached workspace.
- Handle invalid JSON stored in `localStorage`.

## File

### `storageService.js`

Defines the `storageService` object and the storage key used by the application.

#### `saveWorkspace(workspace)`

Serializes the provided workspace and stores it in `localStorage`.

```js
storageService.saveWorkspace({
  projects,
  tasks,
});
```

#### `loadWorkspace()`

Retrieves the cached workspace and parses the stored JSON.

Returns:

- The parsed workspace when valid data exists.
- `null` when no cached workspace exists.
- `null` when the stored data is invalid JSON. In that case, the invalid cache is also cleared.

#### `clearWorkspace()`

Removes the application's cached workspace from `localStorage`.

## Basic Execution Flow

The storage layer participates in application startup and data persistence:

```text
Application starts
    ↓
loadWorkspace()
    ↓
Cached workspace available?
    ├── Yes → Restore projects/tasks into application state
    └── No  → Fetch latest data from API
                    ↓
              saveWorkspace()
```

After successful API operations, the current workspace can also be saved again so the local cache stays synchronized with the in-memory application data.
