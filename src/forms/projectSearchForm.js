import { searchProjects } from "../controllers/projectSearchController.js";

import { debounce } from "../utils/debounce.js";

export function initializeProjectSearchForm() {
  const searchInput = document.getElementById("project-search");

  const clearButton = document.getElementById("clear-project-search");

  if (!searchInput) return;

  const debouncedSearch = debounce(searchProjects, 300);

  searchInput.addEventListener("input", (event) => {
    debouncedSearch(event.target.value);
  });

  clearButton?.addEventListener("click", () => {
    searchInput.value = "";

    searchProjects("");
  });
}
