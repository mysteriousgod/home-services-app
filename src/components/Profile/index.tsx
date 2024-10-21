// src/components/Profile/index.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId, selectIsAuthenticated, logOut } from '@/store/auth-slice'
import { AppDispatch, RootState } from '@/store/slice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { User, LogOut } from 'lucide-react'

const ProfileComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const userId = useSelector((state: RootState) => selectUserId(state))
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state))
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logOut())
    Cookies.remove('token')
    Cookies.remove('userId')
    router.push('/')
    setIsOpen(false)
  }

  if (!isAuthenticated) {
    return <Link href="/login" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">Sign In</Link>
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
      >
        <User className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="inline-block h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileComponent