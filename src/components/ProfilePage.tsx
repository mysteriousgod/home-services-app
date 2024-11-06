'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  selectCurrentUser,
  selectUserId,
  selectUserType,
  updateUserProfileAsync,
  uploadProfileImage,
  deleteProfileImage,
  fetchUserProfile,
  type UserProfile,
  type CurrentUser
} from '@/store/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Briefcase,
  Phone,
  MapPin,
  Edit2,
  Save,
  Camera,
  Trash2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button, Input, Alert, AlertDescription, Card, CardContent, CardHeader, CardTitle, Select } from '@/components/ui';

// Type definitions
interface SocialLinksType {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

type ValidProfileField =
  | 'name'
  | 'email'
  | 'phone'
  | 'address'
  | 'bio'
  | 'profileImage'
  | 'availability'
  | 'profession'
  | 'experience'
  | 'skills';

type ValidSocialLinkField = keyof SocialLinksType;

const initialProfileState: UserProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  bio: '',
  profileImage: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  },
  availability: 'available',
  rating: 0,
  completedProjects: 0
};

// Alert Component
const AlertComponent: React.FC<{
  message: string;
  type: 'success' | 'error';
}> = ({ message, type }) => {
  if (!message) return null;

  return (
    <Alert
      // variant={type === 'success' ? 'default' : 'destructive'}
      className="mb-6"
    >
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(selectCurrentUser);
  const userId = useAppSelector(selectUserId);
  const userType = useAppSelector(selectUserType);

  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(() => {
    const baseProfile: UserProfile = {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || '',
      profileImage: user?.profileImage || '',
      socialLinks: {
        facebook: user?.socialLinks?.facebook || '',
        twitter: user?.socialLinks?.twitter || '',
        linkedin: user?.socialLinks?.linkedin || '',
        instagram: user?.socialLinks?.instagram || ''
      },
      availability: user?.availability as UserProfile['availability'] || 'available',
      rating: user?.rating || 0,
      completedProjects: user?.completedProjects || 0
    };

    if (userType === 'builder') {
      return {
        ...baseProfile,
        profession: user?.profession || '',
        experience: user?.experience || '',
        skills: user?.skills || ''
      };
    }

    return baseProfile;
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await dispatch(fetchUserProfile()).unwrap();
        setProfile(result);
      } catch (error) {
        showAlert('Failed to load profile', 'error');
      }
    };

    if (userId) {
      loadProfile();
    } else {
      // router.push('/login');
    }
  }, [userId, router, dispatch]);

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  const isValidProfileField = (key: string): key is ValidProfileField => {
    const validFields: ValidProfileField[] = [
      'name',
      'email',
      'phone',
      'address',
      'bio',
      'profileImage',
      'availability',
      'profession',
      'experience',
      'skills'
    ];
    return validFields.includes(key as ValidProfileField);
  };

  const isValidSocialLinksField = (key: string): key is ValidSocialLinkField => {
    const validFields: ValidSocialLinkField[] = [
      'facebook',
      'twitter',
      'linkedin',
      'instagram'
    ];
    return validFields.includes(key as ValidSocialLinkField);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');

      if (parent === 'socialLinks' && isValidSocialLinksField(child)) {
        setProfile(prev => ({
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            [child]: value
          }
        }));
      }
    } else if (isValidProfileField(name)) {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSocialLinkChange = (
    platform: ValidSocialLinkField,
    value: string
  ) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSelectChange = (value: string) => {
    setProfile(prev => ({
      ...prev,
      availability: value as UserProfile['availability']
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setIsLoading(true);
    try {
      const resultAction = await dispatch(uploadProfileImage(file));
      if (uploadProfileImage.fulfilled.match(resultAction)) {
        setProfile(prev => ({
          ...prev,
          profileImage: resultAction.payload.profileImage
        }));
        showAlert('Profile image updated successfully', 'success');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      showAlert('Failed to upload image', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(deleteProfileImage());
      if (deleteProfileImage.fulfilled.match(resultAction)) {
        setProfile(prev => ({ ...prev, profileImage: '' }));
        showAlert('Profile image deleted successfully', 'success');
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      showAlert('Failed to delete image', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(updateUserProfileAsync(profile));
      if (updateUserProfileAsync.fulfilled.match(resultAction)) {
        setIsEditing(false);
        showAlert('Profile updated successfully', 'success');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      showAlert('Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Profile</CardTitle>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          {alertMessage && (
            <AlertComponent
              message={alertMessage}
              type={alertType}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Image Section */}
            <div className="space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute bottom-0 right-0 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="p-2"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    {profile.profileImage && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDeleteImage}
                        disabled={isLoading}
                        className="p-2 bg-red-500/70 hover:bg-red-500/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-100">{profile.name}</h2>
                <p className="text-gray-400 capitalize">{userType}</p>
              </div>

              <div className="space-y-2">
                <Select
                  value={profile.availability}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                </Select>

                <div className="text-sm text-gray-400 text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span>Rating:</span>
                    <span className="font-semibold text-gray-200">
                      {profile.rating}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>Projects:</span>
                    <span className="font-semibold text-gray-200">
                      {profile.completedProjects}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="md:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                    />
                  ) : (
                    <p className="text-gray-200 pl-6">{profile.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="text-gray-200 pl-6">{profile.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  ) : (
                    <p className="text-gray-200 pl-6">
                      {profile.phone || 'Not provided'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  {isEditing ? (
                    <Input
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                    />
                  ) : (
                    <p className="text-gray-200 pl-6">
                      {profile.address || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Builder-specific fields */}
              {userType === 'builder' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">
                    Professional Info
                  </h3>
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <Input
                          name="profession"
                          value={profile.profession || ''}
                          onChange={handleInputChange}
                          placeholder="Profession"
                        />
                        <Input
                          name="experience"
                          value={profile.experience || ''}
                          onChange={handleInputChange}
                          placeholder="Years of Experience"
                        />
                        <Input
                          name="skills"
                          value={profile.skills || ''}
                          onChange={handleInputChange}
                          placeholder="Skills (comma separated)"
                          className="min-h-[80px]"
                        />
                      </>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-gray-200">
                          Profession: {profile.profession || 'Not specified'}
                        </p>
                        <p className="text-gray-200">
                          Experience: {profile.experience || 'Not specified'}
                        </p>
                        <p className="text-gray-200">
                          Skills: {profile.skills || 'Not specified'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Links Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile?.socialLinks?.facebook || ''}
                        onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                        placeholder="Facebook URL"
                      />
                    ) : (
                      <a
                        href={profile?.socialLinks?.facebook || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate block pl-6"
                      >
                        {profile?.socialLinks?.facebook || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile?.socialLinks?.twitter || ''}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        placeholder="Twitter URL"
                      />
                    ) : (
                      <a
                        href={profile?.socialLinks?.twitter || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate block pl-6"
                      >
                        {profile?.socialLinks?.twitter || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile?.socialLinks?.linkedin || ''}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        placeholder="LinkedIn URL"
                      />
                    ) : (
                      <a
                        href={profile?.socialLinks?.linkedin || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate block pl-6"
                      >
                        {profile?.socialLinks?.linkedin || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile?.socialLinks?.instagram || ''}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        placeholder="Instagram URL"
                      />
                    ) : (
                      <a
                        href={profile?.socialLinks?.instagram || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate block pl-6"
                      >
                        {profile?.socialLinks?.instagram || 'Not provided'}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Bio</h3>
                {isEditing ? (
                  <div className="w-full">
                    <Input
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                    />
                  </div>
                ) : (
                  <p className="text-gray-200">
                    {profile.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button (when editing) */}
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;