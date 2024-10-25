// src/services/api.ts
import axios from 'axios';
import { UserProfile } from '@/store/auth-slice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginResponse {
  id: string;
  token: string;
  userType: 'customer' | 'builder';
}

export interface RegisterData {
  email: string;
  password: string;
  userType: 'customer' | 'builder';
  profession?: string;
  experience?: string;
  skills?: string;
}

// Auth API functions
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/signin', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/signup', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Profile API functions
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>('/profile');
  return response.data;
};

export const updateProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  const response = await api.put<UserProfile>('/profile', profileData);
  return response.data;
};

export const uploadProfileImage = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append('profileImage', file);

  const response = await api.post<UserProfile>('/profile/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProfileImage = async (): Promise<UserProfile> => {
  const response = await api.delete<UserProfile>('/profile/delete-image');
  return response.data;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;