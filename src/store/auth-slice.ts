// src/store/auth-slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import * as api from '@/services/api';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  availability: 'available' | 'busy' | 'away';
  rating: number;
  completedProjects: number;
  profession?: string;
  experience?: string;
  skills?: string;
}

interface AuthState {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'customer' | 'builder' | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface CurrentUser {
  id: string | null;
  userType: 'customer' | 'builder' | null;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  profileImage?: string;
  socialLinks?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  availability?: 'available' | 'busy' | 'away';
  rating?: number;
  completedProjects?: number;
  profession?: string;
  experience?: string;
  skills?: string;
}

// Async actions
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await api.getUserProfile();
      return profile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  'auth/updateUserProfileAsync',
  async (profileData: UserProfile, { rejectWithValue }) => {
    try {
      const updatedProfile = await api.updateProfile(profileData);
      return updatedProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'auth/uploadProfileImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const updatedProfile = await api.uploadProfileImage(file);
      return updatedProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

export const deleteProfileImage = createAsyncThunk(
  'auth/deleteProfileImage',
  async (_, { rejectWithValue }) => {
    try {
      const updatedProfile = await api.deleteProfileImage();
      return updatedProfile;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete image');
    }
  }
);

const initialState: AuthState = {
  userId: Cookies.get('userId') || null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!(Cookies.get('userId') && Cookies.get('token')),
  userType: (Cookies.get('userType') as 'customer' | 'builder' | null) || null,
  profile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ userId: string; token: string; userType: 'customer' | 'builder' }>
    ) => {
      const { userId, token, userType } = action.payload;
      state.userId = userId;
      state.token = token;
      state.userType = userType;
      state.isAuthenticated = true;
      Cookies.set('userId', userId, { expires: 7 });
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('userType', userType, { expires: 7 });
    },
    logOut: (state) => {
      state.userId = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.profile = null;
      Cookies.remove('userId');
      Cookies.remove('token');
      Cookies.remove('userType');
    },
    updateUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      Cookies.set('userName', action.payload.name, { expires: 7 });
      Cookies.set('userEmail', action.payload.email, { expires: 7 });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        Cookies.set('userName', action.payload.name, { expires: 7 });
        Cookies.set('userEmail', action.payload.email, { expires: 7 });
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Profile Image
      .addCase(deleteProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, logOut, updateUserProfile, clearError } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const selectCurrentUser = (state: { auth: AuthState }): CurrentUser => {
  const { userId, userType, profile } = state.auth;
  
  if (!profile) {
    return {
      id: userId,
      userType,
    };
  }

  return {
    id: userId,
    userType,
    ...profile,
  };
};