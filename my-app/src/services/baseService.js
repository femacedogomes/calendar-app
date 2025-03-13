import useLocalStorage from "@/util/useLocalStorage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const baseService = {
  async request(url, method, data = null) {
    const token = useLocalStorage.getItemFromLocalStorage("authToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(
        error.message || `Erro na operação HTTP: ${response.statusText}`
      );
    }

    return response.json();
  },

  get(url) {
    return this.request(url, "GET");
  },

  post(url, data) {
    return this.request(url, "POST", data);
  },

  put(url, data) {
    return this.request(url, "PUT", data);
  },

  delete(url) {
    return this.request(url, "DELETE");
  },
};
