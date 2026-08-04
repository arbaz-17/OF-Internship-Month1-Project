const BASE_URL = "https://6a71cc9ef687776c13f0aa20.mockapi.io/pms-api/";

export const httpClient = {
  async get(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  },
};