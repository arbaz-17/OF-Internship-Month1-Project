# API

## Overview

The `api` module provides the application's network layer for communicating with the MockAPI backend.

It separates HTTP communication from business logic by exposing project- and task-specific API methods while keeping the lower-level `fetch()` implementation inside `httpClient.js`.

## Key Responsibilities

- Provide a shared HTTP client around the browser `fetch()` API.
- Handle common HTTP methods: GET, POST, PUT, and DELETE.
- Detect unsuccessful HTTP responses and throw errors.
- Serialize request bodies as JSON for POST and PUT requests.
- Provide dedicated API methods for projects and tasks.
- Keep API endpoint details outside services and UI modules.

## Module Structure

```text
api/
├── httpClient.js
├── projectApi.js
└── taskApi.js
```

### `httpClient.js`

Provides the shared HTTP communication layer.

#### `httpClient.get(endpoint, options = {})`

Sends a GET request to the specified endpoint.

#### `httpClient.post(endpoint, data, options = {})`

Sends a POST request with a JSON request body.

#### `httpClient.put(endpoint, data, options = {})`

Sends a PUT request with a JSON request body.

#### `httpClient.delete(endpoint, options = {})`

Sends a DELETE request to the specified endpoint.

The internal `request()` function checks `response.ok` and throws an error when the server returns an unsuccessful HTTP status.

### `projectApi.js`

Contains project-specific API operations.

#### `getProjects(options = {})`

Fetches all projects.

#### `createProject(projectData, options = {})`

Creates a new project.

#### `updateProject(projectId, projectData, options = {})`

Updates an existing project.

#### `deleteProject(projectId, options = {})`

Deletes a project.

### `taskApi.js`

Contains task-specific API operations.

#### `getTasks(options = {})`

Fetches all tasks.

#### `createTask(taskData, options = {})`

Creates a new task.

#### `updateTask(taskId, taskData, options = {})`

Updates an existing task.

#### `deleteTask(taskId, options = {})`

Deletes a task.

## Basic Execution Flow

API requests follow this structure:

```text
Service
   ↓
Project API / Task API
   ↓
httpClient
   ↓
fetch()
   ↓
MockAPI
   ↓
Response
   ↓
httpClient validation
   ↓
Service
```

For example, creating a task follows:

```text
Task Form
   ↓
Task Controller
   ↓
Task Service
   ↓
taskApi.createTask()
   ↓
httpClient.post()
   ↓
MockAPI
```

## Design Notes

The API layer intentionally separates endpoint-specific operations from generic HTTP handling.

- `httpClient.js` owns common HTTP behavior.
- `projectApi.js` owns project endpoints.
- `taskApi.js` owns task endpoints.
- Services use these API modules instead of calling `fetch()` directly.
