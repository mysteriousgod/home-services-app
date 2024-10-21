// src/services/api.ts
import axios from 'axios';

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

// Add more API functions as needed, for example:
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

// Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;