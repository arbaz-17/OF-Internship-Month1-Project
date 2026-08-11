# Project Management System — Month 1 Project

## 1. Overview

A Vanilla JavaScript project management application developed as the Month 1 internship project.

The application allows users to create, manage, search, filter, and organize projects and their associated tasks through a modular frontend architecture.

The project is built using HTML, CSS, and modern Vanilla JavaScript with ES modules, without frontend frameworks.

---

## 2. What Was Created

The application provides a complete project and task management workflow:

- Project CRUD operations
- Task CRUD operations
- Project search
- Project status and priority filters
- Task status and priority filters
- Task detail accordion
- Project and task forms
- Confirmation dialogs for destructive actions
- Loading, error, and empty states
- LocalStorage persistence and caching
- API synchronization with MockAPI

---

## 3. Key Features

### Projects

- Create projects with project metadata
- Edit existing projects
- Delete projects
- Automatically remove associated tasks when a project is deleted
- Search projects by name
- Filter projects by status and priority
- Select projects from the sidebar

### Tasks

- Create tasks within a selected project
- Edit existing tasks
- Delete tasks
- Filter tasks by status and priority
- Expand and collapse task details
- Display task metadata including dates, status, priority, and description

### Persistence & Data

- Remote data is fetched from MockAPI
- Projects and tasks are maintained in application state
- Workspace data is persisted in LocalStorage
- Cached data can be rendered immediately during startup
- The latest API data refreshes the cached workspace

### UX & Accessibility

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- ARIA attributes for important interactive elements
- Loading, error, and empty states
- Responsive layout

---

### Module Responsibilities

| Module | Responsibility |
|---|---|
| `state` | Maintains centralized in-memory application state |
| `services` | Handles data operations, validation, queries, search, and filtering |
| `controllers` | Coordinates user actions, services, state changes, and events |
| `forms` | Handles form submission and user interaction logic |
| `api` | Provides the HTTP/API abstraction for projects and tasks |
| `storage` | Handles LocalStorage persistence and cached workspace data |
| `events` | Provides event-driven communication through the event bus |
| `ui` | Renders application views and manages reusable UI behavior |
| `utils` | Contains reusable helpers such as escaping, formatting, and debounce |

The detailed responsibilities of each module are documented in the README files inside the corresponding folders.

---

## 4. Project Structure

```text
src/
├── api/
│   ├── httpClient.js
│   ├── projectApi.js
│   └── taskApi.js
│
├── controllers/
│   ├── projectController.js
│   ├── projectFilterController.js
│   ├── projectSearchController.js
│   └── taskController.js
│
├── events/
│   ├── createEventManager.js
│   ├── eventBus.js
│   └── eventNames.js
│
├── forms/
│   ├── projectForm.js
│   ├── projectFilterForm.js
│   ├── projectSearchForm.js
│   ├── taskFilterForm.js
│   └── taskForm.js
│
├── services/
│   ├── projectService.js
│   └── taskService.js
│
├── state/
│   └── appState.js
│
├── storage/
│   └── storageService.js
│
├── ui/
│   ├── buttonLoading.js
│   ├── confirmModal.js
│   ├── emptyStateRenderer.js
│   ├── errorStateRenderer.js
│   ├── layoutRenderer.js
│   ├── loadingStateRenderer.js
│   ├── modal.js
│   ├── projectRenderer.js
│   └── taskRenderer.js
│
├── utils/
│   ├── debounce.js
│   └── helpers.js
│
└── main.js
```

The root also contains the application entry HTML and the separated CSS files used to style the interface.

---

## 5. Concepts & Techniques Used

### JavaScript

- ES Modules
- Functions and closures
- Array methods
- Destructuring
- Async/await
- Promises
- DOM manipulation
- Event delegation
- LocalStorage

### Architecture

- Separation of concerns
- Layered modular architecture
- Centralized application state
- Service layer
- Controller layer
- API abstraction
- Event-driven communication

### UX & Accessibility

- Semantic HTML
- Keyboard navigation
- ARIA attributes
- Loading/error/empty states

### Performance & Utilities

- Debounced project search
- In-memory filtering
- Local cached workspace

---

## 7. Data & Persistence Strategy

The application uses a hybrid **API + in-memory state + LocalStorage cache** approach.

```text
Application Starts
       │
       ▼
Check LocalStorage
       │
       ├── Cached workspace exists
       │          │
       │          ▼
       │    Load into state
       │          │
       │          ▼
       │    Render immediately
       │
       └── No cache
                  │
                  ▼
            Show loading state
                  │
                  ▼
          Fetch latest API data
                  │
                  ▼
             Update state
                  │
                  ▼
          Save workspace cache
                  │
                  ▼
            Render UI
```

Projects and tasks are fetched from MockAPI when the application starts.

The fetched data is placed into the application's in-memory state and persisted to LocalStorage.

When cached data is available, it can be rendered first while the application requests the latest server data.

### Search & Filtering Decision

Project search and project/task filtering operate on the already-loaded in-memory state.

Project search uses a debounce utility to avoid unnecessary repeated processing while the user is typing.

---

## 8. Local Setup

Clone the repository:

```bash
git clone https://github.com/arbaz-17/OF-Internship-Month1-Project.git
cd OF-Internship-Month1-Project
```

It can be run using a local development server such as VS Code Live Server.

After starting the server, open the provided local URL in a browser.

---

## 9. Demo

**Live Demo:** Coming Soon



