import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <span className="text-xl">Loading...</span>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

