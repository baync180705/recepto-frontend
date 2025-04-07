import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './logout';

const Sidebar: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setShowLogout(true);
  };

  const handleCancel = () => {
    setShowLogout(false);
  };

  const handleConfirm = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
    setShowLogout(false);
  };

  return (
    <div className="w-56 bg-white shadow-md flex flex-col h-full">
      <div className="p-4">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <span className="ml-2 font-semibold text-blue-600">Recepto</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MAIN</p>
        </div>
        <nav className="px-2 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md group ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mr-3 h-6 w-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Leads
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md group ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-blue-500" // Resized icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Analytics
          </NavLink>
        </nav>
        <div className="px-4 pt-6 pb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MORE</p>
        </div>
        <nav className="px-2 space-y-1">
          <nav
            onClick={handleLogoutClick}
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group cursor-pointer"
          >
            <svg className="mr-3 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </nav>
        </nav>
      </div>
      {showLogout && <Logout onConfirm={handleConfirm} onCancel={handleCancel} />}
    </div>
  );
};

export default Sidebar;