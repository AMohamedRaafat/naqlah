'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function DesktopUserMenu() {
  const t = useTranslations();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <User className="w-full h-full text-gray-900 p-2" />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-900 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 font-expo-arabic">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-gray-800">{user?.name || t('userMenu.username')}</p>
            <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>{t('navigation.dashboard')}</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-5 h-5" />
            <span>{t('navigation.settings')}</span>
          </Link>

          <div className="border-t my-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('navigation.logout')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
