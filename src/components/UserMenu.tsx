'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings } from 'lucide-react';
import { useAppDispatch,useAppSelector } from '../store/hooks';
import { logOut, selectCurrentUser } from '../store/auth-slice';
import Cookies from 'js-cookie';
import userDefaultImage from "../assets/icons8-user-default-64.png"
import Image from 'next/image';

interface UserMenuProps {
  userType: 'customer' | 'builder';
}

const UserMenu: React.FC<UserMenuProps> = ({ userType }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('userId');
    Cookies.remove('userType');
    router.push('/');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <Image
                  src={currentUser?.profileImage || userDefaultImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
        {/* <span className="hidden md:inline">Profile</span> */}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <Link 
            href="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 mr-2" />
            profile
          </Link>
          <Link 
            href={`/${userType}-dashboard`} 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link 
            href="/settings" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;