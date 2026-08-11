const BASE_URL = "https://6a71cc9ef687776c13f0aa20.mockapi.io/pms-api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export const httpClient = {
  get(endpoint, options = {}) {
    return request(endpoint, {
      method: "GET",
      ...options,
    });
  },

  post(endpoint, data, options = {}) {
    return request(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  put(endpoint, data, options = {}) {
    return request(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  delete(endpoint, options = {}) {
    return request(endpoint, {
      method: "DELETE",
      ...options,
    });
  },
};
