'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar/Sidebar';
import { Bell, User, Menu } from 'lucide-react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages that should NOT show header and sidebar
  const noLayoutPages = ['/users', '/users/login', '/users/register', '/users/forgot-password', '/users/set-password', '/users/verification'];
  const shouldShowLayout = !noLayoutPages.includes(pathname);

  // If it's a landing/auth page, just render children without layout
  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  // Otherwise, render with header and sidebar
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
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

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <main className="pt-16 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}