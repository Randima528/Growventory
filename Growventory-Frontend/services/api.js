const API_URL = "http://localhost:3000";

const api = {
  getProducts: (searchTerm = "") =>
    fetch(
      `${API_URL}/products${searchTerm ? `?search=${searchTerm}` : ""}`
    ).then((res) => res.json()),
  
};

export default api;

