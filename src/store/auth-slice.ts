import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import * as api from '@/services/api';

// Response types
interface ProfileResponse {
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

export type UserProfile = ProfileResponse;

interface AuthState {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'customer' | 'builder' | null;
  profile: ProfileResponse | null;
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

// Async actions with proper typing
export const fetchUserProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getUserProfile();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateUserProfileAsync = createAsyncThunk<
  ProfileResponse,
  UserProfile,
  { rejectValue: string }
>('auth/updateUserProfileAsync', async (profileData, { rejectWithValue }) => {
  try {
    const response = await api.updateProfile(profileData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
  }
});

export const uploadProfileImage = createAsyncThunk<
  ProfileResponse,
  File,
  { rejectValue: string }
>('auth/uploadProfileImage', async (file, { rejectWithValue }) => {
  try {
    const response = await api.uploadProfileImage(file);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
  }
});

export const deleteProfileImage = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>('auth/deleteProfileImage', async (_, { rejectWithValue }) => {
  try {
    const response = await api.deleteProfileImage();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete image');
  }
});

// Cookie options
const cookieOptions: Cookies.CookieAttributes = {
  expires: 7,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
};

// Initial state
const getInitialState = (): AuthState => ({
  userId: typeof window !== 'undefined' ? Cookies.get('userId') || null : null,
  token: typeof window !== 'undefined' ? Cookies.get('token') || null : null,
  isAuthenticated: typeof window !== 'undefined' 
    ? !!(Cookies.get('userId') && Cookies.get('token')) 
    : false,
  userType: typeof window !== 'undefined' 
    ? (Cookies.get('userType') as 'customer' | 'builder' | null) || null 
    : null,
  profile: null,
  loading: false,
  error: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
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
      Cookies.set('userId', userId, cookieOptions);
      Cookies.set('token', token, cookieOptions);
      Cookies.set('userType', userType, cookieOptions);
    },
    logOut: (state) => {
      state.userId = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.profile = null;
      state.error = null;
      Cookies.remove('userId', { path: '/' });
      Cookies.remove('token', { path: '/' });
      Cookies.remove('userType', { path: '/' });
      Cookies.remove('userName', { path: '/' });
      Cookies.remove('userEmail', { path: '/' });
    },
    updateUserProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.profile = action.payload;
      Cookies.set('userName', action.payload.name, cookieOptions);
      Cookies.set('userEmail', action.payload.email, cookieOptions);
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
        Cookies.set('userName', action.payload.name, cookieOptions);
        Cookies.set('userEmail', action.payload.email, cookieOptions);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
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
        Cookies.set('userName', action.payload.name, cookieOptions);
        Cookies.set('userEmail', action.payload.email, cookieOptions);
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile = {
            ...state.profile,
            profileImage: action.payload.profileImage
          };
        }
        state.error = null;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      // Delete Profile Image
      .addCase(deleteProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile = {
            ...state.profile,
            profileImage: ''
          };
        }
        state.error = null;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const {
  setCredentials,
  logOut,
  updateUserProfile,
  clearError
} = authSlice.actions;

export default authSlice.reducer;

// Type-safe selectors
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectProfile = (state: { auth: AuthState }) => state.auth.profile;

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