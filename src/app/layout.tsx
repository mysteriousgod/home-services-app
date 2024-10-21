// src/app/layout.tsx
'use client'

import Link from 'next/link'
import { ReactNode, useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import '@/app/globals.css'
import { store } from '@/store/slice'
import Navigation from '@/components/Navigation'
import ProfileComponent from '@/components/Profile'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/auth-slice'
import Cookies from 'js-cookie'

function InitializeAuth() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get('token')
    const userId = Cookies.get('userId')
    if (token && userId) {
      dispatch(setCredentials({ userId, token }))
    }
  }, [dispatch])

  return null
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Provider store={store}>
          <InitializeAuth />
          <div className="min-h-full">
            <nav className="bg-white dark:bg-gray-800 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link href="/" className="flex-shrink-0 flex items-center">
                      <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">HomeServe</span>
                    </Link>
                    <Navigation />
                  </div>
                  <div className="flex gap-4 items-center">
                    <ProfileComponent />
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

            <footer className="bg-white dark:bg-gray-800">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="mt-8 md:mt-0 md:order-1">
                  <p className="text-center text-base text-gray-400 dark:text-gray-500">
                    &copy; 2024 HomeServe. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Provider>
      </body>
    </html>
  )
}