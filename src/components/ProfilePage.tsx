'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectUserId, selectUserType, updateUserProfile } from '@/store/auth-slice';
import { RootState, AppDispatch } from '@/store/slice';
import { useRouter } from 'next/navigation';
import { User, Mail, Briefcase, Phone, MapPin, Edit2, Save } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const userId = useSelector((state: RootState) => selectUserId(state));
  const userType = useSelector((state: RootState) => selectUserType(state));

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    if (!userId) {
      router.push('/login');
    }
  }, [userId, router]);

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (profile) {
      dispatch(updateUserProfile(profile));
      setIsEditing(false);
    }
  };

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Your Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save className="mr-2" /> : <Edit2 className="mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl mb-4">
              {profile.name[0]?.toUpperCase() || <User size={48} />}
            </div>
            <h2 className="text-xl font-semibold dark:text-white">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{userType}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <User className="text-gray-400" />
            {isEditing ? (
              <Input name="name" value={profile.name} onChange={handleInputChange} placeholder="Full Name" />
            ) : (
              <p className="dark:text-white">{profile.name}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="text-gray-400" />
            {isEditing ? (
              <Input name="email" value={profile.email} onChange={handleInputChange} placeholder="Email" type="email" />
            ) : (
              <p className="dark:text-white">{profile.email}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="text-gray-400" />
            <p className="dark:text-white">{userType}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-gray-400" />
            {isEditing ? (
              <Input name="phone" value={profile.phone} onChange={handleInputChange} placeholder="Phone Number" />
            ) : (
              <p className="dark:text-white">{profile.phone || 'Not provided'}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-gray-400" />
            {isEditing ? (
              <Input name="address" value={profile.address} onChange={handleInputChange} placeholder="Address" />
            ) : (
              <p className="dark:text-white">{profile.address || 'Not provided'}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Bio</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                rows={4}
              />
            ) : (
              <p className="dark:text-white">{profile.bio || 'No bio provided'}</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 text-right">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;