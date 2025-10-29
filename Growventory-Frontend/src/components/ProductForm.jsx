import { useState } from "react";

import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// Responsive CSS & Sidebar Toggle Logic
const addProductResponsiveStyles = `
  @media (max-width: 768px) {
    .app-layout {
      display: flex !important;
      flex-direction: column !important;
    }

    .sidebar-wrapper {
      display: none;
      width: 100% !important;
    }

    .sidebar-wrapper.active {
      display: block !important;
    }

    .hamburger-btn {
      display: flex !important;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 1.25rem;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
    }

    .page-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 1rem !important;
    }

    .main-content {
      padding: 1rem !important;
    }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('addproduct-responsive-style')) {
  const style = document.createElement('style');
  style.id = 'addproduct-responsive-style';
  style.innerHTML = addProductResponsiveStyles;
  document.head.appendChild(style);
}


const ProductForm = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addProduct(product);
      alert("Product added successfully");
      setProduct({ name: "", price: "", stock: "" });
      navigate("/products");
    } catch (error) {
      console.error("Failed to add product", error);
    }
    };

  return (
    <div className="app-layout">
      <Sidebar
  activeItem="addProduct"
  className={`sidebar-wrapper ${sidebarOpen ? "active" : ""}`}
/>

      <div className="main-content">
        
        <div
  className="page-header"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "1rem",
  }}
>
  <button
    className="hamburger-btn"
    onClick={toggleSidebar}
    style={{ display: "none" }}
  >
    ☰
  </button>
  <h1 className="page-title" style={{ fontSize: "2rem", fontWeight: "700" }}>
    Add Product
  </h1>
</div>

        <div className="card">
          <div className="card-header">
            <h2 className="text-lg  text-gray-700 font-bold">
              Add New Product
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={product.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  className="form-input"
                  value={product.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setProduct({ name: "", price: "", stock: "" });
                    navigate("/products");
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
