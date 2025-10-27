import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Package style={{ width: '32px', height: '32px' }} />,
      title: 'Product Management',
      description: 'Easily add, edit, and track all your products in one centralized dashboard.'
    },
    {
      icon: <TrendingUp style={{ width: '32px', height: '32px' }} />,
      title: 'Real-time Analytics',
      description: 'Get instant insights into your inventory value, stock levels, and top products.'
    },
    {
      icon: <AlertCircle style={{ width: '32px', height: '32px' }} />,
      title: 'Smart Alerts',
      description: 'Receive notifications for low stock and out-of-stock items automatically.'
    },
    {
      icon: <BarChart3 style={{ width: '32px', height: '32px' }} />,
      title: 'Interactive Dashboard',
      description: 'Visualize your data with beautiful charts and comprehensive metrics.'
    },
    {
      icon: <ShieldCheck style={{ width: '32px', height: '32px' }} />,
      title: 'Secure & Reliable',
      description: 'Your data is protected with industry-standard security measures.'
    },
    {
      icon: <Zap style={{ width: '32px', height: '32px' }} />,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized search and filtering.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Products Managed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    
  ];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .feature-card {
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(28, 100, 38, 0.3);
        }

        @media (max-width: 768px) {
          .mobile-menu {
            display: ${isMenuOpen ? 'flex' : 'none'};
          }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.25rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.75rem',
            fontWeight: '700',
            color: scrolled ? '#1c6426' : '#ffffff',
            cursor: 'pointer',
            textShadow: scrolled ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '2rem' }}>🌱</span>
             Growventory
          </div>

          {/* Desktop Menu */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }} className="desktop-menu">
            <a href="#features" style={{
              color: scrolled ? '#64748b' : 'rgba(255, 255, 255, 0.9)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s',
              textShadow: scrolled ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>Features</a>
            <a href="#how-it-works" style={{
              color: scrolled ? '#64748b' : 'rgba(255, 255, 255, 0.9)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s',
              textShadow: scrolled ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>How It Works</a>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '0.625rem 1.5rem',
                background: scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.2)',
                color: scrolled ? '#1c6426' : '#ffffff',
                border: scrolled ? '2px solid #1c6426' : '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-hover"
              style={{
                padding: '0.625rem 1.5rem',
                background: scrolled ? '#1c6426' : 'rgba(255, 255, 255, 0.95)',
                color: scrolled ? 'white' : '#1c6426',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: scrolled ? '#1c6426' : '#ffffff'
            }}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" style={{
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 2rem',
          background: 'white',
          borderTop: '1px solid #e2e8f0'
        }}>
          <a href="#features" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 0'
          }}>Features</a>
          <a href="#how-it-works" style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 0'
          }}>How It Works</a>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '0.75rem',
              background: 'transparent',
              color: '#1c6426',
              border: '2px solid #1c6426',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '0.75rem',
              background: '#1c6426',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1c6426 0%, #0f172a 100%)',
        padding: '10rem 2rem 8rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} className="animate-float" />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animationDelay: '1s'
        }} className="animate-float" />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '600' }}>
              ✨ Smart Plant Inventory Management System
            </span>
          </div>

          <h1 className="animate-fadeInUp" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            animationDelay: '0.1s'
          }}>
            Streamline Your Plant<br />
            <span style={{
              background: 'linear-gradient(to right, #86efac, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Inventory Operations
            </span>
          </h1>

          <p className="animate-fadeInUp" style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8',
            animationDelay: '0.2s'
          }}>
            Centralized system to track plants, monitor stock levels, and gain real-time insights for efficient inventory management.
          </p>


          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '2rem',
            marginTop: '4rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '6rem 2rem',
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#dcfce7',
              color: '#166534',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              FEATURES
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              Everything You Need to Succeed
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Powerful features designed to streamline your inventory management workflow.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #dcfce7 0%, #86efac 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#166534',
                  marginBottom: '1.5rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{
        padding: '6rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#dcfce7',
              color: '#166534',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              HOW IT WORKS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            position: 'relative'
          }}>
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Register with your credentials to access the inventory management system.'
              },
              {
                step: '02',
                title: 'Add Your Plants',
                description: 'Import your plant inventory or add products manually with our intuitive interface.'
              },
              {
                step: '03',
                title: 'Track & Manage',
                description: 'Monitor stock levels, analyze trends, and make data-driven decisions for your organization.'
              }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #1c6426 0%, #0f172a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  boxShadow: '0 10px 30px rgba(28, 100, 38, 0.3)'
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  fontSize: '1.05rem'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #1c6426 0%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            Start Managing Your Plant Inventory Today
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem',
            lineHeight: '1.8'
          }}>
            Access our comprehensive inventory management system to streamline your organization's operations.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/register')}
              className="btn-hover"
              style={{
                padding: '1.25rem 3rem',
                background: 'white',
                color: '#1c6426',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.125rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              Register Now
              <ChevronRight size={24} />
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '1.25rem 3rem',
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.125rem',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0b021f',
        color: 'white',
        padding: '3rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🌱</span>
            Growventory
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Smart plant inventory management for your organization
          </p>
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.875rem'
          }}>
            © 2025 Growventory. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
