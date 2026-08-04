export default function createEventManager() {
  const eventRegistry = new Map();

  function validateEvent(event) {
    if (typeof event !== "string" || event.trim() === "") {
      throw new Error("Event name must be a non-empty string.");
    }
  }

  function validateHandler(handler) {
    if (typeof handler !== "function") {
      throw new Error("Event handler must be a function.");
    }
  }

  function subscribe(event, handler) {
    validateEvent(event);
    validateHandler(handler);

    if (!eventRegistry.has(event)) {
      eventRegistry.set(event, new Set());
    }

    eventRegistry.get(event).add(handler);
  }

  function unsubscribe(event, handler) {
    validateEvent(event);
    validateHandler(handler);

    const handlers = eventRegistry.get(event);

    if (!handlers) return;

    handlers.delete(handler);

    if (handlers.size === 0) {
      eventRegistry.delete(event);
    }
  }

  function emit(event, payload = {}) {
    validateEvent(event);

    const handlers = eventRegistry.get(event);

    if (!handlers) return;

    handlers.forEach((handler) => handler(payload));
  }

  function once(event, handler) {
    function wrapper(payload) {
      handler(payload);
      unsubscribe(event, wrapper);
    }

    subscribe(event, wrapper);
  }

  return {
    subscribe,
    unsubscribe,
    emit,
    once,
  };
}