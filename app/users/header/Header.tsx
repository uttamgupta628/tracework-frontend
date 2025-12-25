'use client';

import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white px-2 py-1 font-bold text-sm">
              T+
            </div>
            <span className="font-semibold text-sm">
              TRACKLWAAR<span className="text-orange-500">jobs</span>
            </span>
          </div>

          <span className="hidden md:block text-gray-600 text-sm ml-4">
            Photographers
          </span>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}