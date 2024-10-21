// src/components/SignInSignUp.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Alert, AlertDescription } from './ui';
import { Mail, User, Briefcase, Lock } from 'lucide-react';
import { login, register, RegisterData, LoginResponse } from '../services/api';
import { setCredentials } from '@/store/auth-slice';
import { AppDispatch } from '@/store/slice';
import axios from 'axios';

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'customer' | 'builder' | '';
}

const SignInSignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      let response: LoginResponse;
      if (isSignUp) {
        if (formState.password !== formState.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        if (!formState.userType) {
          throw new Error("Please select a user type");
        }
        const registerData: RegisterData = {
          email: formState.email,
          password: formState.password,
          userType: formState.userType as 'customer' | 'builder',
        };
        response = await register(registerData);
        setMessage('Account created successfully. You are now signed in.');
      } else {
        response = await login(formState.email, formState.password);
        setMessage('Signed in successfully!');
      }

      dispatch(setCredentials({
        userId: response.id,
        token: response.token,
        userType: response.userType,
      }));

      if (response.userType === 'builder') {
        router.push('/builder-dashboard');
      } else {
        router.push('/customer-dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (userType: 'customer' | 'builder') => {
    setFormState(prevState => ({
      ...prevState,
      userType,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{isSignUp ? 'Create an Account' : 'Welcome Back'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="flex space-x-4 mb-4">
              <Button
                type="button"
                onClick={() => handleCategorySelect('customer')}
                className={`flex-1 transition-all duration-300 ease-in-out ${
                  formState.userType === 'customer'
                    ? 'bg-indigo-600 text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <User className={`mr-2 h-4 w-4 ${formState.userType === 'customer' ? 'animate-pulse' : ''}`} />
                Customer
              </Button>
              <Button
                type="button"
                onClick={() => handleCategorySelect('builder')}
                className={`flex-1 transition-all duration-300 ease-in-out ${
                  formState.userType === 'builder'
                    ? 'bg-indigo-600 text-white scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Briefcase className={`mr-2 h-4 w-4 ${formState.userType === 'builder' ? 'animate-pulse' : ''}`} />
                Builder
              </Button>
            </div>
          )}
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
              required
              className="pl-10"
            />
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleInputChange}
              required
              className="pl-10"
            />
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          {isSignUp && (
            <div className="relative">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                required
                className="pl-10"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-sm">
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>
        </div>
        {message && (
          <Alert className="mt-4">
            <Mail className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInSignUp;