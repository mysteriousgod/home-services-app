// UserMenu.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/auth-slice';
import { AppDispatch } from '@/store/redux-store';
import Cookies from 'js-cookie';

interface UserMenuProps {
  userType: 'customer' | 'builder';
}

const UserMenu: React.FC<UserMenuProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logOut());
    Cookies.remove('token');
    Cookies.remove('user');
    // Redirect to home page or login page after logout
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <User className="h-6 w-6" />
        <span className="hidden md:inline">Profile</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <Link href={`/${userType}-dashboard`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="inline-block h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;