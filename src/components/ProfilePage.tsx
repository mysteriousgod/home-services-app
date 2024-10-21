'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/auth-slice';
import { RootState } from '@/store/slice';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="space-y-4">
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">User Type:</span> {user.userType}</p>
        {/* Add more user details here as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;