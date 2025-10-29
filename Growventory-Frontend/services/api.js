const API_URL = "http://localhost:3000";

const api = {
  // ============== AUTHENTICATION ==============
  
  // Register new user
  register: (userData) =>
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json()),

  // Login user
  login: (credentials) =>
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) => res.json()),

  // Get user by ID
  getUser: (id) =>
    fetch(`${API_URL}/users/${id}`).then((res) => res.json()),

  // Get all users
  getAllUsers: () =>
    fetch(`${API_URL}/users`).then((res) => res.json()),

  // Update user
  updateUser: (id, userData) =>
    fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json()),

  // Delete user
  deleteUser: (id) =>
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),

  // ============== PRODUCTS ==============
  
  getProducts: (searchTerm = "") =>
    fetch(
      `${API_URL}/products${searchTerm ? `?search=${searchTerm}` : ""}`
    ).then((res) => res.json()),

  addProduct: (product) =>
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json()),

  updateProduct: (id, product) =>
    fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json()),

  deleteProduct: (id) =>
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    }),

  // Get dashboard data with metrics
  getDashboardData: () =>
    fetch(`${API_URL}/dashboard`).then((res) => res.json()),
};

export default api;
