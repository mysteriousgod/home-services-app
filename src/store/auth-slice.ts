// src/store/auth-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface AuthState {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'customer' | 'builder' | null;
  profile: UserProfile | null;
}

const initialState: AuthState = {
  userId: Cookies.get('userId') || null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!(Cookies.get('userId') && Cookies.get('token')),
  userType: (Cookies.get('userType') as 'customer' | 'builder' | null) || null,
  profile: null,
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
      // You might want to save some profile data to cookies as well
      Cookies.set('userName', action.payload.name, { expires: 7 });
      Cookies.set('userEmail', action.payload.email, { expires: 7 });
    },
  },
});

export const { setCredentials, logOut, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;

export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectCurrentUser = (state: { auth: AuthState }) => ({
  id: state.auth.userId,
  userType: state.auth.userType,
  ...state.auth.profile,
});