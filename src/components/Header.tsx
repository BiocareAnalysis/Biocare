import React from 'react';
import { Leaf, Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  notifications?: number;
}

const Header: React.FC<HeaderProps> = ({ title, notifications = 0 }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-emerald-500" />
            <h1 className="ml-2 text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </div>
            <Settings className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;