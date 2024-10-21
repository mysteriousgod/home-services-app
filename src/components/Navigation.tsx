// src/components/Navigation.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectUserId, selectIsAuthenticated } from '@/store/auth-slice'
import { RootState } from '@/store/slice'

const Navigation: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state))
  const userId = useSelector((state: RootState) => selectUserId(state))

  const renderNavLinks = () => {
    if (!isAuthenticated || !userId) {
      return (
        <>
          <Link href="/services" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
            Services
          </Link>
          <Link href="/about" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
            About
          </Link>
        </>
      )
    }

    return (
      <>
        <Link href="/builder-dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Dashboard
        </Link>
        <Link href="/profile" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Profile
        </Link>
        <Link href="/messages" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Messages
        </Link>
      </>
    )
  }

  return (
    <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
      <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
        Home
      </Link>
      {renderNavLinks()}
    </nav>
  )
}

export default Navigation