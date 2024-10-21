// src/store/auth-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'customer' | 'builder' | null;
}

const initialState: AuthState = {
  userId: Cookies.get('userId') || null,
  token: Cookies.get('token') || null,
  isAuthenticated: !!(Cookies.get('userId') && Cookies.get('token')),
  userType: (Cookies.get('userType') as 'customer' | 'builder' | null) || null,
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
      Cookies.remove('userId');
      Cookies.remove('token');
      Cookies.remove('userType');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectCurrentUser = (state: { auth: AuthState }) => ({
  id: state.auth.userId,
  userType: state.auth.userType,
});