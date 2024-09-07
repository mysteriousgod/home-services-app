import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Alert, AlertDescription } from './ui';
import { Mail, User, Briefcase } from 'lucide-react';

interface FormState {
  email: string;
  password: string;
  category?: 'customer' | 'builder';
  profession?: string;
  experience?: string;
  skills?: string;
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

  const handleCategorySelect = (category: 'customer' | 'builder') => {
    setFormState(prevState => ({
      ...prevState,
      category,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      if (!formState.category) {
        setMessage('Please select a category (Customer or Builder).');
        return;
      }
      if (formState.category === 'builder' && (!formState.profession || !formState.experience || !formState.skills)) {
        setMessage('Please fill in all builder-specific fields.');
        return;
      }
      setMessage(`Verification email sent. Please check your inbox. Category: ${formState.category}`);
    } else {
      setMessage('Sign in successful!');
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      {isOpen && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <Card className="w-full max-w-md max-h-[90vh] flex flex-col bg-white dark:bg-gray-800">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">HomeServe</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {isSignUp && (
                  <div className="flex space-x-4 mb-4">
                    <Button
                      type="button"
                      onClick={() => handleCategorySelect('customer')}
                      className={`flex-1 transition-all duration-300 ease-in-out ${
                        formState.category === 'customer'
                          ? 'bg-indigo-600 text-white scale-105'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <User className={`mr-2 h-4 w-4 ${formState.category === 'customer' ? 'animate-pulse' : ''}`} />
                      Customer
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleCategorySelect('builder')}
                      className={`flex-1 transition-all duration-300 ease-in-out ${
                        formState.category === 'builder'
                          ? 'bg-indigo-600 text-white scale-105'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Briefcase className={`mr-2 h-4 w-4 ${formState.category === 'builder' ? 'animate-pulse' : ''}`} />
                      Builder
                    </Button>
                  </div>
                )}
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                />
                {isSignUp && formState.category === 'builder' && (
                  <>
                    <Input
                      type="text"
                      name="profession"
                      placeholder="Profession (e.g., Plumber, Electrician)"
                      value={formState.profession || ''}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                    <Input
                      type="text"
                      name="experience"
                      placeholder="Years of Experience"
                      value={formState.experience || ''}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                    <Input
                      type="text"
                      name="skills"
                      placeholder="Skills (comma-separated)"
                      value={formState.skills || ''}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                  </>
                )}
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFormState(prev => ({ ...prev, category: undefined, profession: undefined, experience: undefined, skills: undefined }));
                  }}
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </Button>
              </div>
              {message && (
                <Alert className="mt-4 bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200">
                  <Mail className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Button 
                variant="ghost" 
                className="mt-4 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={() => setIsOpen(false)}
              >
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