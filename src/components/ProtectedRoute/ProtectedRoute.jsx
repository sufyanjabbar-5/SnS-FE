import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/**
 * Check if a JWT token is expired
 */
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * ProtectedRoute - Route wrapper that requires authentication
 * Validates token existence, expiry, and user role
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('access_token');
  const userStr = localStorage.getItem('user');

  // Check if user is authenticated and token exists
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  if (isTokenExpired(token)) {
    console.warn('Access token has expired, redirecting to login');
    // Clear expired tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // Check if user has required role
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on their actual role
      if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/student/dashboard" replace />;
      }
    }

    return children;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
