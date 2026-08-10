import { openModal, closeModal } from "./modal.js";

import { setButtonLoading, resetButton } from "./buttonLoading.js";

let confirmCallback = null;

export function initializeConfirmModal() {
  const closeButton = document.getElementById("close-confirm-modal");

  const cancelButton = document.getElementById("cancel-confirm");

  const confirmButton = document.getElementById("confirm-action");

  closeButton?.addEventListener("click", closeConfirmModal);

  cancelButton?.addEventListener("click", closeConfirmModal);

  confirmButton?.addEventListener("click", async () => {
    if (!confirmCallback) return;

    setButtonLoading(confirmButton, "Deleting...");

    try {
      await confirmCallback();
    } finally {
      resetButton(confirmButton);
      closeConfirmModal();
    }
  });
}

export function showConfirmation({
  title,
  message,
  confirmText = "Confirm",
  onConfirm,
}) {
  const titleElement = document.getElementById("confirm-title");

  const messageElement = document.getElementById("confirm-message");

  const confirmButton = document.getElementById("confirm-action");

  if (!titleElement || !messageElement || !confirmButton) {
    return;
  }

  titleElement.textContent = title;

  messageElement.textContent = message;

  confirmButton.textContent = confirmText;

  confirmCallback = onConfirm;

  openModal("confirm-modal");
}

function closeConfirmModal() {
  confirmCallback = null;

  closeModal("confirm-modal");
}
