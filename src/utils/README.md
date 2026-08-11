# Utils

## Overview

The `utils` module contains small, reusable, stateless utilities used across the application.

These utilities keep common functionality centralized and prevent the same logic from being duplicated across multiple modules.

## Key Responsibilities

- Debouncing frequently triggered callbacks.
- Escaping dynamic values before inserting them into HTML.
- Formatting dates for user-facing display.
- Converting stored values into readable labels.

## Files

### `debounce.js`

Provides a reusable `debounce()` utility for delaying callback execution until a specified period has passed without another call.

#### `debounce(callback, delay = 300)`

Creates and returns a debounced version of the provided callback.

The returned function also exposes a `cancel()` method that cancels a pending callback execution.

The utility validates both the callback and delay before creating the debounced function.

### `helpers.js`

Contains shared formatting and HTML-safety helpers.

#### `escapeHtml(value)`

Escapes HTML-sensitive characters such as `<`, `>`, `"`, and `'`.

Used when dynamic application data is inserted through `innerHTML`.

#### `formatDate(date)`

Converts a valid date value into a readable format such as `Aug 11, 2026`.

Returns `N/A` when the value is missing or invalid.

#### `formatLabel(value)`

Converts hyphen-separated values into readable labels.

Example:

`in-progress` → `In Progress`

`software-development` → `Software Development`

## Design Notes

The utilities are intentionally kept independent of application state, UI rendering, API calls, and business logic.

This allows them to be reused by different modules without creating unnecessary dependencies.
