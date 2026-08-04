import { searchProjects } from "../controllers/projectSearchController.js";
import { debounce } from "../utils/debounce.js";

export function initializeProjectSearchForm() {
  const searchInput = document.getElementById(
    "project-search"
  );

  const debouncedSearch = debounce(
    searchProjects,
    300
  );

  searchInput.addEventListener("input", (event) => {
    debouncedSearch(event.target.value);
  });
}