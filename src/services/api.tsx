import axios from 'axios';
import { UserProfile } from '@/store/auth-slice';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginResponse {
  token: string;
  userType: 'customer' | 'builder';
  userId: string;
}

interface RegisterData {
  email: string;
  password: string;
  category: 'customer' | 'builder';
  profession?: string;
  experience?: string;
  skills?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/signin', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('userType', response.data.userType);
  }
  return response.data;
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/signup', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('userType', response.data.userType);
  }
  return response.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>('/user/profile');
  return response.data;
};

export const updateProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  const response = await api.put<UserProfile>('/user/profile', profileData);
  return response.data;
};

export const uploadProfileImage = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post<UserProfile>('/user/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProfileImage = async (): Promise<UserProfile> => {
  const response = await api.delete<UserProfile>('/user/profile/image');
  return response.data;
};

export const searchBuilders = async (searchTerm: string) => {
  const response = await api.get(`/builders/search?term=${searchTerm}`);
  return response.data;
};

export const getBuilderJobs = async () => {
  const response = await api.get('/builder/jobs');
  return response.data;
};

export const updateJobStatus = async (jobId: string, status: string) => {
  const response = await api.put(`/builder/jobs/${jobId}`, { status });
  return response.data;
};

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;