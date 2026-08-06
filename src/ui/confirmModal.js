import { openModal, closeModal } from "./modal.js";
import {
  setButtonLoading,
  resetButton,
} from "./buttonLoading.js";

let confirmCallback = null;

export function initializeConfirmModal() {
  const closeButton = document.getElementById("close-confirm-modal");
  const cancelButton = document.getElementById("cancel-confirm");
  const confirmButton = document.getElementById("confirm-action");

  closeButton?.addEventListener("click", closeConfirmModal);
  cancelButton?.addEventListener("click", closeConfirmModal);

confirmButton?.addEventListener("click", async () => {
  if (!confirmCallback) return;

  setButtonLoading(
    confirmButton,
    "Deleting..."
  );

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
  document.getElementById("confirm-title").textContent = title;

  document.getElementById("confirm-message").textContent = message;

  document.getElementById("confirm-action").textContent = confirmText;

  confirmCallback = onConfirm;

  openModal("confirm-modal");
}

function closeConfirmModal() {
  confirmCallback = null;

  closeModal("confirm-modal");
}