import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes('jwt'); // or use localStorage/token

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;