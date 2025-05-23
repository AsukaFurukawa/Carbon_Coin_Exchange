import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}; 