// src/components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/store/auth-slice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store/redux-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;