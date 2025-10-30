import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = ({ activeItem, className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/');
  };

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
      
      {/* Logout Button */}
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
