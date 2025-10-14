import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (value.length >= 10) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      setSuccess('✓ Account created successfully! Redirecting to dashboard...');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setPasswordStrength(0);
      setLoading(false);
    }, 1500);
  };

  const getPasswordStrengthText = () => {
    const texts = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['', '#ef4444', '#f59e0b', '#eab308', '#84cc16', '#10b981'];
    return { text: texts[passwordStrength], color: colors[passwordStrength] };
  };

  const strengthText = getPasswordStrengthText();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1c6426 0%, #0f172a 100%)',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        padding: '2.5rem',
        animation: 'slideIn 0.3s ease'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem', animation: 'pulse 2s infinite' }}>🌱</div>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: '#0f172a', 
            marginBottom: '0.5rem' 
          }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Join Growventory and start managing your inventory
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            border: '1px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            border: '1px solid #86efac',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            {success}
          </div>
        )}

        {/* Form */}
        <div onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              Full Name
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <User style={{
                position: 'absolute',
                left: '12px',
                width: '18px',
                height: '18px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              Email Address
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Mail style={{
                position: 'absolute',
                left: '12px',
                width: '18px',
                height: '18px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              Password
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Lock style={{
                position: 'absolute',
                left: '12px',
                width: '18px',
                height: '18px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 6 characters"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#9ca3af'
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '18px', height: '18px' }} />
                ) : (
                  <Eye style={{ width: '18px', height: '18px' }} />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        background: i <= passwordStrength ? strengthText.color : '#e5e7eb',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: strengthText.color, fontWeight: '600' }}>
                  Strength: {strengthText.text}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.95rem'
            }}>
              Confirm Password
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Lock style={{
                position: 'absolute',
                left: '12px',
                width: '18px',
                height: '18px',
                color: '#9ca3af',
                pointerEvents: 'none'
              }} />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  outline: 'none',
                  borderColor: formData.confirmPassword && formData.password === formData.confirmPassword ? '#10b981' : '#d1d5db'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = formData.password === formData.confirmPassword ? '#10b981' : '#d1d5db'}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#9ca3af'
                }}
              >
                {showConfirm ? (
                  <EyeOff style={{ width: '18px', height: '18px' }} />
                ) : (
                  <Eye style={{ width: '18px', height: '18px' }} />
                )}
              </button>
            </div>
            {formData.confirmPassword && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: formData.password === formData.confirmPassword ? '#10b981' : '#ef4444'
              }}>
                {formData.password === formData.confirmPassword ? (
                  <>✓ Passwords match</>
                ) : (
                  <>✕ Passwords do not match</>
                )}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <input type="checkbox" style={{ cursor: 'pointer' }} />
            <label style={{ color: '#64748b', cursor: 'pointer' }}>
              I agree to the{' '}
              <span style={{ color: '#1c6426', fontWeight: '600', cursor: 'pointer' }}>
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading ? '#9ca3af' : '#1c6426',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = '#0f3a12')}
            onMouseLeave={(e) => !loading && (e.target.style.background = '#1c6426')}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0' }}>
            Already have an account?{' '}
            <a href="/login">
            <span style={{
              color: '#1c6426',
              fontWeight: '700',
              cursor: 'pointer'
            }}>
                
              Login here
            </span>
            </a>
          </p>
        </div>


      </div>
    </div>
  );
};

export default Register;
