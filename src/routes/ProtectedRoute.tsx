import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { PropsWithChildren } from 'react';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
