import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Alert, AlertDescription } from './ui';
import { Mail } from 'lucide-react';

interface FormState {
  email: string;
  password: string;
}

const SignInSignUp: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      setMessage('Verification email sent. Please check your inbox.');
    } else {
      setMessage('Sign in successful!');
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      {isOpen && (
        <div className="z-10 fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button type="submit" className="w-full">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </Button>
              </div>
              {message && (
                <Alert className="mt-4">
                  <Mail className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Button variant="ghost" className="mt-4" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignInSignUp;