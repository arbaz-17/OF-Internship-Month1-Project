export function setButtonLoading(button, loadingText) {
  if (!button) return;

  button.dataset.originalText = button.textContent;

  button.textContent = loadingText;
  button.disabled = true;

  button.classList.add("loading");
}

export function resetButton(button) {
  if (!button) return;

  button.textContent =
    button.dataset.originalText || "Submit";

  button.disabled = false;

  button.classList.remove("loading");
}