const STORAGE_KEY = "project-management-workspace";

export const storageService = {
  saveWorkspace(workspace) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(workspace)
    );
  },

  loadWorkspace() {
    const storedWorkspace = localStorage.getItem(STORAGE_KEY);

    if (!storedWorkspace) {
      return null;
    }

    try {
      return JSON.parse(storedWorkspace);
    } catch (error) {
      this.clearWorkspace();
      return null;
    }
  },

  clearWorkspace() {
    localStorage.removeItem(STORAGE_KEY);
  },
};