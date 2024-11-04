'use client'

import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'
import SignInSignUp from './SignInSignUp'
import UserMenu from './UserMenu'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated, selectUserType } from '../store/auth-slice'
import ClientOnly from './ClintOnly'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userType = useAppSelector(selectUserType);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-full">
      <nav className="bg-background dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">HomeServe</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/services/plumbers" 
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Plumbers
                </Link>
                <Link 
                  href="/services/carpenters" 
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Carpenters
                </Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <ClientOnly>
                {isAuthenticated && userType ? (
                  <UserMenu userType={userType} />
                ) : (
                  <SignInSignUp />
                )}
              </ClientOnly>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-background dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400 dark:text-gray-500">
              &copy; 2024 HomeServe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
