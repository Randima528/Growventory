import { Link } from "react-router-dom";

const Sidebar = ({ activeItem, className = "" }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-logo">🌱Growventory</div>
      <ul className="sidebar-nav">
        <li>
          <Link
            to="/dashboard"
            className={activeItem === "dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={activeItem === "products" ? "active" : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/add-product"
            className={activeItem === "addProduct" ? "active" : ""}
          >
            Add Product
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
