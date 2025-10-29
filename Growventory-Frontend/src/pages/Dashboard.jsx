import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, DollarSign, ShoppingCart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../../services/api';


// Responsive CSS and Sidebar Toggle Logic
const dashboardResponsiveStyles = `
  @media (max-width: 768px) {
    .dashboard-container {
      flex-direction: column !important;
      display: flex !important;
    }

    .sidebar-wrapper {
      width: 100% !important;
      display: none;

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

    .dashboard-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 1rem !important;
    }

    .dashboard-main {
      padding: 1rem !important;
    }

    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('dashboard-responsive-style')) {
  const style = document.createElement('style');
  style.id = 'dashboard-responsive-style';
  style.innerHTML = dashboardResponsiveStyles;
  document.head.appendChild(style);
}


const Dashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        minHeight: '100vh',
        background: '#f8fafc'
      }}>
        <Sidebar activeItem="dashboard" />
        <div style={{ 
          padding: '2rem', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontSize: '1.5rem',
          color: '#64748b'
        }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        minHeight: '100vh',
        background: '#f8fafc'
      }}>
        <Sidebar activeItem="dashboard" />
        <div style={{ padding: '2rem' }}>
          <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #fca5a5'
          }}>
            {error}
          </div>
          <button 
            onClick={fetchDashboardData}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { metrics, lowStockProducts, outOfStockProducts, topProducts } = dashboardData;

  return (
    <div className="dashboard-container" style={{
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    minHeight: '100vh',
    background: '#f8fafc'
  }}>
      <Sidebar
  activeItem="dashboard"
  className={`sidebar-wrapper ${sidebarOpen ? 'active' : ''}`}
/>



      <div className="dashboard-main" style={{ padding: '2rem', overflowY: 'auto' }}>
        <div className="dashboard-header" style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #e2e8f0'
}}>
  <button 
    className="hamburger-btn"
    onClick={toggleSidebar}
    style={{ display: 'none' }}
  >
  ☰
  </button>

  <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Dashboard</h1>

          <button 
            onClick={fetchDashboardData}
            style={{
              padding: '0.5rem 1rem',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Refresh Data
          </button>
        </div>

        {/* KPI Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Package style={{ color: '#3b82f6', width: '24px', height: '24px' }} />
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>{metrics.totalProducts}</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Total Products</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DollarSign style={{ color: '#10b981', width: '24px', height: '24px' }} />
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>
                  Rs.{parseFloat(metrics.totalValue).toLocaleString()}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Inventory Value</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingCart style={{ color: '#f59e0b', width: '24px', height: '24px' }} />
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>{metrics.totalStock}</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Total Units in Stock</div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Package style={{ color: '#8b5cf6', width: '24px', height: '24px' }} />
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>Rs.{metrics.avgPrice}</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Avg. Price</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem 2rem',
            background: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a' }}>Stock Status Overview</h2>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#dbeafe',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #93c5fd'
              }}>
                <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e40af' }}>
                  {metrics.inStock}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#1e40af', marginTop: '0.5rem' }}>
                  In Stock
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #fcd34d'
              }}>
                <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#92400e' }}>
                  {metrics.lowStock}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#92400e', marginTop: '0.5rem' }}>
                  Low Stock
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fee2e2',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #fca5a5'
              }}>
                <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#991b1b' }}>
                  {metrics.outOfStock}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#991b1b', marginTop: '0.5rem' }}>
                  Out of Stock
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts and Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Low Stock Alert */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem 2rem',
              background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#0f172a' }}>
                <AlertCircle style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
                Low Stock Alert
              </h2>
            </div>
            <div style={{ padding: '0' }}>
              {lowStockProducts.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Product</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Stock</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.map(product => (
                      <tr key={product.id}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}><strong>{product.name}</strong></td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{product.stock} units</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                          <span style={{
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            Reorder
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ padding: '1rem', color: '#64748b' }}>No low stock items</p>
              )}
            </div>
          </div>

          {/* Out of Stock Alert */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem 2rem',
              background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#0f172a' }}>
                <AlertCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                Out of Stock
              </h2>
            </div>
            <div style={{ padding: '0' }}>
              {outOfStockProducts.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Product</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Price</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outOfStockProducts.map(product => (
                      <tr key={product.id}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}><strong>{product.name}</strong></td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Rs.{product.price.toFixed(2)}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                          <span style={{
                            backgroundColor: '#fee2e2',
                            color: '#991b1b',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            Out of Stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ padding: '1rem', color: '#64748b' }}>All products in stock</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Products by Value */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem 2rem',
            background: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a' }}>Top Products by Inventory Value</h2>
          </div>
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Product</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Price</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Stock</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>Total Value</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600' }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(product => {
                  const totalInventoryValue = parseFloat(metrics.totalValue);
                  const productValue = product.totalValue;
                  const percentage = totalInventoryValue > 0 
                    ? ((productValue / totalInventoryValue) * 100).toFixed(1)
                    : 0;
                  
                  return (
                    <tr key={product.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}><strong>{product.name}</strong></td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Rs.{product.price.toFixed(2)}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{product.stock}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: '600', color: '#1e293b' }}>
                        Rs.{productValue.toFixed(2)}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '80px',
                            height: '6px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${percentage}%`,
                              backgroundColor: '#3b82f6',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
