# Events

## Overview

The `events` module provides the application's event-driven communication system.

It implements a lightweight Observer/Event Bus pattern that allows modules to publish events and subscribe handlers without directly depending on each other.

## Key Responsibilities

- Create an event manager with `subscribe`, `unsubscribe`, `emit`, and `once`.
- Validate event names and event handlers.
- Maintain event handlers using a `Map` of event names to `Set`s of handlers.
- Provide one shared application-wide event bus.
- Centralize event names to avoid hard-coded event strings across modules.

## Module Structure

```text
events/
├── createEventManager.js
├── eventBus.js
└── eventNames.js
```

### `createEventManager.js`

Provides the factory for creating an event manager.

#### `createEventManager()`

Creates an isolated event registry and returns:

```js
{
  subscribe,
  unsubscribe,
  emit,
  once,
}
```

#### `subscribe(event, handler)`

Registers a handler for an event.

The event name must be a non-empty string and the handler must be a function.

A `Set` is used for handlers, which also prevents the same handler from being registered more than once for the same event.

#### `unsubscribe(event, handler)`

Removes a previously registered handler.

When an event has no remaining handlers, its entry is removed from the registry.

#### `emit(event, payload = {})`

Invokes all handlers currently registered for the event and passes the payload to each handler.

#### `once(event, handler)`

Registers a wrapper that executes the handler once and then removes itself from the event registry.

### `eventBus.js`

Creates one shared event manager instance:

```js
const eventBus = createEventManager();
```

Other application modules import this instance to communicate through application events.

### `eventNames.js`

Defines the application's event names as a frozen object.

Current event groups include:

- Project events
  - `PROJECT_CREATED`
  - `PROJECT_UPDATED`
  - `PROJECT_DELETED`
  - `PROJECT_SELECTED`
- Task events
  - `TASK_CREATED`
  - `TASK_UPDATED`
  - `TASK_DELETED`
  - `TASK_STATUS_CHANGED`
- General state event
  - `STATE_CHANGED`

## Basic Execution Flow

A typical application event follows this pattern:

```text
User Action
    ↓
Controller / Application Module
    ↓
eventBus.emit(EVENTS.PROJECT_UPDATED)
    ↓
Registered Handlers
    ↓
UI Re-render / Other Application Response
```

For example, after a project is updated:

```text
Project Controller
    ↓
eventBus.emit()
    ↓
main.js subscribed handler
    ↓
renderApplication()
    ↓
Updated UI
```

## Design Notes

The event system uses the Observer/Event Bus pattern.

This reduces direct coupling between modules. A controller can announce that something happened without knowing which UI or application modules need to respond.

The event registry is private to each event manager instance through a closure. The application normally uses the shared `eventBus`, while `createEventManager()` allows isolated event manager instances to be created when needed.

Event names are centralized in `eventNames.js` so consumers can use constants instead of repeating string literals.