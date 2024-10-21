// src/components/SignInSignUp.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Alert, AlertDescription, Select } from './ui';
import { Mail } from 'lucide-react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      router.push('/dashboard');
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleInputChange}
            required
          />
          {isSignUp && (
            <>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <Select
                name="userType"
                value={formState.userType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="customer">Customer</option>
                <option value="builder">Builder</option>
              </Select>
            </>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </Button>
        {message && (
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInSignUp;