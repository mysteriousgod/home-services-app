// 7. app/profile/page.tsx
'use client';

import React from 'react';
import ProfilePage from '@/components/ProfilePage';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/store/auth-slice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Profile: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <ProfilePage /> : null;
};

export default Profile;