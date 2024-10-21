// src/components/ProtectedRoute.tsx
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserType } from '@/store/auth-slice';

const ProtectedRoute = (WrappedComponent: React.ComponentType, allowedUserType: 'customer' | 'builder') => {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userType = useSelector(selectUserType);

    if (typeof window !== 'undefined') {
      if (!isAuthenticated) {
        router.replace('/login');
        return null;
      }

      if (userType !== allowedUserType) {
        router.replace('/unauthorized');
        return null;
      }
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;